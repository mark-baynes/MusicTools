import React, { useState, useEffect } from 'react'
import { Widget, NewWidget } from '../../models/Widget'
import AddWidget from '../components/AddWidget'
import EditWidget from '../components/EditWidget'
import { getWidgets, deleteWidget, editWidget } from '../apiClient'

const MusicUrl = () => {
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [reloadWidgets, setReloadWidgets] = useState(true)
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null)
  const [showMusicUrl, setShowMusicUrl] = useState(false) // New state variable

  useEffect(() => {
    if (reloadWidgets) {
      const fetchWidgets = async () => {
        try {
          const response = await getWidgets()
          setWidgets(response)
        } catch (error) {
          console.log('An error occurred:', error)
        }
      }

      fetchWidgets()
      setReloadWidgets(false)
    }
  }, [reloadWidgets])

  const handleDelete = async (id: number) => {
    try {
      await deleteWidget(id)
      setWidgets(widgets.filter((widget) => widget.id !== id))
    } catch (error) {
      console.log('Error deleting widget:', error)
    }
  }

  const handleEdit = (id: number) => {
    const widgetToEdit = widgets.find((widget) => widget.id === id)
    if (widgetToEdit) {
      setSelectedWidget(widgetToEdit)
    }
  }

  const handleUpdate = async (updatedWidget: NewWidget) => {
    if (!selectedWidget) return
    try {
      await editWidget(selectedWidget.id, updatedWidget)
      setWidgets(
        widgets.map((widget) =>
          widget.id === selectedWidget.id
            ? { ...widget, ...updatedWidget }
            : widget
        )
      )
      setSelectedWidget(null)
    } catch (error) {
      console.error('Error updating widget:', error)
    }
  }

  return (
    <div>
      <button onClick={() => setShowMusicUrl(!showMusicUrl)}> {/* New toggle button */}
        {showMusicUrl ? 'Hide Music URLs' : 'Show Music URLs'}
      </button>

      {showMusicUrl && (  // Conditional rendering 
        <div className="container">
          <h2>Music URLs</h2>
          <AddWidget onWidgetAdded={() => setReloadWidgets(true)} />
          {selectedWidget && (
            <EditWidget widget={selectedWidget} onEdit={handleUpdate} />
          )}
          {widgets.map((widget) => (
            <div key={widget.id}>
              <p>Name: {widget.name}</p>
              <p>Url: {widget.url}</p>
              <button onClick={() => handleDelete(widget.id)}>Delete</button>
              <button onClick={() => handleEdit(widget.id)}>Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicUrl;
