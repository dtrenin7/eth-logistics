pragma solidity ^0.4.11;

import "./Partner.sol";

/// @title Грузоотправитель
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Consigner is Partner {
  string public name;

  function Consigner(uint _ID, string _name) Partner(_ID) {
    name = _name;
  }
}
