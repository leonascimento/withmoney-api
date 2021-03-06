import Category from '../../src/services/CategoryService';
import { Categories } from '../../src/models';

jest.mock('../../src/models', () => ({
  Categories: {
    create: jest.fn().mockReturnValue(true),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        UserId: 1,
        name: 'Carteira',
        type: 'in',
        createdAt: '2018-08-09 02:02:39',
        updatedAt: '2018-08-09 02:02:39',
      },
    ]),
    findAndCountAll: jest.fn().mockResolvedValue({ count: 1 }),
    findById: jest.fn().mockResolvedValue({
      id: 1,
      UserId: 1,
      name: 'Carteira',
      type: 'in',
      createdAt: '2018-08-09 02:02:39',
      updatedAt: '2018-08-09 02:02:39',
      update: jest.fn().mockResolvedValue(true),
    }),
    destroy: jest.fn().mockReturnValue(true),
  },
}));

describe('CategoryService', () => {
  let resMock;

  beforeEach(() => {
    resMock = {
      body: {},
      params: {},
    };
  });

  it('create', async () => {
    const body = {
      UserId: 2,
      name: 'Carteira',
      type: 'in',
    };
    resMock.body = body;

    const result = await Category.create(resMock);

    expect(Categories.create.mock.calls[0][0]).toEqual(body);
    expect(result).toEqual(true);
  });

  it('list', async () => {
    const result = await Category.list(resMock);
    expect(Categories.findAll.mock.calls[0][0]).toEqual({
      limit: 100,
      offset: 0,
      order: [['id', 'DESC']],
      where: {},
    });

    expect(result).toEqual({
      data: [
        {
          id: 1,
          UserId: 1,
          name: 'Carteira',
          type: 'in',
          createdAt: '2018-08-09 02:02:39',
          updatedAt: '2018-08-09 02:02:39',
        },
      ],
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 100,
        previousPage: null,
        totalItems: 1,
        totalPages: 1,
      },
    });
  });

  it('get', async () => {
    resMock.params.id = 1;

    const result = await Category.get(resMock);
    expect(Categories.findById.mock.calls[0][0]).toBe(1);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('UserId');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');

    expect(result.id).toBe(1);
    expect(result.UserId).toBe(1);
    expect(result.name).toBe('Carteira');
    expect(result.type).toBe('in');
    expect(result.createdAt).toBe('2018-08-09 02:02:39');
    expect(result.updatedAt).toBe('2018-08-09 02:02:39');
  });

  it('update', async () => {
    const body = {
      UserId: 1,
      name: 'Wallet',
      type: 'in',
    };
    resMock.params.id = 1;
    resMock.body = body;

    const result = await Category.update(resMock);
    expect(Categories.findById.mock.calls[0][0]).toBe(1);

    expect(result).toBe(true);
  });

  it('destroy', async () => {
    resMock.params.id = 1;

    const result = await Category.destroy(resMock);
    expect(Categories.destroy.mock.calls[0][0]).toEqual({
      where: { id: 1 },
    });

    expect(result).toBe(true);
  });
});
