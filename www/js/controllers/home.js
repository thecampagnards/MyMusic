'use strict'

angular.module('mymusicApp.controllers')

.controller('homeController', ['$scope', '$http', 'CONFIG', 'loginService', function ($scope, $http, CONFIG, loginService) {
  loginService.isLogged().then(function () {
    // recuperation des musiques
    $http.get(CONFIG.API_URL + 'musique/').then(function successCallback (response) {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].url = response.data[i].link
      }
      $scope.musiques = response.data
    })
  })
}])
