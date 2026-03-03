const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // force Google DNS

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://sakethallenki07_db_user:aXf2Tcdq0DZfL8Qp@cluster0.de50lqi.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("SUCCESS: Connected to MongoDB");
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
  } finally {
    await client.close();
  }
}

run();