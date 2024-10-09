import React, { useState, useCallback } from 'react';
import Modal from './ui/modal';
import { Button } from './ui/button';
import Input from './ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useToast } from '../hooks/use-toast';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const submitHelpRequest = useMutation(api.support.supportRequest);
    const { toast } = useToast();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setError('');
    }, []);

    const handleSubmit = async () => {
        if (!input.trim()) {
            setError('Please enter a question before submitting.');
            return;
        }

        try {
            await submitHelpRequest({ input });
            toast({
                title: "Help Request Submitted",
                description: "We've received your question and will get back to you soon!",
            });
            setInput('');
            onClose();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit help request. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Modal active={isOpen} setActive={onClose}>
            <h2 className="text-2xl font-bold mb-4 text-text dark:text-text-dark">Need Help?</h2>
            <p className="mb-4 text-text dark:text-text-dark">Ask your question below, and we'll get back to you as soon as possible!</p>
            <Input
                className={`w-full mb-2 ${error ? 'border-red-500' : ''}`}
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question here..."
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end">
                <Button 
                    onClick={handleSubmit} 
                    className={`bg-main hover:bg-mainAccent ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Submit Question
                </Button>
            </div>
        </Modal>
    );
};

export default HelpModal;