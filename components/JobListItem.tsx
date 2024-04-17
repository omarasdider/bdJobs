
import { Job } from "@prisma/client"
import Image from "next/image";
import fake from'../public/company-logo-placeholder.png'
import {Banknote, Briefcase, Clock, Globe2, MapPin} from 'lucide-react'
import { formatMoney,  relativeDate } from "@/lib/utils";
import Badge from "./badge";

interface JobListItemProps {
job: Job
}


const JobListItem = ({
    job:{
        title,
        companyName,
        type,
        locationType,
        location,
        salary,
        createdAt,
    }
}:JobListItemProps) => {
    return (  
        <article className="flex gap-3 rounded-lg p-5 border hover:bg-muted/60">
            <Image
              src={fake}
              alt="logo"
              width={100}
              height={100}
              className="rounded-lg self-center"
            />
            <div className="flex-row space-y-3">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className=" text-muted-foreground">{companyName}</p>
         
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
                <p className="flex items-center gap-1.5  sm:hidden">
                <Clock size={16} className="shrink-0"/>
                {relativeDate(createdAt)}
                </p>
                </div>
            </div>
            <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
                <Badge>
                    {type}
                </Badge>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock size={16} />
                {relativeDate(createdAt)}
                </span>
            </div>
        </article>
    );
}
 
export default JobListItem