'use strict'

angular.module('mymusicApp.controllers')

.controller('monCompteController', ['$scope', 'utilisateurFactory', 'playlistFactory', 'musiqueFactory', function ($scope, utilisateurFactory, playlistFactory, musiqueFactory) {
  // recuperation des playlists de l'utilisateur
  playlistFactory.find({id_utilisateur: $scope.utilisateur.id}).then(function successCallback (response) {
    $scope.playlists = response.data
    $scope.loaded = true
  })
  // recuperation des musiques de l'utilisateur
  musiqueFactory.find({id_utilisateur: $scope.utilisateur.id}).then(function successCallback (response) {
    $scope.musiques = response.data
    $scope.loaded = true
  })
  // recuperation de l'historique
  utilisateurFactory.historique().then(function successCallback (response) {
    $scope.historiques = response.data
    $scope.loaded = true
  })

  $scope.addPlaylist = playlistFactory.addPlaylist
}])
