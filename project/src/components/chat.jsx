import React, { useState } from "react";
import '../styles/chat.css';


const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");

const options=[
  "appointment",
  "hospital timing",
  "emergency",
  "services",
  "location",
  "insurance",
  "online-payment",
  "consultation charges"

]

  const rules = {
  
    "appointment": "You can direct book an appointment from given form ",
    "hospital timing": "Our hospital is open Monday to Saturday, 8:00 AM - 8:00 PM. Emergency services are available 24/7.",
    "emergency": "For emergencies, please call our helpline at 123-456-7890.",
    "services": "We offer General Checkups, Specialist Consultations, and more.",
    "location": "Vadodara Gujarat India",
    "insurance": "Yes, we accept major insurance providers",
    "online-payment": "Yes, we accept online payments via credit/debit cards, UPI, and mobile wallets. Payment details will be provided at the time of booking",
    "consultation charges": "Consultation fees vary by doctor and specialization. General consultations start from 500rs. Please check with the reception for exact pricing.",
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, sender: "user" };
    setMessages([...messages, userMessage]);

    // Find matching response
    let response = "I'm sorry, I didn't understand that.";
    Object.keys(rules).forEach((key) => {
      if (userInput.toLowerCase().includes(key)) {
        response = rules[key];
      }
    });

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: "bot" },
      ]);
    }, 500);

    setUserInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
      <select
  className="custom-select"
  name="type"
  value={userInput}
  onChange={(e) => setUserInput(e.target.value)}
  onClick={handleSend}
  required
>
  <option value="">Select Message</option>
  {options.map(type => (
    <option  key={type} value={type}>{type}</option>
  ))}
</select>


        {/* <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        /> */}
        {/* <button onClick={handleSend}>Send</button> */}
      </div>
    </div>
  );
};

export default Chatbot;
