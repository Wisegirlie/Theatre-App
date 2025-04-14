import { Router } from "express";
import { createTicket, createTicketForUser, deleteTicketById, getAllTickets, getUserEventsAndTickets, ticketCount, updateTicket } from "../controllers/ticket.controller.js";
import { requireSignIn } from "../middlewares/requireSignIn.js";



const router = Router();

router.get('/api/ticket/count', requireSignIn, ticketCount);
router.post('/api/ticket/purchase', createTicketForUser);
router.get('/api/ticket/events/tickets/:userId', requireSignIn, getUserEventsAndTickets);
router.post('/api/ticket', createTicket);
router.delete('/api/ticket/:id', deleteTicketById);
router.put('/api/ticket/:id', updateTicket);
router.get('/api/ticket', getAllTickets);


export default router;