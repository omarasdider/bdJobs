import JobListItem from "@/components/JobListItem";
import { H1 } from "@/components/ui/h1";
import { db } from "@/lib/db";
import Link from "next/link";

const AdminPage =  async () => {

    const unapprovedJobs = await db.job.findMany({
        where: {approved: false}
    })

    return ( 
        <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
          <H1 className="text-center">Admin Dashboard</H1> 
          <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Unapproved Job</h2>
            {unapprovedJobs.map((job) => (
                <Link key={job.id} href={`/admin/jobs/${job.id}` } className="block">
                <JobListItem job={job}/>               
                </Link>
            ))}
         </section>           
        </main>
     );
}
 
export default AdminPage;