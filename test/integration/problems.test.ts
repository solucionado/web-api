import test from 'ava'
import { beforeEach, afterEach } from '../helpers'

test.beforeEach(async t => beforeEach(t.context))
test.afterEach(async t => afterEach(t.context))

test.todo('problem topic - throws an error if there is missing or invalid parameters creating new one')
test.todo('problem topic - can create a new one')
test.todo('problem topic - can aprove a new one pending of moderation')
test.todo('problem topic - can vote positive/negative')
test.todo('problem topic - can get a top ranking of problem topics with most positive votes')
test.todo('problem topic - can disable/remove a problem topic')
