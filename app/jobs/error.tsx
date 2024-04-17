
'use client'


import { H1 } from "@/components/ui/h1"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

 const Error = () => {
    const router = useRouter()
    useEffect(()=> {
      router.push("/not-found")
    },[])
    return(
        <main className="m-auto my-10 max-w-2xl space-y-5 px-3 text-center">
            <H1>Error</H1>
            <p>An unexpected error occurred</p>
        </main>
    )
}


export default Error