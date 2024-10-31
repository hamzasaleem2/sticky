import React from 'react';
import Accordion from '../ui/accordion';
import { useHalloween } from '../../providers/halloween-provider';

const FAQSection: React.FC = () => {
    const { isHalloweenMode } = useHalloween();

    const faqs = isHalloweenMode ? [
        {
            question: "What dark magic is Sticky?",
            answer: "Sticky is a haunted digital parchment that captures your spectral thoughts and cursed ideas in an otherworldly realm."
        },
        {
            question: "How does this supernatural force work?",
            answer: "Through ancient rituals, Sticky allows you to manifest ethereal notes that float and dance across your digital void. Summon fellow spirits for real-time haunted collaboration perfect for ghostly brainstorming."
        },
        {
            question: "Is there a cursed free version?",
            answer: "Indeed! Our Spectral Starter plan includes haunted notes, spirit synchronization, and ouija board support. For more dark powers, venture into our Phantom Pro plan."
        },
        {
            question: "Can I conjure Sticky across different vessels?",
            answer: "Absolutely! Sticky's dark energy flows through all your devices, allowing you to channel your notes from any cursed computer, haunted tablet, or possessed smartphone."
        },
        {
            question: "Are my supernatural secrets safe?",
            answer: "Your mystical manuscripts are protected by powerful encryption spells and stored in our cursed cloud vault. We never share your arcane knowledge with other dimensional beings."
        }
    ] : [
        {
            question: "What is Sticky?",
            answer: "Sticky is a digital sticky note app that helps you organize your thoughts, ideas, and tasks in a visual and intuitive way."
        },
        {
            question: "How does Sticky work?",
            answer: "Sticky allows you to create virtual sticky notes that you can organize, resize, and move around on a digital canvas. You can collaborate with others in real-time, making it perfect for brainstorming and project planning."
        },
        {
            question: "Is there a free version of Sticky?",
            answer: "Yes! We offer a free Sticky Starter plan that includes 50 sticky notes, cloud sync, and email support. For more features, check out our Sticky Pro plan."
        },
        {
            question: "Can I use Sticky on multiple devices?",
            answer: "Absolutely! Sticky syncs across all your devices, so you can access your notes on your computer, tablet, or smartphone."
        },
        {
            question: "Is my data secure with Sticky?",
            answer: "We take data security seriously. All your notes are encrypted and stored securely in the cloud. We never share your data with third parties."
        }
    ];

    return (
        <section id="faq" className={`px-4 py-16 ${
            isHalloweenMode ? 'bg-halloween-black/90' : 'bg-white dark:bg-darkBg'
        }`}>
            <div className="max-w-3xl mx-auto">
                <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 ${
                    isHalloweenMode ? 'text-halloween-orange' : 'text-text dark:text-text-dark'
                }`}>
                    {isHalloweenMode ? 'Supernatural Inquiries' : 'FAQ'}
                </h2>
                <div className="space-y-4 flex flex-col items-center">
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            className={`w-full ${
                                isHalloweenMode ? 'halloween-accordion' : ''
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;