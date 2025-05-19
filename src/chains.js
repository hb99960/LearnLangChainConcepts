import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
import readlineSync from "readline-sync";
config(".env");

// const apiKey = 
const ai = new GoogleGenAI({ apiKey: "AIzaSyD0s3EUAc6MR3Fjzoyizgcv6JsY3LeoN6Y" });

async function main() {
    const topic = readlineSync.question("Enter a topic: ");
    const myModel = "gemini-2.0-flash";
  const summaryResponse = await ai.models.generateContent({
    model: myModel,
    contents: `Explain how ${topic} works in few words`,
  });
  const summary = summaryResponse.text;

  console.log("Summary :",summaryResponse.text);

  const explanationResponse = await ai.models.generateContent({
    model:myModel,
    contents: `Based on this summary: "${summary}", explain why ${topic} is important for developers.`
  });

  const explanation = explanationResponse.text;
  console.log("Explanation: ", explanation);

  const exampleResponse = await ai.models.generateContent({
    model:myModel,
    contents:`Generate 5 practical & real-life examples on this explanation : ${explanation}, highlighting the importance of ${topic}. These exampples should be in numbered bullet points`
  })

  const examples = exampleResponse.text;
  console.log(`Examples:`, examples);
  
}

main();