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

  // expect는 조건에 필요한 값이고. toEqual은 조건의 값이 해당 값과 일치할 때.
  it('shoud be 4', () => {
    expect(2 + 3).toEqual(5);
  });
});
