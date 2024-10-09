import React from 'react';
import Accordion from '../ui/accordion';

const FAQSection: React.FC = () => {
  const faqs = [
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
    <section id="faq" className="px-4 py-16 bg-white dark:bg-darkBg">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-text dark:text-text-dark">
                FAQ
            </h2>
            <div className="space-y-4 flex flex-col items-center">
                {faqs.map((faq, index) => (
                    <Accordion
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        className="w-full"
                    />
                ))}
            </div>
        </div>
    </section>
)
}

export default FAQSection;