import connection from './connection.ts' // Importing the connection object from the 'connection.ts' file which likely contains database connection details.
import { Url, NewUrl } from '../../models/Urls.ts' // Importing the Url and NewUrl types from your Url model file to use in this module.

// A function to fetch all urls from the database.
export function getUrls(db = connection): Promise<Url[]> {
  return db<Url>('musicLinks').select() // Utilising the database connection to select and return all records from the 'urls' table, with a promise that returns an array of url objects.
}

// A function to create a new url and add it to the database, to be called when a POST request is made to the '/api/v1/urls' endpoint.
export function newUrl(newUrlData: NewUrl): Promise<Url> {
  return connection<Url>('musicLinks') // Starting a new database transaction targeting the 'urls' table.
    .insert({ ...newUrlData }) // Inserting the new url data into the 'urls' table.
    .returning(['id', 'name', 'url']) // Specifying the columns to return after the insert operation. Just returning one url.
}

// A function to delete a url by its ID, to be called when a DELETE request is made to the 'api/v1/urls/1' endpoint.
export function deleteUrl(id: number): Promise<number> {
  return connection('musicLinks').where({ id }).del() // Finding and deleting the url with the specified ID in the 'urls' table, returns the number of rows affected (should be 1 if successful).
}

// A function to update a url by its ID, to be called when a PATCH request is made to the 'api/v1/urls/2' endpoint.
export function updateUrl(id: number, updatedData: NewUrl) {
  return connection('musicLinks') // Starting a new database transaction targeting the 'urls' table.
    .where({ id }) // Finding the url with the specified ID in the 'urls' table.
    .update({ ...updatedData }) // Updating the found url with the new data provided. The '...' is the spread operator, which is used to expand the properties of the 'updatedData' object into individual key-value pairs within the new object passed to the update method.
    .returning([
      // Specifying the columns to return after the update operation.
      'id',
      'name',
      'url',
    ])
}
