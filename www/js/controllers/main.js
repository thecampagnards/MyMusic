'use strict'

angular.module('mymusicApp.controllers', [])

.controller('mainController', ['$scope', 'loginService', function ($scope, loginService) {
  // Logout
  $scope.logout = function () {
    loginService.logout()
  }
}])

.controller('errorController', function () {})

.controller('identificationController', ['$rootScope', '$scope', 'loginService', function ($rootScope, $scope, loginService) {
  $rootScope.showPlayer = false
  $scope.login = function (utilisateur) {
    loginService.login(utilisateur, $scope)
  }
}])

.controller('inscriptionController', ['$rootScope', '$scope', 'loginService', function ($rootScope, $scope, loginService) {
  $rootScope.showPlayer = false
  $scope.inscription = function (utilisateur) {
    loginService.inscription(utilisateur, $scope)
  }
}])
