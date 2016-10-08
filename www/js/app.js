// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('standard');
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    cache:false,
    templateUrl: 'tpls/app.html',
    controller: 'AppCtrl'
  })
  .state('app.main', {
    url: '/main',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/main.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.jihua-detail', {
    url: '/jihua/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/jihua-detail.html',
        controller:'jihuaDetail'
      }
    }

  })

  .state('app.jihua', {
    url: '/jihua',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/jihua.html',
        controller:'jihua'
      }
    }

  })

  .state('app.form', {
    url: '/form',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/jihua.html'
      }
    }
  })
  .state('app.playlists', {
    url: '/playlists',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        controller: 'PlaylistsCtrl'
      }
    }
  })

  .state('app.single', {
    url: '/playlists/:playlistId',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/main');

});

var $controllers = angular.module('starter.controllers', []);
