const {handle, BlowDown, BuildHouse} = require('@pigs/app');
const repo = require('./model.js');

const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.post('/houses', ({request: {body: {owner}}, response}) => {
    const id = handle(new BuildHouse(owner), repo);
    response.status = 201;
    response.set('Location', `/houses/${id}`);
});

router.get('/houses/:id', ({params: id}, response) => {
    const result = repo.findById(id);
    if (!result) {
        response.status = 404;
        return;
    }
    response.body = result;
});

router.del('/houses/:id', ({params: id}, response) => {
    handle(new BlowDown(id), repo);
    response.status = 204;
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);

console.info("Listening on localhost:3000")