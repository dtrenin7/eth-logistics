pragma solidity ^0.4.11;

import "./Owned.sol";

/// @title Рейс (Перевозка)
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Consignement is Owned {
  enum State {
    New,
    NonConfirmed,
    Published,
    Confirmation,
    Assigned,
    Processing,
    Done
  }
  uint ID;
  State state;
  uint numDetailIDs;
  mapping (uint => uint) detailIDs;

  function Consignement(uint _ID) Owned() {
    ID = _ID;
    state = State.New;
  }
}
