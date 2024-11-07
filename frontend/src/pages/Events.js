import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { json, useLoaderData } from 'react-router-dom';

function EventsPage() {
  const fetchedEvents = useLoaderData()

 
  return (
    <>
      <EventsList events={fetchedEvents} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/eventskk');
      
  if (!response.ok) {
    // return {isError: true, message: 'the message here'}; // It is possible but we will not do this not recommended 
    
    // throw new Error('Something Went wrong. unable to fetch the data');           // we can throw error or any other kind of object i.e throw {}
    // when error is thrown ract route dom sime rendered the closesist Error eement 

    // we can send the response as wel it is helpfull as it can match the response of requestas we can set status in manua response and 
    //and get the resonse from manual and auto response , to make it more generic

    // throw new Response(JSON.stringify({ message: 'Could not fetch Events' }), {
    //   status: 500,
    // })

    // We can use json utiity function from reat router dom which send response automatically that incude data in json format 
    throw json ({ message: 'Could not fetch Events' }, {
      status: 500,
    })
  } else {
    const resData = await response.json();
    return resData.events;
    // we can even send the response object as well which recieves the first data object and other extra object 
  }
}
