pragma solidity ^0.4.11;

import "./Owned.sol";

/// @title Груз
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Cargo is Owned {
  uint ID;
  string name;

  function Cargo(uint _ID, string _name) Owned() {
    ID = _ID;
    name = _name;
  }

  function getName() public constant returns (string _name) {
    _name = name;
  }
}
