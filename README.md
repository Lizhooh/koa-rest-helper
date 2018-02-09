

### Koa-rest-helper
Koa-rest-helper is a secondary routing tool used to define REST API.



### install

```bash
npm install --save koa-rest-helper
```

Method | Path |	Route Function
:--- | :--- | :---
GET	 | /users | index
GET	 | /users/new | new
GET	 | /users/:id	| show
GET	 | /users/:id/edit | edit
POST | /users | create
PUT	 | /users/:id | update
DELETE | /users/:id | remove

### use

```js
const Koa = require('koa');
const logger = require('koa-logger');
const Helper = require('koa-rest-helper');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const helper = Helper('/users', {
    key: 'id', // <- :id
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
    })
    ;

```