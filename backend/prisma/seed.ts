const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

const CATEGORIES = {
  SMARTPHONE: 'eb7253e7-e020-4e41-ae34-654811ec975c',
  FURNITURE: '9f5a7c1a-749f-4e19-86c7-e28bd2404932',
  ELECTRONICS: '0298f961-1c6f-493d-8cb8-f7cb05cd86ab',
  APPLIANCES: '40c9cd7b-c46d-441e-80bc-c1b12a3ea72f',
  REFRIGERATORS: 'e91109b0-f0d2-469f-9d70-7fae0c835ab8',
};

async function main() {
  try {
    await database.category.createMany({
      data: [
        {
          id: CATEGORIES.SMARTPHONE,
          name: 'Smartphones',
          discountPercentage: 0.0255,
        },
        {
          id: CATEGORIES.FURNITURE,
          name: 'Furniture',
          discountPercentage: 0.03,
        },
        {
          id: CATEGORIES.ELECTRONICS,
          name: 'Electronics',
          discountPercentage: 0.043,
        },
        {
          id: CATEGORIES.APPLIANCES,
          name: 'Appliances',
          discountPercentage: 0.05,
        },
        {
          id: CATEGORIES.REFRIGERATORS,
          name: 'Refrigerators',
          discountPercentage: 0.75,
        },
      ],
    });

    await database.product.createMany({
      data: [
        {
          name: 'iPhone',
          description: 'iPhone 15 Pro Max',
          color: 'Natural Titanium',
          categoryId: CATEGORIES.ELECTRONICS,
          price: 10999,
          promotionalPrice: 10718.52,
        },
        {
          name: 'Wardrobe',
          description: '4 doors, 6 drawers',
          color: 'Varnish',
          categoryId: CATEGORIES.FURNITURE,
          price: 799.89,
          promotionalPrice: 775.89,
        },
        {
          name: 'Home theater',
          description: 'Bluetooth wireless soundbar',
          color: 'Silver',
          categoryId: CATEGORIES.ELECTRONICS,
          price: 1299,
          promotionalPrice: 1243.14,
        },
        {
          name: 'Toaster',
          description: 'Space for 66 slices of bread',
          color: 'Black',
          categoryId: CATEGORIES.APPLIANCES,
          price: 149.9,
          promotionalPrice: 142.4,
        },
        {
          name: 'Refrigerator',
          description: '2 doors with freezer',
          color: 'White',
          categoryId: CATEGORIES.REFRIGERATORS,
          price: 4789.89,
          promotionalPrice: 4430.64,
        },
      ],
    });

    console.log('Seeding Success');
  } catch (error) {
    console.log('Error seeding the database categories', error);
  } finally {
    await database.$disconnect();
  }
}

main();
