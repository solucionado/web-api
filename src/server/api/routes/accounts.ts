import koaRouter from 'koa-router'

// import { AccountsService } from '../../../core/services/accounts'
import { Services } from '../../../application'

export default (app, services: Services) => {
  // const accountsService: AccountsService = services.accounts!

  const router = koaRouter({
    prefix: '/accounts'
  })

  app.use(router.routes())
  app.use(router.allowedMethods())
}
