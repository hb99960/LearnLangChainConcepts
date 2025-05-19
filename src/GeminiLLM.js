// import { LLM } from "langchain/llms/base";
// import { GoogleGenAI } from "@google/genai";
// export class GeminiLLM extends LLM {
//     constructor(apiKey, model) {
//       super();
//       this.apiKey = apiKey;
//       this.model = model;
//       this.ai = new GoogleGenAI({ apiKey: this.apiKey });
//     }
  
//     // Implement the _call method required by LangChain
//     async _call(prompt) {
//       const response = await this.ai.models.generateContent({
//         model: this.model,
//         contents: prompt,
//       });
//       return response.text;
//     }
  
//     // Identify the LLM type (optional)
//     _llmType() {
//       return "Gemini";
//     }
//   }