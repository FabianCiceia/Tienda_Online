import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import UserContext from '../../context/UserContext';

const AdminRoute = (props) => {
    const {  user } = useContext(UserContext);
    // console.log(user.role);
    const { redirectPath = "/login", children } = props;
    // return (<div>Hola</div>)
    return <>{(user.role === 'user') ? <Navigate to={redirectPath} replace /> : children}</>;
};

AdminRoute.propTypes = {
    user: PropTypes.object,
    redirectPath: PropTypes.string,
    children: PropTypes.node
}

export default AdminRoute