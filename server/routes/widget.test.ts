// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../server.js'
import * as db from '../db/db.js'

vi.mock('../db/db')

describe('GET /api/v1/widgets', () => {
  it('responds with widgets array on getWidgets success', () => {
    vi.mocked(db.getWidgets).mockImplementation(() =>
      Promise.resolve([
        { id: 1, name: 'test 1', price: 1.23, mfg: 'Test 1 Inc.', inStock: 4 },
        { id: 2, name: 'test 2', price: 45.67, mfg: 'Test 2 Inc.', inStock: 0 },
        {
          id: 3,
          name: 'test 3',
          price: 890.12,
          mfg: 'Test 3 Inc.',
          inStock: 8,
        },
      ])
    )
    return request(server)
      .get('/api/v1/widgets')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[1].price).toBe(45.67)
      })
  })
  it('responds with 500 and error on getWidgets rejection', () => {
    vi.mocked(db.getWidgets).mockImplementation(() =>
      Promise.reject(new Error('mock DB error'))
    )
    return request(server)
      .get('/api/v1/widgets')
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('mock DB error')
      })
  })
})
