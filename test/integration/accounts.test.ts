import test from 'ava'
import http from 'ava-http'
import { beforeEach, afterEach, tryPayload } from '../helpers'

test.beforeEach(t => beforeEach(t.context))
test.afterEach(t => afterEach(t.context))

test.todo('should create an account')
test.todo('should recovery password')
test.todo('should update profile')

test.skip('throws an error creating a user with invalid parameters', async t => {
  await tryPayload(http.post, `${t.context.apiUrl}/users`, [
    [ { username: '' }, (err) => {
      t.is(err.statusCode, 400)
      t.truthy(/Invalid parameter `username`/.test(err.error.msg))
    } ],
    [ [ { email: '' }, { email: null } ], (err) => {
      t.is(err.statusCode, 400)
      t.truthy(/Invalid parameter `email`/.test(err.error.msg))
    } ]
  ])
})
