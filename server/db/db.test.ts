// @vitest-environment node
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import { getWidgets } from './db.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})
// 6-16 is a reset before 
describe('getWidgets', () => {
  it('returns the correct widgets array', async () => {
    const widgets = await getWidgets()

    expect(widgets).toHaveLength(3)
    expect(widgets[0]).toHaveProperty('mfg')
    expect(widgets[1].inStock).toBe(8)
  })
})
