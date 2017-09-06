pragma solidity ^0.4.11;

import "./Owned.sol";

/// @dev Перевозчик
contract ObozCarrier is Owned {

  function ObozCarrier() Owned() {
  }

  function donate() payable {
    // If no Ether has been sent we have nothing to do.
    if (msg.value == 0) revert();
    //owner.transfer(msg.value);
  }

  function pay(uint amount){
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
