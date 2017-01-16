'use strict'

angular.module('mymusicApp.factories')

.factory('playlistFactory', ['$http', '$rootScope', 'CONFIG', function ($http, $rootScope, CONFIG) {
  return {
    get: function () {
      return $http.get(CONFIG.API_URL + 'playlists')
    },
    find: function (params) {
      $http.get(CONFIG.API_URL + 'playlists/' + encodeURIComponent(JSON.stringify(params)))
    },
    add: function (playlist) {
      playlist.utilisateur = $rootScope.utilisateur
      return $http.post(CONFIG.API_URL + 'playlists', playlist)
    },
    edit: function (playlist) {
      return $http.put(CONFIG.API_URL + 'playlists/' + playlist.id, playlist)
    },
    delete: function (playlist) {
      if (playlist.utilisateur.id === $rootScope.utilisateur.id) {
        return $http.delete(CONFIG.API_URL + 'playlists/' + playlist.id)
      }
    }
  }
}])
