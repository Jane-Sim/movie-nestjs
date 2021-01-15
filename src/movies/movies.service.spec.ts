import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

// 종속성 주입을 이용해 쉽게 단위 테스트를 시작.
// MoviesService의 클래스 기반 주입을 사용.
describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트를 실행하기 전에, 해당 내용을 먼저 실행한다는 뜻.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  // it은 만약, ~라면 식으로 단위 테스트를 할 수 있게 해준다.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getAll 함수의 유닛테스트. getAll 함수로 배열 반환하는지 확인하기.
  describe('getAll', () => {
    it('shoud return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  // getOne 확인하기. 테스트를 위해 가라 데이터를 넣고, 데이터를 잘 불러오는지 확인
  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });
    // 없는 데이터를 불러올 때, 에러가 나는지 체크
    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
