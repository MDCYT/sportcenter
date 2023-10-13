"use client";

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal()

    useEffect(() => {
        if(session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if(!open) {
            onClose();
        }
    }

    return ( 
        <Modal 
        title="Welcome back" 
        description="Login to your account" 
        isOpen={isOpen}
        onChange={onChange}
        >
            <Auth 
            magicLink
            providers={[]}
            supabaseClient={supabaseClient} 
            theme="dark"
            redirectTo="/"
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: '#404040',
                            brandAccent: '#0063C1'
                        }
                    }
                }
            }}/>
        </Modal>
     );
}
 
export default AuthModal;