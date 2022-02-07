const koaResponse = (ctx, { data, status }) => {
  ctx.body = data;
  ctx.status = status;
  return ctx;
};

module.exports = koaResponse;
