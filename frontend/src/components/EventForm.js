import { useNavigate, Form, useNavigation, useActionData, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();

  const navigation = useNavigation();

  const data = useActionData();

  const isSubmitting = navigation.state === 'submitting';
  

  function cancelHandler() {
    navigate('..');
  }

  // typically the Form is used to trigger the action function. but we can submit it progrmattically with useSubmit to action

  return (
    <Form method= {method} className={classes.form}>
      {data && data.errors && <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : null} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : null} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

// Like the loader we also have the option of the action. instead of manually sending the request there is genereal way through 
// react-router-dom whenever Form (note Form not form) is submitted it give request to the action and then we hande it we also
// have the object we get in action having params and request ike loader

export async function action({ request, params }){
  const data = await request.formData();
  const id = params.eventId;

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  let url = 'http://localhost:8080/events'
  console.log(request.method)

  if(request.method === 'PATCH'){
    url = 'http://localhost:8080/events/' + id
  }

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  })

  if(response.status === 422){
    return response;
  }

  if(!response.ok){
    throw json({ message: 'Unable to create the event' }, {
      status: 500
    })
  }

  return redirect('/events');
} 
