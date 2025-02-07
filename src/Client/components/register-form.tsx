"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFormState } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { login, register } from "@/lib/authLib";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});;

type RegisterFormSchema = z.infer<typeof formSchema>;

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  

  async function onSubmit(values: RegisterFormSchema)
  {
    const data = {
      email: values.email,
      password: values.password,
    };
    
    const result = await register(data.email, data.password);

    for(const [key, value] of Object.entries(result?.errors)){
      form.setError(`root.${key}`, {message: value as string});
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-balance text-muted-foreground">
                    Create a new Car Rental account
                  </p>
                </div>
                <FormField control={form.control} name="email" render={({field}) => 
                (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="password" render={({field}) => 
                (
                  <FormItem className="grid gap-2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                    <Input {...field} type="password" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <FormField control={form.control} name="confirmPassword" render={({field}) => 
                (
                  <FormItem className="grid gap-2">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                    <Input {...field} type="password" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <RegisterFormSubmit />
                {form.formState.errors.root && (
                  <div style={{ color: "red" }}>
                    {Object.keys(form.formState.errors.root).map((key) => {
                      
                      return(
                      <p className={cn("text-sm text-center text-red-600")} key={key}>{form.formState.errors.root?.[key]?.message}</p>
                    )})}
                  </div>
                )}
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <a href="/auth/login" className="underline underline-offset-4">
                    Sign in
                  </a>
                </div>
                
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/auth.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}

export function RegisterFormSubmit(){
  const { isDirty, isValid } = useFormState();

  return (
    <Button type="submit" disabled={!isDirty || !isValid} className="w-full">
      Create account
    </Button>
  );
}