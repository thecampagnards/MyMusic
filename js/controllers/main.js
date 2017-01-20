'use strict'

angular.module('mymusicApp.controllers', [])

.controller('mainController', ['$scope', 'utilisateurFactory', 'musiqueFactory', 'angularPlayer', 'sessionFactory', 'playlistFactory', '$timeout', function ($scope, utilisateurFactory, musiqueFactory, angularPlayer, sessionFactory, playlistFactory, $timeout) {
  $scope.logout = function () {
    utilisateurFactory.logout()
  }

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
