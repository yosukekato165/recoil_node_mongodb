import { MongoClient } from "mongodb";

// const MONGODB_URI = process.env.MONGODB_URI;

export async function mongodb(arg) {
  // export async function mongodb() {
  // const uri = MONGODB_URI;
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    console.log(`tomato: ${arg.name}`);

    // await listDatabases(client);
    await createListing(client, {
      name: arg.name,
      summary: arg.summary,
      bedrooms: arg.bedrooms,
      bathrooms: arg.bathrooms,
    });

    // await createMultipleListings(client, [
    //   {
    //     name: "Infinite Views",
    //     summary: "Modern home with infinite views from the infinity pool",
    //     property_type: "House",
    //     bedrooms: 5,
    //     bathrooms: 4.5,
    //     beds: 5,
    //   },
    //   {
    //     name: "Private room in London",
    //     property_type: "Apartment",
    //     bedrooms: 1,
    //     bathroom: 1,
    //   },
    //   {
    //     name: "Beautiful Beach House",
    //     summary:
    //       "Enjoy relaxed beach living in this house with a private beach",
    //     bedrooms: 4,
    //     bathrooms: 2.5,
    //     beds: 7,
    //     last_review: new Date(),
    //   },
    // ]);
    const result = await findOneListingByName(client, arg.name);
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
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function createMultipleListings(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);
  console.log(
    `${result.insertedCount} new listing(s) created with the following id(s):`
  );
  console.log(result.insertedIds);
}

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });
  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfListing}':`
    );
    console.log(result);
    return result;
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
    return result;
  }
}
