"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { CarForm, carFormScheme, CarFormSchemeType } from "../../car-form";
import { redirect, useParams } from "next/navigation";
import { CarVm } from "@/types/cars";

export default function Page(){
    const params = useParams<{id: string}>();

    const [car, setCar] = useState<CarVm>();

    const [fetching, setFetching] = useState(true);

    const [carName, setCarName] = useState<string>("Specify car details");
    // const [makeWatch, modelWatch] = form.watch(["make", "model"]);

    useEffect(() => {
        fetch(`/api/Cars/${params.id}`).then(resp => {
            resp.json().then(data => {
                setCar(data)
                setFetching(false);
            });
        });
    }, []);


    async function onSubmit(form: CarFormSchemeType){
        let updatedObj: CarVm = {
            id: Number.parseInt(params.id),
            make: form.make,
            model: form.model,
            year: Number.parseInt(form.year),
            mileageInKm: Number.parseInt(form.mileageInKm),
            pricePerDay: Number.parseInt(form.pricePerDay)
        };

        await fetch("/api/Cars",
            {
                method:"put",
                body: JSON.stringify(updatedObj),
            }
        );

        redirect("/app/cars");
    }

    return(
        (<>
            {fetching ? (<p>Loading</p>) : (<CarForm onSubmit={onSubmit} car={car}/>)}
        </>)
    );
}