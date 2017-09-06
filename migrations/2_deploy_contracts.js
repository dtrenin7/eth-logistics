var ConvertLib = artifacts.require("./ConvertLib.sol");
var Owned = artifacts.require("./Owned.sol");
var CargoCoin = artifacts.require("./CargoCoin.sol");
var Platform = artifacts.require("./Platform.sol");
var ObozCarrier = artifacts.require("./ObozCarrier.sol");
var Partner = artifacts.require("./Partner.sol");
var Consigner = artifacts.require("./Consigner.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, CargoCoin);
  deployer.deploy(Owned);
  deployer.deploy(CargoCoin);
  deployer.deploy(ObozCarrier);
  deployer.deploy(Partner);
  deployer.deploy(Consigner);
  deployer.deploy(Platform);
};
