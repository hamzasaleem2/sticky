import { SignUp } from "@clerk/clerk-react";
import Logo from "../components/logo";
import { dark } from "@clerk/themes";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Signup() {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedPlan = searchParams.get('plan') || 'free';

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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212]">
            <div className="p-8 rounded-lg w-full max-w-md">
                <SignUp
                    appearance={{
                        baseTheme: dark
                    }}
                    forceRedirectUrl={`/onboarding?plan=${selectedPlan}`}
                    signInForceRedirectUrl={"/boards"}
                    signInUrl="/signin"
                    fallbackRedirectUrl={`/onboarding?plan=${selectedPlan}`}
                />
            </div>
        </div>
    );
}

export default Signup;