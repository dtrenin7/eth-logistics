pragma solidity ^0.4.11;

import "./Owned.sol";
//import "./Order.sol";

/// @title Platform
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Platform is Owned {
    /// @dev Рейс (Перевозка)

    uint public numOrders;
    mapping (uint => address) orders;

    function Platform() Owned() {

    }

    function addOrder(address order) {
      orders[numOrders++] = order;
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
