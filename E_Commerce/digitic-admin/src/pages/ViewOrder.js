import { Table } from "antd";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getOrderByUser } from "../features/auth/authSlice";
const columns = [{
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Count",
        dataIndex: "count",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Date",
        dataIndex: "date",
    },

    {
        title: "Action",
        dataIndex: "action",
    },
];

const ViewOrder = () => {
    const location = useLocation();
    const userId = location.pathname.split("/")[3];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrderByUser(userId));
    }, []);
    const orderState = useSelector((state) => state.auth.orderbyuser[0].products);
    console.log(orderState);
    const data1 = [];
    for (let i = 0; i < orderState.length; i++) {
        data1.push({
            key: i + 1,
            name: orderState[i].product.title,
            brand: orderState[i].product.brand,
            count: orderState[i].count,
            amount: orderState[i].product.price,
            color: orderState[i].product.color,
            date: orderState[i].product.createdAt,
            action: ( <
                >
                <
                Link to = "/"
                classNameName = " fs-3 text-danger" >
                <
                BiEdit / >
                <
                /Link> <
                Link classNameName = "ms-3 fs-3 text-danger"
                to = "/" >
                <
                AiFillDelete / >
                <
                /Link> <
                />
            ),
        });
    }
    return ( <
        div >
        <
        h3 classNameName = "mb-4 title" > View Order < /h3> <
        div >
        <
        Table columns = { columns }
        dataSource = { data1 }
        /> <
        /div> <
        /div>
    );
};

export default ViewOrder;