import { useParams } from "react-router-dom"

export default function EditEventPage(){
  const params = useParams();
  return (
    <>
      <h1>Edit Event</h1>
      <main>
        <h2>{params.eventId}</h2>
      </main>
    </>
  )
}