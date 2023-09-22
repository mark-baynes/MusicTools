import { useState } from 'react'
import { NewWidget } from '../../models/Widget'
import { addWidget } from '../apiClient'

function AddWidget({ onWidgetAdded }: { onWidgetAdded: () => void }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newWidget: NewWidget = {
      name,
      url,
    }

    try {
      await addWidget(newWidget)
      console.log('Widget added successfully')
      onWidgetAdded() // This will trigger the reloading of widgets
    } catch (error) {
      console.error('Error adding widget:', error)
    }
  }

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Add a URL</h3>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Url:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default AddWidget
