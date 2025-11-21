import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create sample drinks
  const drinks = [
    {
      barcode: "4006040087379",
      name: "Coca-Cola 500ml",
      quantity: 5,
      isOpened: false,
    },
    {
      barcode: "4006040088390",
      name: "Sprite 500ml",
      quantity: 3,
      isOpened: true,
    },
    {
      barcode: "4006040123456",
      name: "Fanta Orange 500ml",
      quantity: 0,
      isOpened: false,
    },
    {
      barcode: "7622300000000",
      name: "Water 1L",
      quantity: 8,
      isOpened: false,
    },
    {
      barcode: "5449000000996",
      name: "Pepsi 500ml",
      quantity: 2,
      isOpened: true,
    },
    {
      barcode: "5060292302010",
      name: "Orange Juice 1L",
      quantity: 4,
      isOpened: false,
    },
    {
      barcode: "4002846071001",
      name: "Apple Juice 500ml",
      quantity: 0,
      isOpened: true,
    },
    {
      barcode: "8410100100012",
      name: "Iced Tea 500ml",
      quantity: 6,
      isOpened: false,
    },
  ];

  for (const drink of drinks) {
    await prisma.drink.upsert({
      where: { barcode: drink.barcode },
      update: {},
      create: drink,
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
