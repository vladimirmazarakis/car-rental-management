import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@/lib/authToken";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

const serverUrl = process.env.SERVER_URL;

export async function GET(req: NextRequest, {params}: {params: Promise<{path: string}>})
{
    const token = await getToken();

    const path = (await params).path;

    const requestUrl = serverUrl + '/api/' + path;

    const res = await fetch(requestUrl, {
        method: "GET",
        credentials: "include",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {revalidate: 0}
    });

    const data = await res.json();

    return NextResponse.json({message: data.message})
}

export async function POST(req: NextRequest, {params}: {params: Promise<{path: string}>})
{
    const path = (await params).path;

    const requestUrl = serverUrl + '/api/' + path;

    const token = await getToken();

    const result = await fetch(requestUrl, 
    {
        method: "POST",
        body: req.body,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {revalidate: 0}
    });
    
    const data =await result.json();

    return NextResponse.json({message: data});
}