import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
// import queryRoutes from "../base/images/query-routes";

const api = koa();
const router = koaRouter();

api.use(bodyParser());

// router.get("/", queryRoutes.routeOne);

api
  .use(router.routes())
  .use(router.allowedMethods());

export default api;
