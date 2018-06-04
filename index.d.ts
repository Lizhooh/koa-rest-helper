import * as Koa from 'koa';
import * as Router from 'koa-router';

export interface RestObject {
    key?: string,
    /** GET /users */
    index?: Koa.Middleware,
    /** GET /users/:id */
    show?: Koa.Middleware,
    /** POST /users */
    create?: Koa.Middleware,
    /** PUT /users/:id */
    update?: Koa.Middleware,
    /** DELETE /users/:id */
    remove?: Koa.Middleware,
    /** GET /users/edit/:id */
    edit?: Koa.Middleware,
    /** GET /users/new */
    new?: Koa.Middleware,
}

export default function (prefix: string, rest: RestObject): Router;

