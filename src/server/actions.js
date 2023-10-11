import HttpError from '@wasp/core/HttpError.js'

export const sendBitcoin = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { address, amount } = args;

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const balance = await context.entities.Balance.findUnique({
    where: { userId: context.user.id }
  });

  if (balance.amount < amount) { throw new HttpError(403, "Insufficient balance") }

  // Implement logic to send Bitcoin to the specified address and reduce the user's balance
  // TODO: Implement logic to send Bitcoin to the specified address and reduce the user's balance

  return "Bitcoin sent successfully!";
}

export const addBitcoin = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const balance = await context.entities.Balance.findUnique({
    where: { userId: context.user.id }
  });

  const updatedBalance = await context.entities.Balance.update({
    where: { id: balance.id },
    data: { amount: balance.amount + args.amount }
  });

  return updatedBalance;
}