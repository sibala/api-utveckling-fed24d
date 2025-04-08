import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ITodo } from "../models/ITodo";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Part of the exercise to figure search and sort functionality out on your own
 */
export const fetchAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const fetchTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const todo = await prisma.todo.findFirst({where: {id: +id}});

    !todo
      ? res.status(404).json({message: 'Todo not found'})
      : res.json(todo)
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
    const todo = await prisma.todo.create({
      data: {
        content: content,
        done: false,
        created_at: new Date(), // Add the required created_at field
      },
    });
    res.status(201).json({message: 'Todo created', id: todo.id})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
  
}

/**
 * Part of the exercise to figure updateTodo out on your own
 */

export const updateTodo = async (req: Request, res: Response) => {
  const {content, done} = req.body // Destructur JS Object
  if (content === undefined || done === undefined) {
    res.status(400).json({error: 'Content and Done are required'})
    return
  }
  
  const id = req.params.id
  try {

    // Update the todo item
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) }, // or +id
      data: {
        content: content,
        done: done,
      },
    });

    // Respond with the updated todo
    res.json(updatedTodo);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle record not found
    if (message.includes('prisma.todo.update()')) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(500).json({ error: message });
  }
};


export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const todo = await prisma.todo.delete({where: {id: +id}});
    res.json({ message: 'Todo deleted', todo });
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'

    // Prisma throws an error if the ID doesn’t exist — we can catch that here
    if (message.includes('Record to delete does not exist')) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(500).json({error: message})
  }
}