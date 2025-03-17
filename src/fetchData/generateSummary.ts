// app/utils/generateSummary.ts

import { config } from "../config/config";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function generateSummary(measureData: any): Promise<string> {
	// Get the OpenAI API key from environment variables
	// if (!config.openaiApiKey) {
	// 	throw new Error("OPENAI_API_KEY is not set in the environment");
	// }

	// Initialize the LLM with your API key
	const model = new ChatOpenAI({
		model: "gpt-4o-mini",
		apiKey: "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",
		temperature: 0.7, // adjust temperature as needed
	});

	// Create a prompt template for summarization
	const systemTemplate = `You are a Clinical Quality Analyst. Analyze the provided data and generate insights in JSON format. Do not include explanations.

	Return the response in the following JSON structure:
	
	\`\`\`
	{{
	  "role": "Clinical Quality Analyst",
	  "instruction": "Analyze the provided data and generate insights in **markdown format only**. Do not include explanations.",
	  "output_format": "markdown",
	  "insights": {{
		"DetectedIssue": "Summarize the primary reason for care gaps in a single sentence.",
		"OverallMeasurePerformance": "Assess the performance of the measure.",
		"CareGapsObserved": "Identify  observed Care gaps",
		"PIA": "Suggest improvements to address the gaps."
	  }}
	}}
	\`\`\`
	
	Ensure the response is **valid JSON** and contains no additional text.`;
	
	const promptTemplate = ChatPromptTemplate.fromMessages([
	  ["system", systemTemplate],
	  [
		"user",
		`Summarize the following measure calculation and care gaps data into a structured JSON report for a physician or clinical administrator.
	
	Data: {measureData}
	
	;inj`
	  ],
	]);


	// Call the chain with the measure data converted to JSON string
	const result = await model.invoke(await promptTemplate.invoke({ measureData: JSON.stringify(measureData, null, 2) }));
	return result.content.toString();
}
