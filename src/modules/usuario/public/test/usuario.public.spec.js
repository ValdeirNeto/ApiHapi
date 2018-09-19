/* global describe,  before, it, expect, server */

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuario', () => {
  describe('Consulta', () => {
    let token = null;

    before(async () => {
          token = await factory.getToken(server);
        });

    it('Deve retornar uma listagem de usuario', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/v1/usuario',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      expect(response.statusCode).to.equals(200);
      expect(response.result).to.exist();
      expect(response.result.rows).to.exist();
    })

  it('Deve retornar uma listagem de usuario', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/v1/usuario/1',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    expect(response.statusCode).to.equals(200);
    expect(response.result).to.exist();
    expect(response.result.id).to.exist();
    expect(response.result.id).to.equals('1');
  });

  it('Deve retornar um erro ao listagem com usuario invalido', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/v1/usuario/111111111',
      headers: { 'Authorization': `Bearer ${token}` },
    });

    expect(response.statusCode).to.equals(400);
  });
});
});
