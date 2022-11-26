import React, { useState, useContext } from "react";
import { BaseContext } from "@/contexts/BaseContext";
import { Card } from "@/components/Card";

export const List = () => {
  const { creators } = useContext(BaseContext);
  const [list, setList] = useState();
  return (
    <ul className="flex w-full flex-wrap justify-center gap-5">
      {creators.length > 0 &&
        creators.map((creator, index) => (
          <div key={index} className="w-full max-w-lg">
            {creator.username && (
              <li key={creator.username}>
                <Card id={creator.username} creator={creator} />
              </li>
            )}
          </div>
        ))}
    </ul>
  );
};
