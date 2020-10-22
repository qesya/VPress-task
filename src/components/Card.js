import React, { memo } from "react"
import { useDispatch } from "react-redux"

import Tag from "./Tag"
import { appSetLightbox } from "../states/app/action"

const Card = memo(prop => {

   const dispatch = useDispatch()
   const tags = prop.metadata ? prop.metadata.split(",") : []

   const showLightbox = () => {
      dispatch(appSetLightbox({ show: true, data: prop }))
   }

   return (
      <div className="w-1/4 p-2">
         <div className="w-full p-2 flex flex-col justify-between rounded-md hover:shadow-lg transition-shadow duration-300">
            <img onClick={showLightbox} src={prop.thumbnailurl} alt={prop.name} className="cursor-pointer" />
            <div className="p-2 text-center">
               <label className="text-gray-700">{prop.name}</label>
               <div className="pt-2 flex justify-center flex-wrap">
                  {tags.length > 0 &&
                  tags.map(tag => (
                     <Tag key={tag} label={tag} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
})

export default Card