import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Logo from '../components/logo';

const Onboarding: React.FC = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedPlan = searchParams.get('plan') || 'free';

    const storePlan = useMutation(api.users.storePlan);

    useEffect(() => {
        const saveUserPlan = async () => {
            if (user) {
                await storePlan({ plan: selectedPlan });
                navigate('/boards');
            }
        };

        saveUserPlan();
    }, [user, selectedPlan, storePlan, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212]">
            <Logo className="h-16 w-16" />
            <p className="text-white ml-4">Setting up your stickies...</p>
        </div>
    );
};

export default Onboarding;