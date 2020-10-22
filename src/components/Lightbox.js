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
               <div className="text-white text-3xl font-bold mb-5">{data.name}</div>
               <div className="flex">
                  {data.metadata.length > 0 &&
                  data.metadata.split(",").map(tag => (
                     <Tag key={tag} label={tag} inverted larger readonly />
                  ))}
               </div>
            </div>
            {show && <img src={data.fileurl} alt={data.name} className="w-full" />}
         </div>
      </div>
   )
}

export default Lightbox