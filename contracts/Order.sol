pragma solidity ^0.4.11;

import "./CargoCoin.sol";
import "./Platform.sol";

/// @title Заказ на перевозку
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Order {
  enum State {
    New,
    Signed,
    Shipped,
    Done,
    Cancelled,
    Broken          // пломба нарушена
  }


  struct Position {
    uint32 location;
    uint32 date;
    uint32 description;
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
    Assignment assignment;
    uint price;
  }

  address owner;
  State public state;
  address public customer;  // заказчик (ОБОЗ)
  uint public price;   // общая стоимость заказа
  uint public numTracks;
  uint public activeTrackID;
  mapping (uint => Track) tracks;
  CargoCoin cc;
  Platform platform;
  address _address;

  modifier restricted {
      if (msg.sender != owner)
          revert();
      _;
  }

  function Order( address _customer,
                  uint32[] _trackHashes,
                  address[] _trackAddresses,
                  uint[] _trackPrices,
                  address _ccAddress,
                  address _platformAddress) {
    owner = msg.sender;
    cc = CargoCoin(_ccAddress);
    platform = Platform(_platformAddress);
    _address = this;
    state = State.New;
    customer = _customer;

    uint k = 0;
    uint _price = 0;
    for(uint i = 0; i < _trackPrices.length; i++) {
      k = i * 8;
      Position memory _pickup = Position(_trackHashes[k], _trackHashes[k+1], _trackHashes[k+2]);
      Position memory _dropdown = Position(_trackHashes[k+3], _trackHashes[k+4], _trackHashes[k+5]);
      Assignment memory _assignment = Assignment(_trackHashes[k+6], _trackHashes[k+7]);
      tracks[numTracks] = Track(TrackState.New, _pickup, _dropdown, _trackAddresses[i], _assignment, _trackPrices[i]);
      _price += _trackPrices[i];
      numTracks++;
    }
    price = _price;
    platform.addOrder(_address);
  }

  function begin() payable returns (Error) {
    if( msg.sender == customer ) {
      if( state == State.New ) {
        if( cc.transferFrom(msg.sender, _address, price) != true ) {
          return Error.PriceIsWrong;
        }
        state = State.Shipped;
      }
    }
  }

  function getOrder() constant returns (
    State _state,
    address _customer,
    uint _price,
    uint _numTracks,
    uint _activeTrack ) {
      _state = state;
      _customer = customer;
      _price = price;
      _numTracks = numTracks;
      _activeTrack = activeTrackID;
  }

  function complete() returns (Error) {
    if( state != State.Shipped  )
      return Error.OrderIsNotPaid;
    // если отправитель не отправил, обрабатывать нечего

    if( msg.sender == customer ) {
      uint fee = 1;
      for( uint i = 0; i < numTracks; i++ ) {
        cc.transferWithFee(tracks[i].carrier, tracks[i].price, fee); // microCC
        tracks[i].trackState = TrackState.Unloaded;
      }
      // при выполнении переводим сумму перевозчикам с комиссией 1%
      state = State.Done;
      return Error.OK;
    }
    return Error.UnknownCompletion;
  }

  function cancel() returns (Error) {  // отмена
    if( state != State.Shipped  )
      return Error.OrderIsNotPaid;
    // если отправитель не отправил, обрабатывать нечего

    if( msg.sender == customer ) {
      // нельзя запрашивать баланс и производить оплату в одном методе (!!!)
      // вызывает Invalid Opcode - походу BUG solidity
      uint bal = cc.balanceOf(_address);
      if( bal > 0 ) {
        // consigner.transfer(bal); // wei
        cc.transfer(customer, bal); // microCC
      }
      // возврат средств

      state = State.Cancelled;
      return Error.OK;
      // отмена заказа
    }
    return Error.CannotDismiss;
  }

  function getTrack(uint trackID) constant returns (  TrackState _state,
                                                      address _carrier,
                                                      uint _price,
                                                      uint32 _pickup,
                                                      uint32 _pickupDescr,
                                                      uint32 _dropdown,
                                                      uint32 _dropdownDescr,
                                                      uint32 _assignmentDate,
                                                      uint32 _assignmentProof ) {
    assert(trackID < numTracks);
    _state = tracks[trackID].trackState;
    _carrier = tracks[trackID].carrier;
    _price = tracks[trackID].price;
    _pickup = tracks[trackID].pickup.location;
    _pickupDescr = tracks[trackID].pickup.description;
    _dropdown = tracks[trackID].dropdown.location;
    _dropdownDescr = tracks[trackID].dropdown.description;
    _assignmentDate = tracks[trackID].assignment.date;
    _assignmentProof = tracks[trackID].assignment.proof;
  }
}
