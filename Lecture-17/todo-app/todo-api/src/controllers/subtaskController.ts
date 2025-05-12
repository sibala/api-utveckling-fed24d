import { Request, Response } from "express";
import Subtask from '../models/Subtask';
import Todo from '../models/Todo';

export const fetchAllSubtasks = async (_: Request, res: Response) => {
  try {
    res.json(await Subtask.find());
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const fetchSubtask = async (req: Request, res: Response) => {
  try {
    const subtask = await Subtask.findById(req.params.id);
    if (!subtask) {
      res.status(404).json({message: 'Subtask not found'})
      return;
    }

    res.json(subtask);
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createSubtask = async (req: Request, res: Response) => {
  const {content, todo_id} = req.body // Destructur JS Object

  if (req.body.todo_id === undefined) {
    res.status(400).json({message: "todo_id is required"})
    return
  }

  // const todo = await Todo.findById(req.body.todo_id)
  // if (!todo) {
  //   res.status(400).json({message: "todo_id doesnt belong to any Todo"})
  //   return
  // }

  try {
    const subtask = new Subtask({
      content: content,
    });
    const newSubtask = await subtask.save();

    await Todo.findByIdAndUpdate(todo_id, {
      $push: {subtasks: newSubtask.id}
    })

    res.status(201).json({message: 'Subtask created', data: newSubtask})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
  
}

export const updateSubtask = async (req: Request, res: Response) => {
  const {content, done} = req.body // Destructur JS Object

  try {
    const updatedSubtask = await Subtask.updateOne(
      {_id : req.params.id}, 
      {$set: { 
          content: content,
          done: done,
        }
      }
    );

    if (updatedSubtask.matchedCount == 0) {
      res.status(404).json({success: false, message: 'Subtask not found' });
      return 
    }
    res.json({message: 'Subtask updated', data: await Subtask.findById(req.params.id)});
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const deleteSubtask = async (req: Request, res: Response) => {
  try {
    const deletedSubtask = await Subtask.deleteOne({_id : req.params.id});

    if (deletedSubtask.deletedCount === 0) {
      res.status(404).json({success: false, message: 'Subtask not found' });
      return 
    }
    res.json({message: 'Subtask deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}
