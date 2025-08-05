import { getDatabase, onValue, ref, remove } from "firebase/database"
import { useNavigate, useParams } from "react-router-dom"
import { config } from "../utils/firebaseConfig"
import { useEffect, useState } from "react"


const ShowBlog = () => {
    const [oldBlog, setOldBlog] = useState({})
    const navigate = useNavigate()
      const params = useParams()
  
      useEffect(() => {
          const database = getDatabase(config)
          const collectionRef = ref(database, `blogs/${params.id}`)
          onValue(collectionRef, (snapshot) => {
          const dataItem = snapshot.val()
              if (dataItem) {
                  setOldBlog(dataItem)
              }
          })
      },[params.id])
    async function deleteBlog  () {      
        const database = getDatabase(config)
        const collectionRef = ref(database, `blogs/${params.id}`)
        await remove(collectionRef)
        navigate("/")
    }

  return (
    <div>
      <img src={oldBlog.image} alt="" />
      <h1>{oldBlog.title}</h1>
      <h2>{oldBlog.subtitle}</h2>
      <p>{oldBlog.content}</p>
      <button onClick={deleteBlog}>delete</button>
    </div>
  )
}

export default ShowBlog
