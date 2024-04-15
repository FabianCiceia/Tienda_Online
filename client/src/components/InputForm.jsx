import React from 'react'
import { Field, ErrorMessage   } from 'formik';
function InputForm({name="name",type="text",label=name}) {
    return (
            <div className="col-auto">
                <Field  placeholder={label}  className="col-form-label" type={type} id={name} name={name} />
                <ErrorMessage  className=" text-danger" name={name} component="div" />
            </div>

    )
}

export default InputForm
