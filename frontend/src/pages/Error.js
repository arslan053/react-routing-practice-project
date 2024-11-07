import PageContent from "../components/PageContent";
import { useRouteError } from 'react-router-dom'

export default function ErrorPage(){
  const error = useRouteError();

  //if we thew the respose then error object wil include the status in it , if other error is thrown then error will be that thrown object
  // and in case of thrown response the first argument(data) is got by error.data

  let title = 'An error occured';
  let message = 'Something went wrong';


  if(error.status === 500){
    // message = JSON.parse(error.data).message; // no need as json is thrown
    message = error.data.message;

  }

  if(error.status === 404){ // path not supported set be defaut react router
    title = 'Not fouund';
    message = 'Could not found page or resource';
  }


  return <PageContent title={title} >
    <p>{message}</p>
  </PageContent>
}
