import Navbar from '../components/Navbar'
import { TbPhoto } from 'react-icons/tb'
import { BsLink45Deg } from 'react-icons/bs'
import { FaSpaceAwesome } from 'react-icons/fa6'
import { LiaHotjar } from 'react-icons/lia'
import { CiSun } from 'react-icons/ci'
import { AiOutlineToTop } from 'react-icons/ai'
import { FiMoreHorizontal } from 'react-icons/fi'
import { CgCreditCard } from 'react-icons/cg'
import { AiOutlineDown } from 'react-icons/ai'
import './home.scss'
import AllPost from '../components/AllPost'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
function Home() {
const user=useSelector((state:any)=>state.user)
return (
        <div>
            <Navbar />
            <div className='post-container'>
                {user?
                <Link to="/Upload" className='new'>
                    <img src={user?.img} alt='user' />
                    <input placeholder='Create Post' />
                    <input accept='image/*' type='file' id='image' style={{ display: 'none' }}  />
                    <label htmlFor='image'>
                        <TbPhoto id='image' />
                    </label>
                    <BsLink45Deg />
                </Link> :''}
                <div className='new1'>
                    <div >
                        <FaSpaceAwesome />
                        <h4>Space</h4>
                    </div>
                    <div>
                        <LiaHotjar />
                        <h4>Hot</h4>
                    </div>
                    <div>
                        <CiSun />
                        <h4>New </h4>
                    </div>
                    <div>
                        <AiOutlineToTop />
                        <h4>Top</h4>
                    </div>
                    <FiMoreHorizontal />
                    <div>
                        <CgCreditCard />
                        <AiOutlineDown />
                    </div>
                </div>
            </div>
            <AllPost />
        </div>
    )
}
export default Home

