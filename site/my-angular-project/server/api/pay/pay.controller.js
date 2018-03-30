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

exports.index = async function(req, res) {
  var props = _.merge(req.body, req.params, req.query);
  var data = props['data'];
  if(typeof(data) == 'undefined') {
    res.json({
      status: 'ERROR: data argument is undefined',
    });
    return;
  }

  try {
    var jsonData = base64.decode(data);
    var input = JSON.parse(jsonData);

    var keywords = [  ["sender", "string"],
                      ["password", "string"],
                      ["receiver", "string"],
                      ["ethers", "string"]];
   for(var i = 0; i < keywords.length; i++) {
     if(typeof(input[keywords[i][0]]) != keywords[i][1]) {
       throw "Wrong input data: type of '" + keywords[i][0] +
        "' is not a '" + keywords[i][1] + "'";
     }
   }

    await makePromise2(web3.personal.unlockAccount, [input.sender, input.password]);
    var transactionHash = await makePromise2(web3.eth.sendTransaction,
      [{from:input.sender, to:input.receiver, value:web3.toWei(input.ethers, 'ether'), gasLimit:210000, gasPrice:20000000000}])
    await makePromise2(web3.personal.lockAccount, [input.sender]);

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
