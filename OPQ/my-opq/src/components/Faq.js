import React, { useState } from 'react';

const Faq = () => {
  const faqData = {
    frequentQuestions: [
      { question: 'What is the duration of the course?', answer: 'The course duration varies depending on the specific course you choose. Please check the course details for more information.' },
      { question: 'Can I join the course at any time?', answer: 'Yes, you can join the course at any time. However, it is recommended to start at the beginning of a new session for a better learning experience.' }
    ],
    generalQuestions: [
      { question: 'Do I need any prior experience to join?', answer: 'No prior experience is required. Our courses are designed to accommodate both beginners and advanced learners.' },
      { question: 'How can I contact support?', answer: 'You can contact support via email at support@example.com or through the contact form on our website.' }
    ],
    placementQuestions: [
      { question: 'Does the course include placement assistance?', answer: 'Yes, we provide placement assistance to help you find job opportunities after completing the course.' },
      { question: 'What companies do you have partnerships with?', answer: 'We have partnerships with several top companies in the industry. Please contact us for more details.' }
    ]
  };

  const FAQSection = ({ title, faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleOpen = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="space-y-4 mt-12">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                className="text-lg font-semibold w-full text-left flex items-center justify-between"
                onClick={() => toggleOpen(index)}
              >
                {faq.question}
                <span className={`ml-2 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  &#9660;
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h1>
          <ol className="breadcrumb text-center">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">FAQ</li>
          </ol>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 mt-16">
        <FAQSection title="Frequent Questions" faqs={faqData.frequentQuestions} />
        <FAQSection title="General Questions" faqs={faqData.generalQuestions} />
        <FAQSection title="Placement Questions" faqs={faqData.placementQuestions} />
      </div>
    </div>
  );
};

export default Faq;
