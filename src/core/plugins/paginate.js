'use strict';

module.exports = {
  register: async (server, options) => {
    const limitDefault = options.limit || 15;
  
    const limit = function () {
      return this.query.limit || limitDefault;
    };
  
    const offset = function () {
      let page = this.query.page || 1;
      if (page) {
        return limit.call(this) * (page - 1);
      }
      return 0;
    };
  
    server.decorate('request', 'offset', offset);
    server.decorate('request', 'limit', limit);
  },
  name: 'hapi-paginate',
  version: '1.0.0'
};