export default (app) => {
  app.use(async (ctx, next) => {
    await next()
    const now = Date.now()
    const status = ctx.status
    ctx.body = {
      msg: ctx.message,
      result: ctx.body || null,
      meta: {
        error: ctx.error && process.env.NODE_ENV !== 'production' ? {
          ...ctx.error,
          message: ctx.error.msg || ctx.error.message
        } : undefined,
        status: ctx.status,
        now,
        duration: ctx.startDate ? now - ctx.startDate + 'ms' : undefined
      }
    }
    ctx.status = status // <-- inverse declaration, wtf ?
  })
}
