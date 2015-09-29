'use strict';

angular.module('dLiteMeAdmin')
	.controller('MerchantsCtrl', ['$scope', '$timeout', 'Upload', function($scope, $timeout, Upload) {
      var d = new Date();

      $scope.files = {};
      $scope.title = 'Image('+d.getTime() + '-' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() +')';

      $scope.uploadFiles = function (file) {
        $scope.fileToLoad = file;
        console.log(file);
        if(!$scope.fileToLoad) return;
          if(file && !file.$error) {
            console.log('here', file.name);
            file.upload = Upload.upload({
              url: 'http://api.cloudinary.com/v1_1/' + cloudinary_config.cloudName + "/upload",
              method: 'POST',
              fields: {
                upload_preset : cloudinary_config.upload_presets,
                tags: 'merchantAlbum',
                context: 'photo='+$scope.title
              },
              data: {file: file}

            });

            file.upload.then( function (response) {
              console.log('uploading...');
              $timeout( function () {
                console.log(response);
                file.result = response.data;
              }, function (response) {
                if(response.status > 0) {
                  $scope.errorMsg = response.status + ':' + response.data;
                }
              })
            })
          file.upload.progress( function (e) {
              file.progress = Math.round(( e.loaded * 100.0 ) / e.total);
              file.status = 'Uploading...'+ file.progress + '%';
            } ).success( function (data, status, headers, config) {
              $rootScope.merchantImage = $rootScope.merchantImage || [];
              data.context = {
                custom: {
                  merchantImage: $scope.title
                }
              };
              file.result = data;
              $rootScope.merchantImage.push(data);
            } ).error( function (data, status, headers, config) {
              file.result = data;

            })
          } else {
            console.log('error occurred');
          }
      }
	}]);
