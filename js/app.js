'use strict'

angular.module('mymusicApp', [
  'ngRoute',
  'angularSoundManager',
  'ui.bootstrap',
  'ui.sortable',
  'templates',
  'mymusicApp.config',
  'mymusicApp.directives',
  'mymusicApp.filters',
  'mymusicApp.factories',
  'mymusicApp.controllers'
])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
  $httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
    return {
      responseError: function (rejection) {
        // si non autorisé on redirige vers la page d'identification
        if (rejection.status === 401) {
          $location.path('/identification')
        }
        return $q.reject(rejection)
      }
    }
  }])
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'homeController'
  })
  .when('/inscription', {
    templateUrl: 'inscription.html',
    controller: 'inscriptionController'
  })
  .when('/identification', {
    templateUrl: 'identification.html',
    controller: 'identificationController'
  })
  .when('/mon-compte', {
    templateUrl: 'mon-compte.html',
    controller: 'monCompteController'
  })
  .when('/musiques', {
    templateUrl: 'musiques.html',
    controller: 'musiquesController'
  })
  .when('/musiques/ajouter', {
    templateUrl: 'musique-form.html',
    controller: 'musiqueFormController'
  })
  .when('/musiques/editer/:id', {
    templateUrl: 'musique-form.html',
    controller: 'musiqueFormController'
  })
  .when('/musiques/:order', {
    templateUrl: 'musiques.html',
    controller: 'musiquesController'
  })
  .when('/playlists', {
    templateUrl: 'playlists.html',
    controller: 'playlistsController'
  })
  .when('/playlists/ajouter', {
    templateUrl: 'playlist-form.html',
    controller: 'playlistFormController'
  })
  .when('/playlists/editer/:id', {
    templateUrl: 'playlist-form.html',
    controller: 'playlistFormController'
  })
  .otherwise({
    redirectTo: '/'
  })
}])

.run(['$rootScope', '$location', 'playerFactory', 'utilisateurFactory', 'sessionFactory', function ($rootScope, $location, playerFactory, utilisateurFactory, sessionFactory) {
  // on recharge la derniere playlist au chargement
  playerFactory.init()
  $rootScope.$on('$routeChangeStart', function (event) {
    $rootScope.showPlayer = true
    var routesAuth = ['/musiques/ajouter', '/musiques/editer/:id', '/playlists/ajouter', '/playlists/editer/:id', '/mon-compte']
    if (!utilisateurFactory.isLogged() && routesAuth.indexOf($location.path()) !== -1) {
      event.preventDefault()
      $location.path('/identification')
    }
  })
}])
