pragma solidity ^0.4.11;

import "./Partner.sol";

/// @title Грузополучатель
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Consignee is Partner {
  string name;

  function Consignee(uint _ID, string _name) Partner(_ID) {
    name = _name;
  }

  function getName() public constant returns (string _name) {
    _name = name;
  }
}
