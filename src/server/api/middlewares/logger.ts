import debug from 'debug'

import { isReadableContent } from '../../../lib/utils'

const logRes = debug('app:http:Response')
const logReq = debug('app:http:Request')
const logJSON = debug('app:http:JSON')

export default (app) => {
  app.use(async (ctx, next) => {
    const startDate = Date.now()
    ctx.startDate = startDate
    /* Secure X-Forwarded-For remote IP, credits to Rilke Petrosky (https://github.com/xenomuta) */
    if (ctx.get('X-Real-IP') && ctx.ips.length > 0 && process.env.NODE_ENV === 'production') {
      ctx.request.safeIP = ctx.get('X-Real-IP')
    }
    ctx.request.safeIP = ctx.request.safeIP || ctx.request.ip
    if (debug.enabled('app:http:Request')) {
      logReq(`[${new Date()}] ${ctx.request.safeIP} | ${ctx.request.method} ${ctx.request.url}`)
      logReq(`Headers: ${JSON.stringify(ctx.request.headers)}`)

      if (typeof (ctx.request.body) === 'object' && debug.enabled('app:http:JSON')) {
        logJSON(`Req: ${ctx.request.method} ${ctx.request.url} => ${JSON.stringify(ctx.request.body)}`)
      }
    }
    await next()
    const ms = Date.now() - startDate
    if (debug.enabled('app:http:Response')) {
      let fileType = ''
      let jsonLog = false
      let body = ctx.body
      if (isReadableContent(body) && body.path) {
        fileType += ` | Serving file => ${body.path.replace(process.env.PWD + '/', '', 'g')}`
      } else {
        jsonLog = true
      }
      logRes(`[${new Date()}] ${ctx.request.safeIP} | ${ctx.request.method} ${ctx.request.url} (${ms} ms) | ${ctx.response.status}${fileType}`)
      logRes(`Headers: ${JSON.stringify(ctx.response.headers)}`)
      if (jsonLog && debug.enabled('app:http:JSON') && ctx.body) {
        logJSON(`Res: ${ctx.request.method} ${ctx.request.url} | ${ctx.response.status} => %j`, body)
      }
    }
  })
}
