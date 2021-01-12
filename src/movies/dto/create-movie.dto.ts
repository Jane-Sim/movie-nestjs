import { IsNumber, IsOptional, IsString } from 'class-validator';

// class-validator는 해당 변수가 각 데코레이터의 타입과 일치하는지 유효성체크.
// 맞지 않을 경우, 사용자에게 자동으로 에러 문자 반환.
export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
