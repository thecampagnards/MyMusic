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

.filter('dateToISO', function () {
  return function (badTime) {
    return badTime.replace(/(.+) (.+)/, '$1T$2+0100')
  }
})

.filter('sumOfValue', function () {
  return function (data, key) {
    if (angular.isUndefined(data) || angular.isUndefined(key)) {
      return 0
    }
    var sum = 0
    angular.forEach(data, function (value) {
      sum = sum + parseInt(value[key])
    })
    return sum
  }
})
