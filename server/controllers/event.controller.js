import Event from '../models/event.model.js';
import multer from 'multer';


//create event
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('image');

export const createEvent = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    try {
      const { title, description, ticketsAvailable } = req.body;
      const image = req.file ? {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype
      } : undefined;

      const event = await Event.create({
        image,
        title,
        description,
        ticketsAvailable
      });

      const formattedEvent = {
        ...event._doc,
        image: image ? `data:${image.contentType};base64,${image.data}` : null
      };

      res.status(201).json(formattedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

//delete event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update event
export const updateEvent = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    try {
      const { id } = req.params;
      const { title, description, ticketsAvailable } = req.body;
      const image = req.file ? {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype
      } : undefined;

      
      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }

      
      event.title = title || event.title;
      event.description = description || event.description;
      event.ticketsAvailable = ticketsAvailable !== undefined ? ticketsAvailable : event.ticketsAvailable;
      if (image) {
        event.image = image;
      }

      
      await event.save();

      
      const formattedEvent = {
        ...event._doc,
        image: event.image ? `data:${event.image.contentType};base64,${event.image.data}` : null
      };

      res.status(200).json(formattedEvent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

//get allEvents
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    

    const formattedEvents = events.map(event => {
      const formattedEvent = {
        ...event._doc,
        image: event.image ? `data:${event.image.contentType};base64,${event.image.data}` : null
      };
      
      return formattedEvent;
    });

    
    res.status(200).json(formattedEvents);
  } catch (error) {
    console.error('Error retrieving events:', error.message);
    res.status(500).json({ message: error.message });
  }
};


//Event Count
export const eventCount = async (req,res) => {
  try {
    const count = await Event.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get event by ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const formattedEvent = {
      ...event._doc,
      image: event.image ? `data:${event.image.contentType};base64,${event.image.data}` : null
    };

    res.status(200).json(formattedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
