'use strict';


var app = angular.module('dashboardApp', [
  'ngCookies',
  'ngResource',
  'ngAnimate',
  'ngSanitize',
  //'angular-ui-bootstrap',
  'ui.router',
  'ui.bootstrap',
  'xeditable'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

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

    app.controller('MainCtrl', ['$scope', function($scope) {
        $scope.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log($scope.web3.eth);
        console.log($scope.web3.eth.accounts);
        $scope.reqs = [
                            {
                                desc: "Отправитель",
                                account: $scope.web3.eth.accounts[0],
                                name: "ООО ТехноПарк",
                                INN: "7710152113",
                                OGRN: "1027700505348"
                            },
                            {
                                desc: "Получатель",
                                account: $scope.web3.eth.accounts[1],
                                name: "ООО Сельхозпродукция",
                                INN: "7710152213",
                                OGRN: "1027700805346"
                            }
                        ];
        $scope.price = 28000;
        $scope.items = [
                            {
                                id: 0,
                                name: "item1",
                                desc: "Наряд 1",
                                pickup: "Россия, Москва, ул. Советская, 18",
                                dropdown: "Россия, Химки, ул. Строителей, 42",
                                carrier: {
                                  account: $scope.web3.eth.accounts[2],
                                  name: "ООО Деловые линии",
                                  INN: "7710132243",
                                  OGRN: "1027700895341"
                                },
                                price: 10000,
                                date: new Date(2017, 9, 10)
                            },
                            {
                                id: 1,
                                name: "item2",
                                desc: "Наряд 2",
                                pickup: "Россия, Химки, ул. Строителей, 42",
                                dropdown: "Россия, Клин, ул. Главная, 1",
                                carrier: {
                                  account: $scope.web3.eth.accounts[3],
                                  name: "ООО ПЭК",
                                  INN: "7710132548",
                                  OGRN: "1027700195347"
                                },
                                price: 18000,
                                date: new Date(2017, 9, 22)
                            }
                        ];

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

        $scope.addTrack = function() {
          var newItem =  {
              id: $scope.items.length,
              name: "item" + ($scope.items.length + 1),
              desc: "Наряд "+ ($scope.items.length + 1),
              pickup: "Россия, ",
              dropdown: "Россия, ",
              carrier: {
                account: $scope.web3.eth.accounts[$scope.items.length % 10],
                name: "ООО ",
                INN: "7710",
                OGRN: "1027"
              },
              price: 1000,
              date: new Date(2017, 9, 22)
          };

          $scope.items.push(newItem);
          $scope.calcPrice();
        };

        $scope.onChange = function(field) {
          $scope.calcPrice();
        }

        $scope.deleteTrack = function(id) {
          $scope.items.splice(id, 1);
          for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].id = i;
            $scope.items[i].name = "item" + (i + 1);
            $scope.items[i].desc = "Наряд " + (i + 1);
          }
          $scope.calcPrice();
        }

        $scope.transfer = function() {
        }

        $scope.cancel = function() {
        }

        $scope.default = $scope.items[2];



  /*
        $scope.logger = [];
      $scope.clearlogs = function(){
        $scope.logger = [];
      };

      $scope.status = {
        open: false
      };
      $scope.groups = [
        {
          title: "Accordion Group 1",
          content: "Accordion group 1 content.",
          open: true
        },
        {
          title: "Accordion Group 2",
          content: "Accordion group 2 content.",
          open: false
        }
      ];

      $scope.$watch('status.open', function(newval, oldval){
          if(oldval !== newval) {
              var state = newval ? 'opened' : 'closed';
              $scope.logger.push('Static accordion was '+state);
          }
      });

      $scope.toggleaccordion = function() {
        $scope.status.open = !$scope.status.open;
      };

      $scope.$watch('groups', function(groups){
        angular.forEach(groups, function(group, idx){
          if (group.open) {
            $scope.logger.push(group.title +' was opened at '+new Date());
          }
        })
      }, true);

      $scope.$watch('groups', function(groups){
        angular.forEach(groups, function(newval, oldval){
          if (oldval.open !==  newval.open && newval.open === true) {
            //console.log("Opened group with idx: "+idx);
            $scope.logger.push(newval.title +' was opened at '+new Date());
          }
        })
      }, true);

      $scope.$watch('groups', function(newval, oldval){
        for (var i = 0; i < $scope.groups.length; i++) {
          if(oldval[i].open !==  newval[i].open && newval[i].open === true) {
            $scope.logger.push(newval[i].title +' was opened at '+new Date());
          }
        }
      }, true); */

    }]);
