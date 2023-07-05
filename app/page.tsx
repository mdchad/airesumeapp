import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {SignedIn, SignedOut} from "@clerk/nextjs";
import {LogIn} from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <SignedIn>
        <div className="flex w-full justify-end">
          <Link href={'/dashboard'}>
            <Button>Dashboard &nbsp;<LogIn size={'20'} /></Button>
          </Link>
        </div>
      </SignedIn>
      <div className="flex place-items-center">
        <p className="uppercase font-bold text-3xl">ai resume app</p>
      </div>
      <div className="flex gap-2 mt-10">
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
