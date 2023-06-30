import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <section className="h-screen w-full bg-[#E5DADA] relative grid place-items-center">
      <SignIn />
    </section>
  )
}
