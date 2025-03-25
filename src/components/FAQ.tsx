
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-100 py-4 faq-item" onClick={onClick}>
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-800">{question}</h4>
        <button className="text-gray-400 p-1">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div 
        className={`accordion-content ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        data-state={isOpen ? 'open' : 'closed'}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 text-sm mt-2">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "Where can I pay through MB Pay?",
      answer: "You can pay to any pharmacy, hospital, clinic, Lab or diagnostic center in India."
    },
    {
      question: "Why is MB Pay better than UPI apps?",
      answer: "MB Pay offers specialized healthcare rewards, easy invoice management, and exclusive healthcare deals that regular UPI apps don't provide."
    },
    {
      question: "What if my provider is not listed on your app?",
      answer: "You can still make a payment by adding them manually. Just share their contact details, and we'll add them to our network."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
