import { Request, Response } from "express";
import Todo from "../models/Todo";

export const fetchAllTodos = async (req: Request, res: Response) => {
  // const search = req.query.search
  // const sort = req.query.sort
  // let filteredTodos = todos;

  try {
    res.json(await Todo.find({done: true}, {content: 1}))
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const fetchTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
   
    // if (!todo) {
    //   res.status(404).json({message: 'Todo not found'})
    //   return;
    // }
    // res.json(todo)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}

export const createTodo = async (req: Request, res: Response) => {
  const content = req.body.content;
  if (content === undefined) {
    res.status(400).json({error: 'Content is required'}) 
    return; 
  }

  try {
    
    // res.status(201).json({message: 'Todo created', id: result.insertId})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
  
}

/**
 * Part of the exercise to figure updateTodo out on your own
 */

export const updateTodo = (req: Request, res: Response) => {
  // const {content, done} = req.body // Destructur JS Object
  // if (content === undefined || done === undefined) {
  //   res.status(400).json({error: 'Content and Done are required'})
  //   return
  // }

  // const todo = todos.find((t) => t.id === parseInt(req.params.id))
  // if (!todo) {
  //   res.status(404).json({error: 'Todo not found'})
  //   return;
  // }
  
  // res.json({message: 'Todo updated', data: todo})
}


export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
   
    // if (result.affectedRows === 0) {
    //   res.status(404).json({message: 'Todo not found'})
    //   return;
    // }
    // res.json({message: 'Todo deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}