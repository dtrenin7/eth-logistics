'use strict';

/*angular.module('dashboardApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.oneAtATime = true;
//    $http.get('/api/things').success(function(awesomeThings) {
//      $scope.awesomeThings = awesomeThings;
//    });
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

  });

  angular.module('dashboardApp').controller('DyanmicAccordionCtrl', function($scope) {
    $scope.logger = [];
    $scope.clearlogs = function(){
      $scope.logger = [];
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

    $scope.$watch('groups', function(newval, oldval){
      for (i = 0; i < $scope.groups.length; i++) {
        if(oldval[i].open !==  newval[i].open && newval[i].open === true) {
          $scope.logger.push(newval[i].title +' was opened at '+new Date());
        }
      }
    }, true);

  }); */
/*
  angular.module('dashboardApp').controller('ItemController', ['$scope', function (scope) {

                scope.$parent.isopen = (scope.$parent.default === scope.item);

                scope.$watch('isopen', function (newvalue, oldvalue, scope) {
                    scope.$parent.isopen = newvalue;
                });

            }]);

  angular.module('dashboardApp').controller('MainCtrl', function($scope) {
      scope.items = [
                          {
                              name: "item1",
                              desc: "Item 1",
                              subitems: [
                                  {
                                      name: "subitem1",
                                      desc: "Sub-Item 1"
                                  },
                                  {
                                      name: "subitem2",
                                      desc: "Sub-Item 2"
                                  },
                                  {
                                      name: "subitem2",
                                      desc: "Sub-Item 2"
                                  }]
                          },
                          {
                              name: "item2",
                              desc: "Item 2",
                              subitems: [
                                  {
                                      name: "subitem1",
                                      desc: "Sub-Item 1"
                                  },
                                  {
                                      name: "subitem2",
                                      desc: "Sub-Item 2"
                                  },
                                  {
                                      name: "subitem2",
                                      desc: "Sub-Item 2"
                                  }]
                          },
                          {
                              name: "item3",
                              desc: "Item 3",
                              subitems: [
                                  {
                                      name: "subitem1",
                                      desc: "Sub-Item 1"
                                  },
                                  {
                                      name: "subitem2",
                                      desc: "Sub-Item 2"
                                  },
                                  {
                                      name: "subitem2",
                                      desc: "Sub-Item 2"
                                  }]
                          }
                      ];

      scope.default = scope.items[2];

*/

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

//    });
