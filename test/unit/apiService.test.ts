import test from 'ava'

import * as api from '../../src/server/api'

test('should throws error with an invalid port', async t => {
  const err = await t.throws(api.runApiHttpServer({}, {}))
  t.truthy(/The http server must be started with an available port/.test(err.message))
})

test('should throws error with invalid services', async t => {
  const err = await t.throws(api.runApiHttpServer({ port: 0 }))
  t.truthy(/The http server must be started with a valid core services/.test(err.message))
})

test('should start up with a valid configuration', t => {
  api.runApiHttpServer(
    { port: 0 }, {}
  ).then((server: any) => {
    server.close()
    t.pass()
  })
  .catch(t.fail)
})
