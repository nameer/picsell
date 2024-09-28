import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { AiIcon } from "../../assets/icons";
import Button from "../../components/Button/Button";
import { aiSuggestions } from "./consts";
import Spinner from "../../components/Spinner";

const AiSuggestionsCard = ({ className, campaignId }) => {
  const [fullText, setFullText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const textareaRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/campaigns/${campaignId}/suggestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: "string",
      }),
    })
      .then((response) => {
        if (typeof response.suggestion !== "string") {
          setFullText(aiSuggestions);
        } else {
          setFullText(response.suggestion);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setFullText(aiSuggestions);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  useEffect(() => {
    if (typeof fullText === "string" && fullText.length) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayText(fullText.slice(0, i));
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        i++;
        if (i > fullText.length) {
          clearInterval(intervalId);
        }
      }, 10);
      return () => clearInterval(intervalId);
    }
  }, [fullText]);

  return (
    <Card className={className} title="AI SUGGESTIONS" icon={<AiIcon />}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          className="w-full h-96 border border-[#F3E8C9] bg-[#FFF9EA80] p-3 rounded-lg mb-3"
          value={displayText}
          disabled
        ></textarea>
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner className="size-10" />
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          icon={<AiIcon />}
          color="secondary"
          className="px-2 border-[#E69824] text-[#E69824] opacity-50"
        >
          Generate campaign video
        </Button>
      </div>
    </Card>
  );
};

export default AiSuggestionsCard;
