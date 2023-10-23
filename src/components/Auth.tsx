import React, { useEffect, useState } from 'react'
import './auth.scss'
import { FcGoogle } from 'react-icons/fc'
import { BsApple } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useDispatch } from 'react-redux'
import { SaveUser } from '../redux/user'
import { GoogleLogin } from '@react-oauth/google';
import { json } from 'stream/consumers'
type Props = {
    setToggle: any
}
function Auth({ setToggle }: Props) {
    const dispatch = useDispatch()
    var a
    const [login, setLogin] = useState(false)
    const [error, setErrors] = useState({})
    const [Log, setLog] = useState({
        "username": '',
        'password': '',
    })
    const [value, setValues] = useState({
        "username": '',
        "email": '',
        "password": '',
        "img": `https://robohash.org/${Math.floor(Math.random() * 3000)}`
    })


    const [Register, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result.data)
            if (result.data) { dispatch(SaveUser(result.data.Register)); setToggle(false) }
            //context.Register(result.data.Register)
        },
        onError(err) {
            setErrors(err)
            console.log(err)
        },
        variables: { email: value.email, username: value.username, password: value.password, img: `https://robohash.org/${Math.floor(Math.random() * 3000)}` }
    })
    const [Login, { loading: ldg }] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            console.log(result.data.Login)
            if (result.data) { dispatch(SaveUser(result.data.Login)); setToggle(false) }
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
            console.log(err)
        },
        variables: Log
    })
    const LoginHandler = (e: any) => {
        setLog({ ...Log, [e.target.name]: e.target.value })
    }
    const ValueHandler = (e: any) => {
        setValues({ ...value, [e.target.name]: e.target.value })
    }
    const OnSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (login) {
                await Login()

            } else {
                await Register();

            }
        } catch (error) {
            console.error('Error submitting registration:', error);
        }
    }
    console.log(error)
    console.log(JSON.stringify(error, null, 2));
    return (
        <div className='auths'>
            <div className='left'>
                {login ?
                    <>
                        <div className='close' onClick={() => setToggle(false)}>
                            <AiOutlineClose />
                        </div>
                        <div className='start'>
                            <h1>Login</h1>
                            <h5>By continuing,you agree to our <span style={{ color: "#0096FF" }}>User Agreement</span> and  <span style={{ color: "#0096FF" }}>Privacy Policy</span>  </h5>
                            <div className='signUp'>
                                <input placeholder='username' type='text' name='username' onChange={LoginHandler} />
                                <input placeholder='Password' type='password' name='password' onChange={LoginHandler} />
                                <button onClick={OnSubmit}>Sign Up</button>
                            </div>
                            <h5>Forgot  your  <span style={{ color: "#0096FF", cursor: "pointer" }}>Username</span> or  <span style={{ color: "#0096FF", cursor: "pointer" }}>password?</span></h5>
                            <h5 style={{ marginTop: 0 }}>New to Reddit? <span style={{ color: "#0096FF", fontWeight: "bold", cursor: "pointer" }} onClick={() => setLogin(!login)}>SIGN UP</span> </h5>
                        </div>
                        <ul className='errors'>
                            {Object?.keys(error)?.length > 0 && (Object?.values(error)?.map((err: any, key: number) => (
                                <li key={key}>
                                    {err}
                                </li>
                            )))
                            }
                        </ul>
                    </> :
                    <>
                        <div className='close' onClick={() => setToggle(false)}>
                            <AiOutlineClose />
                        </div>
                        <div className='start'>
                            <h1>Register</h1>
                            <h5>By continuing,you agree to our <span style={{ color: "#0096FF" }}>User Agreement</span> and  <span style={{ color: "#0096FF" }}>Privacy Policy</span>  </h5>
                            <div className='signUp'>
                                <input placeholder='Username' type='text' onChange={ValueHandler} name='username' />
                                <input placeholder='Email' type='email' onChange={ValueHandler} name='email' />
                                <input placeholder='Password' type='password' onChange={ValueHandler} name='password' />
                                <button onClick={OnSubmit}>Sign In</button>
                            </div>
                            <h5 style={{ marginTop: 0 }}>Have  account <span style={{ color: "#0096FF", fontWeight: "bold", cursor: "pointer" }} onClick={() => setLogin(!login)}>SIGN IN</span> </h5>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
const REGISTER_USER = gql`
mutation Register($email:String!,$username:String!,$password:String!,$img:String!){
  Register(registerInput:{
    email:$email,
    username:$username,
    password:$password,
    img:$img
  }){
    id,username,email,token,img
  }
}
`
const LOGIN_USER = gql`
    mutation Login($username:String!,$password:String!){
        Login(username:$username,password:$password){
            email,token,username,id,img
        }
    }
`
export default Auth