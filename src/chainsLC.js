// import { BaseLLM } from "langchain/llms/base";
// import { LLMChain, PromptTemplate } from "langchain";
import { config } from "dotenv";
import readlineSync from "readline-sync";
import { GoogleGenAI } from "@google/genai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

config(".env");

// Custom LLM class for Gemini API
class GeminiLLM{
  constructor(apiKey, model) {
    // super();
    this.apiKey = apiKey;
    this.model = model;
    this.ai = new GoogleGenAI({ apiKey: this.apiKey });
  }

  // Implement the _call method required by LangChain
  async _call(prompt) {
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
    });
    return response.text;
  }

  // Identify the LLM type (optional)
  _llmType() {
    return "Gemini";
  }
}

async function main() {
  // Initialize the Gemini LLM
  const geminiLLM = new GeminiLLM(
    "AIzaSyD0s3EUAc6MR3Fjzoyizgcv6JsY3LeoN6Y", // Replace with your API key
    "gemini-2.0-flash"
  );

  // Step 1: Get user input for the topic
  const topic = readlineSync.question("Enter a topic: ");

  // Step 2: Define prompt templates for each task
  const summaryPrompt = new PromptTemplate({
    template: "Explain how {topic} works in a few words.",
    inputVariables: ["topic"],
  });

  const explanationPrompt = new PromptTemplate({
    template: `Based on this summary: "{summary}", explain why {topic} is important for developers.`,
    inputVariables: ["summary", "topic"],
  });

  const examplesPrompt = new PromptTemplate({
    template: `Generate 5 practical & real-life examples on this explanation: "{explanation}", highlighting the importance of {topic}. These examples should be in numbered bullet points.`,
    inputVariables: ["explanation", "topic"],
  });

  // Step 3: Create chains for each task
  const summaryChain = new LLMChain({ llm: geminiLLM, prompt: summaryPrompt });
  const explanationChain = new LLMChain({
    llm: geminiLLM,
    prompt: explanationPrompt,
  });
  const examplesChain = new LLMChain({ llm: geminiLLM, prompt: examplesPrompt });

  // Step 4: Run the chains sequentially
  const summary = await summaryChain.call({ topic });
  console.log("Summary:", summary.text);

  const explanation = await explanationChain.call({
    summary: summary.text,
    topic,
  });
  console.log("Explanation:", explanation.text);

  const examples = await examplesChain.call({
    explanation: explanation.text,
    topic,
  });
  console.log("Examples:", examples.text);
}

main();