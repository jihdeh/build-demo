import koa from "koa";
import mount from "koa-mount";
import apiErrorHandler from "../util/api-error-handler";
import { BuildApi as buildApi } from "./routes";

export default function Api() {
  const api = koa();
  api.use(apiErrorHandler);
  api.use(mount("/v1/stats", buildApi));
  api.use(function* terminator() {
    return;
  });

  return api;
}
