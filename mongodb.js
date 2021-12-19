import { MongoClient } from "mongodb";

// const MONGODB_URI = process.env.MONGODB_URI;

export async function mongodb(arg) {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    // await listDatabases(client);
    await createListing(client, {
      isComplete: arg.isComplete,
      text: arg.text,
    });

    const result = await findListingByText(client);
    return result;
  } catch (e) {
    console.log(`error ${e}`);
  } finally {
    await client.close();
  }
}

mongodb().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function createListing(client, newListing) {
  const result = await client
    .db("recoil")
    .collection("todos")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function findListingByText(client) {
  const result = await client
    .db("recoil")
    .collection("todos")
    .find({
      text: [a - z],
    });
  if (result) {
    console.log(result);
    return result;
  } else {
    console.log(`No listings found`);
    return result;
  }
}
