import React, { useState } from 'react'
import './navbar.scss'
import { AiFillHome, AiOutlineDown, AiOutlinePlus } from 'react-icons/ai'
import { CiSearch } from 'react-icons/ci'
import { BiLogIn, BiUserCircle } from 'react-icons/bi'
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { useSelector,useDispatch } from 'react-redux'
import { BsPencil } from 'react-icons/bs'
import { CiMenuFries } from 'react-icons/ci'
import Auth from './Auth'
import { LiaEyeSolid } from 'react-icons/lia'
import { LogOut } from '../redux/user'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import UserSearch from './UserSearch'

function Navbar() {
  const [toggle, setToggle] = useState(false)
  const [smileMenu, setSmileMenu] = useState(false)
  const [chat,setChat]=useState(false)
  const [input,setInput]=useState("")
  const user = useSelector((state: any) => state.user)
  const dispatch=useDispatch()
  const {data,error,loading}=useQuery(SEARCH_USER,{
    variables:{name:input},
    onError(err){
      console.log(err)
    }
  })
  return (
    <nav className='container1'>
      <div className='container'>
      <img src={!true ? '/Reddit.png' : '/white1.png'} alt='logo' className='logo' />
      <div className='home'>
        <AiFillHome />
        <h4>Home</h4>
      </div>
      <AiOutlineDown />
      <div className='search'>
        <CiSearch/>
        <input type='text' placeholder='Search Reddit' value={input} onChange={(e)=>setInput(e.target.value)}/>
      </div>
      <BsArrowUpRightCircle />
      <BsChatDots onClick={()=>{setChat(!chat)}}/>
      <MdOutlineNotificationsNone />
      <AiOutlinePlus />
      <div className='auth'>
        {user ?
          <div className='profile' onClick={() => setSmileMenu(!smileMenu)}>
            <div className='img-user'>
              <img
                src={user?.img} className='img'
                alt="avatar"  />
              <div className='karma'>
                <h5>{user.username}</h5>
                <h6>1 Karma</h6>
              </div>
            </div>
            <AiOutlineDown />
            {smileMenu &&
              <div className='smile'>
                <div className='one-child'>
                  <div className='title'>
                    <BiUserCircle />
                    <h4>My Stuff</h4>
                  </div>
                  <h5>Profile</h5>
                  <h5>Profile</h5>
                  <h5>Profile</h5>
                  <h5>Profile</h5>
                </div>
                <div className='one-child'>
                  <div className='title'>
                    <LiaEyeSolid/>
                    <h4>View Options</h4>
                  </div>
                  <h5>Dark Mode</h5>

                </div>
                <div className='one-child'>
                  <div className='title1'>
                    <BiUserCircle />
                    <h4>My Stuff</h4>
                  </div>
                  <div className='title1'>
                    <BiUserCircle />
                    <h4>My Stuff</h4>
                  </div>
                  <div className='title1'>
                    <BiLogIn/>
                    <h4 onClick={()=>dispatch(LogOut())}>LogOut</h4>
                  </div>
                </div>
              </div>
            }
          </div>
          :
          <button className='btn1' onClick={() => setToggle(!toggle)}>Sign Up</button>
        }
        <BsPencil className='pencil' />
        <CiMenuFries className='pencil' />
      </div>
      <div className='toggle'>
        {toggle &&
          <Auth setToggle={setToggle} />}
      </div>
      {chat && <div className='chat'>
        gggg
        </div>}
        {error? <span></span>:(
            loading? <h4 className='msg'>loading</h4>:input?<div className='search-user'>
              {data.SearchUser.map((data:any,key:number)=>(
                  <UserSearch data={data} key={key}/>
                
              ))}
            </div>:<span></span>
        )
        }
      </div>
        <div className='search1'>
        <CiSearch/>
        <input type='text' placeholder='Search Reddit' value={input} onChange={(e)=>setInput(e.target.value)}/>
      </div>
    </nav>
  )
}

export default Navbar

export const SEARCH_USER = gql`
    query SearchUser($name:String!){
      SearchUser(name:$name){
            email,username,_id,img,followers
        }
    }
`
