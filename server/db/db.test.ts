// @vitest-environment node
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from './connection.ts'
import { getUrls } from './db.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('getUrls', () => {
  it('returns the correct urls array', async () => {
    const urls = await getUrls()

    expect(urls).toHaveLength(3)
    expect(urls[0]).toHaveProperty('url')
    expect(urls[1].name).toBe('Soundcloud')
  })
})
