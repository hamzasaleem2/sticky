import { SignIn } from "@clerk/clerk-react";
import Logo from "../components/logo";
import { dark } from "@clerk/themes";
import { useState, useEffect } from "react";
import posthog from "posthog-js";

function Signin() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#121212]">
                <Logo className="h-16 w-16" />
            </div>
        );
    }
    posthog.capture('signin page', { property: 'visit' })
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212]">
            <div className="p-8 rounded-lg w-full max-w-md">
                <SignIn
                    appearance={{
                        baseTheme: dark
                    }}
                    forceRedirectUrl={"/boards"}
                    signUpForceRedirectUrl={"/boards"}
                    signUpUrl="/signup"
                />
            </div>
        </div>
    );
}

export default Signin;