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
    push: function (musique) {
      musique.utilisateur = $rootScope.utilisateur
      return $http({
        method: 'POST',
        url: CONFIG.API_URL + 'musiques',
        headers: {
          'Content-Type': undefined
        },
        data: {
          musique: musique,
          file: musique.file,
          cover: musique.cover
        },
        transformRequest: function (data) {
          var formData = new FormData()
          angular.forEach(data, function (value, key) {
            if (key === 'musique') {
              value = JSON.stringify(value)
            }
            formData.append(key, value)
          })
          return formData
        }
      })
    },
    delete: function (musique) {
      if (musique.utilisateur.id === $rootScope.utilisateur.id) {
        return $http.delete(CONFIG.API_URL + 'musiques/' + musique.id)
      }
    },
    listen: function (musiqueId) {
      $http.get(CONFIG.API_URL + 'musiques/listen/' + musiqueId).then(function successCallback (response) {
        return response
      })
    }
  }
}])
