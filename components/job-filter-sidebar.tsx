import { db } from "@/lib/db";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/job-types";
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitButton from "./form-submit-button";






async function filterJobs(fromData: FormData){
    'use server'

    const values = Object.fromEntries(fromData.entries());

    const {q, type, location, remote} = jobFilterSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(q && {q: q.trim()}),
        ...(type && {type}),
        ...(location && { location}),
        ...(remote && {remote: "true"}),


    });

  redirect(`/?${searchParams.toString()}`)
}

const JobFilterSidebar = async () => {
    const distinctLocation = (await db.job.findMany({
        where: {
            approved: true
        },
        select: {location: true},
        distinct: ["location"]
    })
    .then(locations => locations.map(({location}) => location).filter(Boolean)
    )) as string[]
    return (
        <aside className="md:w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
        <form action={filterJobs}>
         <div className="space-y-4">
        <div className="flex flex-col gap-2">
         <Label htmlFor="q">
           Search
        </Label>

           <Input id="q" name="q" placeholder="Title, company etc"/>
        </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="type">Type</label>
        <Select id="type" name="type" defaultValue="">
             <option value="">Types</option>
             {jobTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
             ))}
        </Select>
      </div>
        <div className="flex flex-col gap-2">
            <Label htmlFor="location" >Location</Label>
            <Select  id="location" name="location">
                 <option value="" >All locations  </option>
                 {distinctLocation.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                 ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
             id="remote"
             name="remote"
             type="checkbox"
             className="scale-125 accent-black"
            />
            <Label htmlFor="remote"> Remote jobs</Label>
          </div>
            <FormSubmitButton className="w-full"> Filter job</FormSubmitButton>
         </div> 
         </form>          
        </aside>
      );
}

 
export default JobFilterSidebar;


