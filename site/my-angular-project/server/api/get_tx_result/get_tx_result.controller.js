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

var parse_receipt = function(data) {
  var receipt = {
    contractAddress: data.contractAddress,
    gasUsed: data.gasUsed
  };
  return receipt;
}

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
    var receipt = await makePromise2(web3.eth.getTransactionReceipt, [data]);
    if(receipt == null) {
      res.json({
        status: 'ERROR: transaction is not completed',
      });
      return;
    }
    var sData = JSON.stringify(receipt);
    if(sData.indexOf("blockNumber") < 0 || sData.indexOf("blockHash") < 0) {
      res.json({
        status: 'ERROR: transaction is not completed 2',
      });
      return;
    }
    res.json({
      status: 'OK',
      contractAddress: receipt.contractAddress,
      from: receipt.from,
      to: receipt.to,
      gasUsed: receipt.gasUsed
    });
  }
  catch(e) {
    console.log(e);
    res.json({
      status: 'ERROR: ' + e.toString()
    });
  };
};
