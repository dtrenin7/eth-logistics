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

var fromMicroCC = function(value) {
  return new Number(value) / 1000000;
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
   var ccJsonData = base64.decode(settings.ccJsonB64);
   var ccProto = JSON.parse(ccJsonData);
   var contract = await web3.eth.contract(ccProto);
   var cc = await contract.at(settings.cargoCoinAddress);

   var weis = await makePromise2(web3.eth.getBalance, [data]);
   var microCC = await makePromise2(cc.balanceOf, [data]);
   var ethers = web3.fromWei(weis);
   var cc = fromMicroCC(microCC);

    res.json({
      status: 'OK',
      ethers: ethers,
      weis: weis,
      cc: cc,
      microCC: microCC
    });
  }
  catch(e) {
    console.log(e);
    res.json({
      status: 'ERROR: ' + e.toString()
    });
  };
};
