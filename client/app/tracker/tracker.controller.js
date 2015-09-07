'use strict';

angular.module('dLiteMeAdmin')
  .controller('TrackerCtrl', function ($scope, $state) {
    $scope.active = {
      map: $state.includes('tracker.map'),
      street: $state.includes('tracker.street')
    }
  })

  .controller('TrackerMapCtrl', function ($scope, TrackerServices, Utils, socket) {
    $scope.markers = [];
    $scope.drivers = [];
    $scope.map = {};
    $scope.bounds = new google.maps.LatLngBounds ();

    $scope.$on('mapInitialized', function(event, map) {

      /*
       Get list active drivers
      */
      TrackerServices
        .getDriversInformation().then(function(result){
          if (result.success){
            $scope.drivers = extractLocationData(result.data);
            fitZoomToWrapMarker();
          }
          else{
            alert("Can't get active driver information: " + result.msg);
          }
        });
    });

    /*
      Listener for staff change location
    */
    socket.onDriverChangeLocation(function(location){
      location.lat = parseFloat(location.lat);
      location.lon = parseFloat(location.lon);
      updateDriverPostion(location);
    });

    /*
      Listener for staff status location
    */
    socket.onDriverChangeStatus(function(status){

    });


    /*
      Update driver postion in list marker and bounces
    */
    function updateDriverPostion(location){
      $scope.bounds = new google.maps.LatLngBounds ();
      var driver = _.find($scope.drivers, function(driver){
        return driver.staff_id == location.id;
      });
      if (driver){
        if (driver.marker)
          driver.marker.setMap(null);
        driver.marker = initMarker(location.lat, location.lon, driver.staff_name);

        _.each($scope.drivers, function(driver){
          if (driver.marker){
            $scope.bounds.extend(driver.marker.getPosition());
          }
        });

        fitZoomToWrapMarker();
      }

    }


    /*
      Init marker for driver
    */
    function initMarker(lat, lon, title){
      return new google.maps.Marker({
        position: {lat: lat, lng: lon},
        map: $scope.map,
        title: title
      });
    }

    /*
      There are two kind of location info
        -  staff_location: driver's location that updated throught the app
        -  staff_postcode: default location if staff_location is not set
    */
    function extractLocationData(driversInfo){
      _.each(driversInfo, function(driver){
        if (driver.staff_location){
          var pos = JSON.parse(driver.staff_location);
          pos.lat = parseFloat(pos.lat);
          pos.lon = parseFloat(pos.lon);

          var latLng = new google.maps.LatLng (pos.lat, pos.lon);
          latLng.staff_id = driver.staff_id; // to keep track which driver that bounce belong to
          $scope.bounds.extend(latLng);

          driver.marker = initMarker(pos.lat, pos.lon, driver.staff_name);
        }
        else if (driver.staff_postcode){

        }
      });

      return driversInfo;
    }

    /*
      Fit the zoom and center to see all the marker
    */
    function fitZoomToWrapMarker(){
      $scope.map.fitBounds ($scope.bounds);
    }


  })

  .controller('TrackerStreetCtrl', function ($scope, TrackerServices) {
    $scope.streetPos = {
      lat: 40.688738,
      lon: -74.043871
    };
    $scope.showStreetMap = true;
    $scope.selectedDriver = "0";

    function changeStreetMapPos(lat, lon){
      var latLng = new google.maps.LatLng (lat, lon);
      // $scope.panorama.setPosition({lat: lat, lng: lon});

      $scope.panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          position: {lat: 37.869, lng: -122.255},
          pov: {
            heading: 270,
            pitch: 0
          },
          visible: true
      });
      // $scope.map.setCenter(latLng);
      // panorama.setVisible(true);
    }

    $scope.selectDriver = function(){
      var driver = _.find($scope.drivers, function(driver){
        return driver.staff_id == parseInt($scope.selectedDriver);
      });

      if (driver.staff_location){
        $scope.streetPos = JSON.parse(driver.staff_location);
        changeStreetMapPos($scope.streetPos.lat, $scope.streetPos.lon);
      }else{
        alert("This staff doesn't have location information !! ")
      }

    }

    $scope.panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), {
        position: {lat: 37.869, lng: -122.255},
        pov: {
          heading: 270,
          pitch: 0
        },
        visible: true
    });

    // $scope.$on('mapInitialized', function(event, map) {

      /*
       Get list active drivers
      */
      TrackerServices
        .getDriversInformation().then(function(result){
          if (result.success){
            $scope.drivers = result.data;
          }
          else{
            alert("Can't get driver information: " + result.msg);
          }
        });
    // });

  });
