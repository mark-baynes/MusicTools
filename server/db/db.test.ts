import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

import connection from './connection.ts'

import { getUrls, newUrl, deleteUrl, updateUrl } from './db.ts'
import { NewUrl } from '../../models/Urls.ts'

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

describe('newUrl', () => {
  it('adds a new url and returns it', async () => {
  
    const initialUrls = await getUrls()

    const newUrlData = {
      name: 'Test Name',
      url: 'http://test.url',
    }

   
    const addedUrlArray = await newUrl(newUrlData)
    const addedUrl = addedUrlArray[0]

    expect(addedUrl).toHaveProperty('id')
    expect(addedUrl.name).toBe(newUrlData.name)
    expect(addedUrl.url).toBe(newUrlData.url)

    const newUrls = await getUrls()

    expect(newUrls.length).toBe(initialUrls.length + 1)
  })
})

describe('deleteUrl', () => {
  it('deletes a url by id and returns the number of rows affected', async () => {
    const newUrlData: NewUrl = {
      name: 'Test Name',
      url: 'https://testurl.com',
    }
    const addedUrlArray = await newUrl(newUrlData)
    const addedUrl = addedUrlArray[0]

    const result = await deleteUrl(addedUrl.id)

    expect(result).toBe(1) 

    const urls = await getUrls()
    expect(urls).not.toContainEqual(addedUrl)
  })
})

describe('updateUrl', () => {
  it('updates a url by id and returns the updated url', async () => {
    const newUrlData = { name: 'Initial Name', url: 'http://initial.url' }
    const addedUrlArray = await newUrl(newUrlData)
    const addedUrl = addedUrlArray[0]

    const updatedUrlData = { name: 'Updated Name', url: 'http://updated.url' }

    const updatedUrlArray = await updateUrl(addedUrl.id, updatedUrlData)
    const updatedUrl = updatedUrlArray[0]

    expect(updatedUrl.id).toBe(addedUrl.id) 
    expect(updatedUrl.name).toBe('Updated Name') 
    expect(updatedUrl.url).toBe('http://updated.url') 
  })
})

