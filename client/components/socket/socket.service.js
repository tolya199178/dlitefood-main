/* global io */
'use strict';

angular.module('dLiteMeAdmin')
  .factory('socket', function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,
      /*
        Listener to watch driver moving
        {param} callback function
      */
      onDriverChangeLocation: function(callback){
        socket.on('staff:location_change', function(res){
          if (callback) callback(res);
        });
      },

      /*
        Listener to watch driver change status
        {param} callback function
      */
      onDriverChangeStatus: function(callback){
        socket.on('staff:status_change', function(res){
          if (callback) callback(res);
        });
      },
      
      /**
       * Removes listeners for location change
       */
      unregisterChangeLocaiton: function () {
        socket.removeAllListeners('staff:location_change');
        socket.removeAllListeners('staff:status_change');
      },

      /**
       * Removes listeners for status change
       */
      unregisterChangeLocaiton: function () {
        socket.removeAllListeners('staff:status_change');
      }
    };
  });
