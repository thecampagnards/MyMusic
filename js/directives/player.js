'use strict'

angular.module('mymusicApp.directives')

.directive('mixPlaylist', ['angularPlayer', function (angularPlayer) {
  return {
    restrict: 'EA',
    link: function (scope, element, attrs) {
      element.bind('click', function (event) {
        // on recupere les musiques
        var playlist = angularPlayer.getPlaylist()

        // melange des musiques
        var j = 0
        var valI = ''
        var valJ = valI
        var l = playlist.length - 1
        while (l > -1) {
          j = Math.floor(Math.random() * l)
          valI = playlist[l]
          valJ = playlist[j]
          playlist[l] = valJ
          playlist[j] = valI
          l = l - 1
        }

        // on clean la playlist et on reafecte les musiques mélangées
        angularPlayer.clearPlaylist(function (data) {
          for (var i = 0; i < playlist.length; i++) {
            angularPlayer.addTrack(playlist[i])
          }
        })
      })
    }
  }
}])

.directive('playMusiques', ['playerFactory', function (playerFactory) {
  return {
    restrict: 'EA',
    scope: {
      musiques: '=playMusiques'
    },
    link: function (scope, element, attrs) {
      element.bind('click', function (event) {
        playerFactory.addMusiques(scope.musiques)
      })
    }
  }
}
])
