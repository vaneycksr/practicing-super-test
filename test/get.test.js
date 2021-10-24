const { expect } = require('chai');
const chai = require('chai');
const supertest = require('supertest');

// caminho padrao
const request = supertest('http://localhost:3000');

const rotaUsuarios = '/usuarios';

describe('Validar verbo GET no endpoint ' + rotaUsuarios, () =>{
    it('Retorno com sucesso ao utilizar query string', async () =>{

        // utilizando query string                                                     // validacao de status code do proprio supertest
        const response = await request.get(rotaUsuarios).query({_id:'0uxuPY0cbmQhpEz1'}).expect(200);

        // validacao
        expect(response.body).to.deep.equal(
            {
                quantidade: 1,
                usuarios: [
                    {
                        nome: "Fulano da Silva",
                        email: "fulano@qa.com",
                        password: "teste",
                        administrador: "true",
                        _id: "0uxuPY0cbmQhpEz1"
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