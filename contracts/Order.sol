pragma solidity ^0.4.11;

import "./Owned.sol";

/// @title Заказ на перевозку
/// @author Dmitry Trenin (dtrenin7@gmail.com)
contract Order is Owned {
  enum State {
    Signed,
    Loaded,
    Unloaded,
    Delay,
    Processing,
    Done,
    Cancelled
  }

  uint ID;
  State state;
  uint consignerID;
  uint consigneeID;
  uint cargoID;
  uint numConsignementIDs;
  mapping (uint => uint) consignementIDs;
  string[] stateDescs;

  function Order(uint _ID, uint _consignerID, uint _consigneeID, uint _cargoID) Owned() {
    ID = _ID;
    consignerID = _consignerID;
    consigneeID = _consigneeID;
    cargoID = _cargoID;
    state = State.Signed;

    //stateDescs[uint(State.Signed)] = 'Состояние заказа: Подписан';
    //stateDescs[uint(State.Processing)] = 'Состояние заказа: Выполнение';
    //stateDescs[uint(State.Done)] = 'Состояние заказа: Доставка завершена';
    //stateDescs[uint(State.Cancelled)] = 'Состояние заказа: Отменен';
    //stateDescs[uint(State.Loaded)] = 'Состояние заказа: Загрузка завершена';
    //stateDescs[uint(State.Unloaded)] = 'Состояние заказа: Разгрузка завершена';

  }

  function addConsignement(uint consignementID) {
    uint consID = numConsignementIDs++;
    consignementIDs[consID] = consignementID;
  }

//  function stateDesc(Order.State state) constant returns (string desc) {
//    desc = stateDescs[uint(state)];
//  }
}
