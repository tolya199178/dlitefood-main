'use strict'

var baseUrl = "http://localhost:9000/"
var app = angular.module('dLiteMeAdmin');

app.constant("BASE_API_LINK",{
    LOGIN: baseUrl + "auth/local",
    STAFF_INFO: baseUrl + "api/users",
    ACTIVE_STAFF: baseUrl + 'api/users/activeStaff'
  })
    