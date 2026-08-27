const express = require('express');
const router = express.Router();
const {
    requireAuth,
    requireRole
} = require('../middleware/requireAuth');
const {
    validateAllBody,
    validatePartialBody,
    validateQuery,
    validateEventID,
    validator
} = require('../middleware/validate');

const {
    listEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event CRUD, filtering, pagination, sorting, and search
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: List events with optional filtering, pagination, sorting, and search
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Category ObjectId
 *       - in: query
 *         name: city
 *         schema: { type: string }
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [date, registrations] }
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc] }
 *     responses:
 *       200:
 *         description: A paginated list of events
 *   post:
 *     summary: Create a new event (admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, city, venue, capacity, category, date]
 *             properties:
 *               title: { type: string, example: "Ariana Grande Concert" }
 *               description: { type: string }
 *               city: { type: string, example: "Cairo" }
 *               venue: { type: string, example: "The Great Hall" }
 *               capacity: { type: integer, example: 120 }
 *               category: { type: string, example: "64f0a1b2c3d4e5f678901234" }
 *               date: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Event created
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not an admin
 *       422:
 *         description: Validation failed
 * 
 */
router.get('/', validateQuery, validator, listEvents);
router.get('/:eventID', validateEventID, validator, getEvent);

/**
 * @swagger
 * /api/events/{eventID}:
 *   get:
 *     summary: Get a single event, populated with category and organizer
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventID
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: The requested event
 *       404:
 *         description: Event not found
 *   patch:
 *     summary: Update an event (admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventID
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               capacity: { type: integer }
 *               date: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Event updated
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not an admin
 *       404:
 *         description: Event not found
 *   delete:
 *     summary: Delete an event (admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventID
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Event deleted
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not an admin
 *       404:
 *         description: Event not found
 */

router.post('/', requireAuth, requireRole('admin'), validateAllBody, validator, createEvent);
router.patch('/:eventID', requireAuth, requireRole('admin'), validateEventID, validatePartialBody, validator, updateEvent);
router.delete('/:eventID', requireAuth, requireRole('admin'), validateEventID, validator, deleteEvent);

module.exports = router;