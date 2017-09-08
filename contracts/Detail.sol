pragma solidity ^0.4.11;

import "./Owned.sol";

/// @title Наряд
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Detail is Owned {
  enum State {
    Loading,
    Driving,
    Unloading,
    Processing,
    Done
  }
  uint ID;
  State state;
  uint carrierID;
  uint price;   // стоимость услуги
  bool approved;
  address prevDetail;

  function Detail(uint _ID, uint _carrierID, uint _price) Owned() {
    ID = _ID;
    carrierID = _carrierID;
    state = State.Loading;
    price = _price;
    approved = false;
  }

  function Approve() {
    if(approved == true) {
      return;
    }
    approved = true;
    if( prevDetail != 0 ) {
      Detail prd = Detail(prevDetail);
      prevDetail.transfer(prd.getPrice());
    }
  }

  function catchCoins() payable {
    if (msg.value == 0)
      revert(); // If no Ether has been sent we have nothing to do.
    owner.transfer(msg.value);
  }

  function getPrice() constant returns (uint _price) {
    _price = price;
  }

}
