const { expect } = require('chai');
const chai = require('chai');
const supertest = require('supertest');

// caminho padrao
const request = supertest('http://localhost:3000');

const rotaUsuarios = '/usuarios';

describe('Validar verbo POST no endpoint ' + rotaUsuarios, () =>{
    it('Cadastro com sucesso de novo usuário', async () =>{
        
        const response = await request.post(rotaUsuarios).send({
            nome: "qqqk",
            email: "qq@qa.com",
            password: "teste",
            administrador: "true",
        }).expect(201)

        expect(response.body).to.deep.equal(
            {
                message: "Cadastro realizado com sucesso",
                _id: response.body._id
              }
        );  
    })

    it('Cadastro com sucesso de novo usuário', async () =>{
        
        const response = await request.post(rotaUsuarios).send({
            inexistente: "1",
        }).expect(400)

        
        expect(response.body).to.deep.equal({
            nome: 'nome é obrigatório',
            email: 'email é obrigatório',
            password: 'password é obrigatório',
            administrador: 'administrador é obrigatório',
            inexistente: 'inexistente não é permitido'
          }
        );  
    })

    it('Cadastrar usuário com e-mail já utilizado', async () =>{

        const user = {
            nome: 'ttttt',
            email: 'asdf@teste.com',
            password: 'teste',
            administrador: 'true',
        }

        // cadastra primeiro usuário
        const responseFirstUser = await request.post(rotaUsuarios).send(user).expect(201);

        // outro usuário com o mesmo e-mail
        const responseSecondtUser = await request.post(rotaUsuarios).send(
            user
        ).expect(400);

        expect(responseSecondtUser.body).to.deep.equal({
            message: "Este email já está sendo usado"
        });

    })

    

})