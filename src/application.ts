import debug from 'debug'
import { EventEmitter } from 'events'

import db, { createDbConnections, closeDbConnections } from './adapters/db'
import { runApiHttpServer } from './server/api'

import AccountsRepository from './adapters/repositories/accounts'
import SessionsRepository from './adapters/repositories/sessions'

import createAccountsService, { AccountsService } from './core/services/accounts'
import crearteSessionsService, { SessionsService } from './core/services/sessions'

const dbAdapter = (adapter: string) => {
  return (target: Application, propertyKey: string) => {
    if (!db[adapter]) {
      throw new Error(`Database adapter ${adapter} is not defined`)
    }
    // Create single instance per class of db adapter
    let _obj = null
    Object.defineProperty(target, propertyKey, {
      get: function () {
        const dbAdapter = (this as Application).db[adapter]
        if (!dbAdapter) {
          return undefined
        }
        if (!_obj) {
          _obj = db[adapter][propertyKey](dbAdapter)
        }
        return _obj
      }
    })
  }
}

export interface Services {
  accounts?: AccountsService,
  sessions?: SessionsService
}

export default class Application {
  config: any = {}
  db: any = {}
  services: Services = {}
  server: any = {}
  emitter: EventEmitter = new EventEmitter()

  @dbAdapter('mongodb')
  accountsRepository?: AccountsRepository

  @dbAdapter('redis')
  sessionsRepository?: SessionsRepository

  constructor (config) {
    this.config = config
  }

  createCoreServices () {
    const services: Services = {}

    services.accounts = createAccountsService({
      accountsRepository: this.accountsRepository!,
      services
    })

    services.sessions = crearteSessionsService({
      sessionsRepository: this.sessionsRepository!,
      services
    })

    return services
  }

  async start () {
    // Instantiate database connections
    this.db = await createDbConnections(this.config.db)
    // // Instantiate core services
    this.services = this.createCoreServices()
    // // Start api http server
    this.server.http = await runApiHttpServer(this.config.api, this.services)
  }

  async close () {
    closeDbConnections(this.db).catch(debug('app:error'))
    if (this.server.http) {
      this.server.http.close()
    }
  }
}
