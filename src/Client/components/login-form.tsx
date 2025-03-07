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
import { login } from "@/lib/authLib";
import { useFormStatus } from "react-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

type LoginFormSchema = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email: "",
      password: ""
    },
  });

  async function onSubmit(values: LoginFormSchema)
  {
    const data = {
      email: values.email,
      password: values.password,
    };
    
    if(!await login(data.email, data.password)){
      form.setError("root", {
        message: "Invalid credentials."
      });
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
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your Car Rental Account
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
                    <FormDescription>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
                />
                <LoginFormSubmit />
                <p className={cn("text-sm text-center text-red-600", form.formState.errors.root?.message === undefined ? "hidden" : "block")}>
                  {form.formState.errors.root?.message}
                </p>
                
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/auth/register" className="underline underline-offset-4">
                    Sign up
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

export function LoginFormSubmit(){
  const { isDirty, isValid } = useFormState();

  return (
    <Button type="submit" disabled={!isDirty || !isValid} className="w-full">
      Login
    </Button>
  );
}
