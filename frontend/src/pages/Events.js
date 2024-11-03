import { Link } from 'react-router-dom'
const EVENTS = [
  {id: 'E1', title: 'Event1'},
  {id: 'E2', title: 'Event2'},
  {id: 'E3', title: 'Event3'}
]

export default function Events(){
  return (
    <>
      <h2>My Events </h2>
      <ul>
        {EVENTS.map((event) => (
          <li key={event.id}><Link to={event.id}>{event.title}</Link></li>
        ))}
      </ul>
    </>
  )
}