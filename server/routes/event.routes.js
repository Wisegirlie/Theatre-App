import { Router } from "express";
import { createEvent, deleteEvent, eventCount, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller.js";
import { requireSignIn } from "../middlewares/requireSignIn.js";



const router = Router();

router.get('/api/event/:id', getEventById);
router.get('/api/events/count',requireSignIn, eventCount);
router.post('/api/event', createEvent);
router.delete('/api/event/:id', deleteEvent);
router.put('/api/event/:id', updateEvent);
router.get('/api/events', getAllEvents); 


router.get('/api/event/:id',requireSignIn, getEventById);
router.get('/api/events/count',requireSignIn, eventCount);
router.post('/api/event', createEvent);
router.delete('/api/event/:id', deleteEvent);
router.put('/api/event/:id', updateEvent);
router.get('/api/events', getAllEvents); 

export default router;