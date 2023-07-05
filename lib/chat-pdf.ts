import { randomBytes } from "crypto"
import * as fs from "fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import * as path from "path"
import {createExtractionChainFromZod, RetrievalQAChain} from "langchain/chains"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { Document } from "langchain/document"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { HNSWLib } from "langchain/vectorstores/hnswlib"
import { z } from "zod";
import {StructuredOutputParser} from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import {HumanChatMessage, SystemChatMessage} from "langchain/schema";

export type PDFPage = {
  textContent: string
  page: number
}
const embeddingModel = new OpenAIEmbeddings({
  maxConcurrency: 5,
  openAIApiKey: process.env.OPENAI_API_KEY,
})

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 4000,
  chunkOverlap: 20,
})

const model = new ChatOpenAI({
  temperature: 0.9,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
})

const createStoreDir = async (chatId: string) => {
  const path = storePath(chatId)
  await fs.mkdir(path, { recursive: true })

  return path
}

const storePath = (chatId: string) => {
  return path.join(tmpdir(), "airesumeapp", "chat-pdf", chatId)
}

function getHoursDiff(a: Date, b: Date): number {
  const diffInMilliseconds = a.getTime() - b.getTime()
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60)

  return diffInHours
}

export async function removeOutdatedChats() {
  const ttlHours = 24
  const now = new Date()

  const storageDir = join(tmpdir(), "damngood.tools", "chat-pdf")
  const files = await fs.readdir(storageDir, { withFileTypes: true })

  for (const file of files) {
    if (file.isDirectory()) {
      const fullPath = path.join(storageDir, file.name)
      const stats = await fs.stat(fullPath)

      if (getHoursDiff(now, stats.birthtime) > ttlHours) {
        await fs.rm(fullPath, { recursive: true, force: true })
      }
    }
  }
}

export async function createChat(pages: PDFPage[]) {
  const documents = pages.map(
    (p) =>
      new Document({
        pageContent: p.textContent,
        metadata: {
          page: p.page,
        },
      })
  )

  const chunkedDocuments = await textSplitter.splitDocuments(documents)
  const vectorStore = await HNSWLib.fromDocuments(
    chunkedDocuments,
    embeddingModel
  )

  const chatId = randomBytes(32).toString("hex")
  const path = await createStoreDir(chatId)

  await vectorStore.save(path)

  return chatId
}

export async function askQuestion(chatId: string, question: string) {
  const vectorStore = await HNSWLib.load(storePath(chatId), embeddingModel)


  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    returnSourceDocuments: true,
  })
  const { text: responseText, sourceDocuments } = (await chain.call({
    query: question,
  })) as { text: string; sourceDocuments?: Document[] }

  const pages = (
    (sourceDocuments
      ? sourceDocuments.map((d) => d.metadata.page).sort((a, b) => a - b)
      : []) as number[]
  ).filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  return {
    text: responseText,
    pages,
  }
}

export async function extractResumeDetails(chatId: string) {
  const vectorStore = await HNSWLib.load(storePath(chatId), embeddingModel)

  // We can use zod to define a schema for the output using the `fromZodSchema` method of `StructuredOutputParser`.
  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      name: z.string().describe("the name of the resume's owner"),
      skills: z.string().describe("the skills stated in the resume"),
      contact_number: z.string().describe("the contact number of the resume's owner"),
      email: z.string().describe("the email address of the resume's owner"),
      years_of_experience: z.string().describe("years of experience calculating from all her professional experience"),
      education: z.string().describe("the highest education and field of study"),
      professional_experience: z.array(z.object({
        title: z.string().describe("the job title of the employment"),
        period_of_employment: z.string().describe("the period of employment for that job"),
        employment_achievements: z.string().describe("list of achievements for that particular employment"),
        company_name: z.string().describe("the name of the company")
      })).describe("the highest education and field of study"),
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Answer the users question as best as possible.\n{format_instructions}\n{question}",
    inputVariables: ["question"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const input = await prompt.format({
    question: "Who is this resume belongs to? What are his/her skills? What is the contact number?What is the candidate's highest education and field of study?How many years of experience does the candidate have?Based on the candidate's professional experience, extract the list of employments and grouped it an array based on the job title, the company's name, the period of employment and the achievements for each particular employment",
  });

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    returnSourceDocuments: true,
  })

  const { text: responseText, sourceDocuments } = (await chain.call({
    query: input,
  })) as { text: string; sourceDocuments?: Document[] }

  const pages = (
    (sourceDocuments
      ? sourceDocuments.map((d) => d.metadata.page).sort((a, b) => a - b)
      : []) as number[]
  ).filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  return {
    text: responseText,
    pages,
  }
}

export async function generateCoverLetter(chatId: string) {
  const extractDetails = await extractResumeDetails(chatId)
  const detailsObject = extractDetails.text

  console.log(JSON.parse(extractDetails.text))

  const chat = await model.call([
    new SystemChatMessage(
      "You are a sophisticated career advisor who is helping individuals write cover letters on the basis of their resumes."
    ),
    new HumanChatMessage(`Based on the document of the resume details: ${detailsObject} Generate a cover letter for the most pertinent role that can be inferred.`),
  ])

  return {
    text: chat.text,
  }
}