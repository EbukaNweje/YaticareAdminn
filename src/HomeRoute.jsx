import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const HomeRoute = () => {
    const nav = useNavigate();

    const handleLogin = () => {
        nav("/adminlogin/login");
    };

    useEffect(() => {
        handleLogin();
    }, []);
    return null;
};

export default HomeRoute;
