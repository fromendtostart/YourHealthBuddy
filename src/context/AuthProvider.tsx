import { createContext, useState, ReactElement } from "react";

const AuthContext = createContext({});

type ChildrenType = {
    children?: ReactElement | ReactElement[] | undefined
}

export const AuthProvider = ({
    children
}: ChildrenType): ReactElement => {
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;