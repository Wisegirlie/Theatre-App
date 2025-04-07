const API_URL = "http://localhost:3000";

//create ticket
export const createTicket = async (userName, eventTitle, numberTickets) => {
  const response = await fetch(`${API_URL}/api/ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, eventTitle, numberTickets }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ticket creation failed');
  }

  const data = await response.json();
  return data;
};

//detele ticket
export const deleteTicket = async (id) => {
    const response = await fetch(`${API_URL}/api/ticket/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ticket deletion failed');
    }
  
    const data = await response.json();
    return data;
  };

//update ticket
export const updateTicket = async (id, numberTickets) => {
  const response = await fetch(`${API_URL}/api/ticket/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ numberTickets }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update ticket');
  }

  const data = await response.json();
  return data;
};

//get tickets
export const getAllTickets = async () => {
    const response = await fetch(`${API_URL}/api/ticket`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch tickets');
    }
  
    const data = await response.json();
    return data;
  };

  // get tickets count
export const getTicketsCount = async () => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/ticket/count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch tickets count');
  }

  const data = await response.json();
  return data.count;
};

// get user events and tickets
export const getUserEventsAndTickets = async (userId) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/ticket/events/tickets/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user events and tickets');
  }

  const data = await response.json();
  return data;
};


// purchase ticket
export const purchaseTicket = async (userId, eventTitle, numberTickets) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/ticket/purchase`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, eventTitle, numberTickets }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Ticket purchase failed');
  }

  const data = await response.json();
  return data;
};