import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import CreatePostForm from "@/app/components/createPostForm";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes
} from "firebase/storage";

export default function CreatePost({ isLoggedIn, userInformation  }) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) router.push("/");  
    }, [isLoggedIn]);

    // Create function to create a post
    const createPostFunction = useCallback(
        async(e, imageUpload) => {
        e.preventDefault();
        const storage = getStorage();
        const db = getFirestore();
        const postContent = e.currentTarget.postContent.value;
        let imageURL;
        const storageRef = ref(storage, imageUpload?.name);
        if(imageUpload) {
            await uploadBytes(storageRef, imageUpload)
            .then(async (snapshot) => {
                await getDownloadURL (snapshot.ref)
                .then((url) => {
                    imageURL = url;
                });
            })
            .catch((error) => {
                console.warn(error);
            });
        }
        
        // Get user information to link post to user
        const userId = userInformation.uid;
        // Send post to firebase with addDoc
        //const db = getFirestore();
        const data = await addDoc(collection(db, "posts"), {
            postContent: postContent,
            userId: userId, 
            imageURL: imageURL || '',

        });
        // Re-route the user away from createPost
        if(data) {
            router.push("/");
        }
    }, [addDoc, collection, getFirestore, router, userInformation]);

    return (
        <main>
            <h1>Create Post</h1>
            <CreatePostForm createPostFunction={createPostFunction}/>
        </main>
    );
}