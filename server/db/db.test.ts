
// Importing necessary functions and objects from vitest for defining and running tests.
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'

// Importing the database connection object from connection.ts.
import connection from './connection.ts'

// Importing the function to be tested from db.ts.
import { getUrls, newUrl, deleteUrl, updateUrl } from './db.ts'

// A hook to run once before all the tests in this suite, to prepare the database.
beforeAll(async () => {
  await connection.migrate.latest() // Running all pending migrations to bring the DB schema up to date.
})

// A hook to run before each test in this suite, to seed the database with initial data.
beforeEach(async () => {
  await connection.seed.run() // Running seed files to populate the database with data.
})

// A hook to run once after all the tests in this suite, to clean up resources.
afterAll(async () => {
  await connection.destroy() // Destroying the database connection to clean up.
})

// Defining a test suite for the getUrls function.
describe('getUrls', () => {
  // Defining a single test within the suite.
  it('returns the correct urls array', async () => {
    const urls = await getUrls() // Calling the function to be tested and awaiting its result.

    // Making assertions about the result.
    expect(urls).toHaveLength(3) // Expecting the result to be an array of length 3.
    expect(urls[0]).toHaveProperty('url') // Expecting the first object in the array to have a 'url' property.
    expect(urls[1].name).toBe('Soundcloud') // Expecting the 'name' property of the second object to be 'Soundcloud'.
  })
})

describe('newUrl', () => {
  it('adds a new url and returns it', async () => {
    // Fetch the initial set of URLs before adding a new one.
    const initialUrls = await getUrls()

    const newUrlData = {
      name: 'Test Name',
      url: 'http://test.url',
    }

    // Call the function to be tested, passing the new URL data.
    const addedUrlArray = await newUrl(newUrlData)
    const addedUrl = addedUrlArray[0]

    // Assert that the function returns an object with the expected properties.
    expect(addedUrl).toHaveProperty('id')
    expect(addedUrl.name).toBe(newUrlData.name)
    expect(addedUrl.url).toBe(newUrlData.url)

    // Now fetch the updated set of URLs after the new URL has been added.
    const newUrls = await getUrls()

    // Assert that the count of URLs has increased by 1.
    expect(newUrls.length).toBe(initialUrls.length + 1)
  })
})

describe('deleteUrl', () => {
  it('deletes a url by id and returns the number of rows affected', async () => {
    // Arrange: Ensure there's a URL to delete.
    const newUrlData: NewUrl = {
      name: 'Test Name',
      url: 'https://testurl.com',
    }
    const addedUrlArray = await newUrl(newUrlData)
    const addedUrl = addedUrlArray[0]

    // Act: Call the function to be tested.
    const result = await deleteUrl(addedUrl.id)

    // Assert: Check the function's return value and side effects.
    expect(result).toBe(1) // 1 row should have been deleted.

    // Optionally, verify the URL was actually deleted by trying to fetch it.
    const urls = await getUrls()
    expect(urls).not.toContainEqual(addedUrl)
  })
})

describe('updateUrl', () => {
  it('updates a url by id and returns the updated url', async () => {
    // Arrange: Ensure there is a URL in the database to update.
    const newUrlData = { name: 'Initial Name', url: 'http://initial.url' }
    const addedUrlArray = await newUrl(newUrlData)
    const addedUrl = addedUrlArray[0]

    // New data for updating the URL.
    const updatedUrlData = { name: 'Updated Name', url: 'http://updated.url' }

    // Act: Call the function to be tested.
    const updatedUrlArray = await updateUrl(addedUrl.id, updatedUrlData)
    const updatedUrl = updatedUrlArray[0]

    // Assert: Check the function's return value.
    expect(updatedUrl.id).toBe(addedUrl.id) // ID should remain the same.
    expect(updatedUrl.name).toBe('Updated Name') // Name should be updated.
    expect(updatedUrl.url).toBe('http://updated.url') // URL should be updated.
  })
})

