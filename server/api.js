import koa from "koa";
import mount from "koa-mount";
import cacheControl from "koa-cache-control";
import apiErrorHandler from "../util/api-error-handler";
import { BuildApi as buildApi } from "./routes";
import { FirewallApi as firewallApi } from "./routes";


export default function Api() {
  const api = koa();
  api.use(apiErrorHandler);
  api.use(mount("/v1/build", buildApi));
  api.use(mount("/v1/firewall", firewallApi));
  api.use(function* terminator() {
    return;
  });

  return api;
}
