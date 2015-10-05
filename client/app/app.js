'use strict';

angular.module('dLiteMeAdmin', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'btford.socket-io',
		'ui.router',
		'ui.bootstrap',
		// 'oc.lazyLoad', // ocLazyLoad
		'ngIdle', // Idle timer
		'NgSwitchery',
		'ui.footable',
		'ui.select',
		'chart.js',
		// 'uiGmapgoogle-maps'
		'ngMap',
    'cloudinary',
    'ngFileUpload'

	])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
		$urlRouterProvider
			.otherwise('/');

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('authInterceptor');
	})
	.constant('cloudinaryData', {
		cloudName: 'dy4lucetl',
		apiKey: '717335745964917',
		apiSecret: 'rB007wYr1iFDeFgKwfkUykUTBrA',
		env: 'CLOUDINARY_URL=cloudinary://717335745964917:rB007wYr1iFDeFgKwfkUykUTBrA@dy4lucetl'
	})
	.factory('authInterceptor', function($rootScope, $q, $cookies, $location) {
		return {
			// Add authorization token to headers
			request: function(config) {
				config.headers = config.headers || {};
				if ($cookies.get('token')) {
					config.headers.Authorization = 'Bearer ' + $cookies.get('token');
				}
				return config;
			},

			// Intercept 401s and redirect you to login
			responseError: function(response) {
				if (response.status === 401) {
					$location.path('/login');
					// remove any stale tokens
					$cookies.remove('token');
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
