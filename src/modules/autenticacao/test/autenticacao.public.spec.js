/* global describe, before, it, expect, server */

const _email = 'vdasilvaneto@gmail.com';

describe(`Autenticação`, () => {
  let token = null;

  describe('Consulta', () => {
    it('Deve obter um Token para o usuário cadastrado', async ()  => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        headers: { 'Host': 'api' },
        payload: {
          senha: 'skatsk80',
          email: _email
        }
      });

      expect(response.statusCode).to.equals(200);
      expect(response.result.access_token).to.exist();

      token = response.result.access_token;
    });

    it('Deve retornar um erro ao tentar se Autenticar com uma senha inválida', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        headers: { 'Host': 'api' },
        payload: {
          senha: 'skatsssssk80',
          email: _email
        }
      });

      expect(response.statusCode).to.equals(401);
    });

    });

    it('Deve retornar um erro ao tentar se Autenticar com email inválida', async () => {
      const response = await server.inject({
        method: 'POST',
        url: '/v1/auth',
        headers: { 'Host': 'api' },
        payload: {
          senha: 'skatsk80',
          email: 'valde@valdeir.silva'
        }
      });

      expect(response.statusCode).to.equals(401);
    });
});