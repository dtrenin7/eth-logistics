pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {

  function testSimpleStorageAddAndDelete() {
    SimpleStorage ss = SimpleStorage(DeployedAddresses.SimpleStorage());

    uint expected = 0;

    Assert.equal(ss.get(), expected, "Value does not match!");
  }

}
