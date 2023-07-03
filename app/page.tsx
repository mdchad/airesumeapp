import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {SignedOut} from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex place-items-center">
        <p className="uppercase font-bold text-3xl">ai resume app</p>
      </div>
      <div className="flex gap-2">
        <SignedOut>
          <Link href="/sign-in">
            <Button>Log In</Button>
          </Link>
          <Link href="sign-up">
            <Button>Sign up</Button>
          </Link>
        </SignedOut>
      </div>
    </main>
  )
}
