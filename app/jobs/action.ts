"use server";

import { db } from "@/lib/db";
import { createJobsSchema } from "@/lib/validation";
import { redirect } from "next/navigation";
export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobsSchema.parse(values);





  await db.job.create({
    data: {
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
      approved: false
    },
  });

  redirect("/job-submitted");
}