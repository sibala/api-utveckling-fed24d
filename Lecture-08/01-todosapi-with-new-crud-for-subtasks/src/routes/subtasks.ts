import express from 'express';
import { 
  createSubtask, 
  deleteSubtask, 
  fetchAllSubtasks, 
  fetchSubtask, 
  updateSubtask } from '../controller/subtaskController';
const router = express.Router()

router.get('/', fetchAllSubtasks)
router.get('/:id', fetchSubtask)
router.post('/', createSubtask)
router.patch('/:id', updateSubtask)
router.delete('/:id', deleteSubtask)

export default router;
