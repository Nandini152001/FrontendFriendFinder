import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import InputField from './inputField';

const SendRequest = () => {
    const userIdFrom = useSelector((state) => state.login.user.userId);
    const params = useParams();
    const [request, setRequest] = useState({
        userIdFrom: userIdFrom,
        userIdTo: params.toId,
        message: "",
    });

    const navigate = useNavigate();
    const handleChange = (event) => {
        // copy state emp obj to newEmp
        const newReq = { ...request };
        newReq[event.target.name] = event.target.value;
        setRequest(newReq);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(request);
        axios
            .put("http://localhost:8081/friend/send", request)
            .then((res) => {
                // console.log(res.data)
                alert("Friend request has sent!");
                navigate("/profile");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="w-50 mx-auto mt-5">
            <form className="border p-5" onSubmit={handleSubmit}>
                <InputField type="text" name="userIdFrom" id="userIdFrom" value={request.userIdFrom} handleChange={handleChange} />
                <InputField type="text" id="userIdTo" name="userIdTo" value={request.userIdTo} handleChange={handleChange} />
                <InputField type="text" id="message" name="message" value={request.message} handleChange={handleChange} />
                <div>
                    <button type="submit" className="btn btn-primary float-end">Send</button>
                </div>
            </form>
        </div>
    );
}

export default SendRequest;
