import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser({ createUser, isLoggedIn }) {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn) router.push("/");  
    }, [isLoggedIn]);

    return (
        <div>
            <h1>Create User</h1>
            <CreateUserForm createUser={createUser} />
        </div>
    );
}