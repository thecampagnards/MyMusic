'use strict'

angular.module('mymusicApp.controllers', [])

.controller('mainController', ['$scope', 'utilisateurFactory', function ($scope, utilisateurFactory) {
  $scope.logout = function () {
    utilisateurFactory.logout()
  }
}])

.controller('errorController', function () {})

.controller('identificationController', ['$rootScope', '$scope', 'utilisateurFactory', function ($rootScope, $scope, utilisateurFactory) {
  $rootScope.showPlayer = false
  $scope.login = function (utilisateur) {
    utilisateurFactory.login(utilisateur, $scope)
  }
}])

.controller('inscriptionController', ['$rootScope', '$scope', 'utilisateurFactory', function ($rootScope, $scope, utilisateurFactory) {
  $rootScope.showPlayer = false
  $scope.inscription = function (utilisateur) {
    utilisateurFactory.inscription(utilisateur)
  }
}])
