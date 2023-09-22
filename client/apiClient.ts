// Import the superagent library, a client-side HTTP request library, to make API calls.
import request from 'superagent'

// Import the Widget and NewWidget types from the models directory to define the types of data structures that we are working with.
import { Widget, NewWidget } from '../models/Widget'

// Define a constant that holds the base URL for the widget API, to be used in the HTTP requests.
const widgetUrl = '/api/v1/widgets/'

// Define an asynchronous function named getWidgets which returns a promise that resolves to an array of Widget objects.
export async function getWidgets(): Promise<Widget[]> {
  // Make a GET request to the widgetUrl to retrieve all widgets. The await keyword is used to wait for the request to complete before moving on to the next line of code.
  const response = await request.get(widgetUrl)
  // Return the body of the response, which contains the array of widgets.
  return response.body
}

// Define an asynchronous function named addWidget that takes a NewWidget object as a parameter and returns a promise that resolves to an array of Widget objects.
export async function addWidget(widget: NewWidget): Promise<void> {
  // Make a POST request to the widgetUrl to add a new widget. The new widget data is included in the request body using the .send() method.
  await request.post(widgetUrl).send(widget)
}

// Define an asynchronous function named deleteWidget that takes an ID number as a parameter and returns a promise that resolves to void.
export async function deleteWidget(id: number): Promise<void> {
  // Make a DELETE request to the widgetUrl with the ID of the widget to be deleted appended to the URL.
  await request.delete(`${widgetUrl}${id}`)
}

// Define an asynchronous function named editWidget that takes an ID number and a NewWidget object as parameters and returns a promise that resolves to void.
export async function editWidget(id: number, widget: NewWidget): Promise<void> {
  // Make a PATCH request to the widgetUrl with the ID of the widget to be edited appended to the URL. The updated widget data is included in the request body using the .send() method.
  await request.patch(`${widgetUrl}${id}`).send(widget)
}
