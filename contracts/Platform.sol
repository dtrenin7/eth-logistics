pragma solidity ^0.4.11;

import "./Owned.sol";
import "./ObozCarrier.sol";
import "./Consigner.sol";

/// @title Platform
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Platform is Owned {

    /// @dev Грузополучатель
    struct Consignee {
      uint ID;
      string name;
      address account;
    }

    /// @dev Грузоперевозчик
    struct Carrier {
      uint ID;
      string name;
      address account;
    }

    enum DetailState {
      Loading,
      Driving,
      Unloading,
      Processing,
      Done
    }

    /// @dev Наряд
    struct Detail {
      uint ID;
      uint carrierID;
      DetailState state;
    }

    enum ConsignementState {
      New,
      NonConfirmed,
      Published,
      Confirmation,
      Assigned,
      Processing,
      Done
    }
    /// var app; var acc = web3.eth.accounts; Platform.deployed().then(function(i){app=i; return app.init(acc[0], acc[1], acc[2], acc[3], acc[4]);});
    /// var car;ObozCarrier.deployed().then(function(i){car=i})
    /// web3.fromWei(web3.eth.getBalance(acc[0]), 'ether').toNumber()
    /// var bal; car.getBalance().then(function(i){bal=i}); web3.fromWei(bal, 'ether').toNumber()
    /// var cc; CargoCoin.deployed().then(function(i){cc=i})
    /// cc.buy({from:acc[3], to:cc.address, value: web3.toWei(2, "ether")})
    /// cc.sell(1, {from:acc[3]})
    /// web3.eth.defaultAccount = web3.eth.accounts[0];var x;app.addOboz();app.getOboz(0).then(function(i){x = web3.eth.contract(ObozCarrier.abi).at(i)})
    /// x.donate({from:acc[3], to:x.address, value: web3.toWei(4, "ether")})
    /// x.pay(web3.toWei(1, "ether"))
    /// @dev Рейс (Перевозка)
    struct Consignement {
      uint ID;
      ConsignementState state;
      uint numDetailIDs;
      mapping (uint => uint) detailIDs;
    }

    enum OrderState {
      Preordered,
      New,
      Assigned,
      Processing,
      Done,
      Cancelled
    }

    /// @dev Груз
    struct Cargo {
      uint ID;
      string name;
    }

    /// @dev Заказ на грузоперевозку
    struct Order {
      uint ID;
      uint ConsignerID;
      uint consigneeID;
      OrderState state;
      uint cargoID;
      uint numConsignementIDs;
      mapping (uint => uint) ConsignementIDs;
    }

    mapping (uint => Carrier) carriers;
    mapping (uint => Consigner) consigners;
    mapping (uint => Consignee) consignees;
    mapping (uint => Detail) details;
    mapping (uint => Consignement) Consignements;
    mapping (uint => Order) orders;
    mapping (uint => Cargo) cargos;
    mapping (uint => ObozCarrier) obozs;
    uint public numConsigners;
    uint public numCarriers;
    uint public numConsignees;
    uint public numDetails;
    uint public numConsignements;
    uint public numOrders;
    uint public numCargos;
    uint public numObozs;

    function Platform() Owned() {

    }

    function addOboz() returns (uint ID) {
      ID = numObozs++;
      obozs[ID] = new ObozCarrier();
      obozs[ID].setOwner(owner);
    }

    function getOboz(uint ID) constant returns (ObozCarrier oboz) {
      assert(ID < numObozs);
      oboz = obozs[ID];
    }

    function addConsigner(string _name, address _account) returns (uint ID) {
      ID = numConsigners++;
      consigners[ID] = new Consigner(ID, _name);
      consigners[ID].setOwner(_account);
    }

    function getConsigner(uint ID) constant returns (Consigner consigner) {
      assert(ID < numConsigners);
      consigner = consigners[ID];
    }


    function addConsignee(string _name, address _account) returns (uint ID) {
      ID = numConsignees++;
      consignees[ID] = Consignee(ID, _name, _account);
    }

    function getConsignee(uint ID) constant returns (string _name, address _account) {
      assert(ID < numConsignees);
      _name = consignees[ID].name;
      _account = consignees[ID].account;
    }

    function addCarrier(string _name, address _account) returns (uint ID) {
      ID = numCarriers++;
      carriers[ID] = Carrier(ID, _name, _account);
    }

    function getCarrier(uint ID) constant returns (string _name, address _account) {
      assert(ID < numCarriers);
      _name = carriers[ID].name;
      _account = carriers[ID].account;
    }

    function getCarrierBalance(uint ID) constant returns (uint _balance) {
      assert(ID < numCarriers);
      _balance = carriers[ID].account.balance;
    }

    function transfer2Carrier(uint carrierID, uint amount) returns (bool) {
      assert(carrierID < numCarriers);
      address owner = this;
      if(owner.balance < amount)
        return false;
      carriers[carrierID].account.transfer(amount);
      return true;
    }

    function transfer(address to, uint amount) returns (bool) {
      address owner = this;
      if(owner.balance < amount)
        return false;
      to.transfer(amount);
      return true;
    }

    function addCargo(string _name) returns (uint ID) {
      ID = numCargos++;
      cargos[ID] = Cargo(ID, _name);
    }

    function getCargo(uint ID) constant returns (string _name) {
      assert(ID < numCargos);
      _name = cargos[ID].name;
    }

    function addDetail(uint _carrierID) returns (uint ID) {
      assert(_carrierID < numCarriers);
      ID = numDetails++;
      details[ID] = Detail(ID, _carrierID, DetailState.Loading);
    }

    function getDetail(uint ID) constant returns (uint _carrierID, DetailState _state) {
      assert(ID < numDetails);
      _carrierID = details[ID].carrierID;
      _state = details[ID].state;
    }

    function addConsignement() returns (uint ID) {
      ID = numConsignements++;
      Consignements[ID] = Consignement(ID, ConsignementState.New, 0);
    }

    function getConsignement(uint ID) constant returns (ConsignementState _state) {
      assert(ID < numConsignements);
      _state = Consignements[ID].state;
    }

    function addConsignementDetail(uint ConsignementID, uint detailID) {
      assert(ConsignementID < numConsignements);
      uint ID = Consignements[ConsignementID].numDetailIDs++;
      Consignements[ConsignementID].detailIDs[ID] = detailID;
    }

    function addOrder(uint _ConsignerID, uint _consigneeID, uint _cargoID) returns (uint ID) {
      ID = numOrders++;
      orders[ID] = Order(ID, _ConsignerID, _consigneeID, OrderState.Preordered, _cargoID, 0);
    }

    function addOrderConsignementDetail(uint _ConsignerID, uint _consigneeID, uint _cargoID, uint _carrierID)
      returns (uint ID, uint ConsignementID, uint detailID) {
        assert(_ConsignerID < numConsigners);
        assert(_consigneeID < numConsignees);
        assert(_cargoID < numCargos);
        assert(_carrierID < numCarriers);
        ID = addOrder(_ConsignerID, _consigneeID, _cargoID);
        ConsignementID = addConsignement();
        addOrderConsignement(ID, ConsignementID);
        detailID = addDetail(_carrierID);
        addConsignementDetail(ConsignementID, detailID);
      }

      function addOrderConsignementDetails(uint _ConsignerID, uint _consigneeID, uint _cargoID, uint[] _carrierIDs)
        returns (uint ID, uint ConsignementID, uint[] detailIDs) {
          assert(_ConsignerID < numConsigners);
          assert(_consigneeID < numConsignees);
          assert(_cargoID < numCargos);
          ID = addOrder(_ConsignerID, _consigneeID, _cargoID);
          ConsignementID = addConsignement();
          addOrderConsignement(ID, ConsignementID);
          uint i = 0;
          while (i < _carrierIDs.length) {
            assert(_carrierIDs[i] < numCarriers);
            detailIDs[i] = addDetail(_carrierIDs[i]);
            addConsignementDetail(ConsignementID, detailIDs[i]);
            i++;
          }
        }

    function getOrder(uint ID) constant returns (uint _ConsignerID, uint _consigneeID, OrderState _state, uint _cargoID) {
      assert(ID < numOrders);
      _ConsignerID = orders[ID].ConsignerID;
      _consigneeID = orders[ID].consigneeID;
      _state = orders[ID].state;
      _cargoID = orders[ID].cargoID;
    }

    function addOrderConsignement(uint orderID, uint ConsignementID) {
      assert(orderID < numOrders);
      uint ID = orders[orderID].numConsignementIDs++;
      orders[orderID].ConsignementIDs[ID] = ConsignementID;
    }

    function explainOrderState(OrderState state) constant returns (string desc) {
      if(state == OrderState.Preordered)
        desc = 'Состояние заказа: Предварительный';
      else if(state == OrderState.New)
        desc = 'Состояние заказа: Подтвержден диспетчером';
      else if(state == OrderState.Assigned)
        desc = 'Состояние заказа: Назначены перевозчики';
      else if(state == OrderState.Processing)
        desc = 'Состояние заказа: Выполнение';
      else if(state == OrderState.Done)
        desc = 'Состояние заказа: Выполнен';
      else if(state == OrderState.Cancelled)
        desc = 'Состояние заказа: Отменен';
      else
        desc = 'Состояние заказа: Неизвестно';
    }

    function explainConsignementState(ConsignementState state) constant returns (string desc) {
      if(state == ConsignementState.New)
        desc = "Состояние рейса: Новый";
      else if(state == ConsignementState.NonConfirmed)
        desc = "Состояние рейса: Не подтвержден";
      else if(state == ConsignementState.Published)
        desc = "Состояние рейса: Опубликован для перевозчиков";
      else if(state == ConsignementState.Confirmation)
        desc = "Состояние рейса: Ожидает подтверждения перевозчика";
      else if(state == ConsignementState.Assigned)
        desc = "Состояние рейса: Назначен";
      else if(state == ConsignementState.Processing)
        desc = "Состояние рейса: Выполнение";
      else if(state == ConsignementState.Done)
        desc = "Состояние рейса: Выполнен";
      else
        desc = "Состояние рейса: Неизвестно";
    }

    function explainOrder(uint ID) constant returns (string consignerDesc,
      string consigneeDesc, string cargoDesc, string stateDesc) {
      assert(ID < numOrders);

      consignerDesc = consigners[orders[ID].ConsignerID].name;
      consigneeDesc = consignees[orders[ID].consigneeID].name;
      cargoDesc = getCargo(orders[ID].cargoID);
      stateDesc = explainOrderState(orders[ID].state);
    }

    function init(address acc1, address acc2, address acc3, address acc4, address acc5) {
      uint cargo = addCargo('Груз1: Стратегические термоядерные боеголовки');

      uint Consigner = addConsigner('Грузоотправитель1: ОАО Рога и копыта', acc5);

      uint cons1 = addConsignee('Грузополучатель1: Иванов Иван Иванович', acc1);
//      uint cons2 = addConsignee('Грузополучатель2: Петров Петр Петрович', acc2);

      uint car1 = addCarrier('Грузоперевозчик1: Деловые линии', acc3);
      uint car2 = addCarrier('Грузоперевозчик2: ПЭК', acc4);

      uint order = addOrder(Consigner, cons1, cargo);
      uint ship1 = addConsignement();
      addOrderConsignement(order, ship1);

//      uint det1 = addDetail(car1);
//      uint det2 = addDetail(car2);
//      addConsignementDetail(ship1, det1);
//      addConsignementDetail(ship1, det2);

//      ObozCarrier c = new ObozCarrier();
//      transfer(c.getAccount(), 50);

    }
//    mapping (uint => Target) public targets;
//    uint public numTargets;
//    uint storedData;
//    address public god = msg.sender;

/*    function set(uint x) {
        storedData = x;
    }

    function get() constant returns (uint) {
        return storedData;
    }

    function getType(uint param) constant returns (Type) {
      if((param % 2) == 1)
        return Type.MultiSigner;
      return Type.SingleSigner;
    }

    /// @dev Adding a target
    /// @param addr Target address
    /// @param amount Money sent to target
    /// @return Terget id
    function addTarget(address addr, uint amount) returns (uint targetID) {
        targetID = numTargets++;
        targets[targetID] = Target(addr, amount);
    }

    function setTargetAmount(uint targetID, uint amount) {
      Target storage target = targets[targetID];
      target.amount = amount;
    }

    function rand(uint256 min, uint256 max) public returns (uint256 random) {
        uint256 lastBlockNumber = block.number - 1;
        random = (min + uint256(block.blockhash(lastBlockNumber))) % max;
    } */
  }
