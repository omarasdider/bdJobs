import JobPage from "@/components/job-page";
import { db } from "@/lib/db"
import { notFound } from "next/navigation";
import AdminSidebar from "./admin-sidebar";

interface PageProps {
    params: {id: string}
}


export default async function Page({ params: {id}}:PageProps){
    const job = await db.job.findUnique({
        where:{id}
    });

    if(!job) notFound()

        return (
            <main className="flex m-auto my-10 max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
                <JobPage job={job}/>
                <AdminSidebar job={job}/>
            </main>
        )
}