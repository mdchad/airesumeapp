import { Metadata } from "next"


import { ChatPDF } from "./ChatPDF"

export const metadata: Metadata = {
  title: "Chat with any PDF",
  description: "Upload a PDF file and ask any questions about it.",
}

export default function ChatWithAnyPDF() {
  return (
    <>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">Chat With Your Resume</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">Upload a PDF file and ask any questions about it.</p>
      </div>
      <ChatPDF />
    </>
  )
}
