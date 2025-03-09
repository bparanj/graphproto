const { ApolloServer } = require('apollo-server');
const fs = require('fs').promises;
const path = require('path');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Check if DB file exists, if not create it
async function initDb() {
  const dbPath = path.join(__dirname, '../data/db.json');
  try {
    await fs.access(dbPath);
    console.log('Database file exists.');
  } catch (error) {
    console.log('Database file not found. Please create it with mock data.');
    process.exit(1);
  }
}

async function startServer() {
  await initDb();
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return error;
    }
  });
  
  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
});
