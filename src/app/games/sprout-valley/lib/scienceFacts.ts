export interface ScienceFact {
  title: string;
  fact: string;
  svgId: string;
}

export const SCIENCE_FACTS: Record<string, ScienceFact> = {
  wheat: {
    title: "Wheat is a Grass!",
    fact: "Wheat is actually a type of grass that humans have farmed for over 10,000 years. One grain of wheat can grow into a stalk with up to 40 new grains. Most bread, pasta and cereal is made from wheat!",
    svgId: "crop-wheat-ready",
  },
  corn: {
    title: "Corn Always Has Even Rows!",
    fact: "Every ear of corn always has an even number of rows of kernels — never odd! Corn is actually a giant grass and needs lots of sun and water. It originally came from Mexico over 9,000 years ago!",
    svgId: "crop-corn-ready",
  },
  carrot: {
    title: "Carrots Grow Underground!",
    fact: "The orange part of a carrot we eat is actually the root of the plant, growing underground to store energy. Wild carrots are purple! The orange variety was developed by Dutch farmers in the 1600s.",
    svgId: "crop-carrot-ready",
  },
  strawberry: {
    title: "Strawberries Have Seeds Outside!",
    fact: "Strawberries are the only fruit with seeds on the outside. Each strawberry has about 200 tiny seeds. Technically strawberries are NOT berries in science — but bananas actually ARE berries!",
    svgId: "crop-strawberry-ready",
  },
  tomato: {
    title: "Tomatoes are Fruits!",
    fact: "Tomatoes are scientifically fruits because they grow from a flower and contain seeds. Europeans once called them poison apples and refused to eat them for 200 years! Now they're used in thousands of dishes worldwide.",
    svgId: "crop-tomato-ready",
  },
  sunflower: {
    title: "Sunflowers Follow the Sun!",
    fact: "Young sunflowers turn to face the sun every day — east in the morning, west in the evening. This is called heliotropism. A single sunflower is actually made up of up to 2,000 tiny flowers called florets!",
    svgId: "crop-sunflower-ready",
  },
  pumpkin: {
    title: "Pumpkins are 90% Water!",
    fact: "Pumpkins are technically fruits and they are 90% water! The world's heaviest pumpkin weighed over 1,200kg — heavier than a small car. They originated in North America over 7,500 years ago.",
    svgId: "crop-pumpkin-ready",
  },
  watermelon: {
    title: "Watermelons are 92% Water!",
    fact: "Watermelons are 92% water — that's how they got their name! They are actually a vegetable related to cucumbers and pumpkins. Ancient Egyptians grew watermelons over 5,000 years ago.",
    svgId: "crop-watermelon-ready",
  },
  chicken: {
    title: "Chickens are Dinosaurs!",
    fact: "Chickens are the closest living relatives to the T-Rex dinosaur! They have been farmed by humans for over 7,000 years. A hen turns her eggs up to 50 times a day to keep them warm evenly.",
    svgId: "ani-chicken",
  },
  cow: {
    title: "Cows Have Four Stomachs!",
    fact: "Cows have four stomach compartments to help them digest tough grass. A cow produces about 25 litres of milk every day. Cows are social animals and form close friendships with other cows!",
    svgId: "ani-cow",
  },
  sheep: {
    title: "Sheep Never Forget a Face!",
    fact: "Sheep can remember up to 50 different sheep faces and 10 human faces for over two years! Their wool keeps growing forever if not sheared — the world record fleece weighed 41kg from a sheep in New Zealand.",
    svgId: "ani-sheep",
  },
  pig: {
    title: "Pigs Are Very Smart!",
    fact: "Pigs are among the smartest farm animals and can learn tricks faster than dogs. They love mud because it keeps them cool. Bacon and ham come from pigs raised on farms around the world.",
    svgId: "ani-pig",
  },
};
