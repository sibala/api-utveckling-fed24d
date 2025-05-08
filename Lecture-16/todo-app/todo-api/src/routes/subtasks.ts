import express from 'express';
import { 
  createSubtask, 
  deleteSubtask, 
  fetchAllSubtasks, 
  fetchSubtask, 
  updateSubtask } from '../controllers/subtaskController';
import { verifyAccessToken } from '../middleware/verifyToken';
const router = express.Router()

// Open endpoints
router.get('/', fetchAllSubtasks)
router.get('/:id', fetchSubtask)

// Protected endpoints
router.post('/', verifyAccessToken, createSubtask)
router.patch('/:id',verifyAccessToken, updateSubtask)
router.delete('/:id',verifyAccessToken, deleteSubtask)

export default router;
