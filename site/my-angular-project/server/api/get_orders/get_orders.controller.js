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

var getTrip = async function(contract, trackIndex) {
  var contractTrack = await makePromise2(contract.getTrack, [trackIndex])
  var track = {
    index: trackIndex,
    state: contractTrack[0].toNumber(),
    carrier: contractTrack[1],
    price: contractTrack[2].toNumber(),
    pickup: {
      location: contractTrack[3].toNumber(),
      description: contractTrack[4].toNumber()
    },
    dropdown: {
      location: contractTrack[5].toNumber(),
      description: contractTrack[6].toNumber()
    },
    assignment: {
      date: contractTrack[7].toNumber(),
      proof: contractTrack[8].toNumber()
    }
  };
  //console.log(track);
  return track;
}

exports.index = async function(req, res) {
  var props = _.merge(req.body, req.params, req.query);
  var data = props['data'];
  //var data = "ew0KICAiY3VzdG9tZXIiOiB7DQogICAgImFjY291bnQiOiAiMHhjY2E3NWJlNmEyMGUyMjg4YTEzMDUxMTk3MzAyNzc4M2FkY2M0ZTUzIiwNCiAgICAicGFzc3dvcmQiOiAiIg0KICB9LA0KICAidHJpcHMiOiBbDQogICAgew0KICAgICAgImNhcnJpZXIiOiAiMHhjY2E3NWJlNmEyMGUyMjg4YTEzMDUxMTk3MzAyNzc4M2FkY2M0ZTUzIiwNCiAgICAgICJwcmljZSI6ICIxMDA1MDAiLA0KICAgICAgInBpY2t1cCI6IHsNCiAgICAgICAgImFkZHJlc3MiOiAi0JzQvtGB0LrQstCwIiwNCiAgICAgICAgImRhdGUiOiAiMTUyMjQyNjc5OTYxNCIsDQogICAgICAgICJjYXJnbyI6IHsNCiAgICAgICAgICAibmFtZSI6ICLQkNGA0LHRg9C30YsiLA0KICAgICAgICAgICJhbW91bnQiOiAxMCwNCiAgICAgICAgICAidW5pdHMiOiAi0LrQuNC70L7RgtC+0L3QvdGLIg0KICAgICAgICB9DQogICAgICB9LA0KICAgICAgImRyb3Bkb3duIjogew0KICAgICAgICAiYWRkcmVzcyI6ICLQo9GA0Y7Qv9C40L3RgdC6IiwNCiAgICAgICAgImRhdGUiOiAiMTUyMjQyNjc5OTYxNCIsDQogICAgICAgICJjYXJnbyI6IHsNCiAgICAgICAgICAibmFtZSI6ICLQmtC+0YDQutC4INC+0YIg0LDRgNCx0YPQt9C+0LIiLA0KICAgICAgICAgICJhbW91bnQiOiA1LA0KICAgICAgICAgICJ1bml0cyI6ICLQutC40LvQvtGC0L7QvdC90YsiDQogICAgICAgIH0NCiAgICAgIH0NCiAgICB9DQogIF0NCn0=";
  if(typeof(data) == 'undefined') {
    res.json({
      status: 'ERROR: data argument is undefined'
    });
    return;
  }

  try {
    var jsonData = base64.decode(data);
    var input = JSON.parse(jsonData);

    checkArguments(input, [["addresses", "object"]]);

    if(input.addresses.length == 0) {
      var platformJsonData = base64.decode(settings.platformJsonB64);
      var platformProto = JSON.parse(platformJsonData);
      var contract = await web3.eth.contract(platformProto);
      var platform = await contract.at(settings.platformAddress);
      var numOrders = await makePromise2(platform.numOrders, []);
      for(var i = 0; i < numOrders; i++) {
        input.addresses.push(await makePromise2(platform.getOrder, [i]));
      }
    }

   var response = { status: 'OK', orders: [] };
   var abi = base64.decode(settings.orderJsonb64);
   var orderProxy = web3.eth.contract(JSON.parse(abi));
   for(var i = 0; i < input.addresses.length; i++) {
     var contract = orderProxy.at(input.addresses[i]);
     var props = await makePromise2(contract.getOrder, []);
     var order = {
       state: props[0].toNumber(),
       address: input.addresses[i],
       customer: props[1],
       trips: [],
       price: props[2].toNumber(),
       activeTrip: props[4].toNumber()
     };
     var numTrips = props[3].toNumber();
     for(var j = 0; j < numTrips; j++) {
       order.trips.push(await getTrip(contract, j));
     };
     response.orders.push(order);
    }

    res.json(response);
  }
  catch(e) {
    console.log(e);
    res.json({
      status: 'ERROR: ' + e.toString()
    });
  };
};
