import Post from "./Post"
import gql from 'graphql-tag'
import { useQuery} from "@apollo/client";
import { useSelector } from "react-redux";
function AllPost() {
  const {data,loading,error}=useQuery(GET_POSTS)
  const {data:random,loading:loa,error:err}=useQuery(GET_RANDOM_POSTS)
  const user=useSelector((state:any)=>state.user)
  return (
    user?
    <div >
        {loading?'loading ...':
        data?.getPosts?.map((post:any,key:number)=>(
          <Post post={post} key={key}/>
        ))
        }
    </div>:
    <div >
        {loading?'loading ...':
        random?.getRandomPosts?.map((post:any,key:number)=>(
          <Post post={post} key={key}/>
        ))
        }
    </div>
  )
}
export default AllPost
export const GET_POSTS=gql`
  query  getPosts{
  getPosts {
    id,desc,img,id,title,userId,likes,createdAt
  }
}`
export const GET_RANDOM_POSTS=gql `query{ getRandomPosts {
  desc,img,title,userId,likes,createdAt,id:_id
}}
`