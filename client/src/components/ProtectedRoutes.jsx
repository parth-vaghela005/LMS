import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    return children;
}
export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated} = useSelector(store=>store.auth);

    if(isAuthenticated){
        return <Navigate to="/"/>
    }

    return children;
}

export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store=>store.auth);

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }

    if(user?.role !== "instructor"){
        console.log( "role" + user.role);
        return <Navigate to="/"/>
    }

    return children;
}
export const StudentRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(store => store.auth);

    // if (!isAuthenticated) {
    //     return <Navigate to="/" />;
    // }
    
    if (user?.role == "instructor") {
        console.log("Access denied. Role: " + user.role);
        return <Navigate to="/admin/dashboard" />; 
    }

    return children;
};