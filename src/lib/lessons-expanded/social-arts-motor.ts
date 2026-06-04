import type { Lesson } from "../lessons-data";

export const SOCIAL_LESSONS: Lesson[] = [
  {
    id: "social-sharing-1",
    subjectId: "social-skills",
    ageGroup: "2-4",
    title: "Sharing & Kindness",
    description: "Why sharing makes us happy",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "Sharing!", content: "Sharing means giving others a turn or a part of what you have!", character: "grandma", visual: "🤝" },
      { type: "story", title: "Grandma shares her cake", content: "Grandma baked a big cake. She shared it with all her friends. Everyone smiled!", character: "grandma", visual: "🎂", voiceText: "Grandma baked the biggest, most delicious cake. Instead of eating it alone she shared every slice with her friends. Sharing made everyone happy — including Grandma!" },
      { type: "teach", title: "Why sharing feels good", content: "When we share, our brains release happy chemicals. Sharing is good for US too!", character: "grandma", visual: "🧠", voiceText: "Here's something amazing — when we share or help others, our brains release feel-good chemicals. Sharing actually makes US happier too!" },
      { type: "interact", title: "Share the toys!", content: "There are 4 toys and 2 friends. How many each if they share fairly?", options: ["1 each", "2 each", "4 each", "0 each"], correct: 1 },
      { type: "quiz", title: "Sharing quiz!", content: "Your friend has no crayons. What do you do?", options: ["Use them all yourself", "Hide them", "Share your crayons", "Put them away"], correct: 2 },
    ],
  },
  {
    id: "social-conflict-1",
    subjectId: "social-skills",
    ageGroup: "6-8",
    title: "Solving Disagreements",
    description: "How to handle conflict",
    coinsReward: 20,
    xpReward: 25,
    slides: [
      { type: "intro", title: "Solving Disagreements!", content: "Everyone disagrees sometimes. What matters is HOW we handle it!", character: "grandma", visual: "🕊️" },
      { type: "teach", title: "Listen first", content: "In a disagreement, listen to the other person's side before speaking yours!", character: "grandma", visual: "👂", voiceText: "When there's a disagreement, the most important thing is to listen. Really listen — not just wait for your turn to speak. Understanding the other person helps find a solution!" },
      { type: "teach", title: "I statements", content: 'Instead of "You always..." try "I feel... when..."', character: "grandma", visual: "💬", voiceText: "Instead of saying you always take my things, try saying I feel upset when my things are taken without asking. I statements don't sound like blame and are easier to hear!" },
      { type: "funfact", title: "Fun Fact!", content: "Scientists found that children who learn to resolve conflict peacefully are more likely to be successful adults!", visual: "🌟", funFact: "Research shows that the most important skill for success in work and relationships isn't intelligence — it's the ability to manage emotions and understand others!" },
      { type: "quiz", title: "Conflict quiz!", content: "Your friend takes the last biscuit. The best first step is to...?", options: ["Shout at them", "Walk away forever", "Calmly tell them how you feel", "Tell a teacher immediately"], correct: 2 },
    ],
  },
  {
    id: "social-feelings-expanded-1",
    subjectId: "social-skills",
    ageGroup: "2-4",
    title: "Understanding Feelings",
    description: "Happy, sad, angry and scared",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "Feelings!", content: "Everyone has feelings. They're all okay and all important!", character: "grandma", visual: "😊😢😠😨" },
      { type: "teach", title: "Happy", content: "Happy feels warm and bright — like sunshine in your heart!", character: "grandma", visual: "😊", voiceText: "Happy is a lovely feeling! Your face smiles, your eyes sparkle, and you might want to jump around! What makes you feel happy?" },
      { type: "teach", title: "Sad", content: "Sad is okay too. Everyone feels sad sometimes. A hug or talk can help!", character: "grandma", visual: "😢", voiceText: "Feeling sad is normal and okay. It's okay to cry. Talking to someone you trust or having a cuddle can help sad feelings pass." },
      { type: "teach", title: "Angry", content: "Angry feelings are okay but we choose what we DO with them. Take deep breaths!", character: "grandma", visual: "😠", voiceText: "Anger is a normal feeling. But what we DO when we're angry matters. Try taking 5 slow deep breaths when you feel angry!" },
      { type: "experiment", title: "Feelings journal!", content: "Draw your feelings today using faces! Happy? Sad? Excited?", experiment: { title: "Feelings Faces", materials: ["Paper", "Pencil or crayons"], steps: ["Draw 4 big circles", "In each one draw a different feeling face", "Colour them in", "Which feeling are you having most today?"] } },
      { type: "interact", title: "How does Grandma feel?", content: "Grandma dropped her ice cream. How does she feel?", options: ["Happy 😊", "Sad 😢", "Excited 🤩", "Bored 😑"], correct: 1 },
      { type: "quiz", title: "Feelings quiz!", content: "You just won a game! How do you feel?", options: ["Sad", "Scared", "Angry", "Happy"], correct: 3 },
    ],
  },
];

