const Koa = require('koa');
const logger = require('koa-logger');
const Helper = require('../');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const helper = Helper('/users', {
    key: 'id',
    // GET /users
    async index(ctx, next) {
        ctx.body = { text: 'index /users/' };
    },
    // GET /users/new
    async new(ctx, next) {
        ctx.body = { text: 'new GET /users/new' };
    },
    // POST /users
    async create(ctx, next) {
        ctx.body = { text: 'create POST /users' };
    },
    // GET /users/:id
    async show(ctx, next) {
        ctx.body = { text: 'show GET /users/:id' };
    },
    // GET /users/:id/edit
    async edit(ctx, next) {
        ctx.body = { text: 'edit GET /users/:id/edit' };
    },
    // PUT /users/:id
    async update(ctx, next) {
        ctx.body = { text: 'update PUT /users/:id' };
    },
    // DELETE /users/:id
    async remove(ctx, next) {
        ctx.body = { text: 'remove DELETE /users/:id' };
    },
});

router.get('/', ctx => {
    ctx.body = 'hello';
});

app
    .use(logger())
    .use(helper())
    .use(router.routes())
    .listen(3000, () => {
        console.log('server run in 3000.');
        const fetch = require('node-fetch');

        fetch('http://127.0.0.1:3000/users').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/new').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users', { method: 'POST' }).then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1/edit').then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1', { method: 'PUT' }).then(res => res.text()).then(res => console.log(res));
        fetch('http://127.0.0.1:3000/users/1', { method: 'DELETE' }).then(res => res.text()).then(res => console.log(res));
    })
    ;


