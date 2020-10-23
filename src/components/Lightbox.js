import React from "react"
import { useDispatch, useSelector } from "react-redux"

import Tag from "./Tag"
import { appSetLightbox } from "../states/app/action"


const Lightbox = () => {

   const dispatch = useDispatch()
   const { lightbox: { show, data } } = useSelector(state => state.app)

   const handleClose = () => {
      dispatch(appSetLightbox())
   }

   return (
      data &&
      <div className={`${!show ? "hidden " : ""}fixed overflow-y-auto z-50 left-0 top-0 w-full h-full p-10 bg-black`}>
         <span onClick={handleClose} className="float-right cursor-pointer text-white text-3xl font-bold">&times;</span>
         <div className="px-20 py-10">
            <div className="flex justify-between">
               <div className="flex items-center mb-2">
                  <label className="text-white text-3xl font-bold">{data.name}</label>
                  <span className="ml-4 mt-2 text-gray-400 self-center text-sm">{data.width} x {data.height}</span>
               </div>
               <div className="flex">
                  {data.metadata.length > 0 &&
                  data.metadata.split(",").map(tag => (
                     <Tag key={tag} label={tag} inverted larger readonly />
                  ))}
               </div>
            </div>
            <div className="flex justify-between mb-5">
               <code className="px-3 py-1 rounded-md bg-gray-900">
                  <a href={data.fileurl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{data.fileurl}</a>
               </code>
            </div>
            {show && <img src={data.fileurl} alt={data.name} className="w-full" />}
         </div>
      </div>
   )
}

export default Lightbox