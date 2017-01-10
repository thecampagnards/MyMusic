'use strict'

angular.module('mymusicApp.controllers')
// controlleur de la page musiques
.controller('musiquesController', ['$rootScope', '$scope', '$http', 'CONFIG', 'loginService', '$document', function ($rootScope, $scope, $http, CONFIG, loginService, $document) {
  $scope.orderByField = '-id'
  $scope.sortReverse = false
  loginService.isLogged().then(function () {
    // recuperation des musiques
    $http.get(CONFIG.API_URL + 'musique/').then(function successCallback (response) {
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].url = response.data[i].link
      }
      $scope.musiques = response.data
      $scope.loaded = true
    })
  })

  // suppression d'une musique
  $scope.delete = function (item) {
    // check avant si l'utilisateur a le bon id
    if (item.utilisateur.id === $rootScope.user.id) {
      $http.delete(CONFIG.API_URL + 'product/' + item.id).then(function successCallback (response) {
        item.available = 0
      }, function errorCallback (response) {
        $scope.alert = response.data
        $document.scrollTop(0, 250)
      })
    }
  }
}])

// controlleur du form de la musique
.controller('musiqueFormController', ['$scope', '$http', '$routeParams', '$document', '$location', 'CONFIG', 'loginService', 'fileUpload', function ($scope, $http, $routeParams, $document, $location, CONFIG, loginService, fileUpload) {
  $scope.musique = {}
  $scope.action = 'add'

  loginService.isLogged().then(function () {
    // recuperation de la musique
    if ($routeParams.id) {
      $http.get(CONFIG.API_URL + 'musique/' + $routeParams.id).then(function successCallback (response) {
        $scope.musique = response.data
        $scope.action = 'edit'
      })
    }
  })

  // Post du formulaire
  $scope.submitForm = function () {
    $scope.submitted = true
    // edit
    if ($scope.action === 'edit') {
      $http.put(CONFIG.API_URL + 'musique/' + $scope.musique.id, $scope.musique).then(function successCallback (response) {
        $scope.musique = response.data
        if ($scope.musiqueImage) {
          fileUpload.uploadFileToUrl($scope.musiqueImage, CONFIG.API_URL + 'musique/image/' + $scope.musique.id).then(function successCallback () {
            $location.path('musiques')
          })
        } else {
          $location.path('musiques')
        }
      }, function errorCallback (response) {
        $scope.alert = response.data
        $document.scrollTop(0, 250)
      })
    } else {
      // Ajout
      $http.post(CONFIG.API_URL + 'musique/', $scope.musique).then(function successCallback (response) {
        $scope.musique = response.data
        if ($scope.musiqueImage) {
          fileUpload.uploadFileToUrl($scope.musiqueImage, CONFIG.API_URL + 'musique/image/' + $scope.musique.id).then(function successCallback () {
            $location.path('musiques')
          })
        } else {
          $location.path('musiques')
        }
      }, function errorCallback (response) {
        $scope.alert = response.data
        $document.scrollTop(0, 250)
      })
    }
  }
  // reinitialisation du form
  $scope.reinitialiser = function () {
    $scope.musique = null
  }
  // suppression de la musique
  $scope.delete = function () {
    $http.delete(CONFIG.API_URL + 'musique/' + $scope.musique.id).then(function successCallback (response) {
      $location.path('musiques')
    }, function errorCallback (response) {
      $scope.alert = response.data
      $document.scrollTop(0, 250)
    })
  }
}])
