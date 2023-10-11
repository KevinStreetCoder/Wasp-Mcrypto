import HttpError from '@wasp/core/HttpError.js'

export const getBalance = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { balances: true }
  });

  if (!user) throw new HttpError(404, 'No user with id ' + context.user.id);

  const balance = user.balances[0];

  return {
    bitcoinBalance: balance.amount,
    shillingBalance: balance.amount * 110
  };
}