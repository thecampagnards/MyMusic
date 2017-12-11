'use strict'

angular.module('mymusicApp.controllers')

.controller('searchController', ['$scope', '$window', 'searchFactory', function ($scope, $window, searchFactory) {
  $scope.$watch('search', function (value) {
    // setTimeout(function () {}, 2000)
    // recuperation de la recherche
    if (value) {
      searchFactory.search(value).then(function successCallback (response) {
        $scope.musiques = response.data
        $scope.loaded = true
      })
    } else {
      $scope.musiques = null
      $scope.loaded = true
    }
  })

  // https://developers.google.com/youtube/iframe_api_reference?hl=fr
  $window.onYouTubePlayerAPIReady = function () {
    $scope.player = new YT.Player('ytplayer', {
      height: '0',
      width: '0',
      events: {
        'onReady': function (event) {},
        'onStateChange': function (event) {}
      }
    })
  }

  $scope.play = function (idPlayer, control) {
    var player = document.querySelector('#' + idPlayer)
    if (player.paused) {
      player.play()
      control = 'Pause'
    } else {
      player.pause()
      control = 'Play'
    }
  }

  $scope.resume = function (idPlayer) {
    var player = document.querySelector('#' + idPlayer)
    player.currentTime = 0
    player.pause()
  }
}])
