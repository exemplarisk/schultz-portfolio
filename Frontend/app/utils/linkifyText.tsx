import React from "react";

interface LinkDictionary {
  [key: string]: string;
}

interface LinkifyTextProps {
  text: string;
  links: LinkDictionary;
}

export const linkifyText: React.FC<LinkifyTextProps> = ({ text, links }) => {
    
  const linkKeys = Object.keys(links).join("|");
  const regex = new RegExp(`\\b(${linkKeys})\\b`, "g");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        if (Object.keys(links).includes(part)) {
          return (
            <a
              key={index}
              href={links[part]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </a>
          );
        } else {
          return <React.Fragment key={index}>{part}</React.Fragment>;
        }
      })}
    </>
  );
};