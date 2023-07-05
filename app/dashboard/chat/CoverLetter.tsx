"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, FileQuestion, Loader2 } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";

async function extractDetails(chatId: string) {
    try {
        const response = await fetch(`/api/chat-pdf/cover`, {
            method: "POST",
            body: JSON.stringify({ chatId }),
        })

        if (response.ok) {
            return (await response.json()) as {
                success: boolean
                result?: { text: string }
            }
        }

        return null
    } catch (e) {
        console.error(e)

        return null
    }
}

export function CoverLetter({ chatId }: any) {
    const { toast } = useToast()
    const [processing, setProcessing] = useState(false)
    const [details, setDetails] = useState<any>(null)

    const onExtractDetails = async () => {
        setProcessing(true)
        const result = await extractDetails(chatId)
        setProcessing(false)

        if (result?.success && result.result) {
            const details = result.result.text
            console.log("=====")
            console.log(details)
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
                      "Generate Cover Letter"
                    )}
                </Button>
                {processing && (
                    <Alert key="processing" className="animate-pulse">
                        <Bot className="h-4 w-4" />
                        <AlertDescription>...</AlertDescription>
                    </Alert>
                )}
                {details && (
                  <div className="bg-white p-4 w-full h-full rounded-lg border">
                      <Label htmlFor="message">Your cover letter</Label>
                      <Textarea id="message" className="h-4/5">{details}</Textarea>
                  </div>
                )}
            </div>
        </div>
    )
}
