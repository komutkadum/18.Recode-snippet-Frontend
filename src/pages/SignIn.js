import React,{ useContext } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from 'react-router-dom';
import { signInWithGithub, signInWithGoogle } from '../authentication';
import { FirebaseContext } from '../firebase'
import '../styles/signIn.css'
import Spinner from '../spinner'

const SignIn = () => {
    const firebase = useContext(FirebaseContext);
    const auth = firebase.auth;
    const [user,loading] = useAuthState(auth);
    return (
        <div className="signIn__container">
            {
                loading?<Spinner />:
                user?<><Redirect to="/"/></>:
                <>
                    <Alert variant="success">
                        Please Sign In!
                    </Alert>
                    <Button variant="danger" onClick={()=>signInWithGoogle(firebase,auth)}>
                        <i className="fab fa-google"></i> Sign in With Google
                    </Button>
                    <Button variant="none" className="signIn__github" onClick={()=>signInWithGithub(firebase,auth)}>
                        <i className="fab fa-github"></i> Sign in With Github
                    </Button>
                </>
            }
        </div>
    )
}

export default SignIn;
