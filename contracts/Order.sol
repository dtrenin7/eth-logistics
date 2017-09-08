pragma solidity ^0.4.11;

import "./Owned.sol";

/// @title Заказ на перевозку
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Order is Owned {
  enum State {
    New,
    Signed,
    Loaded,
    Unloaded,
    Delay,
    Processing,
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

  struct Track {
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
  mapping (uint => address) trackIndex;
  mapping (address => Track) tracks;
  bytes32 public description;  // хеш на описание перевозки (в т.ч.груза)


  function Order( uint _ID,
                  address _consigner,
                  address _consignee,
                  uint _price,
                  bytes32[] _trackHashes,
                  address[] _trackAddresses,
                  uint[] _trackPrices,
                  bytes32 _description) Owned() {
    ID = _ID;
    state = State.New;
    consigner = _consigner;
    consignee = _consignee;
    price = _price;
    description = _description;

    uint i = 0;
    uint j = 0;
    while(i < _trackHashes.length) {
      Position memory _pickup = Position(_trackHashes[i], _trackHashes[i+1]);
      Position memory _dropdown = Position(_trackHashes[i+2], _trackHashes[i+3]);
      Assignment memory _assignment = Assignment(_trackHashes[i+4], _trackHashes[i+5]);
      trackIndex[numTracks] = _trackAddresses[j];
      tracks[trackIndex[numTracks]] = Track(_pickup, _dropdown,
        _trackAddresses[j], _trackAddresses[j+1], _trackAddresses[j+2],
        _assignment, _trackPrices[numTracks]);
      numTracks++;
      i += 6;
      j += 3;
    }

    //stateDescs[uint(State.Signed)] = 'Состояние заказа: Подписан';
    //stateDescs[uint(State.Processing)] = 'Состояние заказа: Выполнение';
    //stateDescs[uint(State.Done)] = 'Состояние заказа: Доставка завершена';
    //stateDescs[uint(State.Cancelled)] = 'Состояние заказа: Отменен';
    //stateDescs[uint(State.Loaded)] = 'Состояние заказа: Загрузка завершена';
    //stateDescs[uint(State.Unloaded)] = 'Состояние заказа: Разгрузка завершена';

  }

  function begin() payable {
    if( msg.sender == consigner ) {
      if( msg.value != price ) {
        msg.sender.transfer(msg.value); // возврат, если отправитель перевел недостаточно
      }
      else {
        state = State.Signed;
      }
    }
  }

  function complete() {
    if( msg.sender == consignee ) {
      // платим по всем трекам
      for(uint i = 0; i < numTracks; i++) {
        tracks[trackIndex[i]].carrier.transfer(tracks[trackIndex[i]].price);
      }
      state = State.Done;
    }

  }

  function dismiss() restricted {
    owner.transfer(this.balance);
    state = State.Cancelled;
  }

}
