import { Select } from "antd";
import { useFormik } from "formik";
import { React, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { getBrands } from "../features/brand/brandSlice";
import { getColors } from "../features/color/colorSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup
        .array()
        .min(1, "Pick at least one color")
        .required("Color is Required"),
    quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);
    console.log(color);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfullly!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, isLoading]);
    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            label: i.title,
            value: i._id,
        });
    });
    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img]);
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });
    const handleColors = (e) => {
        setColor(e);
        console.log(color);
    };
    return ( <
        div >
        <
        h3 classNameName = "mb-4 title" > Add Product < /h3> <
        div >
        <
        form onSubmit = { formik.handleSubmit }
        classNameName = "d-flex gap-3 flex-column" >
        <
        CustomInput type = "text"
        label = "Enter Product Title"
        name = "title"
        onChng = { formik.handleChange("title") }
        onBlr = { formik.handleBlur("title") }
        val = { formik.values.title }
        /> <
        div classNameName = "error" > { formik.touched.title && formik.errors.title } <
        /div> <
        div classNameName = "" >
        <
        ReactQuill theme = "snow"
        name = "description"
        onChange = { formik.handleChange("description") }
        value = { formik.values.description }
        /> <
        /div> <
        div classNameName = "error" > { formik.touched.description && formik.errors.description } <
        /div> <
        CustomInput type = "number"
        label = "Enter Product Price"
        name = "price"
        onChng = { formik.handleChange("price") }
        onBlr = { formik.handleBlur("price") }
        val = { formik.values.price }
        /> <
        div classNameName = "error" > { formik.touched.price && formik.errors.price } <
        /div> <
        select name = "brand"
        onChange = { formik.handleChange("brand") }
        onBlur = { formik.handleBlur("brand") }
        value = { formik.values.brand }
        classNameName = "form-control py-3 mb-3"
        id = "" >
        <
        option value = "" > Select Brand < /option> {
            brandState.map((i, j) => {
                return ( <
                    option key = { j }
                    value = { i.title } > { i.title } <
                    /option>
                );
            })
        } <
        /select> <
        div classNameName = "error" > { formik.touched.brand && formik.errors.brand } <
        /div> <
        select name = "category"
        onChange = { formik.handleChange("category") }
        onBlur = { formik.handleBlur("category") }
        value = { formik.values.category }
        classNameName = "form-control py-3 mb-3"
        id = "" >
        <
        option value = "" > Select Category < /option> {
            catState.map((i, j) => {
                return ( <
                    option key = { j }
                    value = { i.title } > { i.title } <
                    /option>
                );
            })
        } <
        /select> <
        div classNameName = "error" > { formik.touched.category && formik.errors.category } <
        /div> <
        select name = "tags"
        onChange = { formik.handleChange("tags") }
        onBlur = { formik.handleBlur("tags") }
        value = { formik.values.tags }
        classNameName = "form-control py-3 mb-3"
        id = "" >
        <
        option value = ""
        disabled >
        Select Category <
        /option> <
        option value = "featured" > Featured < /option> <
        option value = "popular" > Popular < /option> <
        option value = "special" > Special < /option> <
        /select> <
        div classNameName = "error" > { formik.touched.tags && formik.errors.tags } <
        /div>

        <
        Select mode = "multiple"
        allowClear classNameName = "w-100"
        placeholder = "Select colors"
        defaultValue = { color }
        onChange = {
            (i) => handleColors(i) }
        options = { coloropt }
        /> <
        div classNameName = "error" > { formik.touched.color && formik.errors.color } <
        /div> <
        CustomInput type = "number"
        label = "Enter Product Quantity"
        name = "quantity"
        onChng = { formik.handleChange("quantity") }
        onBlr = { formik.handleBlur("quantity") }
        val = { formik.values.quantity }
        /> <
        div classNameName = "error" > { formik.touched.quantity && formik.errors.quantity } <
        /div> <
        div classNameName = "bg-white border-1 p-5 text-center" >
        <
        Dropzone onDrop = {
            (acceptedFiles) => dispatch(uploadImg(acceptedFiles)) } >
        {
            ({ getRootProps, getInputProps }) => ( <
                section >
                <
                div {...getRootProps() } >
                <
                input {...getInputProps() }
                /> <
                p >
                Drag 'n'
                drop some files here, or click to select files <
                /p> <
                /div> <
                /section>
            )
        } <
        /Dropzone> <
        /div> <
        div classNameName = "showimages d-flex flex-wrap gap-3" > {
            imgState ? .map((i, j) => {
                return ( <
                    div classNameName = " position-relative"
                    key = { j } >
                    <
                    button type = "button"
                    onClick = {
                        () => dispatch(delImg(i.public_id)) }
                    classNameName = "btn-close position-absolute"
                    style = {
                        { top: "10px", right: "10px" } } >
                    < /button> <
                    img src = { i.url }
                    alt = ""
                    width = { 200 }
                    height = { 200 }
                    /> <
                    /div>
                );
            })
        } <
        /div> <
        button classNameName = "btn btn-success border-0 rounded-3 my-5"
        type = "submit" >
        Add Product <
        /button> <
        /form> <
        /div> <
        /div>
    );
};

export default Addproduct;