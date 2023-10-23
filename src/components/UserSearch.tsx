import React from 'react'
import { useSelector } from 'react-redux'
import { GET_USER } from './Post'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SEARCH_USER } from './Navbar'
type Props = {
    data: any
}

function UserSearch({ data }: Props) {
    const user = useSelector((state: any) => state.user)
    const [FOllow] = useMutation(data?.followers?.includes(user?.id) ? DISALLOW_USER : FOLLOW_USER, {
        refetchQueries: [GET_USER,SEARCH_USER],
        variables: { userId: data?._id },
        onError(err) {
            console.log(err);
        }
    })
    return (
        <div className='flex'>
                                <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
            <div className='user'>
                <img src={data.img} alt='user' />
                <div className='ele'>
                    <h5>{data.email}</h5>
                    <h5>{data.username}</h5>
                </div>
            </div>
            {data?.followers?.includes(user?.id)?<button onClick={()=>{FOllow();toast.warn('DisFollow with success', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });}}>DisFollow</button>:<button onClick={()=>{FOllow();toast.success('Follow User with success', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });}}>Follow</button>}
        </div>
    )
}

export default UserSearch

const FOLLOW_USER = gql`
    mutation Follow($userId:String){
  Follow(userId:$userId)
}
`
const DISALLOW_USER = gql`
    mutation Follow($userId:String){
  DisFollow(userId:$userId)
}
`