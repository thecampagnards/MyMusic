'use strict'

angular.module('mymusicApp.controllers', [])

.controller('mainController', ['$scope', 'musiqueFactory', 'angularPlayer', 'sessionFactory', '$timeout', function ($scope, musiqueFactory, angularPlayer, sessionFactory, $timeout) {

  $scope.isNavCollapsed = true
  $scope.isCollapsed = false
  $scope.isCollapsedHorizontal = false

  // watch de la current musique pour les stats
  $scope.$on('track:id', function (event, args) {
    sessionFactory.set('musique', args)
    if (args !== undefined) {
      musiqueFactory.listen(args)
    }
  })

  // watch si le player est en cours
  $scope.$on('music:isPlaying', function (event, args) {
    sessionFactory.set('isPlaying', args)
  })

  // watch de la current position
  $scope.$on('currentTrack:position', function (event, args) {
    sessionFactory.set('position', args)
    if ($scope.timer !== undefined && $scope.timer !== null) {
      var timer = ($scope.timer.getMinutes() + $scope.timer.getHours() * 60) * 1000
      if (args >= timer) {
        $timeout(function () {
          angularPlayer.nextTrack()
        }, 0, false)
      }
    }
  })

  // watch de la playlist
  $scope.$on('player:playlist', function (event, args) {
    sessionFactory.set('playlist', args)
  })

  $scope.sortableOptions = {
    // @TODO voir pour eviter de stopper l'actuelle
    stop: function (e, ui) {
      /*var playlist = $scope.playlist
      var player = angularPlayer.getPlaylist()
      var current = angularPlayer.getCurrentTrack()
      for (var i = 0; i < player.length; i++) {
        if (player[i].id !== current) {
          angularPlayer.removeSong(player[i].id)
        }
        //angularPlayer.addTrack(playlist[i])
      }
*/
      /*
      angularPlayer.clearPlaylist(function () {
        for (var i = 0; i < playlist.length; i++) {
        }
        angularPlayer.play()
      })*/
    },
    axis: 'y'
  }
}])

.controller('errorController', function () {})

.controller('identificationController', ['$rootScope', '$scope', 'utilisateurFactory', function ($rootScope, $scope, utilisateurFactory) {
  $rootScope.showPlayer = false
  $scope.login = function (utilisateur) {
    utilisateurFactory.login(utilisateur)
  }
}])

.controller('inscriptionController', ['$rootScope', '$scope', 'utilisateurFactory', function ($rootScope, $scope, utilisateurFactory) {
  $rootScope.showPlayer = false
  $scope.inscription = function (utilisateur) {
    utilisateurFactory.inscription(utilisateur)
  }
}])
