const cors = require("@koa/cors");
const Koa = require("koa");
const bodyParser = require("koa-body");
const convert = require("koa-convert");
const CSRF = require("koa-csrf");
const session = require("koa-encrypted-session");
const config = require("./src/config.json");
const router = require("./src/routes");

const PORT = config.server.PORT;
const HOST = config.server.HOST;

const app = new Koa();

app.keys = ["secret"];

app.use(cors(config.cors));

app.use(
  convert(
    session(
      {
        secretKey: Buffer.from(
          "cA0L3HTkyR0ddE/9POJAjRZAlmvWjbB9v7iaY1VmDJQ=",
          "base64"
        ),
      },
      app
    )
  )
);
/* koa-csrf lib parse token only from body or header 
 but csrf-token is added by axios in header with key: Cookie.
 ( this could be fix by adding csrf token into header on frontend
   instead of adding next middleware -> but then we get duplicates
  )
*/
app.use(async (ctx, next) => {
  const token = ctx.cookies.get("x-csrf-token");
  if (token) {
    ctx.header["x-csrf-token"] = ctx.cookies.get("x-csrf-token");
  }
  await next();
});
app.use(bodyParser());
app.use(async (ctx, next) => {
  ctx.body = ctx.request.body;
  await next();
});
app.use(new CSRF(config.csrf));
app.use(async (ctx, next) => {
  if (ctx.method === "GET") {
    ctx.cookies.set("x-csrf-token", `${ctx.csrf}`);
  }
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, HOST, () => {
  console.info(`Server is listening on host: ${HOST} and PORT: ${PORT}`);
});

app.on("error", (err) => {
  console.error("An server error occured ", err);
});
