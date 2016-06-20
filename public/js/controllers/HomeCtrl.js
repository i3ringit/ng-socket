'use strict'

var HomeCtrl = function($scope, $mdSidenav, $timeout, $log) {

  $scope.toggleMainNav = toggleMainNav('mainNav');
  $scope.closeMainNav = closeMainNav('mainNav');

  /**
   * Supplies a function that will continue to operate until the time
   * is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  function toggleMainNav(navID) {
    return function() {
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug('Nav(' + navID + ') opened.');
        }(navID));
    };
  }

  function closeMainNav(navID) {
    return function() {
      $mdSidenav(navID).close()
        .then(function() {
          $log.debug('Nav(' + navID + ') closed.')
        }(navID));
    };
  }

  // Menu items
  $scope.menu = [{
    link: '',
    title: 'Dashboard',
    icon: 'dashboard'
  }, {
    link: '',
    title: 'Friends',
    icon: 'people'
  }, {
    link: '',
    title: 'Messages',
    icon: 'message'
  }];

  // Admin items
  $scope.admin = [{
    link: '',
    title: 'Trash',
    icon: 'delete'
  }, {
    link: '',
    title: 'Settings',
    icon: 'settings'
  }];


}; // end mdcAppController

/**
 * $Inject Property Annotation
 * To allow minifiers to inject the services
 * See: https://docs.angularjs.org/guide/di
 */
HomeCtrl.$inject = ['$scope', '$mdSidenav', '$timeout', '$log'];

angular
  .module('mdcApp')
  .controller('HomeCtrl', HomeCtrl);
