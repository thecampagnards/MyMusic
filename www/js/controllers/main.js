'use strict'

angular.module('mymusicApp.controllers', [])

.controller('mainController', ['$rootScope', '$scope', '$http', 'loginService', function ($rootScope, $scope, $http, loginService) {
  $rootScope.$on(function () {
    $rootScope.login = ''
  })
  // Logout
  $rootScope.logout = function () {
    loginService.logout()
  }
}])

.controller('errorController', function () {})

.controller('identificationController', ['$rootScope', '$scope', '$http', 'loginService', function ($rootScope, $scope, $http, loginService) {
  $scope.login = ''
  $scope.password = ''
  $scope.login = function (login) {
    loginService.login(login, $scope)
  }
}])
