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

describe('POST /api/v1/urls', () => {
  it('responds with added url on successful POST', () => {
    
    const newUrlData = {
      name: 'New URL',
      url: 'https://example.com/new-url',
    }

    
    vi.mocked(db.newUrl).mockImplementation(() => Promise.resolve(newUrlData))

    return request(server)
      .post('/api/v1/urls')
      .send(newUrlData) 
      .expect(200) 
      .then((res) => {
        
        expect(res.body).toEqual(newUrlData)
      })
  })

  it('responds with 500 and error on failed POST', async () => {
    
    const newUrlData = {
      name: 'Invalid URL',
      url: 'invalid-url', 
    }


    vi.mocked(db.newUrl).mockImplementation(() =>
      Promise.reject(new Error('Mock DB error'))
    )

    try {
      await request(server)
        .post('/api/v1/urls')
        .send(newUrlData) 
        .expect(500) 

     
      expect.assertions(1) 
    } catch (err) {
  
      expect(err.text).toBe('Mock DB error')
    }
  })
})
