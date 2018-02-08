function isFunction(obj) {
    return typeof obj === 'function';
}

function Helper(path, obj) {
    const router = new require('koa-router')();
    const Path = require('path');
    const _ = (a, b) => Path.join(a, b).replace(/\\/g, '/');

    obj = {
        key: 'id',
        ...obj
    };

    router
        .get(_(path, '/'), async (ctx, next) => {
            isFunction(obj.index) ? await obj.index(ctx, next) : await next();
        })
        .get(_(path, '/new'), async (ctx, next) => {
            isFunction(obj.new) ? await obj.new(ctx, next) : await next();
        })
        .get(_(path, `/:${obj.key}/edit`), async (ctx, next) => {
            isFunction(obj.edit) ? await obj.edit(ctx, next) : await next();
        })
        .get(_(path, `/:${obj.key}`), async (ctx, next) => {
            isFunction(obj.show) ? await obj.show(ctx, next) : await next();
        })
        .post(path, async (ctx, next) => {
            isFunction(obj.create) ? await obj.create(ctx, next) : await next();
        })
        .put(_(path, `/:${obj.key}`), async (ctx, next) => {
            isFunction(obj.update) ? await obj.update(ctx, next) : await next();
        })
        .del(_(path, `/:${obj.key}`), async (ctx, next) => {
            isFunction(obj.remove) ? await obj.remove(ctx, next) : await next();
        })
        ;

    return () => router.routes();
}

module.exports = Helper;
