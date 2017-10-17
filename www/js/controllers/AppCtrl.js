$controllers

    .controller('AppCtrl', function($rootScope, $scope, $http, $ionicModal, $timeout, $ionicLoading, $ionicPopup, $state) {


    if (window.localStorage.loginBody) {
        $rootScope.loginBody = JSON.parse(window.localStorage.loginBody);
    } else {
        $state.go('login');
    }
    $rootScope.gologin = function() {
        $state.go('login');
    }

});