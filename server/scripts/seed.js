import { prisma } from "../lib/prisma.js";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not set");

const images = [
  { filename: "1.jpg", box: { x1: 1230, y1: 140, x2: 1344, y2: 560 } }, // right edge behind workbench
  { filename: "2.jpg", box: { x1: 790, y1: 350, x2: 940, y2: 470 } }, // sitting at basement bar
  { filename: "3.jpg", box: { x1: 650, y1: 370, x2: 750, y2: 600 } }, // doorway with knife
  { filename: "4.jpg", box: { x1: 860, y1: 240, x2: 1020, y2: 820 } }, // silhouette behind curtain
  { filename: "5.jpg", box: { x1: 320, y1: 0, x2: 460, y2: 110 } }, // peeking over shower rod
  { filename: "6.jpg", box: { x1: 520, y1: 530, x2: 800, y2: 660 } }, // lying on couch
  { filename: "7.jpg", box: { x1: 790, y1: 415, x2: 880, y2: 630 } }, // on the stairs
  { filename: "8.jpg", box: { x1: 750, y1: 355, x2: 840, y2: 560 } }, // hallway behind coffee maker
  { filename: "9.jpg", box: { x1: 1035, y1: 380, x2: 1125, y2: 545 } }, // through back door window
  { filename: "10.jpg", box: { x1: 1010, y1: 525, x2: 1080, y2: 625 } }, // around house corner
  { filename: "11.jpg", box: { x1: 1085, y1: 435, x2: 1145, y2: 530 } }, // by the shed
  { filename: "12.jpg", box: { x1: 930, y1: 520, x2: 990, y2: 620 } }, // peeking behind porch corner post
];

async function main() {
  await prisma.image.deleteMany();
  await prisma.image.createMany({
    data: images.map(({ filename, box }) => ({
      filename,
      width: 1344,
      height: 896,
      boxCornerOneX: box.x1,
      boxCornerOneY: box.y1,
      boxCornerTwoX: box.x2,
      boxCornerTwoY: box.y2,
    })),
  });
}

main()
  .then(() => console.log(`Seeded ${images.length} images`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
