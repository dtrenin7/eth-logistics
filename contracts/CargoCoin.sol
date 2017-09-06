pragma solidity ^0.4.11;

import "./ConvertLib.sol";
import "./Owned.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

// TODO: make compilant with ERC20
contract CargoCoin is Owned {
	uint wei2cc = 1000000000000000;	// conversion ratio 1 ETH for 1000 CC
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function CargoCoin() {
		balances[owner] = 1000000;	// initial emission 1000 ETH
	}

	function setConversionRatio(uint ratio) restricted {
		wei2cc = ratio;
	}

	function getConversionRatio() constant returns (uint ratio) {
		ratio = wei2cc;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount)
			return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInWei(address addr) constant returns(uint){
		return getBalanceInCC(addr) * wei2cc;
	}

	function getBalanceInCC(address addr) constant returns(uint) {
		return balances[addr];
	}

	function getBalance() constant returns (uint balance) {
		balance = this.balance;
	}

	function canBuy(uint cargoCoins) constant returns (bool can) {
		can = balances[owner] >= cargoCoins;
	}

	/// ETH (wei) => CC
	function buy() payable {
		// If no Ether has been sent we have nothing to do.
    if( msg.value < wei2cc || owner == msg.sender )
			revert();
		uint cargoCoins = msg.value / wei2cc;
		if( balances[owner] < cargoCoins )
			revert();
		balances[owner] -= cargoCoins;
		balances[msg.sender] += cargoCoins;
		Transfer(owner, msg.sender, cargoCoins);
//		owner.transfer(msg.value);  /// do not hold ETH on contract, let buyer pays transfer gas
	}

	///  CC => ETH (wei)
	function sell(uint cargoCoins) {
		if( cargoCoins == 0 || balances[msg.sender] < cargoCoins || msg.sender == owner )
			revert();
		uint weis = cargoCoins * wei2cc;
		balances[msg.sender] -= cargoCoins;
		balances[owner] += cargoCoins;
		Transfer(msg.sender, owner, cargoCoins);
		msg.sender.transfer(weis);
	}
}
