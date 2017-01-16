'use strict'

angular.module('mymusicApp.factories')

.factory('musiqueFactory', ['$http', '$rootScope', 'CONFIG', function ($http, $rootScope, CONFIG) {
  return {
    get: function () {
      return $http.get(CONFIG.API_URL + 'musiques')
    },
    find: function (params) {
      return $http.get(CONFIG.API_URL + 'musiques/' + encodeURIComponent(JSON.stringify(params)))
    },
    add: function (musique) {
      musique.utilisateur = $rootScope.utilisateur
      console.log(musique)
      return $http.post(CONFIG.API_URL + 'musiques', musique)
    },
    edit: function (musique) {
      musique.utilisateur = $rootScope.utilisateur
      return $http.put(CONFIG.API_URL + 'musiques/' + musique.id, musique)
    },
    delete: function (musique) {
      if (musique.utilisateur.id === $rootScope.utilisateur.id) {
        return $http.delete(CONFIG.API_URL + 'musiques/' + musique.id)
      }
    }
  }
}])
