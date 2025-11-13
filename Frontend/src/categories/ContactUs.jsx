import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeaderLink from '../components/HeaderLink';

const IconMail = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

const IconHand = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.875 1.5l-4.875 4.875m0 0h13.5m-13.5 0V21m0-14.625h13.5m-13.5 0v14.625m0-14.625L3 1.5m0 0l4.875 4.875M12 21v-8.25m0 0a3.75 3.75 0 00-3.75-3.75H6m3.75 3.75a3.75 3.75 0 013.75-3.75h1.5m-5.25 3.75v8.25m5.25-8.25v8.25m0 0a3.75 3.75 0 003.75 3.75h1.5M12 21a3.75 3.75 0 003.75-3.75v-8.25"
    />
  </svg>
);

const IconDocument = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

/* --- Main Contact Section --- */
const ContactSection = ({ showFeedbackForm, setShowFeedbackForm }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({ eventName: '', date: '', description: '', contactEmail: '' });
  const [isRequestSubmitted, setIsRequestSubmitted] = useState(false);

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinData, setJoinData] = useState({ name: '', email: '', position: '', message: '' });
  const [isJoinSubmitted, setIsJoinSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { feedback, email });
    setIsSubmitted(true);
    setFeedback('');
    setEmail('');
    setTimeout(() => {
      setShowFeedbackForm(false);
      setIsSubmitted(false);
    }, 3000);
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    console.log('Request Coverage submitted:', requestData);
    setIsRequestSubmitted(true);
    setRequestData({ eventName: '', date: '', description: '', contactEmail: '' });
    setTimeout(() => {
      setShowRequestForm(false);
      setIsRequestSubmitted(false);
    }, 3000);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    console.log('Join the Herald submitted:', joinData);
    setIsJoinSubmitted(true);
    setJoinData({ name: '', email: '', position: '', message: '' });
    setTimeout(() => {
      setShowJoinForm(false);
      setIsJoinSubmitted(false);
    }, 3000);
  };

  return (
    // We'll use a CSS gradient for the background to mimic the image.
    // Note: Tailwind doesn't do complex gradients by default,
    // so we use arbitrary properties `bg-[radial-gradient(...)]`
    <div className="w-full bg-[#EBF0F3]">

      {/* 1. Top Banner */}
       <div className="bg-news-bg bg-cover bg-center h-20" style={{
          backgroundImage: `linear-gradient(to right, #2a5a82 20%, rgba(42,90,130,0.2)), url('/src/assets/images/bg.jpg' )`
        }}>
          <h1 className="text-5xl font-bold text-white justify-center flex items-center h-full md-8">CONTACT US</h1>
        </div>
      {/* 2. Main Content Area */}
      <div className="max-w-4xl px-6 py-16 mx-auto text-center">

        {/* Text Content */}
        <h3 className="text-3xl font-semibold text-[#30577E] mb-4">
          Do you have any ideas you would like to share with La Verdad Herald?
        </h3>
        <p className="max-w-3xl mx-auto text-base text-gray-700">
          Do you know any upcoming event that you would like La Verdad Herald to cover? Do you have any ideas you want to share? Do you want to be part of La Verdad Herald? Click on buttons below to apply.
        </p>

        {/* Feedback Form */}
        {showFeedbackForm && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto animate-fade-in">
            <h4 className="text-xl font-semibold text-cyan-800 mb-4">Send Feedback</h4>
            {isSubmitted ? (
              <div className="text-center text-green-600 font-medium">
                Thank you for your feedback!
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="mb-4">
                  <label htmlFor="feedback" className="block text-gray-700 text-sm font-medium mb-2">
                    Your Feedback:
                  </label>
                  <textarea
                    id="feedback"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    rows="4"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Send Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Request Coverage Form */}
        {showRequestForm && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto animate-fade-in">
            <h4 className="text-xl font-semibold text-cyan-800 mb-4">Request Coverage</h4>
            {isRequestSubmitted ? (
              <div className="text-center text-green-600 font-medium">
                Thank you for your request!
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit}>
                <div className="mb-4">
                  <label htmlFor="eventName" className="block text-gray-700 text-sm font-medium mb-2">
                    Event Name:
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={requestData.eventName}
                    onChange={(e) => setRequestData({ ...requestData, eventName: e.target.value })}
                    placeholder="Enter event name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={requestData.date}
                    onChange={(e) => setRequestData({ ...requestData, date: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    rows="3"
                    value={requestData.description}
                    onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
                    placeholder="Describe the event..."
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="contactEmail" className="block text-gray-700 text-sm font-medium mb-2">
                    Contact Email:
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={requestData.contactEmail}
                    onChange={(e) => setRequestData({ ...requestData, contactEmail: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Request Coverage
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Join the Herald Form */}
        {showJoinForm && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto animate-fade-in">
            <h4 className="text-xl font-semibold text-cyan-800 mb-4">Join the Herald</h4>
            {isJoinSubmitted ? (
              <div className="text-center text-green-600 font-medium">
                Thank you for your application!
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={joinData.name}
                    onChange={(e) => setJoinData({ ...joinData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="joinEmail" className="block text-gray-700 text-sm font-medium mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="joinEmail"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={joinData.email}
                    onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="position" className="block text-gray-700 text-sm font-medium mb-2">
                    Position Interested In:
                  </label>
                  <input
                    type="text"
                    id="position"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={joinData.position}
                    onChange={(e) => setJoinData({ ...joinData, position: e.target.value })}
                    placeholder="e.g., Writer, Photographer"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-2">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    rows="3"
                    value={joinData.message}
                    onChange={(e) => setJoinData({ ...joinData, message: e.target.value })}
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Join the Herald
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 3. Button Grid */}
        {!showFeedbackForm && !showRequestForm && !showJoinForm && (
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-8">

            {/* Card 1: Request Coverage */}
            <button
              onClick={() => setShowRequestForm(true)}
              className="flex flex-col items-center justify-center p-8 transition bg-[#3E668A] rounded-lg shadow-lg text-white/90 hover:bg-[#30577E] hover:scale-105"
            >
              <IconMail className="w-20 h-20 mb-4" />
              <span className="text-lg font-semibold">Request Coverage</span>
            </button>

            {/* Card 2: Send Feedback */}
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="flex flex-col items-center justify-center p-8 transition bg-[#3E668A] rounded-lg shadow-lg text-white/90 hover:bg-[#30577E] hover:scale-105"
            >
              <IconHand className="w-20 h-20 mb-4" />
              <span className="text-lg font-semibold">Send Feedback</span>
            </button>

            {/* Card 3: Join the Herald */}
            <button
              onClick={() => setShowJoinForm(true)}
              className="flex flex-col items-center justify-center p-8 transition bg-[#3E668A] rounded-lg shadow-lg text-white/90 hover:bg-[#30577E] hover:scale-105"
            >
              <IconDocument className="w-20 h-20 mb-4" />
              <span className="text-lg font-semibold">Join the Herald</span>
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

/* --- Example Usage --- */
export default function ContactUs() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeaderLink />

      <main className="grow">
        <ContactSection showFeedbackForm={showFeedbackForm} setShowFeedbackForm={setShowFeedbackForm} />
      </main>

      <Footer />
    </div>
  );
}
