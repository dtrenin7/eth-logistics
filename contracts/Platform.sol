pragma solidity ^0.4.11;

import "./Owned.sol";
import "./ObozCarrier.sol";
import "./Partner.sol";
import "./Consigner.sol";
import "./Consignee.sol";
import "./Consignement.sol";
import "./Carrier.sol";
import "./Cargo.sol";
import "./Order.sol";
import "./Detail.sol";

/// @title Platform
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Platform is Owned {
    /// var app; var acc = web3.eth.accounts; Platform.deployed().then(function(i){app=i; return app.init(acc[0], acc[1], acc[2], acc[3], acc[4]);});web3.eth.defaultAccount = web3.eth.accounts[0];
    /// var car;ObozCarrier.deployed().then(function(i){car=i})
    /// web3.fromWei(web3.eth.getBalance(acc[0]), 'ether').toNumber()
    /// var bal; car.getBalance().then(function(i){bal=i}); web3.fromWei(bal, 'ether').toNumber()
    /// var cc; CargoCoin.deployed().then(function(i){cc=i})
    /// cc.buy({from:acc[3], to:cc.address, value: web3.toWei(2, "ether")})
    /// cc.sell(1, {from:acc[3]})
    /// web3.eth.defaultAccount = web3.eth.accounts[0];var x;app.addOboz();app.getOboz(0).then(function(i){x = web3.eth.contract(ObozCarrier.abi).at(i)})
    /// x.donate({from:acc[3], to:x.address, value: web3.toWei(4, "ether")})
    /// x.pay(web3.toWei(1, "ether"))
    /// var x;app.addConsigner('xxx', acc[7]);app.getConsigner(1).then(function(i){x = web3.eth.contract(Consigner.abi).at(i)})
    /// x.catchCoins({from:acc[3], to:x.address, value: web3.toWei(4, "ether")})
    /// @dev Рейс (Перевозка)

    mapping (uint => address) carriers;
    mapping (uint => address) consigners;
    mapping (uint => address) consignees;
    mapping (uint => address) consignements;
    mapping (uint => address) details;
    mapping (uint => address) orders;
    mapping (uint => address) cargos;
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
      Consigner consigner = new Consigner(ID, _name);
      consigner.setOwner(_account);
      consigners[ID] = consigner;
    }

    function getConsigner(uint ID) constant returns (address consigner) {
      assert(ID < numConsigners);
      consigner = consigners[ID];
    }

    function addConsignee(string _name, address _account) returns (uint ID) {
      ID = numConsignees++;
      Consignee consignee = new Consignee(ID, _name);
      consignee.setOwner(_account);
      consignees[ID] = consignee;
    }

    function getConsignee(uint ID) constant returns (address consignee) {
      assert(ID < numConsignees);
      consignee = consignees[ID];
    }

    function addCarrier(string _name, address _account) returns (uint ID) {
      ID = numCarriers++;
      Carrier carrier = new Carrier(ID, _name);
      carrier.setOwner(_account);
      carriers[ID] = carrier;
    }

    function getCarrier(uint ID) constant returns (address carrier) {
      assert(ID < numCarriers);
      carrier = carriers[ID];
    }

    function addCargo(string _name) returns (uint ID) {
      ID = numCargos++;
      Cargo cargo = new Cargo(ID, _name);
      cargo.setOwner(owner);
      cargos[ID] = cargo;
    }

    function getCargo(uint ID) constant returns (address cargo) {
      assert(ID < numCargos);
      cargo = cargos[ID];
    }

    function addDetail(uint _carrierID) returns (uint ID) {
      assert(_carrierID < numCarriers);
      ID = numDetails++;
      Detail detail = new Detail(ID, _carrierID);
      detail.setOwner(owner);
      details[ID] = detail;
    }

    function getDetail(uint ID) constant returns (address detail) {
      assert(ID < numDetails);
      detail = details[ID];
    }

    function addConsignement() returns (uint ID) {
      ID = numConsignements++;
      Consignement consignement = new Consignement(ID);
      consignements[ID] = consignement;
    }

    function getConsignement(uint ID) constant returns (address consignement) {
      assert(ID < numConsignements);
      consignement = consignements[ID];
    }

/*    function addConsignementDetail(uint ConsignementID, uint detailID) {
      assert(ConsignementID < numConsignements);
      uint ID = Consignements[ConsignementID].numDetailIDs++;
      Consignements[ConsignementID].detailIDs[ID] = detailID;
    } */

    function addOrder(uint _consignerID, uint _consigneeID, uint _cargoID) returns (uint ID) {
      ID = numOrders++;
      Order order = new Order(ID, _consignerID, _consigneeID, _cargoID);
      order.setOwner(owner);
      orders[ID] = order;
    }

    function getOrder(uint ID) constant returns (address order) {
      assert(ID < numOrders);
      order = orders[ID];
    }

/*    function addOrderConsignementDetail(uint _ConsignerID, uint _consigneeID, uint _cargoID, uint _carrierID)
      returns (uint ID, uint ConsignementID, uint detailID) {
        assert(_ConsignerID < numConsigners);
        assert(_consigneeID < numConsignees);
        assert(_cargoID < numCargos);
        assert(_carrierID < numCarriers);
        ID = addOrder(_ConsignerID, _consigneeID, _cargoID);
        ConsignementID = addConsignement();
        //addOrderConsignement(ID, ConsignementID);
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
          //addOrderConsignement(ID, ConsignementID);
          uint i = 0;
          while (i < _carrierIDs.length) {
            assert(_carrierIDs[i] < numCarriers);
            detailIDs[i] = addDetail(_carrierIDs[i]);
            addConsignementDetail(ConsignementID, detailIDs[i]);
            i++;
          }
        } */



/*    function explainConsignementState(ConsignementState state) constant returns (string desc) {
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
    } */

    function explainOrder(uint ID) returns (string consignerDesc,
      string consigneeDesc, string cargoDesc, string stateDesc) {
      assert(ID < numOrders);

      //Consigner consigner = getConsigner(orders[ID].ConsignerID);
      // consignerDesc = consigner.name; // YOU CAN'T GET VARIABLE SIZE DATA FROM ANOTHER CONTRACT (!!!)
      //consigneeDesc = consignees[orders[ID].consigneeID].name;
      //cargoDesc = getCargo(orders[ID].cargoID);
    //  stateDesc = explainOrderState(orders[ID].state);
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
      //addOrderConsignement(order, ship1);

//      uint det1 = addDetail(car1);
//      uint det2 = addDetail(car2);
//      addConsignementDetail(ship1, det1);
//      addConsignementDetail(ship1, det2);

//      ObozCarrier c = new ObozCarrier();
//      transfer(c.getAccount(), 50);

    }
  }
