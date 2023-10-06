// Import the express module to create an instance of the router.
import express from 'express'

// Import the necessary functions from the database file.
import { getUrls, newUrl, deleteUrl, updateUrl } from '../db/db.ts'

// Instantiate a new router object to define your routes.
const router = express.Router()

// Define a GET route to fetch all urls.
router.get('/', async (req, res) => {
  try {
    const urls = await getUrls() // Using await to pause the execution until the promise resolves, getting the urls from the database.
    res.json(urls) // Respond with the list of urls in JSON format.
  } catch (err) {
    res.status(500).send(err.message) // In case of an error (rejected promise), catch the error and respond with a 500 status code and the error message.
  }
})

// Define a POST route to add a new url.
router.post('/', async (req, res) => {
  const newestUrl = req.body // Retrieve the new url data from the request body.
  const addedUrl = await newUrl(newestUrl) // Use the newUrl function to add the new url to the database and await the promise it returns.
  res.json(addedUrl) // Respond with the data of the newly added url in JSON format.
})

// Define a DELETE route to remove a url by its ID.
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id) // Retrieve the url ID from the route parameters and convert it to a number.
    const result = await deleteUrl(id) // Use the deleteUrl function to remove the url from the database and await the promise it returns.
    if (result) {
      res.status(200).send({ message: 'Url deleted successfully' }) // Respond with a success message if the url was successfully deleted.
    } else {
      res.status(404).send({ message: 'Url not found' }) // Respond with a 404 status code and error message if the url was not found in the database.
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message }) // Respond with a 500 status code and error message if an error occurs during the process.
  }
})

// Define a PATCH route to update a url by its ID.
router.patch('/:id', async (req, res) => {
  const UrlId = Number(req.params.id) // Retrieve the url ID from the route parameters and convert it to a number.
  const updatedData = req.body // Retrieve the updated data from the request body.

  const updatedUrl = await updateUrl(UrlId, updatedData) // Use the updateUrl function to update the url in the database and await the promise it returns.
  res.json(updatedUrl[0]) // Respond with the data of the updated url in JSON format.
})

// Export the router object to be used in other parts of your application.
export default router
