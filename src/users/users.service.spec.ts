
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

const mockRepo = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repo: MockRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepo() },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('create hashes password', async () => {
    const dto = { name: 'A', email: 'a@b.com', password: 'pass123' };
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    (repo.create as jest.Mock).mockImplementation((v) => v);
    (repo.save as jest.Mock).mockImplementation(async (v) => ({ id: 'uuid', ...v }));
    const user = await service.create(dto as any);
    expect(user.id).toBeDefined();
    expect(user.password).not.toBe(dto.password);
  });
});
