import { IsBoolean, IsOptional } from 'class-validator';

export class ListTodosQuery {
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
