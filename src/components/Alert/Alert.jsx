import React from 'react'

const Alert = ({estado, mensaje}) => {
  return (
    <>
     {estado === "success" && (
      <div role="alert" className="alert alert-success fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[400px] z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{mensaje}</span>
      </div>
    )}

    {estado === "error" && (
      <div role="alert" className="alert alert-error fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[400px] z-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{mensaje}</span>
      </div>
    )}
    </>
  )
}

export default Alert