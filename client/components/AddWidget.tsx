import { useState } from 'react'
import { NewWidget } from '../../models/Widget'
import { addWidget } from '../apiClient'

function AddWidget({ onWidgetAdded }: { onWidgetAdded: () => void }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false) // State variable to toggle form display

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newWidget: NewWidget = {
      name,
      url,
    }
    try {
      await addWidget(newWidget)
      console.log('Widget added successfully')
      onWidgetAdded()
      setShowForm(false) // Hide form after successful submission
    } catch (error) {
      console.error('Error adding widget:', error)
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

export default AddWidget
