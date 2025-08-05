import { useEffect, useState } from "react"
import { config } from "../utils/firebaseConfig"
import { getDatabase, onValue, ref} from "firebase/database"
import { Link } from "react-router-dom"


const AllBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [isloading, setIsloading] = useState(false)
    useEffect(() => {
        setIsloading(true)
        const database = getDatabase(config)
        const collectionRef = ref(database, "blogs")
        onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val()
            if (dataItem) {
                const displayItem = Object.values(dataItem)
                setBlogs(displayItem)
                setIsloading(false)
            }
        })
        setIsloading(false)
    },[])

    return (
    <div>
        <h1>all blogs</h1> 
        <Link to= "/add">add blog</Link>
        {isloading? <p>loading...</p>
        : 
        blogs.length > 0 ?
        blogs.map(blog =>{
        return (
            <div key={blog.id}>
                <img src= {blog.image} alt="" />
                <h1>{blog.title}</h1>
                <h2>{blog.subtitle}</h2>
                <p>{blog.content}</p>
                <Link to = {`edit/${blog.id}`}>edit</Link>
                <Link to = {`show/${blog.id}`}>show</Link>
            </div>
        )
        })
        :
        <p>there is no blogs</p>
    }
    </div>
    )
}

export default AllBlogs
