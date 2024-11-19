import classes from './EventItem.module.css';
import { Link, useSubmit } from 'react-router-dom';

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure');
    if(proceed){
      // submit function can accept submit({ //data which can be fetched via formData}, {method: 'delete', action: 'any other action which we want to call other then default of that route'})
      submit(null, {method: 'delete'})
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        {
          // we can wrap this button to Form if we want submit to action utomatically but we will send it progrmatically with useSubmit
        }
        <button onClick={startDeleteHandler}>Delete</button> 
      </menu>
    </article>
  );
}

export default EventItem;
