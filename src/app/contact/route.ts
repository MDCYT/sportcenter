import { NextResponse } from "next/server";


export async function GET(
    req: Request
) {

   return NextResponse.redirect("https://api.whatsapp.com/send?phone=51987654321&text=Hola%2C%20quisiera%20contactarme%20con%20ustedes.")

}