/* global describe,  before, it, expect, server */

const factory = require('../../../../test/factory.usuario.spec');

describe('Usuario Admin', () => {
  let token = null;
  let idUsuario = null;

  before(async () => {
    token = await factory.getToken(server);
  });

  describe('Cadastrar', () => {
      it('Deve criar um novo usuario', async () => {
        const response = await server.inject({
          method: 'POST',
          url: '/v1/admin/usuario',
          headers: { 'Authorization': `Bearer ${token}` },
          payload: {
            nome: 'Teste 2',
            email: "vdasilvaneto@univem.edu.br",
            senha: "testanndo"
          }
        });
  
        expect(response.statusCode).to.equals(201);
        expect(response.result).to.exist();
        expect(response.result.id).to.exist();
  
        idUsuario = response.result.id
      })
    })

    describe('Consulta', () => {
     it('Deve retornar uma listagem de usuario', async () => {
       const response = await server.inject({
         method: 'GET',
         url: '/v1/admin/usuario',
         headers: { 'Authorization': `Bearer ${token}` },
       });

       expect(response.statusCode).to.equals(200);
       expect(response.result).to.exist();
       expect(response.result.rows).to.exist();
     })

     it('Deve retornar uma listagem de usuario', async () => {
       const response = await server.inject({
         method: 'GET',
         url: `/v1/admin/usuario/${idUsuario}`,
         headers: { 'Authorization': `Bearer ${token}` },
       });

       expect(response.statusCode).to.equals(200);
       expect(response.result).to.exist();
       expect(response.result.id).to.exist();
       expect(response.result.id).to.equals(idUsuario);
     });

     it('Deve retornar um erro ao listagem com usuario invalido', async () => {
       const response = await server.inject({
         method: 'GET',
         url: '/v1/admin/usuario/11111111',
         headers: { 'Authorization': `Bearer ${token}` },
       });

       expect(response.statusCode).to.equals(400);
     });
  });

  describe('Atualizar', () => {
    it('Deve atualizar o usuario', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/admin/usuario/${idUsuario}`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: 'Bruno',
        }
      });

      expect(response.statusCode).to.equals(200);
    })

    it('Deve retornar erro ao atualizar o usuario invalido', async () => {
      const response = await server.inject({
        method: 'PUT',
        url: `/v1/admin/usuario/1111111111`,
        headers: { 'Authorization': `Bearer ${token}` },
        payload: {
          nome: 'Bruno',
        }
      });

      expect(response.statusCode).to.equals(400);
    })
  })

  describe('Deleta', () => {
    it('Deve excluir o usuario', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/admin/usuario/${idUsuario}`,
        headers: { 'Authorization': `Bearer ${token}` },
      });

      expect(response.statusCode).to.equals(200);
    })

    it('Deve retornar um erro ao tentar excluir um usuario invalido', async () => {
      const response = await server.inject({
        method: 'DELETE',
        url: `/v1/admin/usuario/1111111111111`,
        headers: { 'Authorization': `Bearer ${token}` },
      });

      expect(response.statusCode).to.equals(400);
    })
  })
});
