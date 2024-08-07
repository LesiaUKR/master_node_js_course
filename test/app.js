const { MongoClient } = require("mongodb"); //підключаємо MongoClient з бібліотеки mongodb
const uri = require("./atlas_uri"); //підключаємо uri з файлу atlas_uri.js

console.log(uri);

// використаємо об'єкт MongoClient для підключення до бази даних
const client = new MongoClient(uri);

const dbname = "myDB"; //назва бази даних

// функція для підключення до бази даних
const connectToDatabase = async () => {
   try{
      await client.connect(); //підключаємося до бази даних
      console.log(`Connected to the ${dbname} database 🌍`);
      // list out all the databases in the cluster
      const dbs = await client.db().admin().listDatabases()
      console.table(dbs.databases)
   } catch (err) {
      console.error(`Error connecting to the database: ${err}`);
   }
}

// створимо функцію, яка буде виконувати підключення до бази даних
const main = async () => {
  try {
    await connectToDatabase();
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  } finally {
    await client.close();
  }
};

// run the main function
main();
                            