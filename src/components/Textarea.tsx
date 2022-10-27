import React, { useState, ReactNode } from "react";
import { Count } from "./Count";

type Props = {
  id?: string;
  text?: string;
  setText: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeholder?: string;
  required: boolean;
  // onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  value?: string;
};

/*使用例（コピペ用）
<Textarea
  property="default"
  autoComplete=""
  placeholder="テキストエリア"
  required={true}
  onChange={(event) => setContent(event.target.value)}
  addClass = ""
/>
*/
export const Textarea = ({
  id,
  required = false,
  maxLength,
  text,
  setText,
  ...props
}: Props) => {
  const [count, setCount] = useState<number>(0);
  const countHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length);
  };
  return (
    <>
      <div className={`relative`}>
        <textarea
          id={id}
          {...props}
          className={`w-full rounded px-5 py-2 min-h-[150px]`}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            countHandler(e);
          }}
          maxLength={maxLength}
          value={text}
          placeholder="Maximum 200 characters"
        />
        {maxLength && (
          <Count count={count} maxLength={maxLength} property="textarea" />
        )}
      </div>
    </>
  );
};
