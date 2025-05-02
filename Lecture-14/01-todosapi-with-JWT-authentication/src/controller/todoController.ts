import { Request, Response } from "express";
import Todo from '../models/Todo';

export const fetchAllTodos = async (_: Request, res: Response) => {
  try {
    res.json(await Todo.find());
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const fetchTodo = async (req: Request, res: Response) => {
  try {
    // Solution 1
    const todo = await Todo.findById(req.params.id);
    // Solution 2
    // const todo = await Todo.findOne({_id: req.params.id})
    if (!todo) {
      res.status(404).json({message: 'Todo not found'})
      return;
    }
    res.json(todo);
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createTodo = async (req: Request, res: Response) => {
  const {content, done} = req.body // Destructur JS Object

  try {
    const todo = new Todo({
      content: content,
      done: done,
    });
    const savedPun = await todo.save();
    res.status(201).json({message: 'Todo created', data: savedPun})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
  
}

export const updateTodo = async (req: Request, res: Response) => {
  const {content, done} = req.body // Destructur JS Object

  try {
    const updatedTodo = await Todo.updateOne(
      {_id : req.params.id}, 
      {$set: { 
          content: content,
          done: done,
        }
      }
    );

    if (updatedTodo.matchedCount == 0) {
      res.status(404).json({success: false, message: 'Todo not found' });
      return 
    }
    res.json({message: 'Todo created', data: await Todo.findById(req.params.id)});
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.deleteOne({_id : req.params.id});

    if (deletedTodo.deletedCount === 0) {
      res.status(404).json({success: false, message: 'Todo not found' });
      return 
    }
    res.json({message: 'Todo deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}
