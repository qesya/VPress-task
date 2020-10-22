import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { appSetList } from "../states/app/action"

import Card from "./Card"


const Gallery = () => {

   const dispatch = useDispatch()
   const { search, tags, list } = useSelector(state => state.app)

   useEffect(() => {
      const apiUrl = "https://run.mocky.io/v3/525464b2-740b-40f8-9fb4-1cf0a6be1a6d"

      fetch(apiUrl)
         .then(raw => raw.json())
         .then(result => dispatch(appSetList(result)))
   }, [dispatch])

   return (
      <div className="relative w-2/3 pt-20 flex flex-wrap">
         {list.length > 0 &&
         list
         .filter(({ name, metadata }) => {
            const filterName = name.toLowerCase().includes(search.toLowerCase())
            const metatags = metadata ? metadata.split(",") : []
            const filterTags = metatags.findIndex(x => {
               return tags.indexOf(x) !== -1
            }) !== -1
            return tags.length > 0 ? filterTags : filterName
         })
         .map(d => (
            <Card key={d.id} {...d} />
         ))}
      </div>
   )
}

export default Gallery