import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Swal from 'sweetalert2'
import InputForm from '../components/InputForm';
import { useNavigate, Link} from "react-router-dom";

function Add() {
    const navigate = useNavigate(); 
    const baseURL ="http://localhost:8000/api/product";
    function addData(pront) {
        axios
        .post(`${baseURL}`, pront, { withCredentials: true })
        .then(() => {
            Swal.fire({
                icon: "success",
                title: `fue cargado correctamente`,
            });
            // navigate("");
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: `Ha ocurrido un error`,
            });
            // console.log(err.response.data);
        })
    }

    const initialValues = {
        name: 'Samsung 49-Inch CHG90 144Hz',
        description: "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
        price: '1500000',
        category: 'monitor',
        stock: '10',
        imageUrl: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    };
    const onSubmit = (values,  { resetForm }) => {
        resetForm();
        addData(values)
    };
    const validationSchema = Yup.object({
    name: Yup.string().required().min(3),
    description: Yup.string().required(),
    price: Yup.number().required().min(0),
    category: Yup.string().required(),
    stock: Yup.number().required().min(0),
    imageUrl: Yup.string().required()
    });
    return (
        <div className='container'>
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >   
        {/* <div class="row g-3 align-items-center">
        <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Password</label>
        </div>
        <div class="col-auto">
            <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline">
        </div>
        <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
            Must be 8-20 characters long.
            </span>
        </div>
        </div> */}
            <Form className="form">
                <div className='row g-3 align-items-center'>
                <h1>Add player</h1>
                    <InputForm  name="name" />
                    <InputForm name="description" />
                    <InputForm  name="price" />
                    <InputForm name="category" />
                    <InputForm  name="stock" />
                    <InputForm name="imageUrl" />
                    <InputForm  name="name" />
                    <div>
                        <button className="" type="submit">Add</button>
                    </div>
                </div>
            </Form>
        </Formik>
        </div>
    )
}

export default Add

