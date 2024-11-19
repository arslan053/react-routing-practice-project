import { json, useParams, useLoaderData, useRouteLoaderData, redirect } from "react-router-dom"
import EventItem from '../components/EventItem.js'

export default function EventsDetailPage(){

  const params = useParams(); 
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail')

  return (
    <EventItem event={data.event}/>
  )
}

export async function loader({ request, params }) {
  // loader when called by the react router dom it passes an object to this loader function having two important pieces of data 
  // request (object) and params(contains all route params)

  const id = params.eventId
  const response = await fetch('http://localhost:8080/events/' + id)

  if(!response.ok){
    throw json({ message: 'Could not fetch the detail of given event'}, {
      status:500
    })
  }

  return response

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
