'use strict'

angular.module('mymusicApp.factories')

.factory('sessionFactory', ['$cookies', function ($cookies) {
  return {
    set: function (key, value) {
      return $cookies.putObject(key, value)
    },
    get: function (key) {
      return $cookies.getObject(key)
    },
    destroy: function (key) {
      return $cookies.remove(key)
    }
  }
}])
