'use strict'

angular.module('mymusicApp.controllers')

.controller('homeController', ['$scope', '$http', 'CONFIG', function ($scope, $http, CONFIG) {
  // recuperation des musiques
  $http.get(CONFIG.API_URL + 'musiques').then(function successCallback (response) {
    $scope.musiques = response.data
  })
}])
