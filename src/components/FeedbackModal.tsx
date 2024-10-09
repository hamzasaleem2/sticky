import React, { useState, useCallback } from 'react';
import Modal from './ui/modal';
import { Button } from './ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useToast } from '../hooks/use-toast';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const submitHelpRequest = useMutation(api.support.supportRequest);
    const { toast } = useToast();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        setError('');
    }, []);

    const handleSubmit = async () => {
        if (!input.trim()) {
            setError('Please enter your feedback before submitting.');
            return;
        }

        try {
            await submitHelpRequest({ input });
            toast({
                title: "Feedback Submitted",
                description: "Thank you for your feedback! We appreciate your input.",
            });
            setInput('');
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit feedback. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Modal active={isOpen} setActive={onClose}>
            <h2 className="text-2xl font-bold mb-4 text-text dark:text-text-dark">We Value Your Feedback!</h2>
            <p className="mb-4 text-text dark:text-text-dark">Your thoughts help us improve. Share your experience or suggestions below:</p>
            <textarea
                className={`w-full mb-2 p-2 rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack text-text dark:text-text-dark ${error ? 'border-red-500' : ''}`}
                value={input}
                onChange={handleInputChange}
                placeholder="Type your feedback here..."
                rows={4}
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end">
                <Button 
                    onClick={handleSubmit} 
                    className={`bg-main hover:bg-mainAccent ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Submit Feedback
                </Button>
            </div>
        </Modal>
    );
};

export default FeedbackModal;