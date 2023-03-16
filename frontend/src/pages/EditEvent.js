import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');
  console.log('edit',data)

  return <EventForm method="PATCH" event={data.event} />;
}

export default EditEventPage;
