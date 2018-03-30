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
    var newAccount = await makePromise2(web3.personal.newAccount, [data]);
    //var unlockAccount = await makePromise2(web3.eth.personal.unlockAccount, [newAccount, data]);
    //var lockAccount = await makePromise2(web3.eth.personal.lockAccount, [newAccount]);

    res.json({
      status: 'OK',
      //lock: lockAccount,
      //unlock: unlockAccount,
      account: newAccount
    });
  }
  catch(e) {
    console.log(e);
    res.json({
      status: 'ERROR: ' + e.toString()
    });
  };
};
