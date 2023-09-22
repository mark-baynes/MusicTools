import React, { useState } from 'react';
import { NewWidget } from '../../models/Widget.ts';

interface EditWidgetProps {
  widget: NewWidget;
  onEdit: (updatedWidget: NewWidget) => void;
}

function EditWidget({ widget, onEdit }: EditWidgetProps) {
  const [name, setName] = useState(widget.name);
  const [url, setUrl] = useState(widget.url);

  const handleUpdate = () => {
    const updatedWidget: NewWidget = { name, url };
    onEdit(updatedWidget);
  };

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
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <button className="form-button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditWidget;
