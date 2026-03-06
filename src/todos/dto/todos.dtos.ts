import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}

export class UpdateTodoDto extends CreateTodoDto {
  @IsBoolean()
  completed: boolean;
}
