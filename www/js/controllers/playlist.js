'use strict'

angular.module('mymusicApp.controllers')

.controller('playlistsController', ['$scope', '$http', 'CONFIG', 'loginService', function ($scope, $http, CONFIG, loginService) {
  loginService.isLogged().then(function () {
    // recuperation des playlists
    $http.get(CONFIG.API_URL + 'playlist/').then(function successCallback (response) {
      $scope.playlists = response.data
    })
  })
}])
