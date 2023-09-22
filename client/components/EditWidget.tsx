import { useState } from 'react'
import { NewWidget } from '../../models/Widget.ts'

interface EditWidgetProps {
  widget: NewWidget
  onEdit: (updatedWidget: NewWidget) => void
}

function EditWidget({ widget, onEdit }: EditWidgetProps) {
  const [name, setName] = useState(widget.name)
  const [url, setUrl] = useState(widget.url)


  const handleUpdate = () => {
    const updatedWidget: NewWidget = { name, url, }
    onEdit(updatedWidget)
  }

  return (
    <div>
      <label>
        Name:{' '}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Url:{' '}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}

export default EditWidget
