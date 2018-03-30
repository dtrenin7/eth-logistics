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

    function addOrder(  address _customer,
                        uint32[] _trackHashes,
                        address[] _trackAddresses,
                        uint[] _trackPrices,
                        address _ccAddress ) returns (uint ID) {
      ID = numOrders++;
      Order order = new Order(ID, _customer, _trackHashes, _trackAddresses, _trackPrices, _ccAddress);
      order.setOwner(_customer);
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

  }
