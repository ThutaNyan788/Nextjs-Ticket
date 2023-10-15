"use client"

import {experimental_useFormStatus as useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const {pending} = useFormStatus();
  return (
    <button disabled={pending} type='submit' className="btn-primary">
        {pending && <span>Submitting...</span>}
        {!pending && <span>Submit</span>}
    </button>
  )
}

export default SubmitButton