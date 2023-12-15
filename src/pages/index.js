import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import UserProfileCard from "@/app/components/UserProfileCard";
import PostCard from "@/app/components/PostCard";

export default function Dashboard({ isLoggedIn }) {
    const router = useRouter();
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        // if user in not logged in, send them to login page
        if (!isLoggedIn) router.push("/login");
    }, [isLoggedIn]);

    useEffect(() => {
        async function getAllPosts() {
            const postsArray = [];
            const db = getFirestore();
            const postsQuery = await getDocs(collection(db, "posts"));
            
            postsQuery.forEach((post) => {
                postsArray.push({ id: post.id, ...post.data()});
            });
            setAllPosts(postsArray);
        }
        getAllPosts();
    }, []);

    return (
        <main>
            <h1>Dashboard</h1>
            {allPosts.map((post, i) => (
                <PostCard post={post} key={i}/>
            ))}
        </main>
    );
}