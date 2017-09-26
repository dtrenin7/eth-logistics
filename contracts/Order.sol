pragma solidity ^0.4.11;

import "./Owned.sol";
import "./CargoCoin.sol";

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
    uint32 location;
    uint32 date;
  }

  struct Assignment {
    uint32 date;
    uint32 proof;
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
  uint32 public description;  // хеш на описание перевозки (в т.ч.груза)
  CargoCoin cc;
  address _address;

  function Order( uint _ID,
                  address _consigner,
                  address _consignee,
  //                bytes32[] _trackHashes,
                  uint32[] _trackHashes,
                  address[] _trackAddresses,
                  uint[] _trackPrices,
                  uint32 _description) Owned() {
    cc = CargoCoin(0x1dfc8f39f23b207f1894476627ff531d5492929d);
    _address = this;
    ID = _ID;
    state = State.New;
    consigner = _consigner;
    consignee = _consignee;
    description = _description;

    uint j = 0;
    uint k = 0;
    uint _price = 0;
    for(uint i = 0; i < _trackPrices.length; i++) {
      k = i * 6;
      j = i * 3;
      /*tracks[numTracks].trackState = TrackState.New;
      tracks[numTracks].pickup.location = _trackHashes[i];
      tracks[numTracks].pickup.date = _trackHashes[i+1];
      tracks[numTracks].dropdown.location = _trackHashes[i+2];
      tracks[numTracks].dropdown.date = _trackHashes[i+3];
      tracks[numTracks].carrier = _trackAddresses[j];
      tracks[numTracks].loader = _trackAddresses[j+1];
      tracks[numTracks].unloader = _trackAddresses[j+2];
      tracks[numTracks].assignment.date = _trackHashes[i+4];
      tracks[numTracks].assignment.proof = _trackHashes[i+5];
      tracks[numTracks].price = _trackPrices[numTracks]; */
      Position memory _pickup = Position(_trackHashes[k], _trackHashes[k+1]);
      Position memory _dropdown = Position(_trackHashes[k+2], _trackHashes[k+3]);
      Assignment memory _assignment = Assignment(_trackHashes[k+4], _trackHashes[k+5]);
      tracks[numTracks] = Track(TrackState.New, _pickup, _dropdown,
        _trackAddresses[j], _trackAddresses[j+1], _trackAddresses[j+2],
        _assignment, _trackPrices[i]); //*/
      _price += _trackPrices[i];
      numTracks++;
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
      uint256 balanceCC = cc.balanceOf(_address);
      if( state != State.New ) {
        //msg.sender.transfer(msg.value); // wei
        return Error.OrderAlreadyPaid;
      }
      if( balanceCC != price ) {  // microCC
        if( balanceCC != 0 ) {
          cc.transfer(msg.sender, balanceCC);
        }
      //if( msg.value != price ) {  // wei
          //msg.sender.transfer(msg.value);
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
        //  tracks[activeTrackID-1].carrier.transfer(tracks[activeTrackID-1].price); // wei
          cc.transfer(tracks[activeTrackID-1].carrier, tracks[activeTrackID-1].price); // microCC
        }
        // предидущие участники трека выполнили свою работу, платим им
        return Error.OK;
      }
      // загрузчик выполнил работу
    }

    else if( numTracks > 0 && msg.sender == consignee ) {
      // tracks[activeTrackID-1].carrier.transfer(tracks[activeTrackID-1].price); // wei
      cc.transfer(tracks[activeTrackID-1].carrier, tracks[activeTrackID-1].price); // microCC
      state = State.Done;
      return Error.OK;
    }
    // получатель получил груз, платим последнему треку
    return Error.UnknownCompletion;
  }

  function getBalance() constant returns (uint) {
    // return this.balance; // wei
    return cc.balanceOf(_address); // microCC
  }

  function complete2() returns (Error) { // Cancel(), but solidity name conflicts
    if( msg.sender == consigner ) {
      if( numTracks > 0 && tracks[0].trackState != TrackState.New ) {
        return Error.OrderAlreadyProcessing;
      }
      // заказ уже выполняется, отменить невозможно

      // нельзя запрашивать баланс и производить оплату в одном методе (!!!)
      // вызывает Invalid Opcode - походу BUG solidity
      uint bal = this.getBalance();
      if( bal > 0 ) {
        // consigner.transfer(bal); // wei
        cc.transfer(consigner, bal); // microCC
      }

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
                                                      uint _price,
                                                      uint32 _pickup,
                                                      uint32 _dropdown ) {
    assert(trackID < numTracks);
    _state = tracks[trackID].trackState;
    _carrier = tracks[trackID].carrier;
    _loader = tracks[trackID].loader;
    _unloader = tracks[trackID].unloader;
    _price = tracks[trackID].price;
    _pickup = tracks[trackID].pickup.location;
    _dropdown = tracks[trackID].dropdown.location;
  }
}
