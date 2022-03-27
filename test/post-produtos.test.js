const { expect } = require('chai');
const chai = require('chai');
const { faker } = require('@faker-js/faker');
const supertest = require('supertest');

const request = supertest('http://localhost:3000');

const rotaProdutos = '/produtos';

describe('Validar verbo POST no endpoint ' + rotaProdutos, () =>{
    it.only('Cadastro com sucesso de novo produto', async () =>{
        
        const responseLogin = await request.post("/login").send({
        
            email: "fulano@qa.com",
            password: "teste"
           
        }).expect(200)

        const responseProduto = await request.post(rotaProdutos).send({
            nome: faker.commerce.productName(),
            preco: faker.datatype.number(),
            descricao: faker.commerce.productDescription(),
            quantidade: faker.datatype.number()
        }).set("authorization", responseLogin.body.authorization).expect(201)

        expect(responseProduto.body).to.deep.equal({
            message: "Cadastro realizado com sucesso",
            _id: responseProduto.body._id
        })
         
    })

})