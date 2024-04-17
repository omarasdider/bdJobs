'use client'

import FormSubmitButton from "@/components/form-submit-button";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveSubmission, deleteJob } from "../../action";


interface AdminSidebarProps {
    job: Job
}

export default function AdminSidebar({job}:AdminSidebarProps){
    return(
        <aside className="flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch">
       {
        job.approved ? (
            <span className="text-center font-semibold text-green-500">
                Approve
            </span>
        ):(
            <ApproveSubmissionButton jobId={job.id}/>
        )
       }
       <DeleteJoButton jobId={job.id}/>
        </aside>
    )
}

interface AdminSubmissionButtonProps {
    jobId: string
}

function ApproveSubmissionButton({jobId}:AdminSubmissionButtonProps){
    const [formState, formAction] = useFormState(approveSubmission, undefined)
    return (
        <form action={formAction}>
            <input hidden name="jobId" value={jobId}/>
            <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
                Approve
            </FormSubmitButton>
            {formState?.error &&(
                <p className="text-sm text-red-500">{formState.error}</p>
            )}
        </form>
    )
}

function DeleteJoButton({jobId}:AdminSubmissionButtonProps ){
    const [formState, formAction] = useFormState(deleteJob, undefined)
    return (
        <form action={formAction}>
            <input hidden name="jobId" value={jobId}/>
            <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
                Delete
            </FormSubmitButton>
            {formState?.error &&(
                <p className="text-sm text-red-500">{formState.error}</p>
            )}
        </form>
    )
}