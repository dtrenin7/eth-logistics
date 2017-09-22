pragma solidity ^0.4.11;

import "./ConvertLib.sol";
import "./Owned.sol";
import "./ECR20.sol";


contract CargoCoin is Owned, ERC20 {
	string public constant symbol = "CC";
	string public constant name = "Cargo Coins";

	// minimum CC amount is one microCC
	uint8 public constant decimals = 6;

 	// conversion ratio 1 ETH for 1000 CC
	uint wei2cc = 1000000000;

	// emitted amount of microCC
	uint256 _totalSupply;

	// Balances for each account
	mapping (address => uint256) balances;

	// Owner of account approves the transfer of an amount to another account
	mapping(address => mapping (address => uint256)) allowed;

	 // Triggered when tokens are transferred.
	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	// Triggered whenever approve(address _spender, uint256 _value) is called.
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);

	// Initial emission (in microCC) = 1000000 CC
	function CargoCoin() Owned() {
		_totalSupply = 1000000000000;
		balances[owner] = _totalSupply;
	}

	// Get the total token supply
 	function totalSupply() constant returns (uint256 totalSupply) {
		totalSupply = _totalSupply;
	}

	// What is the balance of a particular account?
   function balanceOf(address _owner) constant returns (uint256 balance) {
       return balances[_owner];
   }

   // Transfer the balance from owner's account to another account
   function transfer(address _to, uint256 _amount) returns (bool success) {
       if (balances[msg.sender] >= _amount
           && _amount > 0
           && balances[_to] + _amount > balances[_to]) {
           balances[msg.sender] -= _amount;
           balances[_to] += _amount;
					 Transfer(msg.sender, _to, _amount);
           return true;
       } else {
           return false;
       }
   }

   // Send _value amount of tokens from address _from to address _to
   // The transferFrom method is used for a withdraw workflow, allowing contracts to send
   // tokens on your behalf, for example to "deposit" to a contract address and/or to charge
   // fees in sub-currencies; the command should fail unless the _from account has
   // deliberately authorized the sender of the message via some mechanism; we propose
   // these standardized APIs for approval:
   function transferFrom(
       address _from,
       address _to,
       uint256 _amount
   ) returns (bool success) {
       if (balances[_from] >= _amount
           && allowed[_from][msg.sender] >= _amount
           && _amount > 0
           && balances[_to] + _amount > balances[_to]) {
           balances[_from] -= _amount;
           allowed[_from][msg.sender] -= _amount;
           balances[_to] += _amount;
					 Transfer(_from, _to, _amount);
           return true;
       } else {
           return false;
       }
   }

   // Allow _spender to withdraw from your account, multiple times, up to the _value amount.
   // If this function is called again it overwrites the current allowance with _value.
   function approve(address _spender, uint256 _amount) returns (bool success) {
       allowed[msg.sender][_spender] = _amount;
			 Approval(msg.sender, _spender, _amount);
       return true;
   }

	// Returns the amount which _spender is still allowed to withdraw from _owner
	function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
	    return allowed[_owner][_spender];
	}

//////////////////////// END OF ERC20 SPECIFIC //////////////////////////////

	function setConversionRatio(uint ratio) restricted {
		wei2cc = ratio;
	}

	function getConversionRatio() constant returns (uint ratio) {
		ratio = wei2cc;
	}

	function getBalanceInWei(address addr) constant returns(uint256){
		return balanceOf(addr) * wei2cc;
	}

	function canBuy(uint256 cargoCoins) constant returns (bool can) {
		can = balances[owner] >= cargoCoins;
	}

	/// ETH (wei) => CC (microCC)
	function ether2cc() payable {
		// If no Ether has been sent we have nothing to do.
    if( msg.value < wei2cc || owner == msg.sender )
			revert();
		uint256 microCC = msg.value / wei2cc;
		if( balances[owner] < microCC )
			revert();
		balances[owner] -= microCC;
		balances[msg.sender] += microCC;
		Transfer(owner, msg.sender, microCC);
//		owner.transfer(msg.value);  /// do not hold ETH on contract, let buyer pays transfer gas
	}

	///  CC (microCC) => ETH (wei)
	function cc2ether(uint256 microCC) {
		if( microCC == 0 || balances[msg.sender] < microCC || msg.sender == owner )
			revert();
		uint256 weis = microCC * wei2cc;
		balances[msg.sender] -= microCC;
		balances[owner] += microCC;
		Transfer(msg.sender, owner, microCC);
		msg.sender.transfer(weis);
	}
}
