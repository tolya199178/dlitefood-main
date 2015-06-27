'use strict';

angular.module('jffAdminApp')
	.config(function($stateProvider) {
		$stateProvider
			.state('manage_staff', {
				url: "/manage_staff",
				templateUrl: "app/manage_staff/manage_staff.html",
				resolve: {
					loadPlugin: function($ocLazyLoad) {
						return $ocLazyLoad.load([{
							name: 'ui.event',
							files: ['plugins/uievents/event.js']
						}, {
							name: 'ui.map',
							files: ['plugins/uimaps/ui-map.js']
						}, ]);
					}
				}
			});
	});
