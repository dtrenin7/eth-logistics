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
  uint carrierID;
  uint price;   // стоимость услуги

  function Detail(uint _ID, uint _carrierID) Owned() {
    ID = _ID;
    carrierID = _carrierID;
    state = State.Loading;
  }

}
