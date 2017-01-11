'use strict'

angular.module('mymusicApp.controllers')

.controller('playlistsController', ['$scope', '$http', 'CONFIG', 'loginService', 'angularPlayer', function ($scope, $http, CONFIG, loginService, angularPlayer) {
  loginService.isLogged().then(function () {
    // recuperation des playlists
    $http.get(CONFIG.API_URL + 'playlists').then(function successCallback (response) {
      $scope.playlists = response.data
      $scope.loaded = true
    })
  })

  $scope.addtoPlaylist = function (playlist) {
    for (var i = 0; i < playlist.musiques.length; i++) {
      angularPlayer.addTrack(playlist.musiques[i])
    }
  }
}])

// controller de form playlist
.controller('playlistFormController', ['$rootScope', '$scope', '$http', '$routeParams', '$document', '$location', 'CONFIG', 'loginService', function ($rootScope, $scope, $http, $routeParams, $document, $location, CONFIG, loginService) {
  $scope.playlist = {}
  $scope.playlist.musiques = []
  $scope.action = 'add'

  loginService.isLogged().then(function () {
    // recuperation des musiques
    $http.get(CONFIG.API_URL + 'musiques').then(function successCallback (response) {
      $scope.musiques = response.data
    })

    // recuperation de la playlist
    if ($routeParams.id) {
      $http.get(CONFIG.API_URL + 'playlists/' + encodeURIComponent(JSON.stringify({id: $routeParams.id}))).then(function successCallback (response) {
        $scope.playlist = response.data[0]
        $scope.action = 'edit'
      })
    }
  })

  // Post du formulaire
  $scope.submitForm = function () {
    if ($scope.playlist.musiques !== undefined && $scope.playlist.musiques.length !== 0) {
      $scope.submitted = true
      $scope.playlist.utilisateur = $rootScope.user
      // edit
      if ($scope.action === 'edit') {
        $http.put(CONFIG.API_URL + 'playlists/' + $scope.playlist.id, $scope.playlist).then(function successCallback (response) {
          $location.path('playlists')
        }, function errorCallback (response) {
          $scope.alert = response.data
          $document.scrollTop(0, 250)
        })
      // Ajout
      } else {
        $http.post(CONFIG.API_URL + 'playlists/', $scope.playlist).then(function successCallback (response) {
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
    $http.delete(CONFIG.API_URL + 'playlist/' + $routeParams.id).then(function successCallback (response) {
      $location.path('playlists')
    }, function errorCallback (response) {
      $scope.alert = response.data
      $document.scrollTop(0, 250)
    })
  }
}])
