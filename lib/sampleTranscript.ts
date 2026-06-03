export type SampleTranscript = {
  id: string;
  title: string;
  description: string;
  transcript: string;
};

export const sampleTranscripts: SampleTranscript[] = [
  {
    id: "lecture-heavy",
    title: "Lecture-heavy class",
    description: "Teacher explains most of the time with very short student replies.",
    transcript: `Teacher: Good morning, class. Today I will explain the water cycle. Please listen silently because this will come in the exam. The water cycle has three main steps: evaporation, condensation, and precipitation. Evaporation means water changes into vapour because of heat. Condensation means vapour cools and becomes tiny water drops. Precipitation means rain falls from clouds. You must remember these definitions exactly.
Teacher: What is the first step called? Evaporation. Say it.
Students: Evaporation.
Teacher: Good. When the sun heats water in rivers, ponds, and wet clothes, the water goes up as vapour. This is evaporation. The vapour rises high in the sky. It becomes cool there. Then it forms clouds. This is condensation. After clouds become heavy, rain falls. This is precipitation.
Teacher: Are clouds made by condensation?
Students: Yes.
Teacher: Correct. Clouds are made by condensation. Now do not get confused. Evaporation is going up. Condensation is cloud formation. Precipitation is coming down as rain. If I ask in the test, you should write all three steps in order.
Teacher: Why does water dry from a wet shirt? Because the sun heats the water and it becomes vapour. You can see this at home. Why does rain fall? Because clouds become heavy and water drops fall down. These are the answers. Write them as I say.
Teacher: Is evaporation caused by heat?
Students: Yes.
Teacher: Very good. Now repeat: evaporation, condensation, precipitation.
Students: Evaporation, condensation, precipitation.
Teacher: Good. Now I will draw the diagram. First draw the sun. Then draw water. Then draw arrows going up. Write evaporation on the arrow. Then draw clouds. Write condensation. Then draw raindrops. Write precipitation. Do not talk. Copy from the board.
Teacher: Finished?
Students: No.
Teacher: Hurry up. We have only ten minutes. If you do not finish, complete it at home. Tomorrow I will ask the definitions. Everyone must memorize them.`,
  },
  {
    id: "recall-question",
    title: "Recall-question class",
    description: "Students answer factual questions correctly, but reasoning stays shallow.",
    transcript: `Teacher: Today we will revise parts of a plant. I will ask questions, and you answer quickly. Which part of the plant is under the soil?
Student A: Root.
Teacher: Correct. Which part holds the plant upright?
Student B: Stem.
Teacher: Yes. Which part is usually green?
Student C: Leaf.
Teacher: Correct. What does the leaf make?
Student D: Food.
Teacher: Good. What is the process called?
Student E: Photosynthesis.
Teacher: Very good. What does the plant need for photosynthesis?
Student F: Sunlight.
Teacher: Yes. Another thing?
Student G: Water.
Teacher: Correct. Another thing?
Student H: Carbon dioxide.
Teacher: Good. What gas do plants give out?
Students: Oxygen.
Teacher: Correct. Which part becomes fruit?
Student I: Flower.
Teacher: Yes. Which part protects the seed?
Student J: Fruit.
Teacher: Good. What part grows into a new plant?
Student K: Seed.
Teacher: Correct. What are tiny openings on the leaf called?
Student L: Stomata.
Teacher: Excellent. What do roots absorb?
Student M: Water.
Teacher: Yes. What else do roots absorb?
Student N: Minerals.
Teacher: Correct. What part carries water from roots to leaves?
Student O: Stem.
Teacher: Good. You remember the answers.
Teacher: Now look at the diagram. I will point, and you name the part. This one?
Student P: Root.
Teacher: Correct. This one?
Student Q: Stem.
Teacher: Correct. This one?
Student R: Leaf.
Teacher: Correct.
Teacher: Now write the answers in your notebook: root absorbs water, stem carries water, leaf makes food, flower becomes fruit, seed grows into a new plant. These are important for the test. If the question asks, "Name the process by which leaves make food," you write photosynthesis. If the question asks, "Which gas do plants give out," you write oxygen. Underline the key words. We will do the exercise now.`,
  },
  {
    id: "interactive",
    title: "Interactive class",
    description: "Multiple students explain ideas while the teacher uses follow-up questions.",
    transcript: `Teacher: Today we will find out why some objects float and some sink. I have a stone, a steel spoon, a dry leaf, and an empty plastic bottle. Before we test, talk to your partner for twenty seconds. Which objects will float, and why?
Student A: I think the leaf and bottle will float because they are light.
Teacher: Thank you. Does anyone agree or disagree with that reason?
Student B: I agree for the leaf, but the bottle is bigger. Maybe it floats because air is inside.
Teacher: Interesting. You are saying air inside may matter. What do others think about the stone?
Student C: The stone will sink because it is solid and heavy for its size.
Teacher: Good reasoning. Let us test the stone. It sank. What did we observe?
Student D: It went down quickly, so water did not hold it up.
Teacher: Now the dry leaf. It floats. Why might that be?
Student E: It is light and flat, so it stays on top.
Teacher: You noticed shape. How is that different from the stone?
Student E: The stone is small but thick. The leaf spreads out.
Teacher: Nice comparison. Now the empty plastic bottle. It floats. Why?
Student F: Air is trapped inside. That makes it float.
Teacher: What if I fill the bottle with water and close it? Predict first.
Student G: It may sink or float lower because the air is gone.
Teacher: Let us test. It floats lower. What does that tell us?
Student H: Air helps, but shape also helps because it still did not sink fully.
Teacher: Strong thinking. Turn to your partner again. Use the words material, shape, and air in one sentence.
Student I: We said floating depends on material, shape, and air, not only weight.
Teacher: Excellent. Can someone connect this to a boat?
Student J: A boat is heavy, but it has a wide shape and air spaces, so it floats.
Teacher: That is a clear explanation. Before writing, take five quiet seconds. What question do you still have?
Student K: If we make a clay ball and clay boat, will they act differently?
Teacher: Great question. Tomorrow we can test that. Write one sentence: I used to think floating depends on blank, but now I think blank because blank.`,
  },
];
