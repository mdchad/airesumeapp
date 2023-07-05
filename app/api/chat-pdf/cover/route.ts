import { NextRequest, NextResponse } from "next/server"

import {askQuestion, generateCoverLetter} from "@/lib/chat-pdf"

export async function POST(request: NextRequest) {
  try {
    const chatQuestion = (await request.json())
    const result = await generateCoverLetter(chatQuestion.chatId);

    return NextResponse.json({
      success: true,
      result
    })
  } catch (error) {
    console.log(error)

    return NextResponse.json(
      { success: false, message: "Internal application error" },
      { status: 500 }
    )
  }
}