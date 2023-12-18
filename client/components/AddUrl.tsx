import { useState } from 'react'
import { NewUrl } from '../../models/Urls'
import { addUrl } from '../apiClient'

function AddUrl({ onUrlAdded }: { onUrlAdded: () => void }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false) 

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const newUrl: NewUrl = {
      name,
      url,
    }
    try {
      await addUrl(newUrl)
      console.log('Url added successfully')
      onUrlAdded()
      setShowForm(false) 
    } catch (error) {
      console.error('Error adding url:', error)
    }
  }

  return (
    <div className="container">
      <button className="form-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add URL'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <div>
            <label className="form-label">
              Url:
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <button className="form-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default AddUrl
