import connection from './connection.ts' // Importing the connection object from the 'connection.ts' file which likely contains database connection details.
import { Widget, NewWidget } from '../../models/Widget.ts' // Importing the Widget and NewWidget types from your Widget model file to use in this module.

// A function to fetch all widgets from the database.
export function getWidgets(db = connection): Promise<Widget[]> {
  return db<Widget>('musicLinks').select() // Utilising the database connection to select and return all records from the 'widgets' table, with a promise that returns an array of Widget objects.
}

// A function to create a new widget and add it to the database, to be called when a POST request is made to the '/api/v1/widgets' endpoint.
export function newWidget(newWidgetData: NewWidget): Promise<Widget> {
  return connection<Widget>('musicLinks') // Starting a new database transaction targeting the 'widgets' table.
    .insert({ ...newWidgetData }) // Inserting the new widget data into the 'widgets' table.
    .returning(['id', 'name', 'url',]) // Specifying the columns to return after the insert operation. Just returning one widget.
}

// A function to delete a widget by its ID, to be called when a DELETE request is made to the 'api/v1/widgets/1' endpoint.
export function deleteWidget(id: number): Promise<number> {
  return connection('musicLinks').where({ id }).del() // Finding and deleting the widget with the specified ID in the 'widgets' table, returns the number of rows affected (should be 1 if successful).
}

// A function to update a widget by its ID, to be called when a PATCH request is made to the 'api/v1/widgets/2' endpoint.
export function updateWidget(id: number, updatedData: NewWidget) {
  return connection('musicLinks') // Starting a new database transaction targeting the 'widgets' table.
    .where({ id }) // Finding the widget with the specified ID in the 'widgets' table.
    .update({ ...updatedData }) // Updating the found widget with the new data provided. The '...' is the spread operator, which is used to expand the properties of the 'updatedData' object into individual key-value pairs within the new object passed to the update method.
    .returning([
      // Specifying the columns to return after the update operation.
      'id',
      'name',
      'url',
  
    ])
}
