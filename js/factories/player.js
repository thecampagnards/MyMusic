'use strict'

angular.module('mymusicApp.factories')

.factory('playerFactory', ['$timeout', 'angularPlayer', 'sessionFactory', function ($timeout, angularPlayer, sessionFactory) {
  return {
    addMusiques: function (musiques) {
      $timeout(function () {
        for (var i = 0; i < musiques.length; i++) {
          angularPlayer.addTrack(musiques[i])
        }
      }, 0, false)
    },
    init: function () {
      $timeout(function () {
        var playlist = sessionFactory.get('playlist')
        var musique = sessionFactory.get('musique')
        var isPlaying = sessionFactory.get('isPlaying')
        // @TODO a faire placer le curseur sur la bonne position
        var position = sessionFactory.get('position')
        if (playlist !== null) {
          for (var i = 0; i < playlist.length; i++) {
            angularPlayer.addTrack(playlist[i])
          }
          if (musique !== undefined) {
            if (isPlaying) {
              angularPlayer.playTrack(musique)
            } else {
              // @TODO voir pour l'affichage
              angularPlayer.setCurrentTrack(musique)
            }
          }
        }
      }, 0, false)
    }
  }
}])
