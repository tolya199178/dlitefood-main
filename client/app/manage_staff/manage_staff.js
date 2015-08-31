'use strict';

angular.module('dLiteMeAdmin')
	.config(function($stateProvider) {
		$stateProvider
			.state('manage-staff', {
				url: "/manage-staff",
				templateUrl: "app/manage_staff/manage_staff.html"
			});
	});
