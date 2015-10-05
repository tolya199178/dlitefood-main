$.cloudinary.config().cloud_name = 'dy4lucetl';
$.cloudinary.config().upload_preset = 'rve3x2z9';

var baseUrl = "http://localhost:9001/";
var app = angular.module('dLiteMeAdmin');

app.constant("BASE_API_LINK",{
    LOGIN: baseUrl + "auth/local",
    STAFF_INFO: baseUrl + "api/staffs",
    ACTIVE_STAFF: baseUrl + 'api/staffs/activeStaff'
  });



var cloudinary_config = {

  cloudName: 'dy4lucetl',
  apiKey: '717335745964917',
  apiSecret: 'rB007wYr1iFDeFgKwfkUykUTBrA',
  url: 'https://api.cloudinary.com/v1_1/',
  upload_presets: 'rve3x2z9',
  env: 'CLOUDINARY_URL=cloudinary://717335745964917:rB007wYr1iFDeFgKwfkUykUTBrA@dy4lucetl'

};

