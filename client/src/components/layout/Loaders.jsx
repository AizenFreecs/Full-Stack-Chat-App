import React from "react";
import { Skeleton } from "../ui/skeleton";

const LayoutLoader = () => {
  return (
    <div className="flex mt-[14rem] justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="240" height="240">
        <radialGradient
          id="a12"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor="#2848FF"></stop>
          <stop offset=".3" stopColor="#2848FF" stopOpacity=".9"></stop>
          <stop offset=".6" stopColor="#2848FF" stopOpacity=".6"></stop>
          <stop offset=".8" stopColor="#2848FF" stopOpacity=".3"></stop>
          <stop offset="1" stopColor="#2848FF" stopOpacity="0"></stop>
        </radialGradient>
        <circle
          transform-origin="center"
          fill="none"
          stroke="url(#a12)"
          strokeWidth="23"
          strokeLinecap="round"
          strokeDasharray="200 1000"
          strokeDashoffset="0"
          cx="100"
          cy="100"
          r="70"
        >
          <animateTransform
            type="rotate"
            attributeName="transform"
            calcMode="spline"
            dur="2"
            values="360;0"
            keyTimes="0;1"
            keySplines="0 0 1 1"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          transform-origin="center"
          fill="none"
          opacity=".2"
          stroke="#2848FF"
          strokeWidth="23"
          strokeLinecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>
    </div>
  );
};

const TypingLoader = () => {
  return (
    <div id="typing-indicator" className=" flex items-center justify-center">
      <div className="typing-dot dot1 bg-green-500 h-2 w-2 rounded-full mx-1 animate-bounce"></div>
      <div className="typing-dot dot2 bg-green-500 h-2 w-2 rounded-full mx-1 animate-bounce animation-delay-200"></div>
      <div className="typing-dot dot3 bg-green-500 h-2 w-2 rounded-full mx-1 animate-bounce animation-delay-400"></div>
    </div>
  );
};

export { LayoutLoader, TypingLoader };
