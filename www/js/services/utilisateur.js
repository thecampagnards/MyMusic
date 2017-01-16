'use strict'

angular.module('mymusicApp.services')

.factory('utilisateurFactory', ['$http', '$location', 'sessionFactory', 'CONFIG', '$rootScope', function ($http, $location, sessionFactory, CONFIG, $rootScope) {
  var init = function (response) {
    sessionFactory.set('utilisateur', response.data)
    $rootScope.utilisateur = response.data
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
    $location.path('home')
  }

  return {
    inscription: function (utilisateur) {
      sessionFactory.destroy('utilisateur')
      $http.post(CONFIG.API_URL + 'utilisateur', utilisateur).then(function successCallback (response) {
        init(response)
      }, function errorCallback (response) {
        $rootScope.inscriptionMessage = "Erreur lors de l'inscription."
      })
    },
    login: function (utilisateur) {
      sessionFactory.destroy('utilisateur')
      $http.post(CONFIG.API_URL + 'login', utilisateur).then(function successCallback (response) {
        init(response)
      }, function errorCallback (response) {
        $rootScope.loginMessage = "Erreur d'identification."
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
