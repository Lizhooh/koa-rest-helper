import * as Koa from 'koa';
import * as Router from 'koa-router';

export interface RestObject {
    key?: string,
    /** GET /users */
    index?: (ctx: Koa.Context, next: () => any) => any,
    /** GET /users/:id */
    show?: (ctx: Koa.Context, next: () => any) => any,
    /** POST /users */
    create?: (ctx: Koa.Context, next: () => any) => any,
    /** PUT /users/:id */
    update?: (ctx: Koa.Context, next: () => any) => any,
    /** DELETE /users/:id */
    remove?: (ctx: Koa.Context, next: () => any) => any,
    /** GET /users/edit/:id */
    edit?: (ctx: Koa.Context, next: () => any) => any,
    /** GET /users/new */
    new?: (ctx: Koa.Context, next: () => any) => any,
}

export default function (prefix: string, rest: RestObject): Router;

