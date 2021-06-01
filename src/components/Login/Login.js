import firebase from "firebase/app";
import "firebase/auth";
import React from 'react';
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        isSignedIn: false,
        error: ''
    });

    const loginWithGogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                var { displayName, email } = result.user;
                const userDetails = { ...user }
                userDetails.name = displayName;
                userDetails.isSignedIn = true;
                userDetails.email = email;
                setUser(userDetails);
            }).catch((error) => {
                const userDetails = { ...user }
                userDetails.error = error.message;
                setUser(userDetails);
            });
    }



    const signOut = () => {
        firebase.auth().signOut().then(() => {
            
            const signOutUser = { ...user };
            signOutUser.name = '';
            signOutUser.email = '';
            signOutUser.password = '';
            signOutUser.isSignedIn = false;
            setUser(signOutUser);

        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <>
            <div className='logout-area'>
                <div className='logout-info'>
                    <p>Already Logged In</p>
                    <div className='user-logout-info'>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                    <button onClick={signOut} className="btn btn-danger mt-4">Logout</button>
                </div>
            </div>

            <div className='google-login text-center mt-4'>
                <button onClick={loginWithGogle} className="btn">
                    Login With Google
                                        <span>
                        <FontAwesomeIcon icon={faGoogle} />
                    </span>
                </button>
            </div>
        </>
    );

};

export default Login;