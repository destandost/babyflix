import type { Lesson } from "../lessons-data";

export const GEOGRAPHY_LESSONS: Lesson[] = [
  {
    id: "geo-uk-1",
    subjectId: "geography",
    ageGroup: "4-6",
    title: "The United Kingdom",
    description: "England, Scotland, Wales and Northern Ireland",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "The UK!", content: "The United Kingdom is made of 4 countries! Let's explore them!", character: "elephant", visual: "🇬🇧" },
      { type: "teach", title: "England", content: "England's capital is London — one of the world's most famous cities!", character: "elephant", visual: "🎡", voiceText: "England is the largest of the four countries. Its capital city is London, which has famous landmarks like Big Ben, Tower Bridge and the London Eye!" },
      { type: "teach", title: "Scotland", content: "Scotland is known for mountains, castles and the Loch Ness Monster!", character: "elephant", visual: "🏰", voiceText: "Scotland has beautiful highlands, mountains and lochs — that's the Scottish word for lakes! Edinburgh is Scotland's capital city." },
      { type: "funfact", title: "Fun Fact!", content: "The UK drives on the LEFT side of the road — most countries drive on the right!", visual: "🚗", funFact: "London's Underground (the Tube) is the world's oldest underground railway, opening in 1863 — over 160 years ago!" },
      { type: "quiz", title: "UK quiz!", content: "What is the capital of Scotland?", options: ["London", "Glasgow", "Edinburgh", "Cardiff"], correct: 2 },
    ],
  },
  {
    id: "geo-weather-world-1",
    subjectId: "geography",
    ageGroup: "4-6",
    title: "Weather Around the World",
    description: "Why weather is different everywhere",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "World Weather!", content: "Why is it snowy in some places and sunny in others? Let's find out!", character: "elephant", visual: "🌤️❄️" },
      { type: "teach", title: "The Equator", content: "The Equator is an imaginary line around the middle of Earth. Near it is very hot!", character: "elephant", visual: "🔆", voiceText: "The Equator is an invisible line around the middle of our planet. Countries near the equator like Brazil and Indonesia are very hot all year round!" },
      { type: "teach", title: "The Poles", content: "The North and South Poles are the coldest places on Earth — it can be -90°C!", character: "elephant", visual: "🧊", voiceText: "The North and South Poles are the top and bottom of Earth. They get very little direct sunlight so they're incredibly cold!" },
      { type: "funfact", title: "Fun Fact!", content: "The hottest temperature ever recorded on Earth was 56.7°C in Death Valley, USA in 1913!", visual: "🌡️", funFact: "The coldest natural temperature ever recorded was -89.2°C in Antarctica in 1983. That's colder than dry ice!" },
      { type: "quiz", title: "Weather quiz!", content: "Countries near the Equator are usually...?", options: ["Very cold", "Very hot", "Very windy", "Very dark"], correct: 1 },
    ],
  },
  {
    id: "geo-continents-expanded-1",
    subjectId: "geography",
    ageGroup: "4-6",
    title: "Continents Match-Up",
    description: "Match animals to continents",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "Our World!", content: "Earth has 7 huge pieces of land called continents. Let's explore them!", character: "elephant", visual: "🌍" },
      { type: "teach", title: "Africa", content: "Africa is the second largest continent and home to the Sahara desert — the biggest hot desert on Earth!", character: "elephant", visual: "🦁", voiceText: "Africa is an enormous continent. It has the longest river in the world — the Nile — and the largest hot desert — the Sahara!" },
      { type: "teach", title: "Asia", content: "Asia is the BIGGEST continent. Over 4 billion people live there — that's more than half the world!", character: "elephant", visual: "🏯", voiceText: "Asia is the largest continent by far. China, India, Japan, Turkey and many more countries are in Asia. More than half of all humans live in Asia!" },
      { type: "teach", title: "Europe", content: "Europe is small but packed with 44 countries including the UK, France and Turkey!", character: "elephant", visual: "🗼", voiceText: "Europe is a relatively small continent but it has forty-four countries all packed in! The UK, France, Germany, Spain and Turkey are all in Europe." },
      { type: "funfact", title: "Fun Fact!", content: "Antarctica is a continent but no country owns it — it belongs to everyone and is dedicated to science!", visual: "🐧", funFact: "Antarctica has no permanent human residents but scientists live there temporarily. It's also the driest, coldest and windiest continent on Earth!" },
      { type: "match", title: "Match the continent!", content: "Match the animal to its continent!", pairs: [["🦁", "Africa"], ["🐼", "Asia"], ["🦘", "Australia"], ["🐧", "Antarctica"]] },
      { type: "quiz", title: "Continents quiz!", content: "Which is the biggest continent?", options: ["Africa", "Europe", "Asia", "America"], correct: 2 },
    ],
  },
];
