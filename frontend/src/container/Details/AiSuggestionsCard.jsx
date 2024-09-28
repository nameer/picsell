import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { AiIcon } from "../../assets/icons";
import Button from "../../components/Button/Button";

const AiSuggestionsCard = ({ className, aiSuggestions }) => {
  const [displayText, setDisplayText] = useState("");
  const textareaRef = useRef();

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayText(aiSuggestions.slice(0, i));
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;

      i++;

      if (i > aiSuggestions.length) {
        clearInterval(intervalId);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [aiSuggestions]);

  return (
    <Card className={className} title="AI SUGGESTIONS" icon={<AiIcon />}>
      <textarea
        ref={textareaRef}
        className="w-full h-96 border border-[#F3E8C9] bg-[#FFF9EA80] p-3 rounded-lg mb-3"
        value={displayText}
        disabled
      ></textarea>
      <div className="flex justify-end">
        <Button
          icon={<AiIcon />}
          color="secondary"
          className="px-2 border-[#E69824] text-[#E69824]"
        >
          Generate campaign video
        </Button>
      </div>
    </Card>
  );
};

export default AiSuggestionsCard;
