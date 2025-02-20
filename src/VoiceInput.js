import React, { useState } from 'react';
import './App.css';

const VoiceInput = ({ addItem }) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      addItem(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div>
      <button className='voiceInput' onClick={handleVoiceInput} disabled={isListening}>
        {isListening ? 'Listening...' : 'Add Item by Voice'}
      </button>
    </div>
  );
};

export default VoiceInput;