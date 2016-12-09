import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import stats from "./config"

const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/:identifier", function*() {
	const id = this.params.identifier;
	const response = stats.filter(value => value.id === id);
	this.body = response;
});

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
