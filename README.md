# The Wonderful World of Widgets

This exercise reverses the roles from yesterday: today the API has been (partially) built for us. Our job is to build the React front end that consumes the API (using the node module `superagent`), and store the resulting data into component state.

## Setup

### 0. Installation and migrations

- [ ] Clone this repo and `cd` into the new directory
- [ ] Install packages, run migrations and seeds, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

  Commands might look like this:

  ```sh
  npm install
  npm run knex migrate:latest
  npm run knex seed:run
  npm run dev


  npm run knex migrate:rollback
  ```

  </details>

- [ ] Navigate to [http://localhost:5173](http://localhost:5173)

---

## Laying the foundations

### 1. Getting familiar with the code base

- [ ] Take a look around the project to make sure you're familiar with the layout
  <details style="padding-left: 2em">
    <summary>Tips</summary>

  - Take particular note of what is in your client folder and the setup of the server routes in the back end
  - Investigate the shape of the data in the database
  </details>

### 2. Setting up the `<App>` component

The widget data is being stored in a database (on our server side), so we'll have to make an API call to retrieve the data.

- [ ] Add a `useState` hook to the `<App>` component, so we can store `widgets` in component state. Make the initial value an empty array with the type `Widget[]`.
  <details style="padding-left: 2em">
    <summary>More about <code>&lt;useState&gt;</code> and types</summary>

  If `useState` is given an empty array as its initial value TypeScript will assume the array's type is `never[]`, an array that is always empty. To allow us to later store data in this array we need to cast the type using the `as` keyword.

  To store `widgets` our useState will look like this:

  ```ts
  const [widgets, setWidgets] = useState([] as Widget[])
  ```

  The Widget interface is already defined in `models/Widget.ts`.

  </details>

- [ ] Also add a `useEffect` hook to `<App>`
  <details style="padding-left: 2em">
    <summary>More about <code>&lt;useEffect&gt;</code></summary>

  `useEffect` accepts a function as its first parameter. Eventually we will call the API function from here, but for now just have this function do a `console.log('using the effect')`

  - Remember to pass an empty array to `useEffect` as the second parameter (so that the function only runs once - when the component mounts)
  - Refresh the app in your browser the with DevTools console open. Make sure you can see your `useEffect` message
  </details>

---

## Building up the stack

### 3. Connecting the server API to the client API

- [ ] Using Insomnia, test that the existing GET route for widgets is working, and see what data it returns
  <details style="padding-left: 2em">
    <summary>More about the GET route</summary>

  Looking in our `server` folder, we can see that a database function called `getWidgets` has already been built in `db/db.ts`. A GET route using that DB function is also in place in `routes/widgets.ts`.

  Test that the route is working (and see what data it returns) by making a GET request to `http://localhost:3000/api/v1/widgets/` from Insomnia.
  </details>

- [ ] Using the `getWidgets` function in `apiClient.ts` and the `superagent` library, make a GET request to `'/api/v1/widgets/'`, just like we did with Insomnia
  <details style="padding-left: 2em">
    <summary>More about the <code>getWidgets</code> request</summary>

  This time looking in the client folder, you'll find a `getWidgets` function in `apiClient.ts`. Use `superagent` to make a GET request to `'/api/v1/widgets/'`. If all goes well, it should be returning just the response body (which is the JSON data being sent from our server - we don't need the rest of the HTTP response data).
  </details>

- [ ] Import this `getWidgets` function from `apiClient.ts` into `App.tsx`

### 4. Connecting the client API to the user interface (UI)

- [ ] In the function you passed to `useEffect`, call the `getWidgets` function
  <details style="padding-left: 2em">
    <summary>More about <code>getWidgets</code> inside <code>useEffect</code></summary>

  - Superagent uses a promise-based interface, so you will need to chain a `.then()` block after this
  - Inside your `.then()` block, `console.log` the result of `getWidgets`
  - Refresh the app in your browser again. Make sure you can see the array of widget data in the console
  </details>

- [ ] Remove the `console.log` and instead use the `setWidgets` function (from your `useState`) to update state with the widget data from the API

- [ ] Use the React Dev Tools to check that state updates as you expect

### 5. Updating the UI to consume the data

- [ ] Modify the `tsx` your component returns so that it displays the widgets from the component state
  <details style="padding-left: 2em">
    <summary>Tip</summary>
    
    You could use a `.map` here to render a new `<Widget>` component for each widget.

  To avoid a name clash with the `<Widget>` component and the `Widget` type interface use a [_namespace_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#namespace_import) import and update the cast for the type with dot notation.

  ```ts
  import * as Models from '../../models/Widget.ts'

  const [widgets, setWidgets] = useState([] as Models.Widget[])
  ```

</details>

---

## Full Stack

These next steps will be full stack, requiring you to make changes to both the front and back end.

### 6. Adding, deleting, and updating widgets

- [ ] Add the ability to add a widget (HTTP POST)
<details style="padding-left: 2em">
  <summary>More about adding a widget</summary>
  
  Some steps you could take to complete this are:
  - Create a POST route on the server side in `widgets.ts`. Test you can get a response for it in Insomnia
  - Create the database function to add a new widget. Call this function in your route and test it works in Insomnia
  - Create an `addWidget` function in `apiClient.ts` that will make a POST request to the API route you just built
  - Create a new `<AddWidget>` component containing a form. Import the `addWidget` function from `apiClient.ts` and hook it up to your form's submit handler
  - Once your widget has been added, have your widget list refresh so the new widget is visible. Perhaps this could involve reusing the `getWidgets` API function, or thinking about the data you return from your POST route...
  - Create an "Add Widget" button in `<App>` to conditionally render your `<AddWidget>` form
</details>

- [ ] Add the ability to delete a widget (HTTP DELETE)

- [ ] Add the ability to update a widget (HTTP PATCH)

### 7. Enhancing widget info

- [ ] Extend the database schema to include a `rating` for each widget
<details style="padding-left: 2em">
  <summary>More about widget ratings</summary>
  
  Add a `rating` field so we know how good those widgets really are. This will also need to be added into what is displayed, and also onto the fields of the add form.
</details>

### 8. Increasing maintainability

- [ ] Refactor your code into separate components (if it isn't already)

- [ ] Write tests for your components

---

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=react-to-web-api)
