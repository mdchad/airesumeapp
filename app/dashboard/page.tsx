'use client'
import { Metadata } from 'next'
import Image from 'next/image'
import { Activity, CreditCard, DollarSign, Download, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { MainNav } from '@/components/main-nav'
import { Overview } from '@/components/overview'
import { RecentSales } from '@/components/recent-sales'
import { Search } from '@/components/search'
import TeamSwitcher from '@/components/team-switcher'
import { UserNav } from '@/components/user-nav'
import { useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'

export default function DashboardPage() {
  const { register, handleSubmit } = useForm()
  const inputRef = useRef(null)

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    console.log(data.file[0])
    formData.append('file', data.file[0])

    try {
      const response = await fetch('/api/file-upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('File uploaded successfully')
        // Handle success
      } else {
        console.error('Error uploading file')
        // Handle error
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      // Handle error
    }
    // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Upload your resume</Label>
          <Input id="picture" type="file" {...register('file')} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
      {/*  <div className="flex items-center justify-between space-y-2">*/}
      {/*    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>*/}
      {/*    <div className="flex items-center space-x-2">*/}
      {/*      <CalendarDateRangePicker />*/}
      {/*      <Button size="sm">*/}
      {/*        <Download className="mr-2 h-4 w-4" />*/}
      {/*        Download*/}
      {/*      </Button>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <Tabs defaultValue="overview" className="space-y-4">*/}
      {/*    <TabsList>*/}
      {/*      <TabsTrigger value="overview">Overview</TabsTrigger>*/}
      {/*      <TabsTrigger value="analytics" disabled>*/}
      {/*        Analytics*/}
      {/*      </TabsTrigger>*/}
      {/*      <TabsTrigger value="reports" disabled>*/}
      {/*        Reports*/}
      {/*      </TabsTrigger>*/}
      {/*      <TabsTrigger value="notifications" disabled>*/}
      {/*        Notifications*/}
      {/*      </TabsTrigger>*/}
      {/*    </TabsList>*/}
      {/*    <TabsContent value="overview" className="space-y-4">*/}
      {/*      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">*/}
      {/*        <Card>*/}
      {/*          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
      {/*            <CardTitle className="text-sm font-medium">*/}
      {/*              Total Revenue*/}
      {/*            </CardTitle>*/}
      {/*            <DollarSign className="h-4 w-4 text-muted-foreground" />*/}
      {/*          </CardHeader>*/}
      {/*          <CardContent>*/}
      {/*            <div className="text-2xl font-bold">$45,231.89</div>*/}
      {/*            <p className="text-xs text-muted-foreground">*/}
      {/*              +20.1% from last month*/}
      {/*            </p>*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*        <Card>*/}
      {/*          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
      {/*            <CardTitle className="text-sm font-medium">*/}
      {/*              Subscriptions*/}
      {/*            </CardTitle>*/}
      {/*            <Users className="h-4 w-4 text-muted-foreground" />*/}
      {/*          </CardHeader>*/}
      {/*          <CardContent>*/}
      {/*            <div className="text-2xl font-bold">+2350</div>*/}
      {/*            <p className="text-xs text-muted-foreground">*/}
      {/*              +180.1% from last month*/}
      {/*            </p>*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*        <Card>*/}
      {/*          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
      {/*            <CardTitle className="text-sm font-medium">Sales</CardTitle>*/}
      {/*            <CreditCard className="h-4 w-4 text-muted-foreground" />*/}
      {/*          </CardHeader>*/}
      {/*          <CardContent>*/}
      {/*            <div className="text-2xl font-bold">+12,234</div>*/}
      {/*            <p className="text-xs text-muted-foreground">*/}
      {/*              +19% from last month*/}
      {/*            </p>*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*        <Card>*/}
      {/*          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">*/}
      {/*            <CardTitle className="text-sm font-medium">*/}
      {/*              Active Now*/}
      {/*            </CardTitle>*/}
      {/*            <Activity className="h-4 w-4 text-muted-foreground" />*/}
      {/*          </CardHeader>*/}
      {/*          <CardContent>*/}
      {/*            <div className="text-2xl font-bold">+573</div>*/}
      {/*            <p className="text-xs text-muted-foreground">*/}
      {/*              +201 since last hour*/}
      {/*            </p>*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*      </div>*/}
      {/*      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">*/}
      {/*        <Card className="col-span-4">*/}
      {/*          <CardHeader>*/}
      {/*            <CardTitle>Overview</CardTitle>*/}
      {/*          </CardHeader>*/}
      {/*          <CardContent className="pl-2">*/}
      {/*            <Overview />*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*        <Card className="col-span-3">*/}
      {/*          <CardHeader>*/}
      {/*            <CardTitle>Recent Sales</CardTitle>*/}
      {/*            <CardDescription>*/}
      {/*              You made 265 sales this month.*/}
      {/*            </CardDescription>*/}
      {/*          </CardHeader>*/}
      {/*          <CardContent>*/}
      {/*            <RecentSales />*/}
      {/*          </CardContent>*/}
      {/*        </Card>*/}
      {/*      </div>*/}
      {/*    </TabsContent>*/}
      {/*  </Tabs>*/}
    </>
  )
}
