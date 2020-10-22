import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import JSZip from "jszip"
import { saveAs } from "file-saver"

import { appSetSearch } from "../states/app/action"
import Tag from "./Tag"

const Search = () => {
   const dispatch = useDispatch()
   const { tags, list } = useSelector(state => state.app)
   const [debounce, setDebounce] = useState("")
   const [loading, setLoading] = useState(false)

   const handleSearch = ({ target }) => setDebounce(target.value)

   const downloadAll = () => {
      setLoading(true)
      var zip = new JSZip()
      list.map(async d => {
         const blobImage = fetch(d.fileurl, {
            method: "GET",
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET, PUT, POST",
               "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
               "Accept-Encoding": "gzip, deflate, br",
               "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
               "Cache-Control": "max-age=0",
               "Connection": "keep-alive",
               "Host": "coreprintdamtest.s3-accelerate.amazonaws.com",
               "Sec-Fetch-Dest": "document",
               "Sec-Fetch-Mode": "navigate",
               "Sec-Fetch-Site": "none",
               "Sec-Fetch-User": "?1",
               "Upgrade-Insecure-Requests": "1",
            }
         })
         .then(raw => {
            if (raw.status === 200) return raw.blob()
            return Promise.reject(new Error(raw.statusText))
         })
         zip.file(d.name, blobImage)
         
         return true
      })

      zip.generateAsync({type:"blob"}).then(function(content) {
         saveAs(content, "allimages.zip")
         setLoading(false)
     })

   }

   useEffect(() => {
      const handler = setTimeout(() => dispatch(appSetSearch(debounce)), 700)
      return () => clearTimeout(handler)
   }, [debounce, dispatch])

   return (
      <div className="sticky top-0 w-full bg-white z-10 flex flex-col items-center pt-8 pb-10">
         <div className="w-1/2 flex">
            <input
               value={debounce}
               onChange={handleSearch}
               placeholder="Search something ..."
               className="w-full bg-transparent px-2 text-lg font-medium leading-10 border-0 border-b-2 focus:border-orange-500 transition-colors duration-300"
               spellCheck={false}
            />
            <button 
               onClick={downloadAll}  
               disabled={loading}
               className="bg-white hover:bg-orange-500 text-orange-500 hover:text-white px-3 py-2 border border-orange-500 rounded-lg whitespace-no-wrap ml-10 transition-colors duration-300"
            >
               {loading ? "downloading, please wait..." : "download all"}
            </button>
         </div>
         <div className="flex pt-4">
            {tags.length > 0 &&
            tags.map(tag => (
               <Tag key={tag} label={tag} />
            ))}
         </div>
      </div>
   )
}

export default Search