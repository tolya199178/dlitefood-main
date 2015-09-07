'use strict';

// Development specific configuration
// ==================================
module.exports = {

  mysql: {
    username: "root",
    password: "",
    database: "dlites", //"justfast_food",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },

  userRoles: ['staff', 'supervisor', 'user', 'admin']

};
