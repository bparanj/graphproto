const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

// Load database
async function loadDb() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading database:', error);
    throw error;
  }
}

// Database read operations
const db = {
  // Get all accounts
  getAccounts: async () => {
    const data = await loadDb();
    return data.accounts;
  },
  
  // Get specific account by ID
  getAccountById: async (accountId) => {
    const data = await loadDb();
    return data.accounts.find(account => account.accountId === accountId);
  },
  
  // Get account type for a specific account
  getAccountType: async (accountId) => {
    const data = await loadDb();
    const relationship = data.isType.find(rel => rel.accountId === accountId);
    
    if (!relationship) return null;
    
    return data.accountTypes.find(type => type.typeId === relationship.typeId);
  },
  
  // Get users of a specific account
  getAccountUsers: async (accountId) => {
    const data = await loadDb();
    const relationships = data.owns.filter(rel => rel.accountId === accountId);
    
    return relationships.map(rel => {
      const user = data.users.find(user => user.userId === rel.userId);
      return {
        ...user,
        accessLevel: rel.accessLevel
      };
    });
  },
  
  // Calculate total balance across all accounts
  getTotalBalance: async () => {
    const data = await loadDb();
    return data.accounts.reduce((total, account) => total + account.balance, 0);
  }
};

module.exports = db;