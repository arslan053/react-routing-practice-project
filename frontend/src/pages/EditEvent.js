import { useLoaderData, useParams, useRouteLoaderData } from "react-router-dom"
import EventForm from "../components/EventForm.js"

export default function EditEventPage(){
  const params = useParams();
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail');
  return (
    <EventForm method='patch' event={data.event}/>
  )
}
