"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const addTicket = async (formData)=>{
   const ticket = Object.fromEntries(formData);

   const supabase = createServerActionClient({cookies});
   const {data:{session}} = await supabase.auth.getSession();
   const {error} = await supabase.from("Tickets")
   .insert({
    ...ticket,
    user_email:session.user.email
   });

   if(error){
    throw new Error("Could not add new ticket");
   }

   revalidatePath("/tickets");
   redirect("/tickets");
}


export const deleteTicket = async (id)=>{
   const supabase = createServerActionClient({cookies});
   const {data:{session}} = await supabase.auth.getSession();
   const {error} = await supabase.from("Tickets")
   .delete()
   .eq("id",id)

   if(error){
      throw new Error(`Could not delete ticket with id:${id}`);
   }

   revalidatePath("/tickets");
   redirect("/tickets");
}