import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { stringify } from "querystring";
import { throws } from "assert";


export async function GET(
    req: Request
) {

    try {

        const cookieStore = cookies()
        const supabase = createServerComponentClient({ cookies: () => cookieStore })

        const { data: { user: user } } = await supabase.auth.getUser()

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        // Get profile
        const { data, error } = await supabase.from('profiles')
            .select(`*`)
            .eq('id', user?.id)
            .single()

        if (error) throw new Error("The profile could not be found or there was an error")

        return NextResponse.json(data)
    } catch (error) {

        console.log("[PROFILE_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 })

    }

}