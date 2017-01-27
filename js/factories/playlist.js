'use strict'

angular.module('mymusicApp.factories')

.factory('playlistFactory', ['$http', '$rootScope', 'CONFIG', function ($http, $rootScope, CONFIG) {
  return {
    get: function () {
      return $http.get(CONFIG.API_URL + 'playlists')
    },
    find: function (params) {
      return $http.get(CONFIG.API_URL + 'playlists/' + encodeURIComponent(JSON.stringify(params)))
    },
    push: function (playlist) {
      playlist.utilisateur = $rootScope.utilisateur
      return $http.post(CONFIG.API_URL + 'playlists', playlist)
    },
    delete: function (playlist) {
      if (playlist.utilisateur.id === $rootScope.utilisateur.id) {
        return $http.delete(CONFIG.API_URL + 'playlists/' + playlist.id)
      }
    }
  }
}])
