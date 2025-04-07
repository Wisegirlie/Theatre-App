const API_URL = "http://localhost:3000";


//create
export const createEvent = async (eventData) => {
  const formData = new FormData();
  formData.append('image', eventData.image);
  formData.append('title', eventData.title);
  formData.append('description', eventData.description);
  formData.append('ticketsAvailable', eventData.ticketsAvailable);

  const response = await fetch(`${API_URL}/api/event`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create event');
  }

  const data = await response.json();
  return data;
};


//delete
export const deleteEvent = async (id) => {
  const response = await fetch(`${API_URL}/api/event/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to delete event');
  }

  return response.json();
};


//update
export const updateEvent = async (id, eventData) => {
  const formData = new FormData();
  formData.append('image', eventData.image);
  formData.append('title', eventData.title);
  formData.append('description', eventData.description);
  formData.append('ticketsAvailable', eventData.ticketsAvailable);

  const response = await fetch(`${API_URL}/api/event/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update event');
  }

  const data = await response.json();
  return data;
};

//update byID
export const updateEventTickets = async (id, ticketsAvailable) => {
  const response = await fetch(`${API_URL}/api/event/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ticketsAvailable }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update event tickets');
  }

  const data = await response.json();
  return data;
};


//get allEvents     
export const getAllEvents = async () => {
  
  const response = await fetch(`${API_URL}/api/events`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch events');
  }

  const data = await response.json();
 
  return data;
};

// get events count
export const getEventsCount = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/events/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch events count');
  }

  const data = await response.json();
  return data.count;
};

// get event by ID
export const getEventById = async (id) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/event/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch event');
  }

  const data = await response.json();
  return data;
};
