'use strict'

angular.module('mymusicApp.controllers')

.controller('playlistsController', ['$scope', 'playlistFactory', 'angularPlayer', function ($scope, playlistFactory, angularPlayer) {
  // recuperation des playlists
  playlistFactory.get().then(function successCallback (response) {
    $scope.playlists = response.data
    $scope.loaded = true
  })

  $scope.addtoPlaylist = function (playlist) {
    for (var i = 0; i < playlist.musiques.length; i++) {
      angularPlayer.addTrack(playlist.musiques[i])
    }
  }
}])

// controller de form playlist
.controller('playlistFormController', ['$scope', 'playlistFactory', 'musiqueFactory', '$routeParams', '$document', '$location', function ($scope, playlistFactory, musiqueFactory, $routeParams, $document, $location) {
  $scope.playlist = {}
  $scope.playlist.musiques = []
  $scope.action = 'add'

  // recuperation des musiques
  musiqueFactory.get().then(function successCallback (response) {
    $scope.musiques = response.data
  })

  // recuperation de la playlist
  if ($routeParams.id) {
    playlistFactory.find({id: $routeParams.id}).then(function successCallback (response) {
      // on check l'utilisateur
      if (response.data[0].utilisateur.id !== $scope.utilisateur.id) {
        $location.path('playlists')
      }
      $scope.playlist = response.data[0]
      $scope.action = 'edit'
    })
  }

  // Post du formulaire
  $scope.submitForm = function () {
    if ($scope.playlist.musiques !== undefined && $scope.playlist.musiques.length !== 0) {
      $scope.submitted = true
      // edit
      if ($scope.action === 'edit') {
        playlistFactory.edit($scope.playlist).then(function successCallback (response) {
          $location.path('playlists')
        }, function errorCallback (response) {
          $scope.alert = response.data
          $document.scrollTop(0, 250)
        })
      // Ajout
      } else {
        playlistFactory.add($scope.playlist).then(function successCallback (response) {
          $location.path('playlists')
        }, function errorCallback (response) {
          $scope.alert = response.data
          $document.scrollTop(0, 250)
        })
      }
    } else {
      $scope.alert = 'Vous devez ajouter des musique à votre playlist.'
      $document.scrollTop(0, 250)
    }
  }

  // + et - de la liste product
  $scope.addMusiqueList = function (items) {
    // fix pour les boutons simples
    if (!angular.isArray(items)) {
      items = [items]
    }
    // si vide on init array
    if (!$scope.playlist.musiques) {
      $scope.playlist.musiques = []
    }

    angular.forEach(items, function (item) {
      var exist = false
      // on regarde si il existe pas deja pour ajouter
      angular.forEach($scope.playlist.musiques, function (value, key) {
        if (value.id === item.id) {
          exist = true
        }
      })
      // sinon on l'ajoute
      if (!exist) {
        $scope.playlist.musiques.push(item)
      }
    })
  }

  $scope.deleteMusiqueList = function (items) {
    // fix pour les boutons simples
    if (!angular.isArray(items)) {
      items = [items]
    }
    angular.forEach(items, function (item) {
      // on parcours le tableau pour l'enlever
      angular.forEach($scope.playlist.musiques, function (value, key) {
        if (value.id === item.id) {
          $scope.playlist.musiques.splice(key, 1)
        }
      })
    })
  }

  // reinitialisation du form
  $scope.reinitialiser = function () {
    $scope.playlist = null
  }
  // supression de la playlist
  $scope.delete = function () {
    playlistFactory.delete($scope.playlist).then(function successCallback (response) {
      $location.path('playlists')
    }, function errorCallback (response) {
      $scope.alert = response.data
      $document.scrollTop(0, 250)
    })
  }
}])
