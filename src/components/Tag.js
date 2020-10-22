import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { appAddTags } from "../states/app/action"


const Tag = ({ label, inverted, larger, readonly = false }) => {

   const dispatch = useDispatch()
   const { tags } = useSelector(state => state.app)

   const isTag = tags.indexOf(label) !== -1

   const handleClick = () => readonly ? false : dispatch(appAddTags(label))

   return (
      <div 
         onClick={handleClick}
         className={`${isTag ? "border-orange-500" : "border-gray-400"} ${inverted ? "text-white" : "text-gray-600"} ${larger ? "text-lg h-10 mx-2 px-4" : "h-6 mx-px px-2"} ${readonly ? "" : "cursor-pointer hover:bg-orange-500 hover:border-orange-600"} flex flex-col justify-center text-xs rounded-full hover:text-white border transition-colors duration-200`}>
         {label}
      </div>
   )
}

export default Tag