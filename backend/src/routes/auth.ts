import { Router, Request, Response } from 'express';
import prisma from '../prisma';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { telegramId, email } = req.body as {
    telegramId?: string;
    email?: string;
  };
  if (!telegramId || !email) {
    return res.status(400).json({ error: 'telegramId and email required' });
  }

  const tgId = BigInt(telegramId);

  try {
    const existing = await prisma.user.findUnique({
      where: { telegramId: tgId },
      include: { subscriptions: { orderBy: { endDate: 'desc' }, take: 1 } },
    });

    if (existing) {
      const sub = existing.subscriptions[0];
      return res.json({ uid: existing.uid, subscriptionEnd: sub?.endDate });
    }

    const uidRecord = await prisma.uidPool.findFirst({
      where: { inUse: false },
    });
    if (!uidRecord) {
      return res.status(500).json({ error: 'No available UID' });
    }

    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const user = await prisma.$transaction(async (tx) => {
      await tx.uidPool.update({
        where: { uid: uidRecord.uid },
        data: { inUse: true },
      });
      return tx.user.create({
        data: {
          telegramId: tgId,
          email,
          uid: uidRecord.uid,
          subscriptions: {
            create: { plan: 'trial-30d', endDate },
          },
        },
        include: { subscriptions: { orderBy: { endDate: 'desc' }, take: 1 } },
      });
    });

    const sub = user.subscriptions[0];
    return res.json({ uid: user.uid, subscriptionEnd: sub.endDate });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
