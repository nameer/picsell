import { useState, useRef, useEffect, useId } from 'react';
import ReactPlayer from 'react-player';
import { AiImage, Mike, Playing } from '../assets';
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition';
import CircularProgress from '@mui/material/CircularProgress';

const questions = 'what are the pricing plans ?';

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
  const [question, setQuestion] = useState('scratch pads for quick jots?');
  const id = useId();

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

  const postQuestion = async () => {
    const parameters = {
      question: transcript,
      campaign_id: '1',
      session_id: id
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
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.voice = voices; // Use the selected voice
        speech.lang = voices.lang; // Set language based on selected voice

        // Optional: Set other speech properties
        speech.pitch = 1; // Voice pitch
        speech.rate = 1; // Voice rate
        speech.volume = 1; // Volume (0 to 1)
        speech.onend = () => {
          console.log('Speech has finished. Canceling...');
          window.speechSynthesis.cancel(); // This can be used to stop any further speech if needed
          setShowMike(false);
        };

        speech.onerror = (event) => {
          console.error('Speech error:', event.error);
        };

        window.speechSynthesis.speak(speech);
      } else {
        console.error('No valid voice selected.');
      }
    } else {
      console.error('Speech Synthesis not supported in this browser.');
    }
  };

  const handleSendQuestions = (question) => {};

  const handleOnProgress = (data) => {
    console.log(Math.floor(data?.playedSeconds));
    switch (Math.floor(data?.playedSeconds)) {
      case 10:
        setQuestion('scratch pads for quick jots? ');
        break;
      case 24:
        setQuestion('Search for absolutely anything? ');
        break;
      case 30:
        setQuestion('easy task management by assigning to team members ');
        break;
      case 35:
        setQuestion("Can I give my todo's a priority boost!!? ");
        break;
      case 44:
        setQuestion('tasks have notes context?? ');
        break;
      case 50:
        setQuestion('Hmm....Can I create recurring tasks?? ');
        break;
      case 55:
        setQuestion('what all documents can be included in notes?');
        break;
      case 66:
        setQuestion('custom timer for reminders ?? ');
        break;
      case 72:
        setQuestion('add multiple calenders?? ');
        break;
      case 80:
        setQuestion('customisable home dashboard ');
        break;
    }
  };

  console.log(question);

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
          url={'https://pic-uploadz.s3.ap-south-1.amazonaws.com/evernote.mp4'}
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
              className="mr-4 rounded-[74px] bg-[#395FCDD6] w-[82px] h-8 border border-white text-white text-sm font-bold text-center"
              style={{ boxShadow: '0px 5px 15px 0px rgba(32, 91, 241, 0.2)' }}
              onClick={handleShowMike}
            >
              <div className="flex">
                <AiImage className="size-[10px] ml-3 mt-[5px] mr-1" />
                Ask AI
              </div>
            </button>
          </div>
        )}
        <div className="absolute inset-0 text-start pt-[460px] ml-4 z-20 h-8">
          <button
            className="mr-4 rounded-[74px] bg-[#395FCDD6] w-fit pr-2 h-8 border border-white text-white text-sm text-center"
            style={{ boxShadow: '0px 5px 15px 0px rgba(32, 91, 241, 0.2)' }}
            onClick={handleSendQuestions}
          >
            <div className="flex">
              <AiImage className="size-[10px] ml-3 mt-[5px] mr-1" />
              {question}
            </div>
          </button>
        </div>
        {showMike && !showLoader && !responseData && (
          <div
            className={`absolute cusror-pointer inset-0 z-30 w-[1011px] h-[500px] flex justify-center pt-64 text-white bg-black bg-opacity-30 rounded-t-[8px] ${
              isRecording ? 'opacity-50' : ''
            }`}
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
            className={`absolute cusror-pointer inset-0 z-30 w-[1011px] h-[500px] flex justify-center pt-64 text-white bg-black bg-opacity-30 rounded-t-[8px] ${
              isRecording ? 'opacity-50' : ''
            }`}
          >
            <div className="flex">
              <CircularProgress sx={{ color: 'white' }} size={70} />
            </div>
          </div>
        )}
        {showMike && !showLoader && responseData && (
          <div
            className={`absolute cusror-pointer inset-0 z-30 w-[1011px] h-[500px] flex justify-center pt-64 text-white bg-black bg-opacity-30 rounded-t-[8px] ${
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
