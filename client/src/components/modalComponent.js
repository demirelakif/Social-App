import React from "react";
import { useNavigate } from "react-router-dom";
import postService from "../services/post.service";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault()
    let name = event.target[0].value
    let description = event.target[1].value
    let image = event.target[2].files[0]
    console.log(image)
    postService.createPost(name,description,image).then((response)=>{
      console.log(response)
      setShowModal(false)
    })
   
  }
  return (
    <>
      <button
        className="bg-gray-800 text-slate-200 active:bg-pink-600 font-bold uppercase text-sm px-2 py-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Create Post
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    Create Post
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 opacity-4 text-white float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white opacity-4 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col py-2">
                    <label className="text-white">Title</label>
                    <input name="postName" className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 text-white" type="text"></input>
                    <label className="text-white">Description</label>
                    <input name="postDescription" className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 text-white" type="text"></input>
                  </div>
                  <div className="flex flex-col py-2">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="user_avatar">Upload file</label>
                    <input class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"></input>
                    <button type="submit" className="my-1 py-1 mt-2 bg-teal-800 text-white">Create</button>
                  </div>
                </form>

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}