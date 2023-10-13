"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// icons & UI
import { TiDelete } from 'react-icons/ti'

export default function DeleteButton({ id }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        setIsLoading(true)

        const res = await fetch(`${location.origin}/api/tickets/${id}`,
        {
            method:"DELETE"
        });
        const { error } = await res.json();

        if (error) {
            console.log(error.message);
            setIsLoading(false);
        }

        if (!error) {
            router.refresh();
            router.push("/tickets");
        }
    }

    return (
        <button
            className="btn-primary"
            onClick={handleClick}
            disabled={isLoading}
        >
            {isLoading && (
                <>
                    <TiDelete />
                    Deleting....
                </>
            )}
            {!isLoading && (
                <>
                    <TiDelete />
                    Delete Ticket
                </>
            )}
        </button>
    )
}