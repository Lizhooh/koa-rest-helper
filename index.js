const Router = require('koa-router');

function isFunction(obj) {
    return typeof obj === 'function';
}

function Helper(path, rest) {
    rest = { key: 'id', ...rest };
    const router = new Router({
        prefix: path,
    });

    router
        .get('/', async (ctx, next) => {
            isFunction(rest.index) ? await rest.index(ctx, next) : await next();
        })
        .get(`/:${rest.key}`, async (ctx, next) => {
            isFunction(rest.show) ? await rest.show(ctx, next) : await next();
        })
        .post('/', async (ctx, next) => {
            isFunction(rest.create) ? await rest.create(ctx, next) : await next();
        })
        .put(`/:${rest.key}`, async (ctx, next) => {
            isFunction(rest.update) ? await rest.update(ctx, next) : await next();
        })
        .del(`/:${rest.key}`, async (ctx, next) => {
            isFunction(rest.remove) ? await rest.remove(ctx, next) : await next();
        })

        .get('/new', async (ctx, next) => {
            isFunction(rest.new) ? await rest.new(ctx, next) : await next();
        })
        .get(`/:${rest.key}/edit`, async (ctx, next) => {
            isFunction(rest.edit) ? await rest.edit(ctx, next) : await next();
        })
        ;

    router.rest = () => rest;
    return router;
}

module.exports = Helper;
