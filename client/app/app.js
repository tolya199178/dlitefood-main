'use strict';

angular.module('dLiteMeAdmin', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'btford.socket-io',
		'ui.router',
		'ui.bootstrap',
		'oc.lazyLoad', // ocLazyLoad
		'ngIdle', // Idle timer
    'NgSwitchery',
    'ui.footable',
    'ui.select',
    'chart.js',
    'uiGmapgoogle-maps'
	])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	})

  .config( function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDa3Tb9Se7HOaKvEbX0TeJvndujJ8fp5YU',
        v: '3.20',
        lib: 'weather,geometry,visualization'

    });
  })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
	return {
		// Add authorization token to headers
		request: function(config) {
			config.headers = config.headers || {};
			if ($cookieStore.get('token')) {
				config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
			}
			return config;
		},

		// Intercept 401s and redirect you to login
		responseError: function(response) {
			if (response.status === 401) {
				$location.path('/login');
				// remove any stale tokens
				$cookieStore.remove('token');
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}
		}
	};
})

.run(function($rootScope, $location, $state, Auth) {
	// Redirect to login if route requires auth and you're not logged in
	$rootScope.$on('$stateChangeStart', function(event, next) {
		Auth.isLoggedInAsync(function(loggedIn) {
			if (next.authenticate && !loggedIn) {
				$location.path('/login');
			}
		});
	});
	$rootScope.$state = $state;
});
