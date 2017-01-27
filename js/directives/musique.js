'use strict'

angular.module('mymusicApp.directives')

.directive('deleteMusique', ['musiqueFactory', '$rootScope', '$document', function (musiqueFactory, $rootScope, $document) {
  return {
    restrict: 'EA',
    scope: {
      musique: '=deleteMusique'
    },
    link: function (scope, element, attrs) {
      element.bind('click', function (event) {
        // check avant si l'utilisateur a le bon id
        if (scope.musique.utilisateur.id === $rootScope.utilisateur.id) {
          if (window.confirm('Êtes-vous sûr de vouloir supprimer « ' + scope.musique.title + ' » ?')) {
            musiqueFactory.delete(scope.musique).then(function successCallback (response) {
              $rootScope.alert = '« ' + scope.musique.title + ' » a été supprimé !'
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

.directive('panelMusique', function () {
  return {
    restrict: 'E',
    scope: {
      title: '=',
      class: '=',
      musiques: '=',
      orderByField: '=',
      sortReverse: '=',
      limit: '=',
      search: '='
    },
    templateUrl: 'components/musique-panel.html'
  }
})

.directive('tableMusique', function () {
  return {
    restrict: 'E',
    scope: {
      musiques: '=',
      orderByField: '=',
      sortReverse: '=',
      search: '='
    },
    templateUrl: 'components/musique-table.html',
    link: function (scope, element, attrs) {
      scope.currentPage = 1
      scope.pageSize = 10
    }
  }
})
