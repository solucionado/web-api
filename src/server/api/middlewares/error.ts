import debug from 'debug'
import { CoreError } from '../../../core/errors'

export default (app) => {
  app.use(async (ctx, next) => {
    try {
      await next()
      if (!ctx.body) {
        throw new CoreError({ message: 'Not found', type: 'not_found' })
      }
    } catch (err) {
      debug('app:error:http')(err)
      ctx.error = err
      switch (err.type) {
        case 'validation':
          ctx.status = 400
          ctx.error.code = err && err.code && err.code.startsWith('E_') ? ctx.error.code : 'E_BAD_REQUEST'
          break
        case 'authentication':
          ctx.status = 401
          ctx.error.code = err.code || 'E_UNAUTHORIZED'
          break
        case 'invalid_action':
          ctx.status = 403
          ctx.error.code = err.code || 'E_INVALID_ACTION'
          break
        case 'not_found':
          ctx.status = 404
          ctx.error.code = err.code || 'E_NOT_FOUND'
          break
        case 'duplication':
          ctx.status = 409
          ctx.error.code = err.code || 'E_DUPLICATED_CONTENT'
          break
        default:
          ctx.status = 500
          ctx.error.code = err.code || 'E_INTERNAL_ERROR'
          break
      }
    }
  })
}
