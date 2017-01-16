'use strict'

angular.module('mymusicApp', [
  'ngRoute',
  'angularSoundManager',
  'ui.bootstrap',
  'mymusicApp.config',
  'mymusicApp.directives',
  'mymusicApp.filters',
  'mymusicApp.services',
  'mymusicApp.controllers'
])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  })
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'homeController'
  })
  .when('/inscription', {
    templateUrl: 'partials/inscription.html',
    controller: 'inscriptionController'
  })
  .when('/identification', {
    templateUrl: 'partials/identification.html',
    controller: 'identificationController'
  })
  .when('/musiques', {
    templateUrl: 'partials/musiques.html',
    controller: 'musiquesController'
  })
  .when('/musiques/ajouter', {
    templateUrl: 'partials/musique-form.html',
    controller: 'musiqueFormController'
  })
  .when('/musiques/editer/:id', {
    templateUrl: 'partials/musique-form.html',
    controller: 'musiqueFormController'
  })
  .when('/playlists', {
    templateUrl: 'partials/playlists.html',
    controller: 'playlistsController'
  })
  .when('/playlists/ajouter', {
    templateUrl: 'partials/playlist-form.html',
    controller: 'playlistFormController'
  })
  .when('/playlists/editer/:id', {
    templateUrl: 'partials/playlist-form.html',
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
