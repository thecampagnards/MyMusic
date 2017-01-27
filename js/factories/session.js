'use strict'

angular.module('mymusicApp.factories')

.factory('sessionFactory', function () {
  return {
    set: function (key, value) {
      return window.localStorage.setItem(key, angular.toJson(value))
    },
    get: function (key) {
      try {
        return angular.fromJson(window.localStorage.getItem(key))
      } catch (e) {
        return window.localStorage.getItem(key)
      }
    },
    destroy: function (key) {
      return window.localStorage.removeItem(key)
    }
  }
})
