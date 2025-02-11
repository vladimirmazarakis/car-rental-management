import { NextResponse, NextRequest } from "next/server";
import { getToken } from "@/lib/authToken";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

const serverUrl = process.env.SERVER_URL;

export async function GET(req: NextRequest, {params}: {params: Promise<{path: string}>})
{
    const token = await getToken();

    const requestUrl = await buildRequestUrl(req, params);

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

    return NextResponse.json(data, {status: 200})
}

export async function POST(req: NextRequest, {params}: {params: Promise<{path: string}>})
{
    const requestUrl = await buildRequestUrl(req, params);

    const token = await getToken();

    const json = await req.json();

    const result = await fetch(requestUrl, 
    {
        method: "POST",
        body: JSON.stringify(json),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {revalidate: 0},
    });
    
    const data = await result.json();

    return NextResponse.json({message: data});
}

export async function PUT(req: NextRequest, {params}: {params: Promise<{path: string}>})
{
    const requestUrl = await buildRequestUrl(req, params);

    const token = await getToken();

    const result = await fetch(requestUrl, 
    {
        method: "PUT",
        body: JSON.stringify((await req.json())),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {revalidate: 0}
    });
    
    const data = await result.json();

    return NextResponse.json({message: data});
}

export async function DELETE(req: NextRequest, {params}: {params: Promise<{path: string}>})
{
    const requestUrl = await buildRequestUrl(req, params);

    const token = await getToken();

    const result = await fetch(requestUrl, 
    {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        next: {revalidate: 0}
    });
    
    const data = await result.text();

    return NextResponse.json({message: data});
}

const buildRequestUrl = async (req: NextRequest, params: Promise<{
    path: string;
}>) => {
    const path = (await params).path;

    let requestUrl = serverUrl + '/api';

    if(Array.isArray(path)){
        const pathArray = path as string[];
        for(const p of pathArray){
            requestUrl += `/${p}`;
        }
    }else{
        requestUrl += path;
    }

    return requestUrl;
};

async function streamToString(stream: any) {
    const chunks = [];
    for await (const chunk of stream) {
    chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
}