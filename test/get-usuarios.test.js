const { expect } = require('chai');
const chai = require('chai');
const { faker } = require('@faker-js/faker');
const supertest = require('supertest');

// caminho padrao
const request = supertest('http://localhost:3000');

const rotaUsuarios = '/usuarios';

describe('Validar verbo GET no endpoint ' + rotaUsuarios, () =>{
    it('Retorno com sucesso ao utilizar query string', async () =>{

        const usuario = {
            nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: `${faker.datatype.boolean()}`,
        }

        // cadastra usuário
        const responseUser = await request.post(rotaUsuarios).send(
            usuario
        ).expect(201)
        

        // utilizando query string                                                     // validacao de status code do proprio supertest
        const response = await request.get(rotaUsuarios).query({_id: responseUser.body._id}).expect(200);

        
        // valida query string de usuario recem cadastrado
        expect(response.body).to.deep.equal(
            {
                quantidade: 1,
                usuarios: [
                    {
                        nome: usuario.nome,
                        email: usuario.email,
                        password: usuario.password,
                        administrador: usuario.administrador,
                        _id: responseUser.body._id
                    }
                ]
            }
        );
        
    })

    it('Nenhum usuário encontrado ao utilizar _id inexistente na query string', async() => {
        const response = await request.get(rotaUsuarios).query({_id:'test'}).expect(200);
        expect(response.body).to.deep.equal(
            {
                quantidade: 0,
                usuarios: []
            }
        );
    })

    // it.only () => executa apenas um teste especifico
    it('Mensagem de erro ao utilizar chave inexistente na query string', async() => {
        const response = await request.get(rotaUsuarios).query({_id:'0uxuPY0cbmQhpEz1',inexistente:'a'}).expect(400);
        expect(response.body).to.deep.equal(
            {
                "inexistente": "inexistente não é permitido"
            }
        );
    })

})