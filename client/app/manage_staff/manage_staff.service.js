var module = angular.module('dLiteMeAdmin');

module.factory('ManageStaffSrv', [
  'api',
  'Auth',
  'queryString',

  function (api, Auth, queryString) {
    var baseUrl = '/api/';

    /**
     * Returns a single or all Staffs
     */

    function _get(options, callback) {
      var request;
      request = {
        path: baseUrl + 'staffs' + // Tuan: please further confirm this path
        ((options.query) ? queryString(options.query) : '') +
        ((options.id) ? options.id : ''),
        method: 'GET',
        data: ((!options.data) ? options : options.data),
        headers: {}
      };
      return api(request, callback);
    }

    /**
     * Update a Staff via ID
     * @param options
     * @param callback
     * @private
     */
    function _update(options, callback) {
      var request, id;
      id = ((options.id) ?  options.id : '') ;
      request = {
        path: baseUrl + 'staffs/' + id + // Please further confirm this
        ((options.query) ? queryString(options.query) : ''),
        method: 'UPDATE',
        data:  ((!options.data) ? options : options.data),
        headers: {} // Do we need to pass in header?
      };
      return api(request, callback);
    }

    /**
     * Remove a Staff from DB
     * @param options
     * @param callback
     * @returns {*}
     * @private
     */
    function _delete(options, callback) {
      var request, id;
      id = ((options.id) ? options.id : '');
      request = {
        path: baseUrl + 'staffs/' + id + // Please confirm path
        ((options.query) ? queryString(options.query) : ''),
        method: 'DELETE',
        data: ((!options.data) ? options : options.data),
        headers: {}
      };
      return api(request, callback);
    }

    function _create(options, callback) {
      var request;
      request = {
        path: baseUrl + 'staffs' + // And this :)
        ((options.query) ? queryString(options.query) : ''),
        method: 'POST',
        data: ((!options.data) ? options : options.data),
        headers: {}
      };
      return api(request, callback);
    }

    return {
      getStaff        : _get,
      createStaff     : _create,
      deleteStaff     : _delete,
      updateStaff     : _update
    }
  }

]);
