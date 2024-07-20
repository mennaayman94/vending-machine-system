const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const init = async () => {
  try {
    console.log('Inserting initial data into the database...');

    // Insert initial data into Catalog table
    const catalogs = await prisma.catalog.createMany({
      data: [
        { name: 'Catalog 1' },
        { name: 'Catalog 2' },
      ],
    });

    console.log('Catalogs inserted:', catalogs);

    // Insert initial data into Category table
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Category 1' },
        { name: 'Category 2' },
      ],
    });

    console.log('Categories inserted:', categories);

    // Get Catalogs and Categories for future use
    const catalogsList = await prisma.catalog.findMany();
    const categoriesList = await prisma.category.findMany();

    // Insert initial data into Item table
    const items = await prisma.item.createMany({
      data: [
        { name: 'Item 1', catalogId: catalogsList[0].id, categoryId: categoriesList[0].id, quantity: 10, price: 9.99 },
        { name: 'Item 2', catalogId: catalogsList[0].id, categoryId: categoriesList[0].id, quantity: 20, price: 19.99 },
        { name: 'Item 3', catalogId: catalogsList[0].id, categoryId: categoriesList[1].id, quantity: 30, price: 29.99 },
        { name: 'Item 4', catalogId: catalogsList[1].id, categoryId: categoriesList[1].id, quantity: 40, price: 39.99 },
        { name: 'Item 5', catalogId: catalogsList[1].id, categoryId: categoriesList[0].id, quantity: 50, price: 49.99 },
        { name: 'Item 6', catalogId: catalogsList[0].id, categoryId: categoriesList[1].id, quantity: 60, price: 59.99 },
        { name: 'Item 7', catalogId: catalogsList[1].id, categoryId: categoriesList[0].id, quantity: 70, price: 69.99 },
        { name: 'Item 8', catalogId: catalogsList[0].id, categoryId: categoriesList[1].id, quantity: 80, price: 79.99 },
        { name: 'Item 9', catalogId: catalogsList[1].id, categoryId: categoriesList[0].id, quantity: 90, price: 89.99 },
        { name: 'Item 10', catalogId: catalogsList[0].id, categoryId: categoriesList[1].id, quantity: 100, price: 99.99 },
      ],
    });

    console.log('Items inserted:', items);

    const roles = await prisma.role.createMany({
      data: [
        {name: 'Admin'},
        {name: 'Buyer'},
      ]
    })

    console.log('roles inserted:', roles);

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

init();