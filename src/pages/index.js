import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import UserProfileCard from "@/app/components/UserProfileCard";
import PostCard from "@/app/components/PostCard";
import styles from "@/app/components/components.module.css";

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
            <h2>Your Health Updates</h2>
            <div className={styles.postsContainer}>
            {allPosts.map((post, i) => (
                <PostCard post={post} key={i}/>
                ))}
            </div>
        </main>
    );
}