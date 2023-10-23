import React from 'react'
import { useNavigate } from 'react-router-dom'
import './post.scss'
import { RxThickArrowDown, RxThickArrowUp } from 'react-icons/rx'
import { FaRegCommentAlt } from 'react-icons/fa'
import { PiGiftLight, PiShareFatLight } from 'react-icons/pi'
import { CiSaveUp2 } from 'react-icons/ci'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/client'
import { GET_POSTS } from './AllPost'
import { useSelector } from 'react-redux'
import { ImArrowDown, ImArrowUp } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
type Props = {
    post: any
}
function Post({ post }: Props) {
    const { data, loading, error } = useQuery(GET_USER, {
        variables: { userId: post?.userId }
    })
    const { data: comment } = useQuery(GET_COMMENT, {
        variables: { postId: post.id }
    })
    const user = useSelector((state: any) => state.user)
    const [Like] = useMutation(post?.likes.includes(user?.id) ? DISLIKE_POST : LIKE_POST, {
        refetchQueries: [GET_POSTS],
        variables: { postId: post.id },
        onError(err) {
            console.log(err)
        }
    })
    const [FOllow] = useMutation(data?.getUser?.followers?.includes(user?.id) ? DISALLOW_USER : FOLLOW_USER, {
        refetchQueries: [GET_USER],
        variables: { userId: data?.getUser?.id },
        onError(err) {
            console.log(err);
        }
    })
    const navigate = useNavigate()
    const date=Number(post?.createdAt)
    return (
        <div className='post'>
            <div className='container'>
                <div className='rx'>
                    <ToastContainer
                    style={{zIndex:40}}
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
                    {post?.likes?.includes(user?.id) ? <ImArrowUp style={{ color: 'blue' }} /> : <RxThickArrowUp onClick={() => {
                        Like(); toast.success(`${user?'Liked Post with success':'Please Login 🙂'}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }} />}
                    <h4>{post?.likes?.length}</h4>
                    {!post?.likes?.includes(user?.id) ? <ImArrowDown  style={{ color: 'red' }} /> : <RxThickArrowDown onClick={() => {
                        Like(); toast.warning(`${user?'disliked post':'Please Login 🙂'}`, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        })
                    }} />}
                </div>
                <div className='posted'>
                    <div className='post-nav'>
                        <div>
                            <img src={data?.getUser?.img} alt='user' />
                            <h5>{data?.getUser?.username}</h5>
                            <h6>{post?.title} | {moment(date).fromNow()}</h6>
                        </div>
                        {data?.getUser?.followers?.includes(user?.id) ? <button className='b1' onClick={() => { FOllow() }}><span>Joined</span></button> : <button onClick={() => { FOllow() }}>Join</button>}
                    </div>
                    <div className='body'>
                        <h3>{post?.desc}</h3>
                        <img src={post?.img} alt='post' />
                        <div className='foot'>
                            <div className='comm' onClick={() => navigate(`/Comment/${post?.id}/${post?.userId}`)}>
                                <FaRegCommentAlt />
                                <h5>{comment?.getComments.length} </h5>
                            </div>
                            <div className='comm'>
                                <PiGiftLight />
                                <h5>Award</h5>
                            </div>
                            <div className='comm'>
                                <PiShareFatLight />
                                <h5>Share</h5>
                            </div>
                            <div className='comm'>
                                <CiSaveUp2 />
                                <h5>Save</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
export const GET_USER = gql`
query getUser($userId:ID!){
  getUser(userId:$userId) {
    email,id,username,followers,email,img
  }
}
`
const GET_COMMENT = gql`
    query GetComments($postId:ID!){
        getComments (postId:$postId){
            body,createdAt,id,userId
        }
    }
`
const LIKE_POST = gql`
    mutation Like($postId:String){
  Like(postId: $postId)
}
`
const DISLIKE_POST = gql`
mutation DisLike($postId:String){
  DisLike(postId:$postId)
}
`
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