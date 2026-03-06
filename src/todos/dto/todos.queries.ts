import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ListTodosQuery {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    return false;
  })
  @IsBoolean()
  completed?: boolean;
}
