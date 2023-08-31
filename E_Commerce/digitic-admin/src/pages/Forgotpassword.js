import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
    return ( <
        div classNameName = "py-5"
        style = {
            { background: "#ffd333", minHeight: "100vh" } } >
        <
        br / >
        <
        br / >
        <
        br / >
        <
        br / >
        <
        br / >
        <
        div classNameName = "my-5 w-25 bg-white rounded-3 mx-auto p-4" >
        <
        h3 classNameName = "text-center title" > Forgot Password < /h3> <
        p classNameName = "text-center" >
        Please Enter your register email to get reset password mail. <
        /p> <
        form action = "" >
        <
        CustomInput type = "password"
        label = "Email Address"
        id = "email" / >

        <
        button classNameName = "border-0 px-3 py-2 text-white fw-bold w-100"
        style = {
            { background: "#ffd333" } }
        type = "submit" >
        Send Link <
        /button> <
        /form> <
        /div> <
        /div>
    );
};

export default Forgotpassword;