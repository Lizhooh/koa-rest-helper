
### Koa-rest-helper
Koa-rest-helper is a secondary routing tool used to define REST API.

### API

```js
import * as Koa from 'koa';
import * as Router from 'koa-router';

export interface RestObject {
    key?: string,
    index?: Koa.Middleware,
    show?: Koa.Middleware,
    create?: Koa.Middleware,
    update?: Koa.Middleware,
    remove?: Koa.Middleware,
    edit?: Koa.Middleware,
    new?: Koa.Middleware,
}

export default function (prefix: string, rest: RestObject): Router;
```

### install

```bash
npm install --save koa-rest-helper
```

Method | Path |	Route Function
:--- | :--- | :---
GET	 | /users | index
GET	 | /users/:id | show
POST | /users | create
PUT	 | /users/:id | update
DELETE | /users/:id | remove
GET	 | /users/:id/edit | edit
GET	 | /users/new | new

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
    // GET /users/:id
    async show(ctx, next) {
        ctx.body = { text: 'show GET /users/:id' };
    },
    // POST /users
    async create(ctx, next) {
        ctx.body = { text: 'create POST /users' };
    },
    // PUT /users/:id
    async update(ctx, next) {
        ctx.body = { text: 'update PUT /users/:id' };
    },
    // DELETE /users/:id
    async remove(ctx, next) {
        ctx.body = { text: 'remove DELETE /users/:id' };
    },

    // GET /users/:id/edit
    async edit(ctx, next) {
        ctx.body = { text: 'edit GET /users/:id/edit' };
    },
    // GET /users/new
    async new(ctx, next) {
        ctx.body = { text: 'new GET /users/new' };
    },
});

router
    .use(helper.routes())  // <--
    .get('/', ctx => {
        ctx.body = 'hello';
    });

app
    .use(logger())
    .use(router.routes())
    .listen(3000, () => {
        console.log('server run in 3000.');
    });
```