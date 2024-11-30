import { json, useParams, useLoaderData, useRouteLoaderData, redirect, defer, Await } from "react-router-dom"
import EventItem from '../components/EventItem.js'
import EventsList from "../components/EventsList.js";
import { Suspense } from "react";

export default function EventsDetailPage(){

  const params = useParams(); 
  // const data = useLoaderData();
  const {event, events} = useRouteLoaderData('event-detail')

  return (
    <>
    <Suspense fallback={<p style={{ textAlign: 'center'}}>Loading.... </p>}>
      <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent}/>}
      </Await>
    </Suspense>
    <Suspense fallback={<p style={{ textAlign: 'center'}}>Loading.... </p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
    </>
  )
}

async function loadEvents(){
  const response = await fetch('http://localhost:8080/events');
      
  if (!response.ok) {
    throw json ({ message: 'Could not fetch Events' }, {
      status: 500,
    })
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id)

  if(!response.ok){
    throw json({ message: 'Could not fetch the detail of given event'}, {
      status:500
    })
  }

  // return response  it was for simple loader we could pass this if in loader directy the response the promise
  const resData = await response.json();
  return resData.event; 
}



export function loader({ request, params }) {
  // loader when called by the react router dom it passes an object to this loader function having two important pieces of data 
  // request (object) and params(contains all route params)

  const id = params.eventId

  // here we are useing defer for multiple request 
  return defer({
    event: loadEvent(id),
    events: loadEvents()
  })
  

}

export async function action ({ params, request }){
  const eventId = params.eventId;

  const method = request.method;

  const response = await fetch('http://localhost:8080/events/' + eventId,{
    method: request.method,
  })

  if(!response.ok){
    throw json({ message: 'Could not delete the event' }, {
      status: 500
    })
  }
  
  return redirect('/events')
}
