'use client'

import { Job } from "@prisma/client"
import Image from "next/image"
import fake from'../public/company-logo-placeholder.png'
import { H1 } from "./ui/h1"
import Link from "next/link"
import { formatMoney } from "@/lib/utils"
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react"
import Markdown from "./mark-down"


interface JobPageProps {
    job: Job
}

export default function JobPage({job:{
    title,
    description,
     companyName,
     type,
     locationType,
     location,
     salary,
     applicationUrl
}}:JobPageProps){


    return (
        <section className="w-full grow space-y-5">
        <div className="flex items-center gap-3">
        <Image
              src={fake}
              alt="logo"
              width={100}
              height={100}
              className="rounded-xl"
            />
            <div className="">
                <div className="">
                    <H1 className="text-xl font-bold">{title} </H1>
                    <p className="font-semibold">
                        { applicationUrl ? (
                            <Link href={new URL(applicationUrl).origin} className="text-green-500 hover:underline">
                              {companyName}
                            </Link> 
                        ) : ( 
                        <span> {companyName}</span>
                        )}
                    </p>
                </div>
                <div className="text-muted-foreground">
                <p className="flex items-center gap-1.5 sm:hidden">
                <Briefcase size={16} className="shrink-0"/>
                {type}
                </p>
                <p className="flex items-center gap-1.5 ">
                <MapPin size={16} className="shrink-0"/>
                 {locationType}
                </p>

                <p className="flex items-center gap-1.5 ">
                <Briefcase size={16} className="shrink-0"/>
                </p>
                <p className="flex items-center gap-1.5 ">
                <Globe2 size={16} className="shrink-0"/>
                {location || "WorldWide"}
                </p>
                <p className="flex items-center gap-1.5 ">
                <Banknote size={16} className="shrink-0"/>
                  {formatMoney(salary)}
                </p>
         
                </div>
            </div>
        </div>
        <div className="">{description && <Markdown>{description}</Markdown>}</div>
        </section>
    )
}