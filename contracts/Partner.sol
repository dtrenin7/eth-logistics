pragma solidity ^0.4.11;

import "./Owned.sol";

/// @dev контрагент
contract Partner is Owned {
  uint ID;
  mapping (string => string) attributes;

  function Partner(uint _ID) Owned() {
    ID = _ID;
  }

  function setAttribute(string _name, string _value) {
    attributes[_name] = _value;
  }

  function getAttribute(string _name) constant returns (string _value) {
    _value = attributes[_name];
  }

  function catchCoins() payable {
    if (msg.value == 0)
      revert(); // If no Ether has been sent we have nothing to do.
    owner.transfer(msg.value); // send money directly to owner (just for DEBUG)
  }

  function payToOwner(uint amount) restricted {
    assert(this.balance >= amount);
    owner.transfer(amount);
  }

  function getBalance() constant returns (uint balance) {
    balance = this.balance;
  }

  function destroy() restricted {
    selfdestruct(owner);
  }
}
