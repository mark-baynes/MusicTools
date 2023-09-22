// Import necessary modules and components
import { useState, useEffect } from 'react'

import { getWidgets, deleteWidget, editWidget } from '../apiClient.ts'
import { Widget, NewWidget } from '../../models/Widget.ts'
import AddWidget from '../components/AddWidget.tsx'
import EditWidget from '../components/EditWidget.tsx'

// Define the App function component
function App() {
  // Define state variables using the useState hook
  // 'widgets' holds an array of Widget objects, initially an empty array
  const [widgets, setWidgets] = useState([] as Widget[])

  // 'reloadWidgets' is a boolean flag to determine when to fetch widgets from the server, initially set to true
  const [reloadWidgets, setReloadWidgets] = useState(true)

  // 'selectedWidget' holds the current selected widget object for editing, initially null
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null)

  // Define an effect using the useEffect hook that runs when 'reloadWidgets' changes
  useEffect(() => {
    if (reloadWidgets) {
      // Define an asynchronous function to fetch widgets
      const fetchWidgets = async () => {
        try {
          // Try fetching the widgets from the server and set the response to the 'widgets' state
          const response = await getWidgets()
          setWidgets(response)
        } catch (error) {
          // Log any error that occurs during fetching
          console.log('oops', error)
        }
      }

      // Call the fetchWidgets function to initiate the fetching
      fetchWidgets()

      // Reset the 'reloadWidgets' flag to avoid repetitive fetching
      setReloadWidgets(false)
    }
  }, [reloadWidgets]) // The dependency array includes 'reloadWidgets', so the effect runs whenever it changes

  // Define a function to handle the deletion of a widget
  const handleDelete = async (id: number) => {
    try {
      // Try deleting the widget with the specified id
      await deleteWidget(id)

      // Update the 'widgets' state by filtering out the deleted widget
      setWidgets(widgets.filter((widget) => widget.id !== id))
    } catch (error) {
      // Log any error that occurs during deletion
      console.log('Error deleting widget:', error)
    }
  }

  // Define a function to handle editing a widget
  const handleEdit = (id: number) => {
    // Find the widget to be edited from the 'widgets' state using its id
    const widgetToEdit = widgets.find((widget) => widget.id === id)
    if (widgetToEdit) {
      // If the widget is found, set it to the 'selectedWidget' state for editing
      setSelectedWidget(widgetToEdit)
    }
  }

  // Define a function to handle updating a widget
  const handleUpdate = async (updatedWidget: NewWidget) => {
    try {
      // Try updating the widget on the server with the new data
      await editWidget(selectedWidget!.id, updatedWidget)

      // Update the 'widgets' state with the new widget data
      setWidgets((prevWidgets) =>
        prevWidgets.map((widget) =>
          widget.id === selectedWidget!.id
            ? { ...widget, ...updatedWidget } // Merge the old and new data for the updated widget
            : widget
        )
      )

      // Reset the 'selectedWidget' state to null after updating
      setSelectedWidget(null)
    } catch (error) {
      // Log any error that occurs during updating
      console.error('Error updating widget:', error)
    }
  }

  // Return the JSX structure for rendering the component
  return (
    <div>
      <h1>Music Tools</h1>
      {selectedWidget && (
        // Conditionally render the EditWidget component if a widget is selected for editing
        <EditWidget widget={selectedWidget} onEdit={handleUpdate} />
      )}
      {widgets.map((widget) => (
        // Map over the 'widgets' array to render each widget along with Delete and Edit buttons
        <div key={widget.id}>
      
          <p>Name: {widget.name}</p>
          <p>Url: {widget.url} </p>
          <button onClick={() => handleDelete(widget.id)}>Delete</button>
          <button onClick={() => handleEdit(widget.id)}>Edit</button>
        </div>
      ))}
      <br></br>
      <AddWidget onWidgetAdded={() => setReloadWidgets(true)} />
      
      {/* Render the AddWidget component with a callback to set 'reloadWidgets' to true when a widget is added */}
    </div>
  )
}

// Export the App component as the default export
export default App
