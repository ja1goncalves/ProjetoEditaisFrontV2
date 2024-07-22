import { DashAdm } from "@/components/DashAdm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function dashboard() {
  //await getData();
  return <DashAdm />;
}

/*
async function getData() {
  if (!cookies().has("engsoft.token")) {
    redirect("/api/auth/logout");
  }
}
*/
