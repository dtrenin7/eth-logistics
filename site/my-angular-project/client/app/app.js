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
    function($scope, $mdDialog, $interval, $http) {
      $scope.testValue = 0;
      $interval(function() {
        $scope.testValue++;
        //$scope.detectAccountChange();
      }, 500); // angular forms update enforced */
      // rip the bullshit


      $scope.ccJsonB64 = "W3siY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJuYW1lIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJzdHJpbmcifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50IjpmYWxzZSwiaW5wdXRzIjpbeyJuYW1lIjoiX3NwZW5kZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9hbW91bnQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImFwcHJvdmUiLCJvdXRwdXRzIjpbeyJuYW1lIjoic3VjY2VzcyIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il9vd25lciIsInR5cGUiOiJhZGRyZXNzIn1dLCJuYW1lIjoic2V0T3duZXIiLCJvdXRwdXRzIjpbXSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOnRydWUsImlucHV0cyI6W10sIm5hbWUiOiJ0b3RhbFN1cHBseSIsIm91dHB1dHMiOlt7Im5hbWUiOiJ0b3RhbFN1cHBseSIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6Il9hZGRyZXNzIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il9mcm9tIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfdG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9hbW91bnQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6InRyYW5zZmVyRnJvbSIsIm91dHB1dHMiOlt7Im5hbWUiOiJzdWNjZXNzIiwidHlwZSI6ImJvb2wifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZGVjaW1hbHMiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQ4In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbeyJuYW1lIjoibWljcm9DQyIsInR5cGUiOiJ1aW50MjU2In1dLCJuYW1lIjoiY2FuQnV5Iiwib3V0cHV0cyI6W3sibmFtZSI6ImNhbiIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6InJhdGlvIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJzZXRDb252ZXJzaW9uUmF0aW8iLCJvdXRwdXRzIjpbXSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOlt7Im5hbWUiOiJfdG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9hbW91bnQiLCJ0eXBlIjoidWludDI1NiJ9LHsibmFtZSI6InBlcmNlbnRzIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJ0cmFuc2ZlcldpdGhGZWUiLCJvdXRwdXRzIjpbeyJuYW1lIjoic3VjY2VzcyIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Im1pY3JvQ0MiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImNjMmV0aGVyIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0T3duZXJCYWxhbmNlIiwib3V0cHV0cyI6W3sibmFtZSI6Il9iYWxhbmNlIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0Q29udmVyc2lvblJhdGlvIiwib3V0cHV0cyI6W3sibmFtZSI6InJhdGlvIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJhZGRyIiwidHlwZSI6ImFkZHJlc3MifV0sIm5hbWUiOiJnZXRCYWxhbmNlSW5XZWkiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwibmFtZSI6ImJhbGFuY2VPZiIsIm91dHB1dHMiOlt7Im5hbWUiOiJiYWxhbmNlIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoiZ2V0T3duZXIiLCJvdXRwdXRzIjpbeyJuYW1lIjoiX293bmVyIiwidHlwZSI6ImFkZHJlc3MifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoic3ltYm9sIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJzdHJpbmcifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJhIiwidHlwZSI6InVpbnQyNTYifSx7Im5hbWUiOiJiIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJkaXYiLCJvdXRwdXRzIjpbeyJuYW1lIjoicSIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W3sibmFtZSI6Il90byIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX2Ftb3VudCIsInR5cGUiOiJ1aW50MjU2In1dLCJuYW1lIjoidHJhbnNmZXIiLCJvdXRwdXRzIjpbeyJuYW1lIjoic3VjY2VzcyIsInR5cGUiOiJib29sIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbeyJuYW1lIjoiX293bmVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfc3BlbmRlciIsInR5cGUiOiJhZGRyZXNzIn1dLCJuYW1lIjoiYWxsb3dhbmNlIiwib3V0cHV0cyI6W3sibmFtZSI6InJlbWFpbmluZyIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W10sIm5hbWUiOiJldGhlcjJjYyIsIm91dHB1dHMiOltdLCJwYXlhYmxlIjp0cnVlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiY29uc3RydWN0b3IifSx7ImFub255bW91cyI6ZmFsc2UsImlucHV0cyI6W3siaW5kZXhlZCI6dHJ1ZSwibmFtZSI6Il9mcm9tIiwidHlwZSI6ImFkZHJlc3MifSx7ImluZGV4ZWQiOnRydWUsIm5hbWUiOiJfdG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW5kZXhlZCI6ZmFsc2UsIm5hbWUiOiJfdmFsdWUiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6IlRyYW5zZmVyIiwidHlwZSI6ImV2ZW50In0seyJhbm9ueW1vdXMiOmZhbHNlLCJpbnB1dHMiOlt7ImluZGV4ZWQiOnRydWUsIm5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW5kZXhlZCI6dHJ1ZSwibmFtZSI6Il9zcGVuZGVyIiwidHlwZSI6ImFkZHJlc3MifSx7ImluZGV4ZWQiOmZhbHNlLCJuYW1lIjoiX3ZhbHVlIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJBcHByb3ZhbCIsInR5cGUiOiJldmVudCJ9XQ==";
      $scope.platformJsonb64 = "W3siY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOlt7Im5hbWUiOiJfb3duZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwibmFtZSI6InNldE93bmVyIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50IjpmYWxzZSwiaW5wdXRzIjpbeyJuYW1lIjoib3JkZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwibmFtZSI6ImFkZE9yZGVyIiwib3V0cHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoibnVtT3JkZXJzIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImdldE93bmVyQmFsYW5jZSIsIm91dHB1dHMiOlt7Im5hbWUiOiJfYmFsYW5jZSIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImdldE93bmVyIiwib3V0cHV0cyI6W3sibmFtZSI6Il9vd25lciIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbeyJuYW1lIjoiSUQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6ImdldE9yZGVyIiwib3V0cHV0cyI6W3sibmFtZSI6Im9yZGVyIiwidHlwZSI6ImFkZHJlc3MifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W10sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiY29uc3RydWN0b3IifV0=";
      $scope.orderJsonb64 = "W3siY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOltdLCJuYW1lIjoiYmVnaW4iLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQ4In1dLCJwYXlhYmxlIjp0cnVlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoibnVtVHJhY2tzIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImN1c3RvbWVyIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJhZGRyZXNzIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6ZmFsc2UsImlucHV0cyI6W10sIm5hbWUiOiJjb21wbGV0ZSIsIm91dHB1dHMiOlt7Im5hbWUiOiIiLCJ0eXBlIjoidWludDgifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOlt7Im5hbWUiOiJ0cmFja0lEIiwidHlwZSI6InVpbnQyNTYifV0sIm5hbWUiOiJnZXRUcmFjayIsIm91dHB1dHMiOlt7Im5hbWUiOiJfc3RhdGUiLCJ0eXBlIjoidWludDgifSx7Im5hbWUiOiJfY2FycmllciIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX3ByaWNlIiwidHlwZSI6InVpbnQyNTYifSx7Im5hbWUiOiJfcGlja3VwIiwidHlwZSI6InVpbnQzMiJ9LHsibmFtZSI6Il9waWNrdXBEZXNjciIsInR5cGUiOiJ1aW50MzIifSx7Im5hbWUiOiJfZHJvcGRvd24iLCJ0eXBlIjoidWludDMyIn0seyJuYW1lIjoiX2Ryb3Bkb3duRGVzY3IiLCJ0eXBlIjoidWludDMyIn0seyJuYW1lIjoiX2Fzc2lnbm1lbnREYXRlIiwidHlwZSI6InVpbnQzMiJ9LHsibmFtZSI6Il9hc3NpZ25tZW50UHJvb2YiLCJ0eXBlIjoidWludDMyIn1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6InByaWNlIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJ1aW50MjU2In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImFjdGl2ZVRyYWNrSUQiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQyNTYifV0sInBheWFibGUiOmZhbHNlLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImNvbnN0YW50Ijp0cnVlLCJpbnB1dHMiOltdLCJuYW1lIjoic3RhdGUiLCJvdXRwdXRzIjpbeyJuYW1lIjoiIiwidHlwZSI6InVpbnQ4In1dLCJwYXlhYmxlIjpmYWxzZSwidHlwZSI6ImZ1bmN0aW9uIn0seyJjb25zdGFudCI6dHJ1ZSwiaW5wdXRzIjpbXSwibmFtZSI6ImdldE9yZGVyIiwib3V0cHV0cyI6W3sibmFtZSI6Il9zdGF0ZSIsInR5cGUiOiJ1aW50OCJ9LHsibmFtZSI6Il9jdXN0b21lciIsInR5cGUiOiJhZGRyZXNzIn0seyJuYW1lIjoiX3ByaWNlIiwidHlwZSI6InVpbnQyNTYifSx7Im5hbWUiOiJfbnVtVHJhY2tzIiwidHlwZSI6InVpbnQyNTYifSx7Im5hbWUiOiJfYWN0aXZlVHJhY2siLCJ0eXBlIjoidWludDI1NiJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiY29uc3RhbnQiOmZhbHNlLCJpbnB1dHMiOltdLCJuYW1lIjoiY2FuY2VsIiwib3V0cHV0cyI6W3sibmFtZSI6IiIsInR5cGUiOiJ1aW50OCJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJmdW5jdGlvbiJ9LHsiaW5wdXRzIjpbeyJuYW1lIjoiX2N1c3RvbWVyIiwidHlwZSI6ImFkZHJlc3MifSx7Im5hbWUiOiJfdHJhY2tIYXNoZXMiLCJ0eXBlIjoidWludDMyW10ifSx7Im5hbWUiOiJfdHJhY2tBZGRyZXNzZXMiLCJ0eXBlIjoiYWRkcmVzc1tdIn0seyJuYW1lIjoiX3RyYWNrUHJpY2VzIiwidHlwZSI6InVpbnQyNTZbXSJ9LHsibmFtZSI6Il9jY0FkZHJlc3MiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsibmFtZSI6Il9wbGF0Zm9ybUFkZHJlc3MiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwicGF5YWJsZSI6ZmFsc2UsInR5cGUiOiJjb25zdHJ1Y3RvciJ9XQ==";

      /*var dirty = require('dirty');
      $scope.dirty = dirty('user.db');
      console.log("DIRTY:");
      console.log($scope.dirty); //*/


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

      $scope.updateHashMap = async function() {
        var query = "/api/hash/?data=xxx";
        var data = await $http.get(query);//.then(callbackOK, callbackFail);
        var table = data.data.items;
        for(var i = 0; i < table.length; i++) {
          $scope.hashMap[table[i][0]] = table[i][1];
        } 
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
          platformAddress: '0xc8c4305cf93ed27ff1689f160d9ebbda42239411',
          cargoCoinAddress: '0x6661fd16e676a73b07dd873f6beadc2a7db7305a',
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
          var descs = ["Новый", "Оплачен", "В пути", "Выполнен", "Отменен", "Пломба нарушена"];
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
            price: contractTrack[2].toNumber(),
//            price: $scope.web3.fromWei(contractTrack[4].toNumber(), 'ether'),
            pickup: {
              address: contractTrack[3].toNumber(),
              description: contractTrack[4].toNumber()
            },
            dropdown: {
              address: contractTrack[5].toNumber(),
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

          await $scope.updateHashMap();
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
              customer: props[1],
              tracks: [],
              price: props[2].toNumber(),
              activeTrack: props[4].toNumber()
            };
            //order.qr = $scope.createQRCode(order);
            //console.log("ORDER: ");console.log(order);

            var numTracks = props[3].toNumber();
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
            //var approver = $scope.getTrackApprover(order, track);
            var approver = $scope.contragents[$scope.authenticatedAccount].account;
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

        $scope.addContragent($scope.web3.eth.accounts[0], "ОБОЗ", "7710152113", "1027700505348");
        $scope.addContragent($scope.web3.eth.accounts[1], "'ЗАО ПЭК'", "7710134532", "102770088293");
        $scope.addContragent($scope.web3.eth.accounts[2], "'ЗАО Деловые линии'", "7710197534", "102770092347");
        $scope.customer = 0;      // new order consigner index in contragents[]
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

        $scope.waitForTxInfinite = async function(transaction, needContractAddress) {
          var gasUsed = null, contractAddress = null;
          var txDone = new Promise(function(resolve, reject) {
              var timer = setInterval(async function() {
                //console.log(transaction);
                var receipt = await $scope.makePromise2($scope.web3.eth.getTransactionReceipt, [transaction]);
                if( receipt != null && (needContractAddress == false || receipt.contractAddress != null)) {
                  gasUsed = receipt.gasUsed;
                  contractAddress = receipt.contractAddress;
                  resolve(true);
                  clearInterval(timer);
                  //console.log("TX RECEIPT: ");console.log(receipt);
                }
              }, $scope.settings.intervalAwaitTx);
          });

          await txDone;
          return {gas:gasUsed, contract:contractAddress};
        }

        $scope.transactInfinite = async function(methode, args, needContractAddress) {
          var timeBegin = new Date();
          var tx = methode(args);
          var result = await $scope.waitForTxInfinite(tx, needContractAddress);
          var milliseconds = new Date() - timeBegin;
          console.log("TX: " + tx + " TIME: " + milliseconds + " ms GAS: " + result.gas + " contract: " + result.contract);
          return {time:milliseconds, transaction:tx, gas:result.gas, contract:result.contract};
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
            //value = $scope.getHashHttp(key);
            //if( value == undefined )
            {
              value = key;
            }
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
        $scope.price = 20; // overall price of new order
        $scope.items = [
                            {
                                id: 0,
                                name: "item1",
                                desc: "Рейс 1",
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
                                carrier: 1,
                                price: 20
                            }
                        ];
        $scope.getHash($scope.items[0].pickup.address);
        $scope.getHash($scope.items[0].dropdown.address);
        $scope.getHash(JSON.stringify($scope.items[0].pickup.cargo));
        $scope.getHash(JSON.stringify($scope.items[0].dropdown.cargo));
//        $scope.getHash($scope.items[1].pickup.address);
//        $scope.getHash($scope.items[1].dropdown.address);
        $scope.getHash("Россия, ");
        $scope.getHash("Россия, Химки, ул. Строителей, 42");
        $scope.getHash("Россия, Москва, ул. Советская, 18");
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
            account = $scope.contragents[$scope.customer].account;
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
            account = $scope.contragents[$scope.customer].account;
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
              desc: "Рейс "+ ($scope.items.length + 1),
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
          console.log($scope.customer.INN);
        };

        $scope.onChange = function(field) {
          $scope.calcPrice();
        }

        $scope.deleteTrack = function(id) {
          $scope.items.splice(id, 1);
          for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].id = i;
            $scope.items[i].name = "item" + (i + 1);
            $scope.items[i].desc = "Рейс " + (i + 1);
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
//          return (order.state < 2 && (order.tracks.length == 0 ||
//            (order.tracks.length > 0 && order.tracks[0].state == 0)));
          return (order.state < 3);
        }

        $scope.dismiss = async function(order) {
          try {
            $scope.progressStatusEnabled = true;
            var _address = await $scope.makePromise2($scope.platform.getOrder, [order.index]);
            var contract = $scope.web3.eth.contract($scope.orderProto).at(_address);
            //await $scope.getOrderBalance(order);
            //var before = $scope.orderBalanceCC;
            //console.log("TRYING TO DISMISS " + order.consigner);
            await $scope.transact(contract.cancel, [{from:order.customer, gas:70000}], $scope.settings.timeoutAwaitTx);
            order.state = await $scope.makePromise2(contract.state, []);
            //await $scope.getOrderBalance(order);
            //var feedback = before - $scope.orderBalanceCC;
            $scope.showConfirmation("Информация", "Заказ " + order.address +
              " успешно отменен. " + $scope.fromMicroCC(order.price) + " CC возвращены на счет "
              + order.customer);
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
            await $scope.transact(contract.broke, [{from:order.seal, gas:70000}], $scope.settings.timeoutAwaitTx);
            order.state = await $scope.makePromise2(contract.state, []);
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
          var customer = $scope.contragents[$scope.customer].account;
          var handleError = function(e) {
            console.log(e);
            $scope.progressPayEnabled = false;
            $scope.showConfirmation("Ошибка", $scope.explainException(e) + " " + customer);
          }
          try {
            $scope.progressPayEnabled = true;
            console.log(">>> platform.numOrders");
            var numOrders = (await $scope.makePromise2($scope.platform.numOrders, [{from:customer}])).toNumber();  // validate sender account
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
  //            trackPrices.push($scope.web3.toWei(item.price, 'ether').toString()); // price in wei
              trackPrices.push($scope.toMicroCC(item.price).toString()); // price in microCC
              console.log(trackHashes);
            }
            // pack arguments into arrays

            console.log(">>> platform.addOrder");
            var bin = '0x6060604052341561000f57600080fd5b604051610d6a380380610d6a8339810160405280805191906020018051820191906020018051820191906020018051820191906020018051919060200180519150505b600080600061005f610515565b610067610515565b61006f610535565b60008054600160a060020a03338116600160a060020a031992831617808455600680548d8416908516179055600780548c841690851617905560088054309093169290931691909117909155819060a060020a60ff02191674010000000000000000000000000000000000000000825b021790555060018054600160a060020a031916600160a060020a038e16179055600095508594508493505b885184101561047a578360080295506060604051908101604052808c888151811061013157fe5b9060200190602002015163ffffffff1681526020018c886001018151811061015557fe5b9060200190602002015163ffffffff1681526020018c886002018151811061017957fe5b9060200190602002015163ffffffff16905292506060604051908101604052808c88600301815181106101a857fe5b9060200190602002015163ffffffff1681526020018c88600401815181106101cc57fe5b9060200190602002015163ffffffff1681526020018c88600501815181106101f057fe5b9060200190602002015163ffffffff169052915060408051908101604052808c886006018151811061021e57fe5b9060200190602002015163ffffffff1681526020018c886007018151811061024257fe5b9060200190602002015163ffffffff169052905060c06040519081016040528060005b81526020018481526020018381526020018b868151811061028257fe5b90602001906020020151600160a060020a031681526020018281526020018a86815181106102ac57fe5b906020019060200201519052600354600090815260056020526040902081518154829060ff191660018360038111156102e157fe5b02179055506020820151600182018151815463ffffffff191663ffffffff919091161781556020820151815463ffffffff919091166401000000000267ffffffff00000000199091161781556040820151815463ffffffff919091166801000000000000000002604060020a63ffffffff0219909116179055506040820151600282018151815463ffffffff191663ffffffff919091161781556020820151815463ffffffff919091166401000000000267ffffffff00000000199091161781556040820151815463ffffffff919091166801000000000000000002604060020a63ffffffff0219909116179055506060820151600382018054600160a060020a031916600160a060020a03929092169190911790556080820151600482018151815463ffffffff191663ffffffff919091161781556020820151815463ffffffff919091166401000000000267ffffffff00000000199091161790555060a08201516005909101555088848151811061045757fe5b90602001906020020151600380546001019055909401935b60019093019261010a565b6002859055600754600854600160a060020a0391821691633d1c40aa91166040517c010000000000000000000000000000000000000000000000000000000063ffffffff8416028152600160a060020a039091166004820152602401600060405180830381600087803b15156104ef57600080fd5b6102c65a03f1151561050057600080fd5b5050505b50505050505050505050505061054c565b606060405190810160409081526000808352602083018190529082015290565b604080519081016040526000808252602082015290565b61080f8061055b6000396000f300606060405236156100885763ffffffff60e060020a6000350416631bce6ff3811461008d5780632095b823146100b95780632804b2c0146100de578063522e11771461010d578063629058ca14610144578063a035b1fe146101ca578063ab1daaa6146101ef578063c19d93fb14610214578063d36dedd21461024b578063ea8a1af0146102b0575b600080fd5b6100956102e7565b604051808260068111156100a557fe5b60ff16815260200191505060405180910390f35b34156100c457600080fd5b6100cc6103f8565b60405190815260200160405180910390f35b34156100e957600080fd5b6100f16103fe565b604051600160a060020a03909116815260200160405180910390f35b341561011857600080fd5b61009561040d565b604051808260068111156100a557fe5b60ff16815260200191505060405180910390f35b341561014f57600080fd5b61015a60043561056d565b604051808a600381111561016a57fe5b60ff168152600160a060020a0390991660208a01525060408089019790975263ffffffff9586166060890152938516608088015291841660a0870152831660c0860152821660e08501521661010083015261012090910191505180910390f35b34156101d557600080fd5b6100cc610610565b60405190815260200160405180910390f35b34156101fa57600080fd5b6100cc610616565b60405190815260200160405180910390f35b341561021f57600080fd5b61022761061c565b604051808260058111156100a557fe5b60ff16815260200191505060405180910390f35b341561025657600080fd5b61025e61062c565b6040518086600581111561026e57fe5b60ff16815260200185600160a060020a0316600160a060020a031681526020018481526020018381526020018281526020019550505050505060405180910390f35b34156102bb57600080fd5b61009561065b565b604051808260068111156100a557fe5b60ff16815260200191505060405180910390f35b60015460009033600160a060020a03908116911614156103f35760005b60005460a060020a900460ff16600581111561031c57fe5b14156103f357600654600854600254600160a060020a03928316926323b872dd92339291169060006040516020015260405160e060020a63ffffffff8616028152600160a060020a0393841660048201529190921660248201526044810191909152606401602060405180830381600087803b151561039a57600080fd5b6102c65a03f115156103ab57600080fd5b5050506040518051151560011490506103c6575060056103f3565b600080546002919074ff0000000000000000000000000000000000000000191660a060020a835b02179055505b5b5b90565b60035481565b600154600160a060020a031681565b6000808060025b60005460a060020a900460ff16600581111561042c57fe5b1461043a5760019250610568565b60015433600160a060020a039081169116141561056357506001905060005b60035481101561052e5760065460008281526005602081905260408083206003810154920154600160a060020a03948516946351355362949316929091879190516020015260405160e060020a63ffffffff8616028152600160a060020a03909316600484015260248301919091526044820152606401602060405180830381600087803b15156104e957600080fd5b6102c65a03f115156104fa57600080fd5b50505060405180515050600081815260056020526040902080546002919060ff19166001835b02179055505b600101610459565b600080546003919074ff0000000000000000000000000000000000000000191660a060020a835b021790555060009250610568565b600392505b505090565b60008060008060008060008060006003548a10151561058857fe5b505050600087815260056020819052604090912080546003820154928201546001830154600284015460049094015460ff9093169a50600160a060020a039094169850965063ffffffff8084169650680100000000000000009384900481169550828116945092909104821691818116916401000000009004165b9193959799909294969850565b60025481565b60045481565b60005460a060020a900460ff1681565b60005460015460025460035460045460a060020a90940460ff1693600160a060020a03909316925b9091929394565b60008060025b60005460a060020a900460ff16600581111561067957fe5b1461068757600191506107df565b60015433600160a060020a03908116911614156107da57600654600854600160a060020a03918216916370a08231911660006040516020015260405160e060020a63ffffffff8416028152600160a060020a039091166004820152602401602060405180830381600087803b15156106fe57600080fd5b6102c65a03f1151561070f57600080fd5b505050604051805191505060008111156107a557600654600154600160a060020a039182169163a9059cbb91168360006040516020015260405160e060020a63ffffffff8516028152600160a060020a0390921660048301526024820152604401602060405180830381600087803b151561078957600080fd5b6102c65a03f1151561079a57600080fd5b505050604051805150505b600080546004919074ff0000000000000000000000000000000000000000191660a060020a835b0217905550600091506107df565b600691505b50905600a165627a7a72305820736d982237bf1400e2c44309cce78a0604c8e0370cc290b85b89935ddde0ca210029';

            var orderProxy = $scope.web3.eth.contract($scope.orderProto);
            var order = orderProxy.new(customer,
                  trackHashes, trackAddress, trackPrices, $scope.settings.cargoCoinAddress, $scope.settings.platformAddress,
                  {from:customer, gas:$scope.settings.gas.addOrder, gasPrice:"20000000000", data: bin});

           var receipt = await $scope.waitForTxInfinite(order.transactionHash, true);
           console.log(receipt);

           var orderAddress = receipt.contract;//await $scope.makePromise2($scope.platform.getOrder, [numOrders]);
           order = await $scope.web3.eth.contract($scope.orderProto).at(orderAddress);
           console.log("ORDER: ");console.log(order);

           console.log(">>> order.price");
           var orderPrice = await $scope.makePromise2(order.price, []);
           console.log("ORDER PRICE: " + orderPrice);

           console.log(">>> cc.approve");
           await $scope.transact($scope.cc.approve,[orderAddress, orderPrice.valueOf(), {from:customer, to:$scope.settings.cargoCoinAddress, gas:$scope.settings.gas.approve}], $scope.settings.timeoutApprove);

           console.log(">>> order.begin");
           await $scope.transact(order.begin, [{from:customer, to:orderAddress, gas:$scope.settings.gas.begin}], $scope.settings.timeoutBegin);
           console.log("BEGIN FROM: " + customer);
           // send microCC to order

           //$scope.getBalanceCC(); // не надо, переходим на другую вкладку
           //$scope.preselectedOrder = orderAddress;
           $scope.showConfirmation("Информация", "Заказ " + order.address + " на сумму " + $scope.fromMicroCC(orderPrice) + " CC оплачен успешно");
           $scope.addOperation(0, orderAddress, $scope.items[0].pickup.address, $scope.items[$scope.items.length-1].dropdown.address, customer, orderPrice);
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
