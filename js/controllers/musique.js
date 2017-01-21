'use strict'

angular.module('mymusicApp.controllers')
// controlleur de la page musiques
.controller('musiquesController', ['$scope', 'musiqueFactory', '$document', function ($scope, musiqueFactory, $document) {
  $scope.orderByField = '-listen'
  $scope.sortReverse = false
  // recuperation des musiques
  musiqueFactory.get().then(function successCallback (response) {
    $scope.musiques = response.data
    $scope.loaded = true
  })
  // suppression d'une musique
  $scope.delete = function (item) {
    // check avant si l'utilisateur a le bon id
    if (item.utilisateur.id === $scope.utilisateur.id) {
      musiqueFactory.delete(item).then(function successCallback (response) {
        // delete item
      }, function errorCallback (response) {
        $scope.alert = response.data
        $document.scrollTop(0, 250)
      })
    }
  }
}])

// controlleur du form de la musique
.controller('musiqueFormController', ['$scope', '$routeParams', '$document', '$location', 'musiqueFactory', function ($scope, $routeParams, $document, $location, musiqueFactory) {
  $scope.musique = {}
  $scope.musique.state = 1
  $scope.action = 'add'

  // recuperation de la musique
  if ($routeParams.id) {
    musiqueFactory.find({id: $routeParams.id}).then(function successCallback (response) {
      // on check l'utilisateur
      if (response.data[0].utilisateur !== undefined && response.data[0].utilisateur.id !== $scope.utilisateur.id) {
        // $location.path('musiques')
      }
      $scope.musique = response.data[0]
      $scope.action = 'edit'
    })
  }

  // Post du formulaire
  $scope.submitForm = function () {
    if ($scope.musique.url !== undefined || $scope.musique.file !== undefined) {
      $scope.submitted = true
      musiqueFactory.add($scope.musique).then(function successCallback (response) {
        $scope.musique = response.data
        $scope.submitted = false
        $scope.success = true
      }, function errorCallback (response) {
        $scope.alert = response.data
        $document.scrollTop(0, 250)
        $scope.submitted = false
      })
    } else {
      $scope.alert = 'Vous devez ajouter soit une url soit un fichier mp3.'
      $document.scrollTop(0, 250)
    }
  }
  // reinitialisation du form
  $scope.reinitialiser = function () {
    $scope.musique = {}
  }
  // suppression de la musique
  $scope.delete = function () {
    musiqueFactory.delete($scope.musique).then(function successCallback (response) {
      $location.path('musiques')
    }, function errorCallback (response) {
      $scope.alert = response.data
      $document.scrollTop(0, 250)
    })
  }
}])
