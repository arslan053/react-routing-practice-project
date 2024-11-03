import { useParams } from "react-router-dom"

export default function EventsDetailPage(){
  const params = useParams(); 
  return (
  <>
    <h1>Event Detail</h1>
    <main>
      <h2>{params.eventId}</h2>
    </main>
  </>
  )
}