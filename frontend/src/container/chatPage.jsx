import { useState, useRef, useEffect, useId } from 'react';
import ReactPlayer from 'react-player';
import { AiImage, Mike, Playing } from '../assets';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import Spinner from '../assets/minnaminung.gif';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const [showMike, setShowMike] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);
  const [voices, setVoices] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [showLoader, setShowLoder] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    setId(uuidv4());
  }, []);

  const loadVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();

    // Select a female voice if available
    const femaleVoice = availableVoices.find(
      (voice) => voice.name.toLowerCase().includes('female')
      // voice.name.toLowerCase().includes('susan') ||
      // voice.name.toLowerCase().includes('zoe') ||
      // voice.lang === 'en-US' // Default to English if female not found
    );
    setVoices(femaleVoice || availableVoices[0]); // Fallback to first voice if no female found
  };

  useEffect(() => {
    // Load voices initially
    loadVoices();

    // Load voices when they change (can happen asynchronously)
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null; // Clean up the event listener
    };
  }, []);

  const handleShowMike = () => {
    setPlayVideo(false);
    setShowMike(true);
    setResponseData(null);
  };

  const handleStartRecording = async () => {
    window.speechSynthesis.cancel();
    setIsRecording(true);
    SpeechRecognition.startListening();
  };

  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    postQuestion();
  };

  const postQuestion = async (text = null) => {
    const parameters = {
      question: text || transcript,
      campaign_id: '1',
      session_id: id
      //   time: currentTime
    };
    setShowLoder(true);
    setResponseData(null);
    const response = await fetch('http://localhost:8000/qa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Specify that you're sending JSON data
      },
      body: JSON.stringify(parameters) // Convert the object to a JSON string
    });

    const data = await response.json();
    setShowLoder(false);
    setResponseData(data?.message);
    speakText(data?.message);
  };

  const speakText = (text) => {
    // Check if SpeechSynthesis is supported
    if ('speechSynthesis' in window) {
      if (voices) {
        // const speech = new SpeechSynthesisUtterance();
        // speech.text = text;
        // speech.voice = voices; // Use the selected voice
        // speech.lang = voices.lang; // Set language based on selected voice

        // // Optional: Set other speech properties
        // speech.pitch = 1; // Voice pitch
        // speech.rate = 1; // Voice rate
        // speech.volume = 1; // Volume (0 to 1)
        // speech.onend = () => {
        //   console.log('Speech has finished. Canceling...');
        //   window.speechSynthesis.cancel(); // This can be used to stop any further speech if needed
        //   setShowMike(false);
        //   setResponseData(null);
        // };

        const chunks = text.match(/.{1,200}/g); // Adjust chunk size as needed
        let index = 0; // Track the current chunk index

        const speakNextChunk = () => {
          if (index < chunks.length) {
            const speech = new SpeechSynthesisUtterance(chunks[index]);
            speech.voice = voices; // Use the selected voice
            speech.lang = voices.lang; // Set language based on selected voice

            // Optional: Set other speech properties
            speech.pitch = 1; // Voice pitch
            speech.rate = 1; // Voice rate
            speech.volume = 1; // Volume (0 to 1)
            speech.onend = () => {
              console.log(`Chunk ${index + 1} has finished.`);
              index++; // Move to the next chunk
              speakNextChunk(); // Recursively speak the next chunk
            };

            speech.onerror = (event) => {
              console.error('Speech error:', event.error);
            };

            window.speechSynthesis.speak(speech);
          } else {
            // All chunks have been spoken
            console.log('All speech has finished.');
            setShowMike(false);
            setResponseData(null); // Replace with your desired message
            setPlayVideo(true);
            handleOnVideoPlay();
          }
        };

        // Start speaking the first chunk
        speakNextChunk();

        // speech.onerror = (event) => {
        //   console.error('Speech error:', event.error);
        // };

        // window.speechSynthesis.speak(speech);
      } else {
        console.error('No valid voice selected.');
      }
    } else {
      console.error('Speech Synthesis not supported in this browser.');
    }
  };

  const handleSendQuestions = (question) => {
    postQuestion(question);
    setShowMike(true);
    setPlayVideo(false);
    window.speechSynthesis.cancel();
  };

  const handleOnProgress = (data) => {
    setCurrentTime(Math.floor(data?.playedSeconds));
    switch (Math.floor(data?.playedSeconds)) {
      case 0:
        setQuestions([
          'what all platforms are supported for video uploads? ',
          'DRM?',
          'can authenticated users record and download content?'
        ]);
        break;
      case 21:
        setQuestions([
          'explain possible customizations? ',
          'subtitles generation possible? ',
          'multiple video generation is possible?'
        ]);
        break;
      case 60:
        setQuestions([
          `different pricing plans?`,
          'any region specific streaming issues?'
        ]);
        break;
    }
  };

  const handleOnVideoPlay = () => {
    window.speechSynthesis.cancel();
    setPlayVideo(true);
    setShowMike(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[1011px] h-[569px] bg-red">
        <ReactPlayer
          controls={true}
          width="1011px"
          height="569px"
          pip={false}
          playbackRate={1}
          playing={playVideo}
          onPlay={handleOnVideoPlay}
          onProgress={handleOnProgress}
          url={'https://pic-uploadz.s3.ap-south-1.amazonaws.com/Gumlet.mp4'}
          style={{
            borderRadius: '8px',
            overflow: 'hidden'
          }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />
        {!showMike && (
          <div className="absolute inset-0 w-full pt-5 text-end h-20 z-30 ">
            <button
              className="mr-4 rounded-[74px] bg-[#395FCDD6] w-[90px] h-8 border border-white text-white text-sm font-bold text-center"
              style={{ boxShadow: '0px 5px 15px 0px rgba(32, 91, 241, 0.2)' }}
              onClick={handleShowMike}
            >
              <div className="flex">
                <AiImage className="size-[10px] ml-3 mt-[5px] mr-1" />
                Ask Me
              </div>
            </button>
          </div>
        )}
        <div className="absolute inset-0 text-start ml-4 pt-[460px] z-20 h-8 flex flex-wrap">
          {questions?.map((item) => (
            <button
              className="mr-2 rounded-[74px] bg-[#395FCDD6] w-fit pr-2 h-8 border border-white text-white text-sm text-center bg-opacity-100"
              style={{ boxShadow: '0px 5px 15px 0px rgba(32, 91, 241, 0.2)' }}
              onClick={() => handleSendQuestions(item)}
            >
              <div className="flex">
                <AiImage className="size-[10px] ml-3 mt-[5px] mr-1" />
                {item}
              </div>
            </button>
          ))}
        </div>
        {showMike && !showLoader && !responseData && (
          <div
            className={`absolute cusror-pointer inset-0 z-30 w-[1011px] h-[500px] flex justify-center pt-64 bg-gradient-to-r from-[#2246ADCC] to-[#A963A1AB] text-white 
             rounded-t-[8px] ${isRecording ? 'opacity-50' : ''}`}
          >
            <div
              className="cursor-pointer"
              onMouseDown={handleStartRecording}
              onMouseUp={handleStopRecording}
            >
              <Mike className="size-[79px]" />
            </div>
          </div>
        )}
        {showMike && showLoader && (
          <div
            className={`absolute cusror-pointer inset-0 z-30 w-[1011px] h-[500px] flex justify-center pt-52 text-white bg-gradient-to-r from-[#2246ADCC] to-[#A963A1AB]  bg-opacity-30 rounded-t-[8px] ${
              isRecording ? 'opacity-50' : ''
            }`}
          >
            <div className="flex">
              <img src={Spinner} className="size-[180px]" />
            </div>
          </div>
        )}
        {showMike && !showLoader && responseData && (
          <div
            className={`absolute cusror-pointer inset-0 z-30 w-[1011px] h-[500px] flex justify-center pt-64 text-white bg-gradient-to-r from-[#2246ADCC] to-[#A963A1AB] bg-opacity-30 rounded-t-[8px] ${
              isRecording ? 'opacity-50' : ''
            }`}
          >
            <div className="flex">
              <Playing className="size-[79px] animate-ping" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
