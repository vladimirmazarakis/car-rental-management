import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CarVm } from "@/types/cars";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

export const carFormScheme = z.object({
    make: z.string(),
    model: z.string(),
    year: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      }),
    mileageInKm: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      })
});

export function CarForm({onSubmit, car} : {onSubmit: (form: CarFormSchemeType) => Promise<void>, car?: CarVm | undefined}){
  const form = (car != undefined) 
  ? 
  useForm<CarFormSchemeType>({
    resolver: zodResolver(carFormScheme),
    defaultValues:{
        make: car?.make,
        model: car?.model,
        year: car?.year.toString(),
        mileageInKm: car?.mileageInKm.toString()
    }
  }) 
  : 
  useForm<CarFormSchemeType>({
          resolver: zodResolver(carFormScheme),
          defaultValues:{
              make: "",
              model: "",
              year: "2000",
              mileageInKm: "0"
          }
  });

    
  const [carName, setCarName] = useState<string>("Specify car details");
  const [makeWatch, modelWatch] = form.watch(["make", "model"]);

  useEffect(() => {
      if(!makeWatch && !modelWatch){
          setCarName("Specify car details");
      }else{
          setCarName(`${makeWatch} ${modelWatch}`);
      }
  }, [makeWatch, modelWatch]);

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
      <h2 className="text-4xl">{carName}</h2>
          <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Make</FormLabel>
              <FormControl>
                  <Input 
                  placeholder="BMW, Audi e.g."
                  
                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>This is the car brand.</FormDescription>
              <FormMessage />
              </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                  <Input 
                  placeholder="M5, A4, C4 etc."
                  
                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>This is the car model.</FormDescription>
              <FormMessage />
              </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                  <Input 
                  placeholder="2001, 2015, 2024 etc."
                  
                  type="number"
                  {...field} />
              </FormControl>
              <FormDescription>This is the car make year.</FormDescription>
              <FormMessage />
              </FormItem>
          )}
          />
          <FormField
          control={form.control}
          name="mileageInKm"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Mileage in Kilometers</FormLabel>
              <FormControl>
                  <Input 
                  placeholder="151341 for example"
                  
                  type="number"
                  {...field} />
              </FormControl>
              <FormDescription>Amount of kilometers the car has been driven.</FormDescription>
              <FormMessage />
              </FormItem>
          )}
          />
          <CarFormSubmit />
      </form>
  </Form>
  );
}

function CarFormSubmit(){
    const { isDirty, isValid } = useFormState();

    return (
        <Button type="submit" disabled={!isDirty || !isValid} className="w-full">
        Submit
        </Button>
    );
}

export type CarFormSchemeType = z.infer<typeof carFormScheme>;