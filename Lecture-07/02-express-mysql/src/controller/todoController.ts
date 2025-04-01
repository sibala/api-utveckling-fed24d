import { Request, Response } from "express";
import { Todo } from "../models/Todo";
import { db } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ITodo } from "../models/ITodo";

const todos: Todo[] = [
  new Todo('AAA'),
  new Todo('BBB'),
  new Todo('CCC', true),
  new Todo('Handla mat'),
  new Todo('Käka mat', true),
  new Todo('Diska'),
  new Todo('Diska'),
]


/**
 * Part of the exercise to figure search and sort functionality out on your own
 */
export const fetchAllTodos = async (req: Request, res: Response) => {
  // const search = req.query.search
  // const sort = req.query.sort
  // let filteredTodos = todos;

  //   if (search) {
  //     filteredTodos = filteredTodos.filter((t) => t.content.includes(search.toString()))
  //   }
    
  //   if (sort && sort === "asc") {
  //     filteredTodos = filteredTodos.sort((a, b) => {
  //       const todo1 = a.content.toLowerCase()
  //       const todo2 = b.content.toLowerCase()

  //       if (todo1 > todo2) return 1
  //       if (todo1 < todo2) return -1
  //       return 0
  //     })
  //   }

  //   if (sort && sort === "desc") {
  //     filteredTodos = filteredTodos.sort((a, b) => {
  //       const todo1 = a.content.toLowerCase()
  //       const todo2 = b.content.toLowerCase()

  //       if (todo1 < todo2) return 1
  //       if (todo1 > todo2) return -1
  //       return 0
  //     })
  //   }


  try {
    // const [rows] = await db.query<ITodo[]>('SELECT * FROM todos')
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM todos')
    res.json(rows)
  } catch(error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}


export const fetchTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      SELECT * FROM todos 
      WHERE id = ?
    `
    const [rows] = await db.query<RowDataPacket[]>(sql, [id])
    const todo = rows[0];
    if (!todo) {
      res.status(404).json({message: 'Todo not found'})
      return;
    }
    res.json(todo)
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
    const sql = `
      INSERT INTO todos (content)
      VALUES (?)
    `
    const [result] = await db.query<ResultSetHeader>(sql, [content])
    res.status(201).json({message: 'Todo created', id: result.insertId})
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
  
  // todo.content = content;
  // todo.done = done;
  // res.json({message: 'Todo updated', data: todo})
}


export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id

  try {
    const sql = `
      DELETE FROM todos
      WHERE id = ?
    `
    const [result] = await db.query<ResultSetHeader>(sql, [id])
    if (result.affectedRows === 0) {
      res.status(404).json({message: 'Todo not found'})
      return;
    }
    res.json({message: 'Todo deleted'})
  } catch (error: unknown) {
    const message = error  instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({error: message})
  }
}