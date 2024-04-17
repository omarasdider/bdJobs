

import JobPage from "@/components/job-page"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { Metadata } from "next"
import Link from "next/link"
import {  notFound, redirect } from "next/navigation"
import {cache} from "react"

interface PageProps{
    params: {id: string}
}

const getJob= cache(async(id:string) => {
    const job = await db.job.findUnique({
     where: {id}
    })

    if(!job || !id){
        redirect('/not-found')
    } 

        return job
    })

    export async function generateStaticParams(){
      const jobs = await db.job.findMany({
        where: {approved: true},
        select: {id: true}
      });

      return jobs.map(({id}) => id)
    }

  export async function generateMetadata({
    params: {id},
  }:PageProps): Promise<Metadata>{
   const job = await getJob(id)
   return{
    title:  job.id
   }
  }

export default async function page({params:{id}}:PageProps){

    const job = await getJob(id)

    const {applicationEmail, applicationUrl} = job;

    const applicationLink = applicationEmail ? `mailto: ${applicationEmail}` : applicationUrl;

     if(!applicationLink){
        console.error("Job has no application link or email")
       notFound()
     }


    return(
        <main className="max-w-5xl px-3 m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
           <JobPage job={job}/> 
           <aside>
            <Button asChild> 
           <Link
             href={applicationLink} className="w-40 md:w-fit"
           >Apply now</Link>
            </Button>
           </aside>
        </main>
    )
}