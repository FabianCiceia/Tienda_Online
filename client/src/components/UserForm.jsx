import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from "axios";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

const UserForm = ({formType}) => {
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Este correo no es válido')
            .required('Esto es requerido'),
        password: Yup.string()
            .min(8, 'Campo debe tener 8 caracteres')
            .required('Se requiere una contraseña'),
        ...(formType === 'registro' && {
            firstName: Yup.string().required('Nombre es requerido'),
            lastName: Yup.string().required('Apellido es requerido'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                .required('Confirmar contraseña es requerido'),
        }),
    });

    const handleSubmit = (values, { setSubmitting, resetForm, setErrors }) => {
        if (formType === "registro") {
            registerUser(values, setErrors);
        } else {
            loginUser(values, setErrors);
        }
        setSubmitting(false);
        resetForm();
    };

    
    const registerUser = async (values, setErrors) => {
        try {
            await axios.post(
                "http://localhost:8000/api/auth/register",
                values,
                { withCredentials: true }
            );
            loginUser(values, setErrors);
        } catch (err) {
            console.log("Error: ", err.response.data);
            setErrors({general: err.response.data.msg});
        }
    };

    const loginUser = async (values, setErrors) => {
        try {
            let res = await axios.post(
                "http://localhost:8000/api/auth/login",
                values,
                { withCredentials: true }
            );
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/");
        } catch (err) {
            console.log("Error: ", err.response);
            setErrors({general: err.response.data.msg});
        }
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                ...(formType === 'registro' && { firstName: '', lastName: '', confirmPassword: '',reference:'', phone:'' }),
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, isSubmitting }) => (
                <Form>

                    {errors?.general && (
                        <div className="alert alert-danger" role="alert">
                            {errors.general}
                        </div>
                    )}

                    {formType === 'registro' && (
                        <div className='formNameLast'>
                            <div className="formText formName">
                                <label>Nombre: </label>
                                <Field type="text" name="firstName" className="inputLogin"  />
                                <div className="messageError">
                                    <ErrorMessage name="firstName" component="div" className="messageError" />
                                </div>
                            </div>
                            <div className="formText formLast">
                                <label>Apellido: </label>
                                <Field type="text" name="lastName" className="inputLogin"  />
                                <div className="messageError">
                                    <ErrorMessage name="lastName" component="div" className="messageError" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="formText formGmail">
                        <label className='label'>Gmail</label>
                        <Field type="email" name="email" className="inputLogin inputmin" />
                        <div className="messageError"  >
                            <ErrorMessage name="email" component="div" className="messageError" />
                        </div>
                    </div>
                    <div className="formText formPass">
                    <label>Contraseña</label>
                        <Field type="password" name="password" className="inputLogin inputmin"  />
                        <div className="messageError">
                            <ErrorMessage name="password" component="div" className="messageError" />
                        </div>
                    </div>
                    {formType === 'registro' && (
                        <div>
                            <div className="formText formComPass">
                                <label>Confirmar contraseña</label>
                                <Field type="password" name="confirmPassword" className="inputLogin inputmin" />
                                <div className="messageError">
                                    <ErrorMessage name="confirmPassword" component="div" className="messageError" />
                                </div>
                            </div>
                            <div className="formText formPhone">
                                <label >Telefono: <p className='labelLine'>(Opcional)</p></label> 
                                <Field type="text" name="phone" className="inputLogin inputmin"  />
                            </div>
                            <div className="formText formReference">
                                <label>Referencia para llegar a tu casa <p className='labelLine'>(Opcional)</p>   </label>
                                <Field type="text" name="reference" className="inputLogin inputmin"  />
                            </div>
                        </div>
                    )}
                    <button type="submit" className="buttonSubmit" disabled={isSubmitting}>
                        Enviar!
                    </button>
                
                </Form>
            )}
        </Formik>
    );
}

UserForm.propTypes = {
    formType: PropTypes.string.isRequired
}

export default UserForm