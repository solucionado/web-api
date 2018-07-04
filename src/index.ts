import debug from 'debug'

import * as config from './config'
import App from './application'

// Boot application

const app = new App(config)

debug('app:info')('Application starting ...')

app.start()
  .then(() => {
    debug('app:info')('Application booted successfully')
  })
  .catch(debug('app:error'))

// Handle exit

let shutdown: any = () => {
  if (!shutdown) { return }

  debug('app:info')('Process ended, closing application ...')

  app.close()
    .then(() => {
      debug('app:info')('Application closed')
      process.exit(0)
    })
    .catch(err => () => debug('app:error')(err))

  // Prevent a new function call
  shutdown = null
}

[ 'SIGINT',
  'SIGTERM',
  'exit' ].forEach((sig: any) => process.once(sig, shutdown))
