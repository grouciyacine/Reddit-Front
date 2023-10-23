import React, { useState } from 'react'
import { RxThickArrowDown, RxThickArrowUp } from 'react-icons/rx'
import { FaRegCommentAlt } from 'react-icons/fa'
import { PiGiftLight, PiShareFatLight } from 'react-icons/pi'
import { CiSaveUp2 } from 'react-icons/ci'
import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
import './comment.scss'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { BsSend } from 'react-icons/bs'
import Comm from './Comm'
import { GiCakeSlice } from 'react-icons/gi'
import {ImArrowUp,ImArrowDown} from 'react-icons/im'
type Props = {}

function Comment({ }: Props) {
    const [body, setBody] = useState<string>()
    const user = useSelector((state: any) => state.user)
    const { id, userId } = useParams()
    const { data } = useQuery(GET_USER, {
        variables: { userId: userId }
    })
    const { data: post } = useQuery(GET_POST, {
        variables: { postId: id }
    })
    const { data: comment } = useQuery(GET_COMMENT, {
        variables: { postId: id }
    })
    const [CreateComment] = useMutation(CREATE_COMMENT, {
        refetchQueries: [GET_COMMENT],
        variables: { body: body, postId: id },
        onError(err) {
            console.log(err)
        },
    })
    const [Like] = useMutation(post?.getPost?.likes.includes(user?.id) ?DISLIKE_POST : LIKE_POST, {
        refetchQueries: [GET_POST],
        variables: { postId: id },
        onError(err) {
            console.log(err)
        }
    })
    return (
        <div className='all'>
            <Navbar />
            <div className='head'>
                <img className='hh' src='https://static.toiimg.com/thumb/msid-99612775,width-1280,height-720,resizemode-4/.jpg' alt='profile' />
                <div>
                    <img src={data?.getUser?.img} alt='user' />
                    <h2>{data?.getUser?.username}</h2>
                </div>
            </div>
            <div className='next-one'>
                <div className='user-data'>
                    <img className='hhh' src='https://static.toiimg.com/thumb/msid-99612775,width-1280,height-720,resizemode-4/.jpg' alt='profile' />
                    <div>
                        <img src={data?.getUser?.img} alt='good' />
                        <h4>{data?.getUser?.username}</h4>
                    </div>
                    <h5>Entomology: the branch of zoology concerned with the study of insects. All insect and insect related posts are welcome!</h5>
                    <div className='cake'>
                        <GiCakeSlice size={26} />
                        <h5>Created May 13, 2009</h5>
                    </div>
                    <div className=''>
                        <h5>Karma </h5>
                        <h5>17,641</h5>
                    </div>
                </div>
                <div className='post'>
                    <div className='container'>
                        <div className='rx'>
                            {post?.getPost?.likes?.includes(user?.id)?<ImArrowUp  style={{color:'blue'}}/>:<RxThickArrowUp onClick={() => { Like() }} />}
                            
                            <h4>{post?.getPost?.likes?.length}</h4>
                            {!post?.getPost?.likes?.includes(user?.id)?<ImArrowDown onClick={() => { Like() }} style={{color:'red'}}/>:<RxThickArrowDown onClick={() => { Like() }} />}
                        </div>
                        <div className='posted'>
                            <div className='post-nav'>
                                <div>
                                    <img src={data?.getUser?.img} alt='user' />
                                    <h5>{data?.getUser?.username}</h5>
                                    <h6>{post?.getPost?.title}</h6>
                                </div>
                                <button>Join</button>
                            </div>
                            <div className='body'>
                                <h3>{post?.getPost?.desc}</h3>
                                <img src={post?.getPost?.img} alt='post' />
                                <div className='foot'>
                                    <div className='comm' >
                                        <FaRegCommentAlt />
                                        <h5>{comment?.getComments?.length} Com</h5>
                                    </div>
                                    <div>
                                        <PiGiftLight />
                                        <h5>Award</h5>
                                    </div>
                                    <div>
                                        <PiShareFatLight />
                                        <h5>Share</h5>
                                    </div>
                                    <div>
                                        <CiSaveUp2 />
                                        <h5>Save</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>{user?
                    <div className='comment'>
                        <img src={user?.img} alt='user' />
                        <input type='text' placeholder='Enter your Comment' value={body} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)}/>
                        {body ? <BsSend size={30} onClick={() => { CreateComment(); setBody("") }} /> : <span></span>}
                    </div>
                    :''}
                    <div className='comments'>
                        {comment?.getComments?.map((com: any, key: number) => (
                            <Comm key={key} com={com} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment
const GET_USER = gql`
query getUser($userId:ID!){
    getUser(userId:$userId) {
        email,id,img,username,followers {
            createdAt,userId
        },email
    }
}
`
const GET_POST = gql`
query GetPost($postId:ID!){
    getPost(postId:$postId) {
        desc,img,id,desc,title,userId,likes 
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
const CREATE_COMMENT = gql`
  mutation CreateComment($body: String!, $postId: String!) {
    CreateComment(body: $body, postId: $postId) {
        body
        createdAt
        id
    }
  }
`;
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