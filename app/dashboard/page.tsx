"use client"

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";


export default function Dashboard() {
    const router = useRouter();
    async function handleLogout() {
        try {
            const res = await signOut(auth);
            console.log("Signout successfully: ", res);
            router.push("/");
        } catch (error) {
            console.log("Error in logout: ", error);
            throw error;
        }
    }
    return (
        <div>
            <div>Welocome!</div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}