export const ARTS_LESSONS: Lesson[] = [
  {
    id: "arts-famous-art-1",
    subjectId: "arts",
    ageGroup: "6-8",
    title: "Famous Artists",
    description: "Van Gogh, Picasso and more",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "Famous Artists!", content: "Some artists changed the way the whole world sees — let's meet them!", character: "unicorn", visual: "🖼️" },
      { type: "teach", title: "Vincent van Gogh", content: "Van Gogh painted with thick swirling strokes. His most famous work is The Starry Night!", character: "unicorn", visual: "🌃", voiceText: "Vincent van Gogh was a Dutch painter who used thick, swirling brushstrokes to create emotion. He painted The Starry Night, one of the world's most famous paintings!" },
      { type: "teach", title: "Pablo Picasso", content: "Picasso invented Cubism — showing things from many angles at once!", character: "unicorn", visual: "🎭", voiceText: "Pablo Picasso was a Spanish artist who invented a style called Cubism. He broke objects into geometric shapes and showed them from multiple angles all at once!" },
      { type: "experiment", title: "Be Van Gogh!", content: "Draw stars using thick swirling lines like Van Gogh!", experiment: { title: "Starry Night Art", materials: ["Dark blue or black paper", "White, yellow and blue chalk or pastels"], steps: ["Draw a dark sky background", "Add a glowing moon", "Draw stars with swirling lines around them", "Add swirling clouds in blue and white", "Display your masterpiece!"] } },
      { type: "funfact", title: "Fun Fact!", content: "The Mona Lisa has no eyebrows! Leonardo da Vinci painted the model bald and eyebrow-less as was fashionable then!", visual: "🎨", funFact: "The Mona Lisa is the most visited painting in the world, displayed in the Louvre in Paris. It is about the size of a piece of A3 paper!" },
      { type: "quiz", title: "Art quiz!", content: "Which artist painted The Starry Night?", options: ["Picasso", "Da Vinci", "Van Gogh", "Monet"], correct: 2 },
    ],
  },
  {
    id: "arts-colours-expanded-1",
    subjectId: "arts",
    ageGroup: "2-4",
    title: "Primary Colours",
    description: "Red, blue and yellow",
    coinsReward: 10,
    xpReward: 15,
    slides: [
      { type: "intro", title: "Colours!", content: "Red, blue and yellow are primary colours. Mix them to make ALL other colours!", character: "unicorn", visual: "🔴🔵🟡" },
      { type: "teach", title: "Red", content: "Red is bold and exciting! Apples, roses and fire trucks are red!", character: "unicorn", visual: "🔴🍎", voiceText: "Red is a warm, powerful colour. It can mean love, danger or excitement. What red things can you see around you?" },
      { type: "teach", title: "Mix colours!", content: "Red + Blue = Purple! Blue + Yellow = Green! Red + Yellow = Orange!", character: "unicorn", visual: "🎨", voiceText: "Magic happens when you mix primary colours! Red and blue make purple. Blue and yellow make green. Red and yellow make orange. Try it with paint!" },
      { type: "experiment", title: "Colour mixing!", content: "Mix food colouring in water to make new colours!", experiment: { title: "Rainbow Water", materials: ["3 glasses of water", "Red, blue and yellow food colouring"], steps: ["Add red to glass 1, blue to glass 2, yellow to glass 3", "Pour a little glass 1 into glass 2 — what colour?", "Pour glass 2 into glass 3 — what colour now?", "Try your own combinations!"] } },
      { type: "funfact", title: "Fun Fact!", content: "The rainbow always appears in the same order: Red, Orange, Yellow, Green, Blue, Indigo, Violet!", visual: "🌈", funFact: "You can remember the rainbow colours with: Richard Of York Gave Battle In Vain — Red Orange Yellow Green Blue Indigo Violet!" },
      { type: "quiz", title: "Colour quiz!", content: "What do you get when you mix red and blue?", options: ["Green", "Orange", "Purple", "Pink"], correct: 2 },
    ],
  },
];

export const MOTOR_LESSONS: Lesson[] = [
  {
    id: "motor-fine-1",
    subjectId: "motor-skills",
    ageGroup: "4-6",
    title: "Fine Motor Skills",
    description: "Hands and fingers",
    coinsReward: 10,
    xpReward: 15,
    slides: [
      { type: "intro", title: "Finger Skills!", content: "Fine motor skills are small, precise movements with your hands and fingers!", character: "frog", visual: "✋" },
      { type: "teach", title: "Why they matter", content: "Writing, drawing, tying shoelaces and playing instruments all need fine motor skills!", character: "frog", visual: "✏️", voiceText: "Fine motor skills help us do detailed tasks. Writing, drawing, using scissors, tying shoelaces and even typing on a phone all use fine motor skills!" },
      { type: "experiment", title: "Finger exercises!", content: "Try these exercises to strengthen your finger muscles!", experiment: { title: "Finger Gym", materials: ["Play dough or modelling clay"], steps: ["Squeeze and squish the dough with your whole hand", "Roll it into tiny balls using just your fingertips", "Make a long snake by rolling it on the table", "Pinch off tiny pieces and stick them together", "Notice how your fingers get tired — those are muscles working!"] } },
      { type: "funfact", title: "Fun Fact!", content: "Pianists' brains are different from other people's because they've trained their fingers so much!", visual: "🎹", funFact: "The human hand contains 27 bones, 29 joints and over 120 ligaments. It can perform incredibly precise movements no robot can fully replicate!" },
      { type: "quiz", title: "Motor skills quiz!", content: "Which activity uses fine motor skills?", options: ["Running a race", "Writing your name", "Kicking a football", "Jumping on a trampoline"], correct: 1 },
    ],
  },
];
