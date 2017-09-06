pragma solidity ^0.4.11;

contract Owned {
    address owner;
    function Owned() { owner = msg.sender; }

    modifier restricted {
        if (msg.sender != owner)
            revert();
        _;
    }

    function getOwner() constant returns (address _owner) {
      _owner = owner;
    }

    function setOwner(address _owner) restricted {
      owner = _owner;
    }

    function getOwnerBalance() restricted constant returns (uint _balance) {
      _balance = owner.balance;
    }
}
