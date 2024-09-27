import React from 'react'

const FieldWrapper = ({children, className, label, error, id,}) => {
  return (
    <div className={`flex flex-col ${className}`}>
        <label className='mb-2 block text-base/5 font-semibold' htmlFor={id}>{label}</label>
        {children}
        {error && <p className='text-red-500 mt-1'>{error}</p>}
    </div>
  )
}

export default FieldWrapper