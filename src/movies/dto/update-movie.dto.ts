import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// movie 데이터를 업데이터하는 DTO를 생성.
// 데이터 전체를 변경하는게 아닌, 특정 변수의 값만 변경하고 싶을 때 PartialType을 사용한다.
// PartialType를 사용하려면 DTO의 베이스가 필요한데, CreateMovieDto 를 넣어주자. 끝! 간단하다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
