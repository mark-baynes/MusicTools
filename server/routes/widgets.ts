// Import the express module to create an instance of the router.
import express from 'express'

// Import the necessary functions from the database file.
import { getWidgets, newWidget, deleteWidget, updateWidget } from '../db/db.ts'

// Instantiate a new router object to define your routes.
const router = express.Router()

// Define a GET route to fetch all widgets.
router.get('/', async (req, res) => {
  try {
    const widgets = await getWidgets() // Using await to pause the execution until the promise resolves, getting the widgets from the database.
    res.json(widgets) // Respond with the list of widgets in JSON format.
  } catch (err) {
    res.status(500).send(err.message) // In case of an error (rejected promise), catch the error and respond with a 500 status code and the error message.
  }
})

// Define a POST route to add a new widget.
router.post('/', async (req, res) => {
  const newestWidget = req.body // Retrieve the new widget data from the request body.
  const addedWidget = await newWidget(newestWidget) // Use the newWidget function to add the new widget to the database and await the promise it returns.
  res.json(addedWidget) // Respond with the data of the newly added widget in JSON format.
})

// Define a DELETE route to remove a widget by its ID.
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id) // Retrieve the widget ID from the route parameters and convert it to a number.
    const result = await deleteWidget(id) // Use the deleteWidget function to remove the widget from the database and await the promise it returns.
    if (result) {
      res.status(200).send({ message: 'Widget deleted successfully' }) // Respond with a success message if the widget was successfully deleted.
    } else {
      res.status(404).send({ message: 'Widget not found' }) // Respond with a 404 status code and error message if the widget was not found in the database.
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message }) // Respond with a 500 status code and error message if an error occurs during the process.
  }
})

// Define a PATCH route to update a widget by its ID.
router.patch('/:id', async (req, res) => {
  const WidgetId = Number(req.params.id) // Retrieve the widget ID from the route parameters and convert it to a number.
  const updatedData = req.body // Retrieve the updated data from the request body.

  const updatedWidget = await updateWidget(WidgetId, updatedData) // Use the updateWidget function to update the widget in the database and await the promise it returns.
  res.json(updatedWidget[0]) // Respond with the data of the updated widget in JSON format.
})

// Export the router object to be used in other parts of your application.
export default router
