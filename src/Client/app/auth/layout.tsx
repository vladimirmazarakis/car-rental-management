import { isLoggedIn } from "@/lib/authLib";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)
{

    const loggedIn = await isLoggedIn();
    if(loggedIn){
        redirect("/app");
    }

    return (<>{children}</>);
}