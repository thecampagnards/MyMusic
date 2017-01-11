'use strict'

angular.module('mymusicApp.controllers')

.controller('homeController', ['$scope', '$http', 'CONFIG', 'loginService', function ($scope, $http, CONFIG, loginService) {
  loginService.isLogged().then(function () {
    // recuperation des musiques
    $http.get(CONFIG.API_URL + 'musiques').then(function successCallback (response) {
      $scope.musiques = response.data
    })
  })
}])
