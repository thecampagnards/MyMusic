'use strict'

angular.module('mymusicApp.controllers')
// controlleur de la page musiques
.controller('musiquesController', ['$scope', '$routeParams', 'musiqueFactory', function ($scope, $routeParams, musiqueFactory) {
  if ($routeParams.order !== undefined) {
    $scope.orderByField = '-' + $routeParams.order
  }
  // recuperation des musiques
  musiqueFactory.get().then(function successCallback (response) {
    $scope.musiques = response.data
    $scope.loaded = true
  })
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
        $location.path('musiques')
      }
      $scope.musique = response.data[0]
      $scope.action = 'edit'
    })
  }

  // Post du formulaire
  $scope.submitForm = function () {
    if ($scope.musique.url !== undefined || $scope.musique.file !== undefined) {
      $scope.submitted = true
      musiqueFactory.push($scope.musique).then(function successCallback (response) {
        // on redirige vers la nouvelle musique
        // $location.path('musiques/editer/' + response.data.id)
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
}])
