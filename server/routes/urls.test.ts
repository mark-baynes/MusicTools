// @vitest-environment node
import { describe, it, expect, vi } from 'vitest'
import request from 'supertest'
import server from '../server.js'
import * as db from '../db/db.js'

vi.mock('../db/db')

describe('GET /api/v1/urls', () => {
  it('responds with urls array on getUrls success', () => {
    vi.mocked(db.getUrls).mockImplementation(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'Hook Theory',
          url: 'https://www.hooktheory.com/',
        },
        {
          id: 2,
          name: 'Soundcloud',
          url: 'https://soundcloud.com/',
        },
        {
          id: 3,
          name: 'Audio Joiner',
          url: 'https://clideo.com/merge-audio',
        },
      ])
    )
    return request(server)
      .get('/api/v1/urls')
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveLength(3)
        expect(res.body[1].url).toBe('https://soundcloud.com/')
      })
  })
  it('responds with 500 and error on getUrls rejection', () => {
    vi.mocked(db.getUrls).mockImplementation(() =>
      Promise.reject(new Error('mock DB error'))
    )
    return request(server)
      .get('/api/v1/urls')
      .expect(500)
      .then((err) => {
        expect(err.text).toBe('mock DB error')
      })
  })
})
