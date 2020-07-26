import React from 'react';
import { useSelector } from 'react-redux';

const isAuthorized = (WrappedComponent) => {
    return (props) => {
        const user = useSelector(state => state.user);
        if (user.is_authenticated) {
            return (
                <WrappedComponent {...props} />
            )
        } else {
            props.history.push("/");
            return null;
        }
    }
}

export default isAuthorized;