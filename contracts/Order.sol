pragma solidity ^0.4.11;

import "./Owned.sol";

/// @title Заказ на перевозку
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Order is Owned {
  enum State {
    New,
    Signed,
    Done,
    Cancelled
  }

  struct Position {
    bytes32 location;
    bytes32 date;
  }

  struct Assignment {
    bytes32 date;
    bytes32 proof;
  }

  enum TrackState {
    New,
    Loaded,
    Unloaded,
    Delay
  }

  enum Error {
    OK,
    OrderIsNotPaid,
    OrderAlreadyProcessing,
    UnknownCompletion,
    OrderAlreadyPaid,
    PriceIsWrong,
    CannotDismiss
  }

  struct Track {
    TrackState trackState;
    Position pickup;
    Position dropdown;
    address carrier;
    address loader;
    address unloader;
    Assignment assignment;
    uint price;
  }

  uint public ID;   // public for DEBUG
  State public state;
  address public consigner;
  address public consignee;
  uint public price;   // общая стоимость заказа
  uint public numTracks;
  uint public activeTrackID;
  mapping (uint => Track) tracks;
  bytes32 public description;  // хеш на описание перевозки (в т.ч.груза)


  function Order( uint _ID,
                  address _consigner,
                  address _consignee,
                  bytes32[] _trackHashes,
                  address[] _trackAddresses,
                  uint[] _trackPrices,
                  bytes32 _description) Owned() {
    ID = _ID;
    state = State.New;
    consigner = _consigner;
    consignee = _consignee;
    description = _description;

    uint i = 0;
    uint j = 0;
    uint _price = 0;
    while(i < _trackHashes.length) {
      Position memory _pickup = Position(_trackHashes[i], _trackHashes[i+1]);
      Position memory _dropdown = Position(_trackHashes[i+2], _trackHashes[i+3]);
      Assignment memory _assignment = Assignment(_trackHashes[i+4], _trackHashes[i+5]);
      tracks[numTracks] = Track(TrackState.New, _pickup, _dropdown,
        _trackAddresses[j], _trackAddresses[j+1], _trackAddresses[j+2],
        _assignment, _trackPrices[numTracks]);
      _price += _trackPrices[numTracks];
      numTracks++;
      i += 6;
      j += 3;
    }
    price = _price;

    //stateDescs[uint(State.Signed)] = 'Состояние заказа: Подписан';
    //stateDescs[uint(State.Processing)] = 'Состояние заказа: Выполнение';
    //stateDescs[uint(State.Done)] = 'Состояние заказа: Доставка завершена';
    //stateDescs[uint(State.Cancelled)] = 'Состояние заказа: Отменен';
    //stateDescs[uint(State.Loaded)] = 'Состояние заказа: Загрузка завершена';
    //stateDescs[uint(State.Unloaded)] = 'Состояние заказа: Разгрузка завершена';

  }

  function begin() payable returns (Error) {
    if( msg.sender == consigner ) {
      if( state != State.New ) {
        msg.sender.transfer(msg.value);
        return Error.OrderAlreadyPaid;
      }
      if( msg.value != price ) {
          msg.sender.transfer(msg.value);
          return Error.PriceIsWrong;
      }
      // возврат, если условия не соблюдены
      state = State.Signed;
    }
    return Error.OK;
  }

  function complete() returns (Error) {
    if( state != State.Signed  )
      return Error.OrderIsNotPaid;
    // если отправитель не оплатил, обрабатывать нечего

    if( activeTrackID < numTracks ) {
      if( tracks[activeTrackID].trackState == TrackState.Loaded &&
        msg.sender == tracks[activeTrackID].unloader ) {
        tracks[activeTrackID].trackState = TrackState.Unloaded;
        activeTrackID++;
        return Error.OK;
      }
      // разгрузчик выполнил работу, активизируем следующий трек

      if( tracks[activeTrackID].trackState == TrackState.New &&
        msg.sender == tracks[activeTrackID].loader ) {
        tracks[activeTrackID].trackState = TrackState.Loaded;
        if( activeTrackID > 0 ) {
          tracks[activeTrackID-1].carrier.transfer(tracks[activeTrackID-1].price);
        }
        // предидущие участники трека выполнили свою работу, платим им
        return Error.OK;
      }
      // загрузчик выполнил работу
    }

    else if( numTracks > 0 && msg.sender == consignee ) {
      tracks[activeTrackID-1].carrier.transfer(tracks[activeTrackID-1].price);
      state = State.Done;
      return Error.OK;
    }
    // получатель получил груз, платим последнему треку
    return Error.UnknownCompletion;
  }

  function dismiss() returns (Error) {
    if( msg.sender == consigner ) {
      if( state != State.New )
        return Error.OrderAlreadyProcessing;
      // заказ уже выполняется, отменить невозможно

      //consigner.transfer(this.balance);
      state = State.Cancelled;
      return Error.OK;
      // отмена заказа
    }
    return Error.CannotDismiss;
  }

  function getTrack(uint trackID) constant returns (  TrackState _state,
                                                      address _carrier,
                                                      address _loader,
                                                      address _unloader,
                                                      uint _price ) {
    assert(trackID < numTracks);
    _state = tracks[trackID].trackState;
    _carrier = tracks[trackID].carrier;
    _loader = tracks[trackID].loader;
    _unloader = tracks[trackID].unloader;
    _price = tracks[trackID].price;
  }
}
