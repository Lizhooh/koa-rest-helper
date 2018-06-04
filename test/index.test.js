const Koa = require('koa');
const logger = require('koa-logger');
const Helper = require('../');
const Router = require('koa-router');

const fetch = require('node-fetch');

const app = new Koa();
const router = new Router();

const helper = Helper('/users', {
    key: 'id',
    // GET /users
    async index(ctx, next) {
        ctx.body = { text: 'index /users/' };
    },
    // GET /users/:id
    async show(ctx, next) {
        ctx.body = { text: 'show GET /users/:id' };
    },
    // POST /users
    async create(ctx, next) {
        ctx.body = { text: 'create POST /users/' };
    },
    // PUT /users/:id
    async update(ctx, next) {
        ctx.body = { text: 'update PUT /users/:id' };
    },
    // DELETE /users/:id
    async remove(ctx, next) {
        ctx.body = { text: 'remove DELETE /users/:id' };
    },

    // GET /users/new
    async new(ctx, next) {
        ctx.body = { text: 'new GET /users/new' };
    },
    // GET /users/:id/edit
    async edit(ctx, next) {
        ctx.body = { text: 'edit GET /users/:id/edit' };
    },
});

router
    .use(helper.routes()) // <--
    .get('/', ctx => {
        ctx.body = 'hello';
    });

app
    .use(logger())
    .use(router.routes())
    .listen(3000, () => {
        console.log('server run in 3000.');

        fetch('http://127.0.0.1:3000/users').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/new').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users', { method: 'POST' }).then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1/edit').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1', { method: 'PUT' }).then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1', { method: 'DELETE' }).then(res => res.text()).then(res => console.log(res));
    })
    ;


