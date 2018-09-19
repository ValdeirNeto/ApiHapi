'use strict';

module.exports = {
  async getToken(server) {
    const data = await server.inject({
      method: 'POST',
      url: '/v1/auth',
      payload: {
        email:  'vdasilvaneto@gmail.com',
        senha: 'skatsk80'
      }
    });

    if(!data) throw new Error('nao foi possivel registar');

    return data.result.access_token;
  }
}