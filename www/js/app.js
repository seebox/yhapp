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

  .state('app.huibao', {
    url: '/huibao',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/huibao.html',
        controller:'huibao'
      }
    }

  })
    .state('app.huibao-detail', {
    url: '/huibao/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/huibao-detail.html',
        controller:'huibao'
      }
    }

  })
  .state('app.playlists', {
      url: '/playlists',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'tpls/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  .state('app.qingjia', {
    url: '/qingjia',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/qingjia.html',
        controller: 'qingjia'
      }
    }
  })
  .state('app.qingjia-detail', {
    url: '/qingjia/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/qingjia-detail.html',
        controller: 'qingjia'
      }
    }
  })
  .state('app.tezhong', {
    url: '/tezhong',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/tezhong.html',
        controller: 'tezhong'
      }
    }
  })
  .state('app.tezhong-detail', {
    url: '/tezhong/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/tezhong-detail.html',
        controller: 'tezhong'
      }
    }
  })

   .state('app.fuzhu', {
    url: '/fuzhu',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/fuzhu.html',
        controller: 'fuzhu'
      }
    }
  })
  .state('app.fuzhu-detail', {
    url: '/fuzhu/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/fuzhu-detail.html',
        controller: 'fuzhu'
      }
    }
  })
  .state('app.anquan', {
    url: '/anquan',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/anquan.html',
        controller: 'anquan'
      }
    }
  })
  .state('app.anquan-detail', {
    url: '/anquan/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/anquan-detail.html',
        controller: 'anquan'
      }
    }
  })
  .state('app.butie', {
    url: '/butie',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/butie.html',
        controller: 'butie'
      }
    }
  })
  .state('app.butie-detail', {
    url: '/butie/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/butie-detail.html',
        controller: 'butie'
      }
    }
  })
  .state('app.jiaoliu', {
    url: '/jiaoliu',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/jiaoliu.html',
        controller: 'jiaoliu'
      }
    }
  })
  .state('app.jiaoliu-detail', {
    url: '/jiaoliu/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/jiaoliu-detail.html',
        controller: 'jiaoliu'
      }
    }
  })
  .state('app.netclass', {
    url: '/netclass',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/netClass.html',
        controller: 'netClass'
      }
    }
  })
  .state('app.netclass-detail', {
    url: '/classroom/:id',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'tpls/netclassroom.html',
        controller: 'classroom'
      }
    }
  })
  ;

  $urlRouterProvider.otherwise('/app/main');

});

var $controllers = angular.module('starter.controllers', []);
