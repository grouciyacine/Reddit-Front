import gql from 'graphql-tag'
import React from 'react'
import { useQuery } from '@apollo/client'
import './comm.scss'
import { format } from 'timeago.js';
type Props = {
    com: any
}

function Comm({ com }: Props) {
    const { data } = useQuery(GET_USER, {
        variables: { userId: com?.userId }
    })
    const date=Number(com?.createdAt)
    return (
        <div className='one-element' >
            <div className='left'>
                <div className='user'>
                    <h5>{data?.getUser?.username}</h5>
                    <img src={data?.getUser?.img} alt='' />
                </div>
                <h4>{com.body}</h4>
            </div>
            <h5>{format(date)}</h5>
        </div>
    )
}
const GET_USER = gql`
query getUser($userId:ID!){
    getUser(userId:$userId) {
        email,id,img,username,followers {
            createdAt,userId
        },email
    }
}
`
export default Comm