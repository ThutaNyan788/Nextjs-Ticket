import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react'
import DeleteButton from './DeleteButton';

export const dynamicParams = true;


export const generateMetadata = async ({ params }) => {
    const supabase = createServerComponentClient({ cookies });
    const { data: ticket, error } = await supabase.from("Tickets")
        .select()
        .eq("id", params.id)
        .single();


    return {
        title: `Dojo HelpDesk | ${ticket?.title || "Ticket Not Found"}`
    }

}




const getTickets = async (id) => {

    const supabase = createServerComponentClient({ cookies });
    const { data: ticket, error } = await supabase.from("Tickets")
        .select()
        .eq("id", id)
        .single();


    return ticket;
}

const TicketDetail = async ({ params: { id } }) => {
    const ticket = await getTickets(id);

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
                <div className="ml-auto">
                    {data.session.user.email === ticket.user_email && (
                        <DeleteButton id={ticket.id} />
                    )}
                </div>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}

export default TicketDetail