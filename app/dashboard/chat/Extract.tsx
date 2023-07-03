"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, FileQuestion, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface ChatProps {
    chatId: string
    onGoToPage: (number) => void
    showPages: boolean
}

interface ChatInteraction {
    isBot: boolean
    message: string
    pages?: number[]
}

async function extractDetails(chatId: string) {
    try {
        const response = await fetch(`/api/chat-pdf/extract`, {
            method: "POST",
            body: JSON.stringify({ chatId }),
        })

        if (response.ok) {
            return (await response.json()) as {
                success: boolean
                result?: { text: string; pages: number[] }
            }
        }

        return null
    } catch (e) {
        console.error(e)

        return null
    }
}

export function Extract({ chatId }: any) {
    const { toast } = useToast()
    const [processing, setProcessing] = useState(false)
    const [details, setDetails] = useState('')

    const onExtractDetails = async () => {
        setProcessing(true)
        const result = await extractDetails(chatId)
        setProcessing(false)

        if (result?.success && result.result) {
            const details = JSON.parse(result.result.text)
            console.log(details.name)
            setDetails(details)
            return
        }

        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
        })
    }

    return (
        <div className="w-full rounded-lg">
            <div
                className="flex flex-col h-[350px] gap-2 overflow-scroll bg-secondary rounded-lg p-2 mb-8"
            >
                <Button disabled={processing} onClick={onExtractDetails}>
                    {processing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Extract"
                    )}
                </Button>
                {processing && (
                    <Alert key="processing" className="animate-pulse">
                        <Bot className="h-4 w-4" />
                        <AlertDescription>...</AlertDescription>
                    </Alert>
                )}
                {details && (
                  <div className="bg-white p-4 w-full h-full rounded-lg border grid gap-2">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">Name</Label>
                          <Input type="email" id="email" value={details.name} disabled />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">Skills</Label>
                          <Input type="email" id="email" value={details.skills} disabled />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Label htmlFor="email">Phone number</Label>
                          <Input type="email" id="email" value={details.contact_number} disabled />
                      </div>
                  </div>
                )}
            </div>
        </div>
    )
}
