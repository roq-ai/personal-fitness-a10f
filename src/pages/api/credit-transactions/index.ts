import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { creditTransactionValidationSchema } from 'validationSchema/credit-transactions';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCreditTransactions();
    case 'POST':
      return createCreditTransaction();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCreditTransactions() {
    const data = await prisma.credit_transaction
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'credit_transaction'));
    return res.status(200).json(data);
  }

  async function createCreditTransaction() {
    await creditTransactionValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.credit_transaction.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
