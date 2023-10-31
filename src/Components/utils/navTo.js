import { Context } from "index";
import { useContext, useEffect } from "react";

const { useNavigate } = require("react-router-dom");


export default function NavTo(path) {
    debugger
    const navigate = useNavigate();
    const { store } = useContext(Context);
    if (store.isAuth) {
        navigate(path);
    }
};
