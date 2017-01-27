'use strict'

angular.module('mymusicApp.filters', [])

.filter('secondsToDateTime', [function () {
  return function (seconds) {
    return new Date(1970, 0, 1).setSeconds(seconds)
  }
}])

.filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined) {
      start = +start
      return input.slice(start)
    }
  }
})
