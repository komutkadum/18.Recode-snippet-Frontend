import {useContext } from "react";
import { FirebaseContext } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route,Redirect } from "react-router-dom";
import Spinner from '../spinner'

const ProtectedRoute = ({component:Component,...restOfProps}) =>{
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const [user,loading] = useAuthState(auth);
    return(<>
        {loading?<Spinner />:
        <Route
            {...restOfProps}
            render={(props) =>
                user&&
                localStorage.getItem('userid')? 
                    <Component {...props} /> : 
                    <Redirect to="/signin" />
            }/>
        }
        </>
    );
  }

export default ProtectedRoute
  