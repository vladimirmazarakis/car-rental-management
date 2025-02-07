"use server";

import { redirect } from "next/navigation";
import { setToken, getToken, resetToken, getRefreshToken } from "./authToken";

const serverUrl = process.env.SERVER_URL;

export const login = async (email: string, password: string) => {
    const loginUrl = serverUrl + '/api/Users/login';
    const body = {
        email: email,
        password: password
    }
    const result = await fetch(loginUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }); 
    if(result.status !== 200)
    {
        console.log(await result.json());
        return false;
    }

    const data = await result.json();
    await setToken(data.accessToken, data.refreshToken);

    redirect('/app');
};

export const refresh = async () => {
    const refreshUrl = serverUrl + '/api/Users/refresh';
    const refreshToken = await getRefreshToken();

    if(!refreshToken){
        return false;
    }

    const body = {
        refreshToken: refreshToken
    };

    const result = await fetch(refreshUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }); 

    if(result.status !== 200)
    {
        return false;
    }

    const data = await result.json();
    await setToken(data.accessToken, data.refreshToken);
    return true;
};

export const logout = async () =>{
    await resetToken();
    redirect("/auth/login");
};

export const isLoggedIn = async () => {
    return (await getToken()) !== undefined;
};

export const register = async (email: string, pass: string) => {
    const registerUrl = serverUrl + '/api/Users/register';
    const body = {
        email: email,
        password: pass
    }

    const result = await fetch(registerUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }); 

    if(result.status !== 200)
    {
        return await result.json();
    }

    redirect('/auth/login');
};