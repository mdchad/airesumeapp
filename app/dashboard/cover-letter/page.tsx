import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import Image from 'next/image'
import { z } from 'zod'

import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { UserNav } from '@/components/user-nav'
import { taskSchema } from '@/data/schema'

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
}

// Simulate a database read for tasks.
export default async function TaskPage() {
  return (
    <>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">Generate cover letter</h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">Generate cover letter based on your resume</p>
      </div>
    </>
  )
}
