pragma solidity ^0.4.11;

import "./Owned.sol";
//import "./Partner.sol";
//import "./Consigner.sol";
//import "./Consignee.sol";
//import "./Consignement.sol";
//import "./Carrier.sol";
//import "./Cargo.sol";
import "./Order.sol";
//import "./Detail.sol";

/// @title Platform
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Platform is Owned {
    /// @dev Рейс (Перевозка)

    uint public numOrders;
    mapping (uint => address) orders;

    function Platform() Owned() {

    }

    function addOrder(  address _consigner,
                        address _consignee,
                        address _cargoOwner,
                        uint32[] _trackHashes,
                        address[] _trackAddresses,
                        uint[] _trackPrices,
                        address _ccAddress ) returns (uint ID) {
      ID = numOrders++;
      Order order = new Order(ID, _consigner, _consignee, _cargoOwner,
        _trackHashes, _trackAddresses, _trackPrices, _ccAddress);
      order.setOwner(_consigner);
      orders[ID] = order;
    }

    function getOrder(uint ID) constant returns (address order) {
      assert(ID < numOrders);
      order = orders[ID];
    }


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

    /* function explainOrder(uint ID) returns (string consignerDesc,
      string consigneeDesc, string cargoDesc, string stateDesc) {
      assert(ID < numOrders);

      //Consigner consigner = getConsigner(orders[ID].ConsignerID);
      // consignerDesc = consigner.name; // YOU CAN'T GET VARIABLE SIZE DATA FROM ANOTHER CONTRACT (!!!)
      //consigneeDesc = consignees[orders[ID].consigneeID].name;
      //cargoDesc = getCargo(orders[ID].cargoID);
    //  stateDesc = explainOrderState(orders[ID].state);
    } */

    function init(address acc1, address acc2, address acc3, address acc4, address acc5) {
      uint32 hash = 829398489;
      /*uint cargo = addCargo('Груз1: Стратегические термоядерные боеголовки', hash);

      uint consigner = addPartner(acc1);
      setPartnerAttribute(consigner, 'name', 'Грузоотправитель1: ОАО Рога и копыта');
      setPartnerAttribute(consigner, 'address', 'Красная площадь, дом 23');

      uint consignee = addPartner(acc2);
      setPartnerAttribute(consignee, 'name', 'Грузополучатель1: Иванов Иван Иванович');

      uint carrier = addPartner(acc3);
      setPartnerAttribute(carrier, 'name', 'Грузоперевозчик1: Деловые линии'); */

      uint32[] memory trackHashes = new uint32[](14);
      trackHashes[0] = hash; // [0] pickup.location
      trackHashes[1] = hash; // [0] pickup.date
      trackHashes[2] = hash; // [0] dropdown.location
      trackHashes[3] = hash; // [0] dropdown.date
      trackHashes[4] = hash; // [0] assignment.date
      trackHashes[5] = hash; // [0] assignment.proof
      trackHashes[6] = hash; // [1] pickup.location
      trackHashes[7] = hash; // [1] pickup.date
      trackHashes[8] = hash; // [1] pickup.description
      trackHashes[9] = hash; // [1] dropdown.location
      trackHashes[10] = hash; // [1] dropdown.date
      trackHashes[11] = hash; // [1] dropdown.description
      trackHashes[12] = hash; // [1] assignment.date
      trackHashes[13] = hash; // [1] assignment.proof
      address[] memory trackAddress = new address[](6);
      trackAddress[0] = acc2; // [0] carrier
      trackAddress[1] = acc2; // [0] loader
      trackAddress[2] = acc2; // [0] unloader
      trackAddress[3] = acc3; // [1] carrier
      trackAddress[4] = acc3; // [1] loader
      trackAddress[5] = acc3; // [1] unloader
      uint[] memory trackPrices = new uint[](2);
      trackPrices[0] = 2000000000000000000; // [0] price in wei
      trackPrices[1] = 1000000000000000000; // [1] price in wei

      address consigner = acc1;
      address consignee = acc4;
      address cargoOwner = acc5;
      uint32 description = hash;
/*      uint orderID = addOrder(consigner, consignee, cargoOwner, trackHashes,

        trackAddress, trackPrices, 0x6661fd16e676a73b07dd873f6beadc2a7db7305a); // */
  //    Order order = Order(orders[orderID]);
//      order.addPosition(hash, hash);
//      order.addAssignment(acc4, acc5, hash, hash);

      /// var app; var acc = web3.eth.accounts; Platform.deployed().then(function(i){app=i;});web3.eth.defaultAccount = web3.eth.accounts[0];var cc; CargoCoin.deployed().then(function(i){cc=i;})
      /// var app; var acc = web3.eth.accounts; Platform.deployed().then(function(i){app=i; return app.init(acc[0], acc[1], acc[2], acc[3], acc[4]);});web3.eth.defaultAccount = web3.eth.accounts[0];
      /// var x;app.getOrder(0).then(function(i){x = web3.eth.contract(Order.abi).at(i)})
      /// var cc; CargoCoin.deployed().then(function(i){cc=i;})
      /// x.begin({from:acc[0], to:x.address, value: web3.toWei(3, "ether")}) // acc[0] => 3 ETH => Order
      /// web3.fromWei(web3.eth.getBalance(x.address), 'ether').toNumber() // get Order balance
      /// web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber() // get carrier [0] balance
      /// x.complete({from: acc[1]})  // loader [0]  done, New => Loaded
      /// x.complete({from: acc[1]})  // unloader [0] done, Loaded => Unloaded
      /// x.complete({from: acc[2]})  // loader [1]  done, New => Loaded
      /// web3.fromWei(web3.eth.getBalance(acc[1]), 'ether').toNumber() // get carrier [0] balance, must grow for 2 ETH
      /// web3.fromWei(web3.eth.getBalance(acc[2]), 'ether').toNumber() // get carrier [1] balance
      /// x.complete({from: acc[2]})  // unloader [1] done, Loaded => Unloaded
      /// x.complete({from: acc[3]})  // consigner done
      /// web3.fromWei(web3.eth.getBalance(acc[2]), 'ether').toNumber() // get carrier [1] balance, must grow for 1 ETH
/*
      uint cons1 = addConsignee('Грузополучатель1: Иванов Иван Иванович', acc1);
//      uint cons2 = addConsignee('Грузополучатель2: Петров Петр Петрович', acc2);

      uint car1 = addCarrier('Грузоперевозчик1: Деловые линии', acc3);
      uint car2 = addCarrier('Грузоперевозчик2: ПЭК', acc4);

      uint order = addOrder(Consigner, cons1, cargo);
      uint ship1 = addConsignement();
      //addOrderConsignement(order, ship1);
*/
//      uint det1 = addDetail(car1);
//      uint det2 = addDetail(car2);
//      addConsignementDetail(ship1, det1);
//      addConsignementDetail(ship1, det2);

//      transfer(c.getAccount(), 50);

    }
  }
