import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const Login = () => {
    const history = useHistory()
    const [user, setUser] = useContext(UserContext)
    const [loginPage, setLoginPage] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const submitLogin = (data) => {
        axios.post('https://ishtiak-blog.herokuapp.com/login', data)
            .then(result => {
                console.log(result)
                if (!result.data) {
                    alert('Something went wrong')
                } else {
                    if (result.role === 'Commenter') {
                        if (result.spamcount > 1) {
                            alert('Sorry you are banned from this site for spamming. Contact us if want to comment clean.')
                        } else {
                            setUser(result.data)
                            // history.push('/')
                        }
                    } else {
                        setUser(result.data)
                        // history.push('/')
                    }
                }
            })
    }

    const submitRegistration = (data) => {
        console.log(data)
        const newUser = { ...data, spamcount: 0, _id: data.userName }
        axios.post('https://ishtiak-blog.herokuapp.com/register', newUser)
            .then(result => {
                console.log(result)
                if (result.data) {
                    setUser(newUser)
                    console.log(result.data)
                    history.push('/')
                } else {
                    alert('something went wrong')
                }
            })
    }


    const LoginForm = () => {
        return (
            <form onSubmit={handleSubmit(submitLogin)}>
                <p>Don't have a account? <button onClick={() => setLoginPage(false)}>Register Now</button></p>
                <span>Email:</span><input defaultValue="" {...register("email", { required: true })} /> <br />
                {errors.email && <span>Email is required</span>}
                <span>Password</span><input type='password' {...register("password", { required: true })} /> <br />
                {errors.password && <span>This field is required</span>}
                <input type="submit" value='Login' />
            </form>
        )
    }

    const RegisterForm = () => {
        return (
            <form onSubmit={handleSubmit(submitRegistration)}>
                <p>Already have a account? <button onClick={() => setLoginPage(true)}>Login Now</button></p>
                <span>Full Name: </span> <br /><input defaultValue="" {...register("fullName", { required: true })} /> <br />
                {errors.fullName && <span>Name is required</span>} <br />
                <span>Email: </span> <br /><input defaultValue="" {...register("email", { required: true })} /> <br />
                {errors.email && <span>Email is required</span>} <br />
                <span>Username: </span><br /><input defaultValue="" {...register("userName", { required: true })} /> <br />
                {errors.userName && <span>Username is required</span>} <br />
                <span>Password:</span><br /><input type="password" {...register("password", { required: true })} /> <br />
                {errors.password && <span>Password is required</span>} <br />
                <input type="submit" value='Register' />
            </form>
        )
    }
    return (
        <div className='login'>
            {
                loginPage ? <LoginForm></LoginForm> : <RegisterForm></RegisterForm>
            }
        </div>
    );


};

export default Login;