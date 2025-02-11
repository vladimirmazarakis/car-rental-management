"use client";

import { useForm, useFormState } from "react-hook-form";
import { CarForm, carFormScheme, CarFormSchemeType } from "../car-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Page(){
    async function onSubmit(form: CarFormSchemeType){
        await fetch("/api/Cars",
            {
                method:"post",
                body: JSON.stringify(form),
            }
        );

        redirect("/app/cars");
    }

    return(
        (<>
            <CarForm onSubmit={onSubmit}/>
        </>)
    );
}