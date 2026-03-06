import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto/todos.dtos';
import { ListTodosQuery } from './dto/todos.queries';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  // localhost:3000/todos?completed=true
  @Get()
  list(@Query() query: ListTodosQuery) {
    return this.todosService.list(query);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.todosService.find({ id });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update({ id, ...updateTodoDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove({ id });
  }
}
