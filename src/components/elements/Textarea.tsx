import type { FC } from "react";
import { useState } from "react";

import { Count } from "@/components/elements/Count";

type Props = {
  id?: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  required: boolean;
  setText: React.Dispatch<React.SetStateAction<string>>;
  text?: string;
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
export const Textarea: FC<Props> = ({ id, label, maxLength, required = false, setText, text, ...props }) => {
  const [count, setCount] = useState<number>(0);
  const countHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length);
  };
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-sm font-bold text-gray-400">{label}</p>}
      <div className={`relative`}>
        <textarea
          id={id}
          {...props}
          className={`min-h-[150px] w-full rounded-lg border-2 bg-slate-50 px-5 py-3`}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
          onKeyUp={(e) => {
            countHandler(e);
          }}
          required={required}
          maxLength={maxLength}
          value={text}
          placeholder="Maximum 200 characters"
        />
        {maxLength && <Count count={count} maxLength={maxLength} property="textarea" />}
      </div>
    </div>
  );
};
