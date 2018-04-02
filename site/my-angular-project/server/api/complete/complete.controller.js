/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var express = require('express');
var async = require('async');
var Web3 = require('web3');
var makePromise2 = require('../deferred');
var Settings = require('../settings');
var settings = new Settings();
var Base64 = require('../base64');
var base64 = new Base64();

//var web3provider = typeof(web3) !== 'undefined' ? web3.currentProvider : new Web3.providers.HttpProvider(settings.web3provider);
var web3provider = new Web3.providers.HttpProvider(settings.web3provider);
var web3 = new Web3(web3provider);

var hashFnv32a = function(str, asString, seed) {
    /*jshint bitwise:false */
    var i, l,
        hval = (seed === undefined) ? 0x811c9dc5 : seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }
    if( asString ){
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
    }
    return hval >>> 0;
};

var getHash = function(value) {
  //var hash = $scope.web3.sha3(value);
  var hash = hashFnv32a(value, false);
  return hash;
};

var checkArguments = function(input, keywords) {
  for(var i = 0; i < keywords.length; i++) {
    if(typeof(input[keywords[i][0]]) != keywords[i][1]) {
      throw "Wrong input data: type of '" + keywords[i][0] +
       "' is not a '" + keywords[i][1] + "'";
    }
  }
}

exports.index = async function(req, res) {
  var props = _.merge(req.body, req.params, req.query);
  var data = props['data'];
  //var data = "ew0KICAiY3VzdG9tZXIiOiB7DQogICAgImFjY291bnQiOiAiMHhjY2E3NWJlNmEyMGUyMjg4YTEzMDUxMTk3MzAyNzc4M2FkY2M0ZTUzIiwNCiAgICAicGFzc3dvcmQiOiAiIg0KICB9LA0KICAib3JkZXIiOiAiMHhkNDNhZjYzZDA3NmZlY2M0MTliY2FjMmYzMmNkMWQwOGRmMDc4NGY0Ig0KfQ==";
  if(typeof(data) == 'undefined') {
    res.json({
      status: 'ERROR: data argument is undefined'
    });
    return;
  }

  try {
    var jsonData = base64.decode(data);
    var input = JSON.parse(jsonData);

    checkArguments(input, [["customer", "object"], ["order", "string"]]);
    checkArguments(input.customer, [["account", "string"], ["password", "string"]]);

    await makePromise2(web3.personal.unlockAccount, [input.customer.account, input.customer.password]);

    var abi = base64.decode(settings.orderJsonb64);
    var orderProxy = web3.eth.contract(JSON.parse(abi));
    var order = orderProxy.at(input.order);

    var transactionHash = await makePromise2(order.complete, [{from:input.customer.account, to:input.order, gasLimit:210000, gasPrice:20000000000}])

//    web3.personal.lockAccount(input.customer.account);

    res.json({
      status: 'OK',
      tx: transactionHash
    });
  }
  catch(e) {
    console.log(e);
    res.json({
      status: 'ERROR: ' + e.toString()
    });
  };
};
