'use strict'

angular.module('mymusicApp.controllers')

.controller('homeController', ['$scope', 'musiqueFactory', 'playlistFactory', function ($scope, musiqueFactory, playlistFactory) {
  // recuperation des musiques
  musiqueFactory.get().then(function successCallback (response) {
    $scope.musiques = response.data
  })
  // recuperation des playlists
  playlistFactory.get().then(function successCallback (response) {
    $scope.playlists = response.data
  })
}])
