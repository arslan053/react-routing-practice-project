import { Suspense, useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

function EventsPage() {
  const { events } = useLoaderData()

  /* in resolve we have to pass the promise and below Await function runs when promise is resolved*/
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents}/>}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// Loader we know load the things first then go to the page. but it wi be bad experience . lets we want to open the page and show some of the data on page
// which is avaiabe for this we have to do it with defer from react router dom it can help us to pass the promise somehow. and we have to make the loader function 
// synchronus

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

export function loader() {

  return defer({
    events: loadEvents()
  })


  // const response = await fetch('http://localhost:8080/events');
      
  // if (!response.ok) {
  //   // return {isError: true, message: 'the message here'}; // It is possible but we will not do this not recommended 
    
  //   // throw new Error('Something Went wrong. unable to fetch the data');           // we can throw error or any other kind of object i.e throw {}
  //   // when error is thrown ract route dom sime rendered the closesist Error eement 

  //   // we can send the response as wel it is helpfull as it can match the response of requestas we can set status in manua response and 
  //   //and get the resonse from manual and auto response , to make it more generic

  //   // throw new Response(JSON.stringify({ message: 'Could not fetch Events' }), {
  //   //   status: 500,
  //   // })

  //   // We can use json utiity function from reat router dom which send response automatically that incude data in json format 
  //   throw json ({ message: 'Could not fetch Events' }, {
  //     status: 500,
  //   })
  // } else {
  //   const resData = await response.json();
  //   return resData.events;
  //   // we can even send the response object as well which recieves the first data object and other extra object 
  // }
}
