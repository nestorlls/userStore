import { envs } from '../../config';
import { Category, MongoConnection, Product, User } from '../mongo';
import { seedData } from './data';

(async () => {
  await MongoConnection.connect({
    mongoUrl: envs.MONGO_DB_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  await main();
  await MongoConnection.disconnect();
})();

async function main() {
  console.log('Deleting data...');
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Product.deleteMany({}),
  ]);

  console.log('Seeding user data...');
  const users = await User.insertMany(seedData.users);

  console.log('Seeding category data...');
  const categories = await Category.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[randomBetween(users.length - 1)]._id,
      };
    })
  );

  console.log('Seeding product data...');
  await Product.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomBetween(users.length - 1)]._id,
        category: categories[randomBetween(categories.length - 1)]._id,
      };
    })
  );
  console.log('Data seeded!');
}

function randomBetween(x: number) {
  return Math.floor(Math.random() * x);
}
