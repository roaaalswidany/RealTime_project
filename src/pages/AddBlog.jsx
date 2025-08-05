import { getDatabase, onValue, ref, set } from "firebase/database"
import { useEffect, useRef, useState } from "react"
import { config } from "../utils/firebaseConfig"
import { useNavigate } from "react-router-dom"


const AddBlog = () => {
      const [lastId, setLastId] = useState(0)
  const title = useRef(null)
  const subtitle = useRef(null)
  const content = useRef(null)
  const image = useRef(null)
  const navigate = useNavigate()
  
      useEffect(() => {
          const database = getDatabase(config)
          const collectionRef = ref(database, "lastId")
          onValue(collectionRef, (snapshot) => {
          const dataItem = snapshot.val()
              if (dataItem) {
                  const displayItem = parseInt(dataItem)
                  setLastId(displayItem)
              }
          })
      },[])

  async function sendData (event)  {
    const id = lastId !=0 ? lastId+1 : 1
    const blog = {
      id : id, 
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
    const blogCollactionRef = ref(database, `blogs/${id}`)
    const lastIdCollactionRef = ref(database, `lastId`)
    await set(blogCollactionRef, blog)
    await set(lastIdCollactionRef, id)
    navigate("/")
  }
  return (
    <form onSubmit={sendData}>
      <input type="text" placeholder="title" ref={title}/>
      <input type="text" placeholder="subtitle" ref={subtitle} />
      <input type="text" placeholder="image url" ref={image} />
      <textarea placeholder="content" ref={content}></textarea>
      <input type="submit" value= "add" />
    </form>
  )
}

export default AddBlog
