import { useState } from "react";
import styles from "./components.module.css";

const CreatePostForm = ({ createPostFunction }) => {
    const [imageUpload, setImageUpload] = useState();
    return (
        <div>
            <h2>Update Your Support Circle</h2>
            <form className={styles.Form} 
            onSubmit={(e) => createPostFunction(e, imageUpload)}>

                <label htmlFor="postContent">Post New Health Update</label>
                <input type="text" id="postContent" name="postContent" placeholder="Start a new health update..."/>

                <label htmlFor="image">Image</label>
                <input 
                type="file" 
                id="image" 
                name="image"
                placeholder="Choose image" 
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                }} />

                <button type="submit">Share Update</button>
            </form>
        </div>
    )
}
export default CreatePostForm;