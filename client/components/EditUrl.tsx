import { useState } from 'react'
import { NewUrl, EditUrlProps } from '../../models/Urls.ts'

function EditUrl({ url, onEdit, onUrlUpdated }: EditUrlProps) {
  const [name, setName] = useState(url.name)
  const [urlValue, setUrlValue] = useState(url.url) 
  
  
  const handleUpdate = () => {
    const updatedUrl: NewUrl = { name, url: urlValue } 
    onEdit(updatedUrl)
    onUrlUpdated() 
    
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
