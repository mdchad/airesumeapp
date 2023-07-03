import {NextRequest, NextResponse} from "next/server";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";

export async function POST(req: NextRequest) {
  console.log('request comingggg')
  const formData = await req.formData();

  // Get file from formData
  const file = formData.get('file');
  console.log(file)

  return NextResponse.json({
    success: false,
    message: "At least one PDF page required",
  })
}