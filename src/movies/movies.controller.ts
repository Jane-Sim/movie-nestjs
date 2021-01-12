import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

/** 영화 모듈의 컨트롤러.
 * Get, Post, Delete, Patch를 이용한다.
 * Patch는 Put대신 사용한다. Put은 전체 데이터를 업데이트한다면, Put은 일정 범위만 업데이트 한다.
 * 사용을 원하는 파라미터는 Param 데코레이터를 이용. Rest 데코레이터의 파라미터 아이디와 일치시킨다.
 * 사용할 아큐먼트의 변수명은, rest 데코리이터와 Param 데코레이터의 파라미터명과 일치하지 않아도 괜찮다.
 */

@Controller('movies')
export class MoviesController {
  // 해당 컨트롤러가 movie service를 사용하기 위해,
  // construntor에 읽기 형식으로 불러오도록 한다. 보안처리도 한다.
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // movies/search 라는 파라미터가 있을 때, year라고 하는 쿼리값을 가져온다.
  // 이때 주의해야 할 점은, @Get('/:id') 함수보다 search 라는 파라미터 Get 함수가 상위에 있어야한다.
  // /:id 는 모든 파라미터 값을 포함할 때 발동되는 조건이기에 특정 파라미터들은 /:id 보다 위에 올려놔야 발동된다.
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  // /movies의 파라미터가 있을 경우, Get API로 캐치한다. ex) example.com/movies/1 (해당 함수 실행 후, 1 값을 파라미터로 가져옴)
  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  // @Body 데코레이터는 API의 Body값을 가져오는 기능이다.
  // Body값이 Json이면, Json타입으로 그대로 사용할 수 있다. 따로 Json 설정이 필요없다.
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  // 특정 파라미터의 삭제 API를 캐치한다.
  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  // 특정 데이터를 일부 업데이트할 때, Patch API로 캐치한다.
  // 이때 Parameter와 Body 데코레이터로 원하는 데이터를 가져와 아규먼트로 사용한다.
  @Patch('/:id')
  path(@Param('id') movieId: number, @Body() updateData) {
    return this.moviesService.update(movieId, updateData);
  }
}
