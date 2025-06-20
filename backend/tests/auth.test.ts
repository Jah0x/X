import request from 'supertest';
import express from 'express';
import authRouter from '../src/routes/auth';

jest.mock('../src/prisma', () => ({
  user: {
    findUnique: jest.fn(),
  },
  uidPool: {
    findFirst: jest.fn(),
    update: jest.fn(),
  },
  $transaction: jest.fn(),
}));

const prisma = require('../src/prisma');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('POST /api/auth', () => {
  it('returns existing user', async () => {
    prisma.user.findUnique.mockResolvedValue({
      uid: 'UID1',
      subscriptions: [{ endDate: '2024-01-01' }],
    });
    const res = await request(app)
      .post('/api/auth')
      .send({ telegramId: '1', email: 'a@b.com' });
    expect(res.status).toBe(200);
    expect(res.body.uid).toBe('UID1');
  });

  it('creates new user', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.uidPool.findFirst.mockResolvedValue({ uid: 'UID2' });
    prisma.$transaction.mockImplementation(async (cb: any) => cb(prisma));
    prisma.uidPool.update.mockResolvedValue({});
    prisma.user.create = jest.fn().mockResolvedValue({
      uid: 'UID2',
      subscriptions: [{ endDate: '2024-02-01' }],
    });
    const res = await request(app)
      .post('/api/auth')
      .send({ telegramId: '2', email: 'b@c.com' });
    expect(res.status).toBe(200);
    expect(res.body.uid).toBe('UID2');
  });

  it('validates input', async () => {
    const res = await request(app).post('/api/auth').send({});
    expect(res.status).toBe(400);
  });

  it('handles no UID available', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.uidPool.findFirst.mockResolvedValue(null);
    const res = await request(app)
      .post('/api/auth')
      .send({ telegramId: '3', email: 'c@d.com' });
    expect(res.status).toBe(500);
  });
});
