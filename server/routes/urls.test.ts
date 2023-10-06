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
    // Define the request body data for the POST request.
    const newUrlData = {
      name: 'New URL',
      url: 'https://example.com/new-url',
    }

    // Mock the newUrl function to return the added URL data.
    vi.mocked(db.newUrl).mockImplementation(() => Promise.resolve(newUrlData))

    return request(server)
      .post('/api/v1/urls')
      .send(newUrlData) // Send the POST request with the data.
      .expect(200) // Expect a successful response status code.
      .then((res) => {
        // Expect the response body to contain the added URL data.
        expect(res.body).toEqual(newUrlData)
      })
  })

  it('responds with 500 and error on failed POST', async () => {
    // Define the request body data for the POST request.
    const newUrlData = {
      name: 'Invalid URL',
      url: 'invalid-url', // This is an invalid URL.
    }

    // Mock the newUrl function to simulate a failed POST.
    vi.mocked(db.newUrl).mockImplementation(() =>
      Promise.reject(new Error('Mock DB error'))
    )

    try {
      await request(server)
        .post('/api/v1/urls')
        .send(newUrlData) // Send the POST request with the data.
        .expect(500) // Expect a 500 response status code.

      // Add an expect statement here to assert that the error is thrown and handled correctly.
      expect.assertions(1) // Expect one assertion to be made.
    } catch (err) {
      // Handle the error here, e.g., by expecting the error message.
      expect(err.text).toBe('Mock DB error')
    }
  })
})
