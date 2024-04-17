

import JobFilterSidebar from "@/components/job-filter-sidebar";
import JobResults from "@/components/job-results";
import { H1 } from "@/components/ui/h1";
import { jobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface pageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?:string;
    page? :string
  }
}

function getTitle({q, type, location, remote}:jobFilterValues) {
  const titlePrefix = q ? `${q} jobs` : type ? `${type} developer jobs`
  :remote ? "Remote developer jobs"
  : "All developer jobs";

  const titleSuffix =  location ?  `in${location} ` : "";
  return `${titlePrefix} ${titleSuffix}`

  }

  export function generateMetadata({searchParams: {q, type, location, remote , }}:pageProps) : Metadata{
   return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true"
    })} | Flow jobs`
   }
  }

export default  async function Home({searchParams:{q, type, location, remote, page}}:pageProps) {
  
  const filterValues: jobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true"
  }


  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="spacey-5 text-center">
        <H1>
         {getTitle(filterValues)}
        </H1>
         
      
        <p className="text-muted-foreground"> Find your dream job</p>
      </div>
<section className="flex flex-col md:flex-row gap-4">
  <JobFilterSidebar/>
   <JobResults filterValues={filterValues}
    page={page ? parseInt(page) : undefined}
   />

</section>
    </main>
    
  );
}

