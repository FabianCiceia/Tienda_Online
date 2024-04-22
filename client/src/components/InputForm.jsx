import React from 'react';
import { Field, ErrorMessage } from 'formik';

function InputForm({ name = "name", type = "text", label = name }) {
    return (
        <div className="col-auto">
            <Field placeholder={label} className="" type={type} id={name} name={name} />
            <ErrorMessage className="messageError" name={name} component="div" />
        </div>
    );
}

export default InputForm;
