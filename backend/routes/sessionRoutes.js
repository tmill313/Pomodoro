import express from 'express';
import {
    startSession,
    stopSession,
    deleteSession,
    getSessions,
    createSession,
    editSession,
    getToday
} from '../controllers/sessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/start')
  .put(protect, startSession)

  router
  .route('/stop')
  .put(protect, stopSession)

  router
  .route('/delete')
  .delete(protect, deleteSession)

  router
  .route('/all')
  .get(protect, getSessions)

  router
  .route('/today')
  .get(protect, getToday)

  router
  .route('/create')
  .post(protect, createSession)

  router
  .route('/edit')
  .put(protect, editSession)

export default router;