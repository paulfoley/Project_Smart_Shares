pragma solidity ^0.4.15;

contract Share {

    address owner;
    uint public totalSupply;

    mapping (address => uint) public balances;

    event Transfer(address indexed _to, address indexed _from, uint _amount);
    event NewShares(address _to, uint _amount, uint _newSupply);

    modifier isOwner() {
        if (msg.sender != owner) {
            revert();
        }
        else {
           _;
        }
    }

    function Share(uint _supply) {
        owner = msg.sender;
        totalSupply = _supply;
        balances[owner] += _supply;
    }

    function getBalance(address _addr) constant returns (uint) {
        return balances[_addr];
    }

    function transfer(address _to, uint _amount) returns (bool) {
        var from = msg.sender;
        if (balances[from] < _amount) revert();
        balances[from] -= _amount;
        balances[_to] += _amount;
        Transfer(_to, from, _amount);
        return true;
    }

    function create(address _to, uint _amount) isOwner returns (bool) {
        totalSupply += _amount;
        balances[_to] += _amount;
        NewShares(_to, _amount, totalSupply);
        return true;
    }

    function disable() isOwner {
        selfdestruct(owner);
    }
}
