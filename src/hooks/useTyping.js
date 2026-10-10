import { useState, useEffect, useRef } from "react";

export function useTyping(texts, options = {}) {
  const { typeSpeed = 70, deleteSpeed = 40, pauseTime = 1400 } = options;
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const currentText = texts[textIndex] || "";

  useEffect(() => {
    if (isDeleting) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      timeoutRef.current = setTimeout(() => {
        setDisplayText((prev) => currentText.slice(0, prev.length + 1));
      }, typeSpeed);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentText, typeSpeed, deleteSpeed]);

  useEffect(() => {
    if (!isDeleting && displayText === currentText) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentText, pauseTime, texts.length]);

  return displayText;
}