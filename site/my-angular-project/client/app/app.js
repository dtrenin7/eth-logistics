'use strict';

// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // If the value is negative...
    if (value < 0) {
      return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();


var app = angular.module('dashboardApp', [
  'ngCookies',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  'ngMaterial',
  //'angular-ui-bootstrap',
  'ui.router',
  'ui.bootstrap',
  'xeditable',
  'monospaced.qrcode'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }); //*/

  app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });

/*    app.controller('indexController', function($scope, web3Service) {

    var init = () => {
        web3Service.getAccounts().then(function (accs) {
            $scope.accounts = accs;
        }, function(err) {
            console.log(err);
        });

    };

    angular.element(document).ready(function () {
        init();
        console.log(accs);
    });
  }); */

    app.controller('MainCtrl',
    //['$scope',
    function($scope, $mdDialog, $interval) {
      $scope.testValue = 0;
      $interval(function() {
        $scope.testValue++;
        //$scope.detectAccountChange();
      }, 500); // angular forms update enforced */
      // rip the bullshit


      $scope.ccJsonB64 = "W3siY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJuYW1lIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJzdHJpbmcifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50IjpmYWxzZSwiaW5wdXRzIjpbeyJuYW1lIjoiX3NwZW5kZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9hbW91bnQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImFwcHJvdmUiLCJvdXRwdXRzIjpbeyJuYW1lIjoic3VjY2VzcyIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il9vd25lciIsInR5cGUiOiJhZGRyZXNzIn1dLCJuYW1lIjoic2V0T3duZXIiLCJvdXRwdXRzIjpbXSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJ0b3RhbFN1cHBseSIsIm91dHB1dHMiOlt7Im5hbWUiOiJ0b3RhbFN1cHBseSIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6Il9hZGRyZXNzIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il9mcm9tIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfdG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9hbW91bnQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6InRyYW5zZmVyRnJvbSIsIm91dHB1dHMiOlt7Im5hbWUiOiJzdWNjZXNzIiwidHlwZSI6ImJvb2wifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZGVjaW1hbHMiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQ4In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbeyJuYW1lIjoibWljcm9DQyIsInR5cGUiOiJ1aW50MjU2In1dLCJuYW1lIjoiY2FuQnV5Iiwib3V0cHV0cyI6W3sibmFtZSI6ImNhbiIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6InJhdGlvIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJzZXRDb252ZXJzaW9uUmF0aW8iLCJvdXRwdXRzIjpbXSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOlt7Im5hbWUiOiJfdG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9hbW91bnQiLCJ0eXBlIjoidWludDI1NiJ9LHsibmFtZSI6InBlcmNlbnRzIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJ0cmFuc2ZlcldpdGhGZWUiLCJvdXRwdXRzIjpbeyJuYW1lIjoic3VjY2VzcyIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Im1pY3JvQ0MiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImNjMmV0aGVyIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0T3duZXJCYWxhbmNlIiwib3V0cHV0cyI6W3sibmFtZSI6Il9iYWxhbmNlIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0Q29udmVyc2lvblJhdGlvIiwib3V0cHV0cyI6W3sibmFtZSI6InJhdGlvIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJhZGRyIiwidHlwZSI6ImFkZHJlc3MifV0sIm5hbWUiOiJnZXRCYWxhbmNlSW5XZWkiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwibmFtZSI6ImJhbGFuY2VPZiIsIm91dHB1dHMiOlt7Im5hbWUiOiJiYWxhbmNlIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0T3duZXIiLCJvdXRwdXRzIjpbeyJuYW1lIjoiX293bmVyIiwidHlwZSI6ImFkZHJlc3MifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoic3ltYm9sIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJzdHJpbmcifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJhIiwidHlwZSI6InVpbnQyNTYifSx7Im5hbWUiOiJiIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJkaXYiLCJvdXRwdXRzIjpbeyJuYW1lIjoicSIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il90byIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX2Ftb3VudCIsInR5cGUiOiJ1aW50MjU2In1dLCJuYW1lIjoidHJhbnNmZXIiLCJvdXRwdXRzIjpbeyJuYW1lIjoic3VjY2VzcyIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbeyJuYW1lIjoiX293bmVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfc3BlbmRlciIsInR5cGUiOiJhZGRyZXNzIn1dLCJuYW1lIjoiYWxsb3dhbmNlIiwib3V0cHV0cyI6W3sibmFtZSI6InJlbWFpbmluZyIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W10sIm5hbWUiOiJldGhlcjJjYyIsIm91dHB1dHMiOltdLCJwYXlhYmxlIjp0cnVlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiY29uc3RydWN0b3IifSx7ImFub255bW91cyI6ZmFsc2UsImlucHV0cyI6W3siaW5kZXhlZCI6dHJ1ZSwibmFtZSI6Il9mcm9tIiwidHlwZSI6ImFkZHJlc3MifSx7ImluZGV4ZWQiOnRydWUsIm5hbWUiOiJfdG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW5kZXhlZCI6ZmFsc2UsIm5hbWUiOiJfdmFsdWUiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6IlRyYW5zZmVyIiwidHlwZSI6ImV2ZW50In0seyJhbm9ueW1vdXMiOmZhbHNlLCJpbnB1dHMiOlt7ImluZGV4ZWQiOnRydWUsIm5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW5kZXhlZCI6dHJ1ZSwibmFtZSI6Il9zcGVuZGVyIiwidHlwZSI6ImFkZHJlc3MifSx7ImluZGV4ZWQiOmZhbHNlLCJuYW1lIjoiX3ZhbHVlIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJBcHByb3ZhbCIsInR5cGUiOiJldmVudCJ9XQ==";
      $scope.platformJsonb64 = "W3siY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOlt7Im5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwibmFtZSI6InNldE93bmVyIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoibnVtT3JkZXJzIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImdldE93bmVyQmFsYW5jZSIsIm91dHB1dHMiOlt7Im5hbWUiOiJfYmFsYW5jZSIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il9jb25zaWduZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9jb25zaWduZWUiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9jYXJnb093bmVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfc2VhbCIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX3RyYWNrSGFzaGVzIiwidHlwZSI6InVpbnQzMltdIn0seyJuYW1lIjoiX3RyYWNrQWRkcmVzc2VzIiwidHlwZSI6ImFkZHJlc3NbXSJ9LHsibmFtZSI6Il90cmFja1ByaWNlcyIsInR5cGUiOiJ1aW50MjU2W10ifSx7Im5hbWUiOiJfY2NBZGRyZXNzIiwidHlwZSI6ImFkZHJlc3MifV0sIm5hbWUiOiJhZGRPcmRlciIsIm91dHB1dHMiOlt7Im5hbWUiOiJJRCIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImdldE93bmVyIiwib3V0cHV0cyI6W3sibmFtZSI6Il9vd25lciIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbeyJuYW1lIjoiSUQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImdldE9yZGVyIiwib3V0cHV0cyI6W3sibmFtZSI6Im9yZGVyIiwidHlwZSI6ImFkZHJlc3MifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiY29uc3RydWN0b3IifV0=";
      $scope.orderJsonb64 = "W3siY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOlt7Im5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwibmFtZSI6InNldE93bmVyIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50IjpmYWxzZSwiaW5wdXRzIjpbXSwibmFtZSI6ImJlZ2luIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJ1aW50OCJ9XSwicGF5YWJsZSI6dHJ1ZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6Im51bVRyYWNrcyIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDI1NiJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJzZWFsIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImNvbnNpZ25lZSIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOltdLCJuYW1lIjoiY29tcGxldGUiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQ4In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImNvbnNpZ25lciIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W3sibmFtZSI6InRyYWNrSUQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImdldFRyYWNrIiwib3V0cHV0cyI6W3sibmFtZSI6Il9zdGF0ZSIsInR5cGUiOiJ1aW50OCJ9LHsibmFtZSI6Il9jYXJyaWVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfbG9hZGVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfdW5sb2FkZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9wcmljZSIsInR5cGUiOiJ1aW50MjU2In0seyJuYW1lIjoiX3BpY2t1cCIsInR5cGUiOiJ1aW50MzIifSx7Im5hbWUiOiJfcGlja3VwRGVzY3IiLCJ0eXBlIjoidWludDMyIn0seyJuYW1lIjoiX2Ryb3Bkb3duIiwidHlwZSI6InVpbnQzMiJ9LHsibmFtZSI6Il9kcm9wZG93bkRlc2NyIiwidHlwZSI6InVpbnQzMiJ9LHsibmFtZSI6Il9hc3NpZ25tZW50RGF0ZSIsInR5cGUiOiJ1aW50MzIifSx7Im5hbWUiOiJfYXNzaWdubWVudFByb29mIiwidHlwZSI6InVpbnQzMiJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJkZXNjcmlwdGlvbiIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDMyIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImNhcmdvT3duZXIiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6ImFkZHJlc3MifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50IjpmYWxzZSwiaW5wdXRzIjpbXSwibmFtZSI6ImNvbXBsZXRlMiIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDgifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50IjpmYWxzZSwiaW5wdXRzIjpbXSwibmFtZSI6ImJyb2tlIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoicHJpY2UiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiYWN0aXZlVHJhY2tJRCIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDI1NiJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJJRCIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDI1NiJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJzdGF0ZSIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDgifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0T3JkZXIiLCJvdXRwdXRzIjpbeyJuYW1lIjoiX3N0YXRlIiwidHlwZSI6InVpbnQ4In0seyJuYW1lIjoiX2NvbnNpZ25lZSIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX2NvbnNpZ25lciIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX2NhcmdvT3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9zZWFsIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfcHJpY2UiLCJ0eXBlIjoidWludDI1NiJ9LHsibmFtZSI6Il9udW1UcmFja3MiLCJ0eXBlIjoidWludDI1NiJ9LHsibmFtZSI6Il9hY3RpdmVUcmFjayIsInR5cGUiOiJ1aW50MjU2In0seyJuYW1lIjoiX2Rlc2NyIiwidHlwZSI6InVpbnQzMiJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiaW5wdXRzIjpbeyJuYW1lIjoiX0lEIiwidHlwZSI6InVpbnQyNTYifSx7Im5hbWUiOiJfY29uc2lnbmVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfY29uc2lnbmVlIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfY2FyZ29Pd25lciIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX3NlYWwiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il90cmFja0hhc2hlcyIsInR5cGUiOiJ1aW50MzJbXSJ9LHsibmFtZSI6Il90cmFja0FkZHJlc3NlcyIsInR5cGUiOiJhZGRyZXNzW10ifSx7Im5hbWUiOiJfdHJhY2tQcmljZXMiLCJ0eXBlIjoidWludDI1NltdIn0seyJuYW1lIjoiX2NjQWRkcmVzcyIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImNvbnN0cnVjdG9yIn1d";

      // backwards compatibility from mozilla developers team. required to create await/async compatible promise from callback handler
      function Deferred() {
      	// update 062115 for typeof
      	if (typeof(Promise) != 'undefined' && Promise.defer) {
      		//need import of Promise.jsm for example: Cu.import('resource:/gree/modules/Promise.jsm');
      		return Promise.defer();
      	} else if (typeof(PromiseUtils) != 'undefined'  && PromiseUtils.defer) {
      		//need import of PromiseUtils.jsm for example: Cu.import('resource:/gree/modules/PromiseUtils.jsm');
      		return PromiseUtils.defer();
      	} else {
      		/* A method to resolve the associated Promise with the value passed.
      		 * If the promise is already settled it does nothing.
      		 *
      		 * @param {anything} value : This value is used to resolve the promise
      		 * If the value is a Promise then the associated promise assumes the state
      		 * of Promise passed as value.
      		 */
      		this.resolve = null;

      		/* A method to reject the assocaited Promise with the value passed.
      		 * If the promise is already settled it does nothing.
      		 *
      		 * @param {anything} reason: The reason for the rejection of the Promise.
      		 * Generally its an Error object. If however a Promise is passed, then the Promise
      		 * itself will be the reason for rejection no matter the state of the Promise.
      		 */
      		this.reject = null;

      		/* A newly created Pomise object.
      		 * Initially in pending state.
      		 */
      		this.promise = new Promise(function(resolve, reject) {
      			this.resolve = resolve;
      			this.reject = reject;
      		}.bind(this));
      		Object.freeze(this);
      	}
      }
      $scope.parse_receipt = function(data) {
        var receipt = {
          contract: data.contractAddress,
          gas: data.gasUsed
        };
        return receipt;
      }

      $scope.wait_blocks = function(transactionHashes, needContractAddress) {
        var tries = 1;
        var mustStop = false;
        var receipts = [], receiptsCount = 0;
        //console.log("wait_blocks " + transactionHashes.length);
        while (tries) {
          //tries--; // wait infinite
          for(var i = 0; i < transactionHashes.length; i++) {
            if(receipts[i] != undefined && receipts[i].done == true ) {
              continue;
            }
            //console.log('TX: ' + transactionHashes[i]);
            var data = $scope.web3.eth.getTransactionReceipt(transactionHashes[i]);
            if(data == null) {
              continue;
            }
            var sData = JSON.stringify(data);
            if( sData.indexOf("blockNumber") >= 0 && sData.indexOf("blockHash") >= 0) {
              receipts[i] = $scope.parse_receipt(data);
              if( needContractAddress && receipts[i].contractAddress == null) {
                mustStop = false;
              }
              else {
                receipts[i].done = true;
                receiptsCount++;
                if(receiptsCount == transactionHashes.length) {
                  mustStop = true;
                }
              }
            }
          }
          if(mustStop == true) {
            break;
          }
          $scope.sleep(1000);
        }
        //sleep(1000);
        return receipts;
      }
      ///////////////////////////// wait_block

      $scope.payRaw = function(sender, receiver, ethers) {
        var transactionHash = $scope.web3.eth.sendTransaction({from:sender, to:receiver, value:$scope.web3.toWei(ethers, 'ether'), gasLimit:210000, gasPrice:20000000000})
        return transactionHash;
      }
      ///////////////////////////// pay

      $scope.accordionIsOpen = true;

        $scope.detectAccountChange = function() {
          if( typeof(web3) != 'undefined' &&
              typeof(web3.currentProvider) != 'undefined' &&
              typeof($scope.web3) != 'undefined' &&
              web3.currentProvider.isMetaMask == true ) {
              var newWeb3 = new Web3(web3.currentProvider);
              if( newWeb3.eth.accounts[0] != $scope.web3.eth.accounts[0] ) {
                $scope.web3 = newWeb3;
                console.log("ACCOUNT CHANGED TO: " + newWeb3.eth.accounts[0]);
              }
          }
        }

        $scope.settings = {
//          platformAddress: '0x71a7b75fab488d7ca203dc9a02b37a48a93d711d',
          //cargoCoinAddress: '0x4d265b328510d944563b844a9a1eed1e7968bda7',
          //orderAddress: '0xfe26cc1de5797cafa7e412a44bef63c38e9e17e7',
          platformAddress: '0xc5f0e6c5296d3295d359630542a315d97635f5e7',
          cargoCoinAddress: '0x6661fd16e676a73b07dd873f6beadc2a7db7305a',
          //orderAddress: '0x37a1e48db18305e26d1d779a01597ae0841447e8',
          httpProvider: "http://127.0.0.1:8546",//"http://192.168.6.22:8546",
          timeoutExchange: 4000,
          timeountTransact: 3000,
          intervalAwaitTx: 200,
          timeoutTrackStateChange: 5000,
          timeoutAwaitTx: 600000,
          timeoutAddOrder: 600000,
          timeoutApprove: 600000,
          timeoutBegin: 600000,
          gas: {
            approve: 70000,
            begin: 70000,
            cc2ether: 70000,
            addOrder: 3000000
          }
        };

        $scope.platformJson = atob($scope.platformJsonb64);
        $scope.orderJson = atob($scope.orderJsonb64);
        $scope.ccJson = atob($scope.ccJsonB64);
        $scope.platformProto = JSON.parse($scope.platformJson);
        $scope.orderProto = JSON.parse($scope.orderJson);
        $scope.ccProto = JSON.parse($scope.ccJson);
        // get the ABI from JSON files

        $scope.web3provider = typeof(web3) !== 'undefined' ? web3.currentProvider : new Web3.providers.HttpProvider($scope.settings.httpProvider);
        //$scope.web3provider = new Web3.providers.HttpProvider($scope.settings.httpProvider);
        console.log($scope.web3provider);
        $scope.web3 = new Web3($scope.web3provider);
        console.log($scope.web3.eth);
        // initialize access to network

        this.accs = $scope.web3.eth.accounts;
        console.log(this.accs);

        $scope.web3.eth.defaultAccount = $scope.web3.eth.accounts[0];
        // FUCKIN BLACK MAGIC (VOODOO!)

        $scope.getPlatformCallback = function(error, result) {
          if(!error) {
            //console.log("PLATFORM:");
            $scope.platform = result;
            //console.log($scope.platform);
          }
          else {
            console.error(error);
          }
        }
        $scope.web3.eth.contract($scope.platformProto).at($scope.settings.platformAddress, $scope.getPlatformCallback);
        //console.log("<< WOO 1 >>");
        //console.log(JSON.stringify($scope.platform));
        // get platform contract

        $scope.transactions = [];
        $scope.getCargoCoinCallback = function(error, result) {
          if(!error) {
            //console.log("CARGO COIN:");
            $scope.cc = result;
            $scope.eventTransfer = $scope.cc.Transfer({fromBlock: 0, toBlock: 'latest'});
            $scope.eventTransfer.watch(function(error, result) {
              if(error) {
                //console.log("TRANSFER ERROR: " + error);
              }
              else {
                $scope.transactions.push(result.transactionHash);
                // заполняем список выполненных транзакций по платежам CC
                //console.log("TRANSFER: ");console.log($scope.transactions);
              }
            });
            //console.log($scope.cc);
          }
          else {
            console.error(error);
          }
        }
        $scope.cc = $scope.web3.eth.contract($scope.ccProto).at($scope.settings.cargoCoinAddress, $scope.getCargoCoinCallback);
        //console.log("<< WOO 2 >>");
        //console.log(JSON.stringify($scope.cc));
        // get cargo coins contract


/*        var numTracks = $scope.order.numTracks().toNumber();
        console.log(numTracks);
        for( var i = 0; i < numTracks; i++) {
          var track = $scope.order.getTrack(i);
          var trackDesc = { state: track[0].toNumber(),
                            carrier: track[1],
                            loader: track[2],
                            unloader: track[3],
                            price: track[4].toNumber() };
          console.log(JSON.stringify(trackDesc));
        };
        // enumerate all order's tracks */

        $scope.selectedAccount = ''; // register order tab

        $scope.explainOrderState = function(order) {
          if( typeof(order) == 'undefined' ) {
            return "Не известно";
          }
          var descs = ["Новый", "Оплачен", "Отправлен", "Выполнен", "Отменен", "Пломба нарушена"];
          if(order.state < descs.length) {
            return descs[order.state];
          }
          return "Не известно";
        }

        $scope.explainTrackState = function(track) {
          var descs = ["Новое", "Загрузка завершена", "Разгрузка завершена", "Задержка доставки"];
          if(track.state < descs.length) {
            return descs[track.state];
          }
          return "Не известно";
        }

        $scope.orderIndex = 0; // order index to display tracks
        $scope.selectOrder = function(index) {
          console.log('ORDER INDEX: ' + index);
          $scope.orderIndex = index;
        };

        $scope.getTrack = async function(contract, trackIndex) {
          var contractTrack = await $scope.makePromise2(contract.getTrack, [trackIndex])
          var track = {
            index: trackIndex,
            state: contractTrack[0].toNumber(),
            carrier: contractTrack[1],
            loader: contractTrack[2],
            unloader: contractTrack[3],
            price: contractTrack[4].toNumber(),
//            price: $scope.web3.fromWei(contractTrack[4].toNumber(), 'ether'),
            pickup: {
              address: contractTrack[5].toNumber(),
              description: contractTrack[6].toNumber()
            },
            dropdown: {
              address: contractTrack[7].toNumber(),
              description: contractTrack[8].toNumber()
            },
            assignment: {
              date: contractTrack[9].toNumber(),
              proof: contractTrack[10].toNumber()
            }
          };
          //console.log(track);
          return track;
        }

        $scope.orders = [];
        $scope.orderTracks = [];
        var orders = []; // не будем обновлять список динамически, ждем полной загрузки
        var orderTracks = [];

        $scope.readOrders = async function () {
          $scope.progressStatusEnabled = true;
          var handleError = function(e){ console.log(e); };
          orders = [];
          orderTracks = [];
          $scope.orders = [];
          $scope.orderTracks = [];
          //console.log(">>> platform.numOrders");
          var numOrders = (await $scope.makePromise2($scope.platform.numOrders, [])).toNumber();
          //console.log("numOrders " + numOrders);
          for(var i = 0; i < numOrders; i++) {
            //console.log(">>> platform.getOrder(" + i + ")");
            var _address = await $scope.makePromise2($scope.platform.getOrder, [i]);
            if( $scope.preselectedOrder == _address ) {
              $scope.orderIndex = i;
            }
            //console.log(_address);
            var contract = $scope.web3.eth.contract($scope.orderProto).at(_address);
            //console.log(contract);
            //console.log(">>> contract.getOrder");
            var props = await $scope.makePromise2(contract.getOrder, []);
            var order = {
              index: i,
              state: props[0].toNumber(),
              address: _address,
              consignee: props[1],
              consigner: props[2],
              cargoOwner: props[3],
              seal: props[4],
              tracks: [],
              price: props[5].toNumber(),
              activeTrack: props[7].toNumber()
            };
            //order.qr = $scope.createQRCode(order);
            //console.log("ORDER: ");console.log(order);

            var numTracks = props[6].toNumber();
            for(var j = 0; j < numTracks; j++) {
              order.tracks[j] = await $scope.getTrack(contract, j);
              orderTracks.push({
                order: order,
                track: order.tracks[j]
              });
            };
            //console.log('TRACKS: ' + numTracks);
            orders[i] = order;
            //await $scope.getOrderBalance($scope.orders[$scope.orderIndex])
          } // for
          if( orders.length > 0 ) {
            $scope.orderIndex = orders.length - 1; // последний скорее всего актуальный
          }
          $scope.orders = orders;
          $scope.orderTracks = orderTracks;
          $scope.orderChanged($scope.orderIndex);
          $scope.progressStatusEnabled = false;
        };

        $scope.getApproveButtonText = function(order, track) {
          if( typeof(order) == 'undefined' ) {
            return;
          }
          switch(track.state) {
            case 0: // New
              return 'Подтвердить загрузку';

            case 1: // Loaded
              return 'Подтвердить разгрузку';

            case 2: // Unloaded
              if( track.index == (order.tracks.length - 1) ) {
                return 'Подтвердить получение';
              }
          };
          return '';
        };


        $scope.getTrackApprover = function(order, track) {
            var approver = track.carrier;
            switch(track.state) {
              case 0: // New
                break;

              case 1: // Loaded
                break;

              case 2: // Unloaded
                if( track.index == (order.tracks.length - 1) ) {
                  approver = order.consignee;
                }
                break;
            };
            return approver;
          };

          $scope.updateChanges = async function(contract, order, track, handleError) {
            var trackChanged = false;
            var lastActiveTrack = order.activeTrack;
            order.activeTrack = (await $scope.makePromise2(contract.activeTrackID, [])).toNumber();
            if( lastActiveTrack != order.activeTrack ) {
              trackChanged = true;
            }
            order.state = (await $scope.makePromise2(contract.state, [])).toNumber();
            track.state = (await $scope.getTrack(contract, track.index)).state;
            console.log("ORDER STATE: " + $scope.explainOrderState(order) + " TRACK STATE: " + $scope.explainTrackState(track));
            // update track state in UI

            console.log("APPROVE TRACK[" +track.index+ "]=" + track.state + " changed=" + trackChanged);
            if( order.activeTrack > 0 && trackChanged == false && track.state == 1) {
              var lastTrack = await $scope.getTrack(contract, track.index-1);
              $scope.addOperation(1, order.address, lastTrack.pickup.address, lastTrack.dropdown.address, lastTrack.carrier, lastTrack.price);
            }

            else if( order.state == 2 && trackChanged == false && order.activeTrack == order.tracks.length ) {
              $scope.addOperation(1, order.address, track.pickup.address, track.dropdown.address, track.carrier, track.price);
              $scope.addOperation(2, order.address, order.tracks[0].pickup.address, order.tracks[order.tracks.length-1].dropdown.address, order.consignee, 0);
            }

            await $scope.orderChanged(order.index);
            // update order state in UI
          }

          // ждем изменения статуса задачи, чтобы понять что транзакция подтверждения завершена и баланс изменился
          $scope.waitForTrackStateChange = async function(contract, track, milliseconds) {
            var lastState = track.state;
            var timeout = new Promise(function(resolve, reject) {
                setTimeout(resolve, milliseconds, false);
            });
            var timer = null;
            var txDone = new Promise(function(resolve, reject) {
                timer = setInterval(async function() {
                  var newTrack = await $scope.getTrack(contract, track.index);
                  if( lastState != newTrack.state ) {
                    track.state = newTrack.state;
                    resolve(true);
                    clearInterval(timer);
                    timer = null;
                  }
                }, $scope.settings.intervalAwaitTx);
            });

            var isDone = await Promise.race([timeout, txDone]);
            if( timer != null ) {
              clearInterval(timer);
            }
            if( isDone == false ) {
              console.log("waitForTrackStateChange() TIMEOUT" );
              // time is out
            }
            return isDone;
          }

          // подтверждение задачи
          $scope.approve = async function(order, track) {
            console.log("APPROVE:");console.log(order);console.log(track);
            $scope.progressStatusEnabled = true;
            var approver = $scope.getTrackApprover(order, track);
            console.log("APPROVER: " + approver);
            var handleError = function(e) {
              console.log(e);
              $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + approver);
              $scope.progressStatusEnabled = false;
            };
            try {
              var _address = await $scope.makePromise2($scope.platform.getOrder, [order.index]);
              console.log("ADDRESS: " + _address);
              var contract = $scope.web3.eth.contract($scope.orderProto).at(_address);
              console.log("CONTRACT: ");console.log(contract);
              var receipt = await $scope.transact(contract.complete, [{from: approver, to:_address, gas:500000}], $scope.settings.timeoutAwaitTx);
              console.log("RECEIPT:");console.log(receipt);
              await $scope.waitForTrackStateChange(contract, track, $scope.settings.timeoutTrackStateChange);
              await (new Promise(function(resolve, reject) {
                setTimeout(async function(){
                  await $scope.updateChanges(contract, order, track, handleError);
                  resolve();
                }, 1000);
              }));
              // даем еще 1 секунду после обновления состояния задания на всякий случай
            }
            catch (e) {
               handleError(e);
               return;
            }
            $scope.progressStatusEnabled = false;
          };

        $scope.operations = [];
        $scope.addOperation = function(_type, _order, _from, _to, _who, _amount) {
          $scope.operations.push({
              type: _type,
              order: _order,
              from: _from,
              to: _to,
              who: _who,
              what: 'Груз',
              amount: $scope.fromMicroCC(_amount) + " CC",
              date: new Date(Date.now()).toString()
          });
        }
        $scope.getOpDescr = function(opType) {
          var opDescrs = ['Создание и оплата заказа', 'Перевозка груза', 'Заказ выполнен'];
          return opDescrs[opType];
        }
        // operations logging

        $scope.showConfirmation = function(title, text) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title(title)
              .textContent(text)
              .ariaLabel('Alert Dialog Demo')
              .ok('OK')
          );
        };

        $scope.answer = function(answer) {
          console.log("HIDE");
          console.log($scope.orders);
          $mdDialog.hide(answer);
        };
        // обработчик выхода из диалога

        $scope.sleep = function(millis) {
          var date = new Date();
          var curDate = null;
          do { curDate = new Date(); }
          while(curDate-date < millis);
        }

        function DialogController($scope, $mdDialog, order, track, parentScope) {
          $scope.order = order;
          $scope.track = track;
          $scope.parentScope = parentScope;

          $scope.hide = function() {
            $mdDialog.hide();
          };

          $scope.cancel = function() {
            $mdDialog.cancel();
          };

          $scope.answer = function(answer) {
            console.log("HIDE");
            console.log($scope.contragents);
            $mdDialog.hide(answer);
          };
        }

        $scope.contragents = [];
        $scope.contragentsMap = [];
        $scope.addContragent = function(_account, _name, _inn, _ogrn) {
          if( $scope.contragentsMap[_name] != undefined ) {
            $scope.showConfirmation("Ошибка", "Контрагент с таким названием уже зарегистрирован");
            return;
          }
          $scope.contragentsMap[_account] = $scope.contragents.length;
          $scope.contragentsMap[_name] = $scope.contragents.length;
          $scope.contragentsMap[_inn] = $scope.contragents.length;
          $scope.contragentsMap[_ogrn] = $scope.contragents.length;
          // сохраняем для быстрого поиска
          $scope.contragents.push({
            account: _account,
            name: _name,
            INN: _inn,
            OGRN: _ogrn
          });
        };
        $scope.contragentName = function(_key) {
          var contragent = $scope.contragentsMap[_key];
          if( contragent != undefined) {
            return $scope.contragents[contragent].name;
          }
          return _key;
        }

        $scope.addContragent($scope.web3.eth.accounts[0], "'ООО ТехноПарк'", "7710152113", "1027700505348");
        $scope.addContragent($scope.web3.eth.accounts[1], "'ООО Сельхозпродукция'", "7710152213", "1027700805346");
        $scope.addContragent($scope.web3.eth.accounts[2], "'ЗАО ПЭК'", "7710134532", "102770088293");
        $scope.addContragent($scope.web3.eth.accounts[3], "'ЗАО Деловые линии'", "7710197534", "102770092347");
        $scope.sender = 0;      // new order consigner index in contragents[]
        $scope.receiver = 1;    // new order consignee index in contragents[]
        $scope.authenticatingAccount = 0; // authenticating account index in contragents[]
        $scope.authenticatingPassword = ""; // authenticating account index in contragents[]
        $scope.authenticatedAccount = -1; // authenticated account index in contragents[]
        $scope.cargoOwner = 2;  // cargo owner (index in contragents[])
        $scope.seal = 3;
        $scope.newContragent = {
          account: $scope.web3.eth.accounts[0],
          name: "'ООО НефтеХимСтройПромАвтоматика'",
          INN: 7710197534,
          OGRN: 1027700505348
        };

        $scope.login = async function() {
          try {
            $scope.progressPayEnabled = true;
            var account = $scope.contragents[$scope.authenticatingAccount].account;
            var password = $scope.authenticatingPassword;
            //account = '0x8f7f8e3bb8e8dc73a4a240b636e8580a523064c1';//$scope.web3.personal.newAccount(password);

            console.log("LOGIN: " + account + " PASSWORD: " + password);
            var answer = await $scope.makePromise2($scope.web3.personal.unlockAccount, [account, password, 5000000000]);
            if(answer.toString() == "true") {
              $scope.authenticatedAccount = $scope.authenticatingAccount;
              await $scope.getBalanceCC(account);
            }
            console.log(answer);
            $scope.progressPayEnabled = false;
          }
          catch(e) {
            console.log(e);
            $scope.progressPayEnabled = false;
            $scope.showConfirmation("Ошибка", $scope.explainException(e));
          };
        }

        $scope.logout = async function() {
          try {
            $scope.progressPayEnabled = true;
            var account = $scope.contragents[$scope.authenticatedAccount].account;
            console.log("LOGOUT: " + account);
            var answer = await $scope.makePromise2($scope.web3.personal.lockAccount, [account]);
            if(answer.toString() == "true") {
              $scope.authenticatedAccount = -1;
              $scope.balanceCC = 0;
            }
            console.log(answer);
            $scope.progressPayEnabled = false;
          }
          catch(e) {
            console.log(e);
            $scope.progressPayEnabled = false;
            $scope.showConfirmation("Ошибка", $scope.explainException(e));
          };
        }

        $scope.getAuthenticatedAccount = function() {
          if($scope.authenticatedAccount < 0) {
            return "НЕ ОПРЕДЕЛЕНО";
          }
          return $scope.contragents[$scope.authenticatedAccount].account;
        }

        $scope.getAuthenticatedContragent = function() {
          if($scope.authenticatedAccount < 0) {
            return "НЕ ОПРЕДЕЛЕНО";
          }
          return $scope.contragents[$scope.authenticatedAccount].name;
        }

        $scope.fromMicroCC = function(value) {
          return value / 1000000;
        }
        $scope.toMicroCC = function(value) {
          return value * 1000000;
        }

        $scope.exchange = {
          index: 0,
          //account: $scope.web3.eth.accounts[1],
          eth: 1,
          wei: $scope.web3.toWei(1, "ether"),
          cc: 1000,
          microCC: $scope.toMicroCC(1000)
        };

        $scope.updateUI = function() {
          $scope.window.focus();
          $scope.$apply();
        }

        $scope.callAfter = function(timeout, methode) {
          var timer = setInterval(function() {
            clearInterval(timer);
            methode();
          }, timeout);
        }

        $scope.waitForTransactionEnd = function(tx) {
          var deferred = Q.defer();
          var date = new Date();
          var curDate = null;
          web3.eth.getTransactionReceipt(tx, function(error, result) {
            if(error) {
              deferred.reject(new Error(error));
            }
            else {
              curDate = new Date();
              deferred.resolve([result, curDate-date]);
            }
          });
          return deferred;
        }

        $scope.waitForTransaction = function(tx, timeout, callWhenDone, callWhenError) {
          var done = false;
          var deferred = $scope.waitForTransactionEnd(tx);
          var date = new Date();
          var curDate = null;
          var timer = setInterval(function() {
            var curDate = new Date();
            if( curDate-date > timeout ) {
              deferred.reject(new Error("Timeout: " + timeout));
              done = true;
            }
            if( done ) {
              clearInterval(timer);
            }
          }, 100);
          deferred.promise.then(function(error,result) {
            done = true;
            if(error) {
              callWhenDone(error);
            }
            else {
              callWhenDone(result);
            }
          });
        }

        $scope.exchangeAccountChanged = async function() {
          var account = $scope.contragents[$scope.exchange.index].account;
          await $scope.getBalance(account);
          await $scope.getBalanceCC(account);
        }

        $scope.exchangeToWei = function() {
          $scope.exchange.wei = $scope.web3.toWei($scope.exchange.eth, "ether");
        }

        $scope.exchangeToMicroCC = function() {
          $scope.exchange.microCC = $scope.toMicroCC($scope.exchange.cc);
        }

        $scope.makePromise = function(methode, args) {
          var deferred = Q.defer();
          args.push(function(error, result){
            if( error ) { deferred.reject(new Error(error)); }
            else { deferred.resolve(result); }
          });
          try {
            methode.apply(this, args);
          }
          catch(e) {
            console.log(e);
            deferred.reject(new Error(e));
          }
          return deferred.promise;
        }

        $scope.makePromise2 = function(methode, args) {
          var deferred = new Deferred();
          args.push(function(error, result){
            if( error ) { deferred.reject(new Error(error)); }
            else { deferred.resolve(result); }
          });
          try {
            methode.apply(this, args);
          }
          catch(e) {
            console.log(e);
            deferred.reject(new Error(e));
          }
          return deferred.promise;
        }

        $scope.transact = async function(methode, args, timeout) {
          var timeBegin = new Date();
          var tx = await $scope.makePromise2(methode, args);
          var result = await $scope.waitForTx(tx, timeout);
          var milliseconds = new Date() - timeBegin;
          console.log("TX: " + tx + " TIME: " + milliseconds + " ms GAS: " + result.gas);
          return {success:result.done, time:milliseconds, transaction:tx, gas:result.gas};
        }

        $scope.waitForTx = async function(transaction, milliseconds) {
          var gasUsed = null;
          var timeout = new Promise(function(resolve, reject) {
              setTimeout(resolve, milliseconds, false);
          });
          var txDone = new Promise(function(resolve, reject) {
              var timer = setInterval(async function() {
                //console.log(transaction);
                var receipt = await $scope.makePromise2($scope.web3.eth.getTransactionReceipt, [transaction]);
                if( receipt != null ) {
                  gasUsed = receipt.gasUsed;
                  resolve(true);
                  clearInterval(timer);
                  //console.log("TX RECEIPT: ");console.log(receipt);
                }
              }, $scope.settings.intervalAwaitTx);
          });

          var isDone = await Promise.race([timeout, txDone]);
          if( isDone == false ) {
            console.log("TX TIMEOUT FOR " + transaction);
            // time is out
          }
          return {done:isDone, gas:gasUsed};
        }

        $scope.createQRCode = function(order) {
          // https://libraries.io/bower/qrcode
          // new QRCode(typeNumber, correction, inputMode);
          var qr = new QRCode(0, 2, '8bit');
          qr.addData(order.address);
          qr.make();
          console.log(qr);
          return qr;
        }

        $scope.progressEnabled = false;
        $scope.progressEnabledCC = false;
        $scope.progressPayEnabled = false;
        $scope.progressStatusEnabled = false;

        $scope.eth2cc = async function(wei) {
          var account = $scope.contragents[$scope.exchange.index].account;
          $scope.progressEnabled = true;
          var maxGas = ($scope.settings.gas.cc2ether * 2) + 10000; // должно хватить в два конца, средняя цена 55000
          var amount = $scope.exchange.wei;
          if( amount.toString() == $scope.balanceWei.toString() ) {
            amount -= maxGas;
            // мы должны зарезервировать плату за транзакцию, если хотим сконвертировать все
          }
          maxGas /= 2;
          var receipt = await $scope.transact($scope.cc.ether2cc, [{from:account, to:$scope.cc.address, value:amount, gas:maxGas}], $scope.settings.timeoutAwaitTx);
          console.log("ETH2CC " + amount + " DONE");
          await $scope.getBalance(account);
          await $scope.getBalanceCC(account);
          $scope.progressEnabled = false;
        }

        $scope.cc2eth = async function(microCC) {
          var account = $scope.contragents[$scope.exchange.index].account;
          $scope.progressEnabledCC = true;
          var amount = $scope.exchange.microCC.toString();
          var receipt = await $scope.transact($scope.cc.cc2ether, [amount, {from:account, to:$scope.cc.address, gas:$scope.settings.gas.cc2ether}], $scope.settings.timeoutAwaitTx);
          console.log("CC2ETH " + amount + " DONE");
          await $scope.getBalance(account);
          await $scope.getBalanceCC(account);
          $scope.progressEnabledCC = false;
        }

        /**
         * Calculate a 32 bit FNV-1a hash
         * Found here: https://gist.github.com/vaiorabbit/5657561
         * Ref.: http://isthe.com/chongo/tech/comp/fnv/
         *
         * @param {string} str the input value
         * @param {boolean} [asString=false] set to true to return the hash value as
         *     8-digit hex string instead of an integer
         * @param {integer} [seed] optionally pass the hash of the previous chunk
         * @returns {integer | string}
         */
        $scope.hashFnv32a = function(str, asString, seed) {
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
        }

        $scope.hashMap = {};
        $scope.getHashValue = function(key) {
          var value = $scope.hashMap[key];
          if( value == undefined ) {
            value = key;
          }
          return value;
        };

        $scope.getHash = function(value) {
          //var hash = $scope.web3.sha3(value);
          var hash = $scope.hashFnv32a(value, false);
          $scope.hashMap[hash] = value;
          return hash;
        };

        $scope.selectedTabIndex = 0; // selected tab by default
        $scope.preselectedOrder = null; // select ordar after status page reload
        $scope.price = 3; // overall price of new order
        $scope.items = [
                            {
                                id: 0,
                                name: "item1",
                                desc: "Задание 1",
                                pickup: {
                                  address: "Россия, Москва, ул. Советская, 18",
                                  date: new Date(),
                                  cargo: {
                                    name: "Хлопчатобумажные изделия",
                                    amount: 2,
                                    units: "шт."
                                  }
                                },
                                dropdown: {
                                  address: "Россия, Химки, ул. Строителей, 42",
                                  date: new Date(),
                                  cargo: {
                                    name: "Хлопчатобумажные изделия",
                                    amount: 1,
                                    units: "шт."
                                  }
                                },
                                carrier: 2,
                                price: 2
                            },
                            {
                                id: 1,
                                name: "item2",
                                desc: "Задание 2",
                                pickup: {
                                  address: "Россия, Химки, ул. Строителей, 42",
                                  date: new Date(),
                                  cargo: {
                                    name: "Арбузы",
                                    amount: 3,
                                    units: "т."
                                  }
                                },
                                dropdown: {
                                    address: "Россия, Клин, ул. Главная, 1",
                                    date: new Date(),
                                    cargo: {
                                      name: "Арбузы",
                                      amount: 2,
                                      units: "т."
                                    }
                                },
                                carrier: 3,
                                price: 1
                            }
                        ];
        $scope.getHash($scope.items[0].pickup.address);
        $scope.getHash($scope.items[0].dropdown.address);
        $scope.getHash($scope.items[1].pickup.address);
        $scope.getHash($scope.items[1].dropdown.address);
        $scope.getHash("Россия, ");
        // хеши должны расшифровываться

        $scope.opened = {};

      	$scope.open = function($event, elementOpened) {
      		$event.preventDefault();
      		$event.stopPropagation();

      		$scope.opened[elementOpened] = !$scope.opened[elementOpened];
      	};

        $scope.calcPrice = function() {
          var price = 0;
          for (var i = 0; i < $scope.items.length; i++) {
            price += $scope.items[i].price;
          }
          $scope.price = price;
        }

        $scope.account = $scope.web3.eth.accounts[0];
        $scope.balance = 0;
        $scope.balanceWei = 0;
        $scope.balanceCC = 0;
        $scope.balanceMicroCC = 0;
        $scope.getBalance = async function(account) {
          if(account == undefined) {
            account = $scope.contragents[$scope.sender].account;
          }
          try {
            var balance = await $scope.makePromise2($scope.web3.eth.getBalance, [account]);
            //var balance = $scope.web3.eth.getBalance(account);
          }
          catch(e) {
            console.log(e);
          }
          $scope.balanceChanged(balance);
        }

        $scope.getBalanceCC = async function(account) {
          if(account == undefined) {
            account = $scope.contragents[$scope.sender].account;
          }
          try {
            //var balance = $scope.cc.balanceOf(account);
            var balance = await $scope.makePromise2($scope.cc.balanceOf, [account]);
          }
          catch(e) {
            console.log(e);
          }
          $scope.balanceCcChanged(balance);
        }

        $scope.getLocalOrderPrice = function(orderIndex) {
          if( orderIndex >= $scope.orders.length || typeof($scope.orders[orderIndex] == 'undefined')) {
            return 0;
          }
          $scope.orderPrice = $scope.orders[orderIndex].price;
          return $scope.orderPrice;
        }

        $scope.getLocalOrderState = function(orderIndex) {
          if( orderIndex >= $scope.orders.length || typeof($scope.orders[orderIndex] == 'undefined')) {
            return "Не известно";
          }
          $scope.orderState = $scope.explainOrderState($scope.orders[orderIndex]);
          return $scope.orderState;
        }

        $scope.orderBalance = 0;
        $scope.orderBalanceCC = 0;
        $scope.orderPrice = 0;
        $scope.orderState = "Не известно";
        $scope.getOrderBalance = async function(order) {
          if( typeof(order) == 'undefined' ) {
            return;
          }
//            var bal = (await $scope.makePromise2($scope.web3.eth.getBalance, [order.address])).toNumber();
//            $scope.orderBalance = $scope.web3.fromWei(bal, 'ether');
//            console.log('ORDER BALANCE: ' + $scope.orderBalance);

          var bcc = (await $scope.makePromise2($scope.cc.balanceOf, [order.address])).toNumber();
          $scope.orderBalanceCC = $scope.fromMicroCC(bcc);
          console.log('ORDER BALANCE CC: ' + $scope.orderBalanceCC);
        };
        $scope.orderChanged = async function(orderIndex) {
          if( orderIndex >= $scope.orders.length ) {
            return;
          }
          var order = $scope.orders[orderIndex];
          if( typeof(order) == 'undefined' ) {
            return;
          }
          await $scope.getOrderBalance(order);
          $scope.orderPrice = $scope.fromMicroCC(order.price);
          $scope.orderState = $scope.explainOrderState(order);
        }
        $scope.tabOrder = function() {
            $scope.getBalanceCC();
        };

        $scope.addTrack = function() {
          var newItem =  {
              id: $scope.items.length,
              name: "item" + ($scope.items.length + 1),
              desc: "Задание "+ ($scope.items.length + 1),
              pickup: {
                address: "Россия, ",
                date: new Date(),
                cargo: {
                  name: "Дрова",
                  amount: 1,
                  units: "куб. м."
                }
              },
              dropdown: {
                address: "Россия, ",
                date: new Date(),
                cargo: {
                  name: "Дрова",
                  amount: 1,
                  units: "куб. м."
                }
              },
              carrier: $scope.contragents.length - 1,
              price: 1
          };

          $scope.items.push(newItem);
          $scope.calcPrice();
          console.log($scope.sender.INN);
        };

        $scope.onChange = function(field) {
          $scope.calcPrice();
        }

        $scope.deleteTrack = function(id) {
          $scope.items.splice(id, 1);
          for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].id = i;
            $scope.items[i].name = "item" + (i + 1);
            $scope.items[i].desc = "Задание " + (i + 1);
          }
          $scope.calcPrice();
        }

        $scope.getTrackIcon = function(state) {
          var icons = ['file_download','file_upload','done','access_time']
          return icons[state];
        };

        $scope.getOrderIcon = function(state) {
          var icons = ['list','credit_card','done_all','not_interested']
          return icons[state];
        };

        // Convert a hex string to a byte array
        $scope.hexToBytes = function(hex) {
            for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
            return bytes;
        }

        $scope.explainException = function(exception) {
          var text = exception.toString();
          if( text.indexOf('could not unlock signer account') >= 0 ||
            text.indexOf('invalid address') >= 0 ||
            text.indexOf('unable to sign transaction for this address') >= 0) {
            return "Нет доступа к счету";
          }
          else if( text.indexOf("sender doesn't have enough funds to send tx") >= 0 ) {
            return "Недостаточно средств на счете";
          }
          else if( text.indexOf('User denied transaction signature') >= 0 ) {
            return "Операция отменена пользователем";
          }
          else if( text.indexOf('could not decrypt key with given passphrase') >= 0 ) {
            return "Неверный пароль";
          }
          else if( text.indexOf('authentication needed: password or unlock') >= 0 ) {
            return "Требуется аутентификация для доступа к счету";
          }
          return text;
        }

        $scope.canDismiss = function(order) {
          if(order == undefined) {
            return false;
          }
          return (order.state < 2 && (order.tracks.length == 0 ||
            (order.tracks.length > 0 && order.tracks[0].state == 0)));
        }

        $scope.dismiss = async function(order) {
          try {
            $scope.progressStatusEnabled = true;
            var _address = await $scope.makePromise2($scope.platform.getOrder, [order.index]);
            var contract = $scope.web3.eth.contract($scope.orderProto).at(_address);
            //await $scope.getOrderBalance(order);
            //var before = $scope.orderBalanceCC;
            //console.log("TRYING TO DISMISS " + order.consigner);
            await $scope.transact(contract.complete2, [{from:order.consigner, gas:70000}], $scope.settings.timeoutAwaitTx);
            order.state = await $scope.makePromise2(contract.state, []);
            //await $scope.getOrderBalance(order);
            //var feedback = before - $scope.orderBalanceCC;
            $scope.showConfirmation("Информация", "Заказ " + order.address +
              " успешно отменен. " + $scope.fromMicroCC(order.price) + " CC возвращены на счет "
              + order.consigner);
            $scope.getOrderBalance(order);
          }
          catch(e) {
            console.log(e);
            $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + order.consigner);
            $scope.progressStatusEnabled = false;
            return;
          }
          $scope.progressStatusEnabled = false;
        }

        $scope.broke = async function(order) {
          try {
            $scope.progressStatusEnabled = true;
            var _address = await $scope.makePromise2($scope.platform.getOrder, [order.index]);
            var contract = $scope.web3.eth.contract($scope.orderProto).at(_address);
            //await $scope.getOrderBalance(order);
            //var before = $scope.orderBalanceCC;
            //console.log("TRYING TO DISMISS " + order.consigner);
            await $scope.transact(contract.broke, [{from:order.seal, gas:70000}], $scope.settings.timeoutAwaitTx);
            order.state = await $scope.makePromise2(contract.state, []);
            //await $scope.getOrderBalance(order);
            //var feedback = before - $scope.orderBalanceCC;
            $scope.showConfirmation("Информация", "Заказ " + order.address +
              " пломба успешно нарушена. ");
          }
          catch(e) {
            console.log(e);
            $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + order.consigner);
            $scope.progressStatusEnabled = false;
            return;
          }
          $scope.progressStatusEnabled = false;
        }

        $scope.numOrdersAsync = function(address) {
          var deferred = Q.defer();
          try {
            $scope.platform.numOrders({from:address},
              function(error, result){if(error){deferred.reject(new Error(error));}else{deferred.resolve(result); }});
          }
          catch(e) {
            console.log(e);
            deferred.reject(new Error(e));
          }
          return deferred.promise;
        }

        $scope.balanceChanged = function(balance) {
          $scope.balanceWei = balance;
          $scope.balance = Math.round10($scope.web3.fromWei($scope.balanceWei, 'ether'), -3);
          console.log('BALANCE: ' + $scope.balance);
        }

        $scope.balanceCcChanged = function(balance) {
          $scope.balanceMicroCC = balance;
          $scope.balanceCC = Math.round10($scope.fromMicroCC($scope.balanceMicroCC), -3);
          console.log('BALANCE CC: ' + $scope.balanceMicroCC);
        }

        $scope.cant = function(account) {
          return ($scope.authenticatedAccount < 0 || account != $scope.contragents[$scope.authenticatedAccount].account);
        }

        // оплата "нового"" заказа
        $scope.pay = async function(order) {
          console.log("PAY");
          $scope.progressPayEnabled = true;
          try {
            var contract = $scope.web3.eth.contract($scope.orderProto).at(order.address);
            console.log("CONTRACT: ");console.log(contract);
            console.log(">>> cc.approve");
            await $scope.transact($scope.cc.approve,[order.address, order.price, {from:order.consigner, gas: $scope.settings.gas.approve}], $scope.settings.timeoutApprove);

            console.log(">>> begin");
            await $scope.transact(contract.begin, [{from:order.consigner, to:order.address, gas: $scope.settings.gas.begin}], $scope.settings.timeoutBegin);
            // pay for job

            await $scope.getBalance();
            await $scope.getOrderBalance(order);
            console.log(">>> state");
            order.state = (await $scope.makePromise2(contract.state, [])).toNumber();
            console.log("STATE: " + $scope.explainOrderState(order));
            $scope.showConfirmation("Информация", "Заказ " + order.address +
              " на сумму " + $scope.fromMicroCC(order.price) + " CC оплачен успешно");
            // show confirmation
          }
          catch (e) {
             console.log(e);
             $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + order.consigner);
             $scope.progressPayEnabled = false;
             return;
          }
          $scope.progressPayEnabled = false;
        }

        // подтверждение отгрузки отправителем
        $scope.ship = async function(order) {
          console.log("SHIP");
          $scope.progressStatusEnabled = true;
          try {
            var contract = $scope.web3.eth.contract($scope.orderProto).at(order.address);
            console.log("CONTRACT: ");console.log(contract);
            console.log(">>> begin");
//            var tx = await $scope.makePromise2(contract.begin, [{from:order.consigner, to:order.address, gas: $scope.settings.gas.begin}]);
            await $scope.transact(contract.begin, [{from:order.consigner, to:order.address, gas: $scope.settings.gas.begin}], $scope.settings.timeoutBegin);
  //          console.log("BEGIN TX: " + tx);
            // set state to "Shipped"

            console.log(">>> state");
            order.state = (await $scope.makePromise2(contract.state, [])).toNumber();
            console.log("STATE: " + $scope.explainOrderState(order));
          }
          catch (e) {
             console.log(e);
             $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + order.consigner);
             $scope.progressStatusEnabled = false;
             return;
          }
          $scope.progressStatusEnabled = false;
        }

        $scope.transfer = async function() {
          var sender = $scope.contragents[$scope.sender].account;
          var handleError = function(e) {
            console.log(e);
            $scope.progressPayEnabled = false;
            $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + sender);
          }
          try {
            $scope.progressPayEnabled = true;
            console.log(">>> platform.numOrders");
            var numOrders = (await $scope.makePromise2($scope.platform.numOrders, [{from:sender}])).toNumber();  // validate sender account
            console.log("NUM ORDERS: " + numOrders);

            var trackHashes = [];
            var trackAddress = [];
            var trackPrices = [];
            for(var i = 0; i < $scope.items.length; i++) {
              var item = $scope.items[i];
              console.log(JSON.stringify(item));
              trackHashes.push($scope.getHash(item.pickup.address));  // pickup.location
              trackHashes.push($scope.getHash(item.pickup.date.toString()));  // pickup.date
              trackHashes.push($scope.getHash(JSON.stringify(item.pickup.cargo)));  // pickup.description
              trackHashes.push($scope.getHash(item.dropdown.address));  // dropdown.location
              trackHashes.push($scope.getHash(item.dropdown.date.toString()));  // dropdown.date
              trackHashes.push($scope.getHash(JSON.stringify(item.dropdown.cargo)));  // dropdown.description
              trackHashes.push($scope.getHash(new Date().toString()));  // assignment.date (.getTime() needed??)
              trackHashes.push($scope.getHash('shit'));  // assignment.proof (BUG - implemented in future)
              trackAddress.push($scope.contragents[item.carrier].account); // carrier
              trackAddress.push($scope.contragents[item.carrier].account); // loader (FIXME)
              trackAddress.push($scope.contragents[item.carrier].account); // unloader (FIXME)
  //            trackPrices.push($scope.web3.toWei(item.price, 'ether').toString()); // price in wei
              trackPrices.push($scope.toMicroCC(item.price).toString()); // price in microCC
              console.log(trackHashes);
            }
            // pack arguments into arrays

            console.log(">>> platform.addOrder");
            await $scope.transact($scope.platform.addOrder, [
              sender,
              $scope.contragents[$scope.receiver].account,
              $scope.contragents[$scope.cargoOwner].account,
              $scope.contragents[$scope.seal].account,
              trackHashes, trackAddress, trackPrices,
              $scope.settings.cargoCoinAddress,
              {gas: $scope.settings.gas.addOrder }
            ], $scope.settings.timeoutAddOrder);
            // deploy new order

           console.log(">>> platform.getOrder");
           var orderAddress = await $scope.makePromise2($scope.platform.getOrder, [numOrders]);
           var order = $scope.web3.eth.contract($scope.orderProto).at(orderAddress);
           console.log("ORDER: ");console.log(order);

           console.log(">>> order.price");
           var orderPrice = await $scope.makePromise2(order.price, []);
           console.log("ORDER PRICE: " + orderPrice);

           console.log(">>> cc.approve");
           await $scope.transact($scope.cc.approve,[orderAddress, orderPrice.valueOf(), {from:sender, to:$scope.settings.cargoCoinAddress, gas:$scope.settings.gas.approve}], $scope.settings.timeoutApprove);

           console.log(">>> order.begin");
           await $scope.transact(order.begin, [{from:sender, to:orderAddress, gas:$scope.settings.gas.begin}], $scope.settings.timeoutBegin);
           console.log("BEGIN FROM: " + sender);
           // send microCC to order

           //$scope.getBalanceCC(); // не надо, переходим на другую вкладку
           //$scope.preselectedOrder = orderAddress;
           $scope.showConfirmation("Информация", "Заказ " + order.address + " на сумму " + $scope.fromMicroCC(orderPrice) + " CC оплачен успешно");
           $scope.addOperation(0, orderAddress, $scope.items[0].pickup.address, $scope.items[$scope.items.length-1].dropdown.address, sender, orderPrice);
           $scope.progressPayEnabled = false; // SUCCESS
           $scope.selectedTabIndex = 3; // переходим на вкладку "статус заказа"
           // pay for job
          }
          catch(e) {
            handleError(e);
          };
          // мы не должны создавать заказ, который не сможем оплатить
        }

        $scope.cancel = function() {
        }

        $scope.showOrder = function(_order, _track) {
          console.log("SHOW ORDER");
          console.log(_order);
          console.log(_track);
          $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/main/order_dialog.html',
            parent: angular.element(document.body),
            isolateScope: false, // use calling scope
            order: _order,
            track: _track,
            parentScope: $scope,
            //targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true//$scope.customFullscreen // Only for -xs, -sm breakpoints.
          });
          $scope.getOrderBalance(_order);
        }

        $scope.default = $scope.items[2];

        $scope.filt = {
          searchKeyword: '',
          propertyName: 'item.order.index',
          reverse: true
        };
        $scope.sortBy = function(propertyName) {
          $scope.filt.reverse = (propertyName !== null && $scope.filt.propertyName === propertyName)
              ? !$scope.filt.reverse : false;
          $scope.filt.propertyName = propertyName;
        };

        $scope.getCargo = function(hash) {
          var value = $scope.hashMap[hash];
          if( value == undefined ) {
            return hash;
          }
          try {
            var json = JSON.parse(value);
            var cargo = json.name + ' (' + json.amount + ' ' + json.units + ')';
            return cargo;
          }
          catch(e) {
            console.log(e);
            return hash;
          }
        };

    }

//  ]  // INJECT! scope
);
