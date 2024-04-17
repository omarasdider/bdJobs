'use server'

import { db } from "@/lib/db";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

 type FormState = {error?: string} | undefined
 
export async function approveSubmission(prevState: FormState, formData: FormData): Promise<FormState>{

    try {
  
    const jobId = (formData.get("jobId") as string);

    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not authorized");
    }

    await db.job.update({
      where: { id: jobId},
      data: { approved: true },
    });

    revalidatePath("/");
    } catch (error) {
        let message = "Unexpected error";
        if(error instanceof Error){
            message = error.message;
        }
        return { error: message}
    }
}

export async function deleteJob( prevState: FormState, formData: FormData){
  try {
    const jobId = (formData.get("jobId") as string)

    const user = await currentUser()
    if(!user || !isAdmin(user)){
      throw new Error("Unexpected error")
    }

    await db.job.delete({
      where: {id: jobId}
    })
    revalidatePath("/")
  } catch (error) {
    let message = "Unexpected error";
    if(error instanceof Error){
        message = error.message;
    }
    return { error: message}
  }
redirect("/admin")
}