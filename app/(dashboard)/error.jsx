"use client"

const error = ({error,reset})=>{
    return (
        <main className="text-center">
            <h2 className="text-4xl">Oh No!</h2>
            <p>{error.message}</p>
            <button onClick={reset} className="btn-primary mx-auto py-4">
                May be Try again !!
            </button>
        </main>
    )
}

export default error;