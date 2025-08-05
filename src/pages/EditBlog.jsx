import { getDatabase, onValue, ref, update } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import { config } from "../utils/firebaseConfig"
import { useNavigate, useParams } from "react-router-dom"


const EditBlog = () => {
  const [oldBlog, setOldBlog] = useState({})
  const title = useRef(null)
  const subtitle = useRef(null)
  const content = useRef(null)
  const image = useRef(null)
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

  async function sendData (event)  {
    const blog = {
      id : oldBlog.id, 
      image : image.current.value,
      title : title.current.value,
      subtitle : subtitle.current.value,
      content : content.current.value,
    }
    event.preventDefault()
    console.log({
      image : image.current.value,
      title : title.current.value,
      subtitle : subtitle.current.value,
      content : content.current.value,
    })
    const database = getDatabase(config) 
    const blogCollactionRef = ref(database, `blogs/${oldBlog.id}`)
    await update(blogCollactionRef, blog)
    navigate("/")
  }
  return (
    <form onSubmit={sendData}>
      <input type="text" placeholder="title" ref={title} defaultValue={oldBlog.title}/>
      <input type="text" placeholder="subtitle" ref={subtitle} defaultValue={oldBlog.subtitle}/>
      <input type="text" placeholder="image url" ref={image} defaultValue={oldBlog.image}/>
      <textarea placeholder="content" ref={content} defaultValue={oldBlog.content}></textarea>
      <input type="submit" value= "add" />
    </form>
  )
}

export default EditBlog
