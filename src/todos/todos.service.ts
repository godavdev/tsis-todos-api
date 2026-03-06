import { Injectable } from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from './dto/todos.dtos';
import { Todo } from './entities/todo.entity';

type WithTodoId<T = object> = T & { id: string };

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  constructor() {
    this.todos = [
      {
        id: crypto.randomUUID(),
        title: 'Learn NestJS',
        description: 'Learn how to build APIs with NestJS',
        completed: false,
      },
      {
        id: crypto.randomUUID(),
        title: 'Learn TypeScript',
        description: 'Learn how to use TypeScript with NestJS',
        completed: true,
      },
    ];
  }

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      completed: false,
      ...dto,
    };
    this.todos.push(todo);
    return todo;
  }

  list({ completed }: { completed?: boolean }): Todo[] {
    if (completed === undefined) {
      return this.todos;
    }
    return this.todos.filter((todo) => todo.completed === completed);
  }

  find({ id }: WithTodoId): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  update({ id, ...dto }: WithTodoId<UpdateTodoDto>): Todo {
    const todo = this.find({ id });
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    Object.assign(todo, dto);
    return todo;
  }

  remove({ id }: WithTodoId): Todo {
    const todo = this.find({ id });
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    this.todos = this.todos.filter((t) => t.id !== id);
    return todo;
  }
}
