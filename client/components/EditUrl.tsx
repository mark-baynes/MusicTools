import { useState } from 'react'
import { NewUrl } from '../../models/Urls.ts'

interface EditUrlProps {
  url: NewUrl
  onEdit: (updatedUrl: NewUrl) => void
  onUrlUpdated: () => void
}

function EditUrl({ url, onEdit, onUrlUpdated }: EditUrlProps) {
  const [name, setName] = useState(url.name)
  const [urlValue, setUrlValue] = useState(url.url) // Adjusted naming here
  
  
  const handleUpdate = () => {
    const updatedUrl: NewUrl = { name, url: urlValue } // Adjusted naming here
    onEdit(updatedUrl)
    onUrlUpdated() // Signal that the URL has been updated
    
  }

  return (
    <div className="container">
      <form>
        <div>
          <label className="form-label">
            Name:
            <input
              className="form-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="form-label">
            Url:
            <input
              className="form-input"
              type="text"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
            />
          </label>
        </div>
        <button className="form-button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  )
}

export default EditUrl
