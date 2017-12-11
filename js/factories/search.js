'use strict'

angular.module('mymusicApp.factories')

.factory('searchFactory', ['$http', 'CONFIG', function ($http, CONFIG) {
  return {
    search: function (search) {
      console.log(encodeURIComponent(search))
      return $http.get(CONFIG.API_URL + 'search?q=' + encodeURIComponent(search))
    }
  }
}])
