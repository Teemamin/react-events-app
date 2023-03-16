import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

function NewEventPage() {
  const data = useRouteLoaderData('event-detail')
  console.log('new',data)
  return <EventForm method="post" />;
}

export default NewEventPage;

