// definir variaveis globais para serem usadas em todos os lugares do projeto
const supertest = require('supertest');

// caminho padrao
const url = 'http://localhost:3000';

global.request = supertest(url);