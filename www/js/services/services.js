'use strict'

angular.module('mymusicApp.services', [])
.factory('loginService', ['$http', '$location', 'sessionService', 'CONFIG', '$rootScope', function ($http, $location, sessionService, CONFIG, $rootScope) {
  return {
    inscription: function (utilisateur, $scope) {
      sessionService.destroy('utilisateur')
      $http.post(CONFIG.API_URL + 'utilisateur', utilisateur).then(function successCallback (response) {
        sessionService.set('utilisateur', response.data)
        $rootScope.utilisateur = response.data
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
        $location.path('home')
      }, function errorCallback (response) {
        $scope.inscriptionMessage = "Erreur lors de l'inscription."
      })
    },
    login: function (utilisateur, $scope) {
      sessionService.destroy('utilisateur')
      $http.post(CONFIG.API_URL + 'login', utilisateur).then(function successCallback (response) {
        sessionService.set('utilisateur', response.data)
        $rootScope.utilisateur = response.data
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
        $location.path('home')
      }, function errorCallback (response) {
        $scope.loginMessage = "Erreur d'identification."
      })
    },
    logout: function () {
      sessionService.destroy('utilisateur')
      $rootScope.isLogged = false
      $rootScope.utilisateur = {}
      $rootScope.utilisateur.id = null
    },
    isLogged: function () {
      try {
        $rootScope.utilisateur = sessionService.get('utilisateur')
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.utilisateur.token
        $rootScope.isLogged = true
        return true
      } catch (e) {
        $rootScope.isLogged = false
        $rootScope.utilisateur = {}
        $rootScope.utilisateur.id = null
        return false
      }
    }
  }
}])

.factory('sessionService', function () {
  return {
    set: function (key, value) {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      return window.sessionStorage.setItem(key, value)
    },
    get: function (key) {
      try {
        return JSON.parse(window.sessionStorage.getItem(key))
      } catch (e) {
        return window.sessionStorage.getItem(key)
      }
    },
    destroy: function (key) {
      return window.sessionStorage.removeItem(key)
    }
  }
})

.service('fileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function (file, uploadUrl) {
    var fd = new FormData()
    fd.append('file', file)
    return $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
  }
}])
