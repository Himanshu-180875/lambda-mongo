const data =require('./sample-weather-data.json');
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI =
  "your_connection_string";
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  const db = await client.db('your_database');
  cachedDb = db;
  return db
}
exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const db = await connectToDatabase();
  // Insert the event object, which is the test data we pass in
  const result = await db.collection("weatherCollection").insertMany(data);
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};