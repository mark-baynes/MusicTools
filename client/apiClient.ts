// Import the superagent library, a client-side HTTP request library, to make API calls.
import request from 'superagent'

// Import the Url and NewUrl types from the models directory to define the types of data structures that we are working with.
import { Url, NewUrl } from '../models/Urls'

// Define a constant that holds the base URL for the url API, to be used in the HTTP requests.
const baseUrl = '/api/v1/urls/'

// Define an asynchronous function named getUrlss which returns a promise that resolves to an array of Url objects.
export async function getUrls(): Promise<Url[]> {
  // Make a GET request to the Url to retrieve all urls. The await keyword is used to wait for the request to complete before moving on to the next line of code.
  const response = await request.get(baseUrl)
  // Return the body of the response, which contains the array of urls.
  return response.body
}

// Define an asynchronous function named addUrl that takes a NewUrl object as a parameter and returns a promise that resolves to an array of Url objects.
export async function addUrl(url: NewUrl): Promise<void> {
  // Make a POST request to the Url to add a new url. The new url data is included in the request body using the .send() method.
  await request.post(baseUrl).send(url)
}

// Define an asynchronous function named deleteUrl that takes an ID number as a parameter and returns a promise that resolves to void.
export async function deleteUrl(id: number): Promise<void> {
  // Make a DELETE request to the Url with the ID of the url to be deleted appended to the URL.
  await request.delete(`${baseUrl}${id}`)
}

// Define an asynchronous function named editUrl that takes an ID number and a NewUrl object as parameters and returns a promise that resolves to void.
export async function editUrl(id: number, url: NewUrl): Promise<void> {
  // Make a PATCH request to the Url with the ID of the url to be edited appended to the URL. The updated url data is included in the request body using the .send() method.
  console.log(url)
  await request.patch(`${baseUrl}${id}`).send(url)
}
