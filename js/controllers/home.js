'use strict'

angular.module('mymusicApp.controllers')

.controller('homeController', ['$scope', 'musiqueFactory', function ($scope, musiqueFactory) {
  // recuperation des musiques
  musiqueFactory.get().then(function successCallback (response) {
    $scope.musiques = response.data
  })
}])
