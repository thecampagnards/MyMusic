'use strict'

angular.module('mymusicApp.factories')

.factory('utilisateurFactory', ['$http', '$location', 'sessionFactory', 'CONFIG', '$rootScope', function ($http, $location, sessionFactory, CONFIG, $rootScope) {
  var init = function (response) {
    sessionFactory.set('utilisateur', response.data)
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
    $location.path('home')
  }

  return {
    historique: function () {
      return $http.get(CONFIG.API_URL + 'utilisateur/historique')
    },
    inscription: function (utilisateur) {
      sessionFactory.destroy('utilisateur')
      $http.post(CONFIG.API_URL + 'utilisateur', utilisateur).then(function successCallback (response) {
        init(response)
      }, function errorCallback (response) {
        $rootScope.inscriptionMessage = response.data
      })
    },
    login: function (utilisateur) {
      sessionFactory.destroy('utilisateur')
      $http.post(CONFIG.API_URL + 'login', utilisateur).then(function successCallback (response) {
        init(response)
      }, function errorCallback (response) {
        $rootScope.loginMessage = response.data
      })
    },
    logout: function () {
      sessionFactory.destroy('utilisateur')
      $rootScope.isLogged = false
      $rootScope.utilisateur = {}
      $rootScope.utilisateur.id = null
    },
    isLogged: function () {
      try {
        $rootScope.utilisateur = sessionFactory.get('utilisateur')
        $rootScope.isLogged = true
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.utilisateur.token
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
