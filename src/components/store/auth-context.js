
import React, {useState,useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
    useEffect(() => {
        const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

        if (storedUserLoggedInInfo === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
    };

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler
    }}>{props.children}</AuthContext.Provider>
}

export default AuthContext;