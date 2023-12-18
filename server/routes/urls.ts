import express from 'express'

import { getUrls, newUrl, deleteUrl, updateUrl } from '../db/db.ts'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const urls = await getUrls() 
    res.json(urls) 
  } catch (err) {
    res.status(500).send(err.message) 
  }
})


router.post('/', async (req, res) => {
  const newestUrl = req.body 
  const addedUrl = await newUrl(newestUrl) 
  res.json(addedUrl) 
})


router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id) 
    const result = await deleteUrl(id) 
    if (result) {
      res.status(200).send({ message: 'Url deleted successfully' }) 
    } else {
      res.status(404).send({ message: 'Url not found' }) 
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message }) // Respond with a 500 status code and error message if an error occurs during the process.
  }
})


router.patch('/:id', async (req, res) => {
  const UrlId = Number(req.params.id) 
  const updatedData = req.body 

  const updatedUrl = await updateUrl(UrlId, updatedData) 
  res.json(updatedUrl[0])
})

export default router
