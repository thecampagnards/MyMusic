'use strict'

angular.module('mymusicApp', [
  'ngRoute',
  'angularSoundManager',
  'ui.bootstrap',
  'templates',
  'mymusicApp.config',
  'mymusicApp.directives',
  'mymusicApp.filters',
  'mymusicApp.factories',
  'mymusicApp.controllers'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
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

.run(['$rootScope', '$location', 'utilisateurFactory', '$route', function ($rootScope, $location, utilisateurFactory) {
  $rootScope.$on('$routeChangeStart', function (event) {
    $rootScope.showPlayer = true
    var routesAuth = ['/musiques/ajouter', '/musiques/editer/:id', '/playlists/ajouter', '/playlists/editer/:id']
    if (!utilisateurFactory.isLogged() && routesAuth.indexOf($location.path()) !== -1) {
      event.preventDefault()
      $location.path('/identification')
    }
  })
}])
