'use strict'

angular.module('mymusicApp.directives')

.directive('deletePlaylist', ['playlistFactory', '$rootScope', '$document', function (playlistFactory, $rootScope, $document) {
  return {
    restrict: 'EA',
    scope: {
      playlist: '=deletePlaylist'
    },
    link: function (scope, element, attrs) {
      element.bind('click', function (event) {
        // check avant si l'utilisateur a le bon id
        if (scope.playlist.utilisateur.id === $rootScope.utilisateur.id) {
          if (window.confirm('Êtes-vous sûr de vouloir supprimer « ' + scope.playlist.title + ' » ?')) {
            playlistFactory.delete(scope.playlist).then(function successCallback (response) {
              $rootScope.alert = '« ' + scope.playlist.title + ' » a été supprimé !'
              $document.scrollTop(0, 250)
            }, function errorCallback (response) {
              $rootScope.alert = response.data
              $document.scrollTop(0, 250)
            })
          }
        }
      })
    }
  }
}
])

.directive('panelPlaylist', function () {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      class: '=',
      playlists: '=',
      orderByField: '=',
      sortReverse: '=',
      limit: '=',
      search: '='
    },
    templateUrl: 'components/playlist-panel.html'
  }
})

.directive('tablePlaylist', function () {
  return {
    restrict: 'E',
    scope: {
      playlists: '=',
      orderByField: '=',
      sortReverse: '=',
      search: '='
    },
    templateUrl: 'components/playlist-table.html',
    link: function (scope, element, attrs) {
      scope.currentPage = 1
      scope.pageSize = 10
    }
  }
})

.directive('panelDetailPlaylist', function () {
  return {
    restrict: 'E',
    scope: {
      class: '=',
      playlist: '=',
      search: '='
    },
    templateUrl: 'components/playlist-panel-detail.html'
  }
})
