import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/Card";
import { AiIcon } from "../../assets/icons";
import Button from "../../components/Button/Button";
import { aiSuggestions } from "./consts";

const AiSuggestionsCard = ({ className }) => {
  const [fullText, setFullText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const textareaRef = useRef();

  const fetchSuggestions = () => {
    fetch("http://localhost:8000/suggestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/text",
      },
      body: "",
    })
      .then((response) => {
        if (typeof response !== "string") {
          setFullText(aiSuggestions);
        } else {
          setFullText(response);
        }
      })
      .catch(() => {
        setFullText(aiSuggestions);
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
          className="px-2 border-[#E69824] text-[#E69824] opacity-50"
        >
          Generate campaign video
        </Button>
      </div>
    </Card>
  );
};

export default AiSuggestionsCard;
