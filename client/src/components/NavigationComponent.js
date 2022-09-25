import { useEffect, useState } from "react"
import authService from "../services/auth.service";
import Modal from "./ModalComponent";
import { Link} from "react-router-dom";

const Navigation = () => {

  const [currentUser, setUser] = useState("");
  
  const logout = () => {
    authService.logout()
      .then((response) => {
        alert(response.data.message)
        setUser(0)
      })
      .catch((error) => {
        console.log(error)
        alert(error.response.data.error)
      })

  }

  useEffect(()=>{
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user)
    }
  },[])
  
    
  
  return (
    <nav className="px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/home" className="flex items-center">
          <span className="self-center text-l font-semibold whitespace-nowrap dark:text-white">Social-App</span>
        </a>
        <div className="flex md:order-2">
        </div>
        <div className="flex items-center" id="navbar-sticky">
          <ul className="flex flex-row mt-0 mr-6 space-x-8 px-1 text-sm font-medium">
            {
              currentUser ?

                <><li>
                  <button onClick={logout} to="/logout" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</button>
                  </li>
                  <li>
                  <Link class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" to={`/profile/${currentUser.user.username}`} >Profile</Link>
                  </li>
                  </>

                :

                <><li>
                  <a href="/login" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</a>
                </li><li>
                    <a href="/register" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Register</a>
                  </li></>


            }




          </ul>
          {
            currentUser ?
            <>
            <Modal></Modal>
            </>
            :
            <div></div>
          }
          
        </div>
      </div>
    </nav>

  )
}

export default Navigation