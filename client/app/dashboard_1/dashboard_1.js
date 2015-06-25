'use strict';

angular.module('jffAdminApp')
	.config(function($stateProvider) {
		$stateProvider
			.state('dashboards', {
				abstract: true,
				url: "/dashboards",
				templateUrl: "app/common/content.html",
			})
			.state('dashboards.dashboard_1', {
				url: "/dashboard_1",
				templateUrl: "app/dashboard_1/dashboard_1.html",
				resolve: {
					loadPlugin: function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							serie: true,
							name: 'angular-flot',
							files: ['plugins/flot/jquery.flot.js', 'plugins/flot/jquery.flot.time.js', 'plugins/flot/jquery.flot.tooltip.min.js', 'plugins/flot/jquery.flot.spline.js', 'plugins/flot/jquery.flot.resize.js', 'plugins/flot/jquery.flot.pie.js', 'plugins/flot/curvedLines.js', 'plugins/flot/angular-flot.js', ]
						}, {
							name: 'angles',
							files: ['plugins/chartJs/angles.js', 'plugins/chartJs/Chart.min.js']
						}, {
							name: 'angular-peity',
							files: ['plugins/peity/jquery.peity.min.js', 'plugins/peity/angular-peity.js']
						}]);
					}
				}
			})
	});
