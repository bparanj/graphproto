const db = require('./db');

const resolvers = {
  Query: {
    accounts: () => db.getAccounts(),
    account: (_, { accountId }) => db.getAccountById(accountId),
    accountSummary: async () => {
      return {
        accounts: await db.getAccounts(),
        totalBalance: await db.getTotalBalance()
      };
    }
  },
  
  Account: {
    accountType: (account) => db.getAccountType(account.accountId),
    customers: (account) => db.getAccountCustomers(account.accountId)
  }
};

module.exports = resolvers;