import { ErrorMessage } from "@hookform/error-message";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Count } from "@/components/elements/Count";

type Props = {
  id: string;
  label?: string;
  maxLength?: number;
  placeholder?: string;
  initDescriptionLength: number | undefined;
};

/*使用例（コピペ用）
<Textarea
  property="default"
  autoComplete=""
  placeholder="テキストエリア"
  addClass = ""
/>
*/
export const Textarea: FC<Props> = ({ id, label, maxLength, initDescriptionLength }) => {
  const [count, setCount] = useState<number>(0);
  const countHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    setCount(e.currentTarget.value.length);
  };

  useEffect(() => {
    if (initDescriptionLength) setCount(initDescriptionLength);
  }, [initDescriptionLength]);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <div className="flex flex-col gap-2">
        {label && <p className="text-sm font-bold text-gray-400">{label}</p>}
        <div className={`relative`}>
          <textarea
            id={id}
            className={`min-h-[150px] w-full rounded-lg border-2 bg-slate-50 px-5 py-3`}
            {...register(id)}
            onKeyUp={(e) => {
              countHandler(e);
            }}
            placeholder="Maximum 200 characters"
          />
          {maxLength && <Count count={count} maxLength={maxLength} property="textarea" />}
        </div>
      </div>
      <p className="text-red-400">
        <ErrorMessage errors={errors} name={id} />
      </p>
    </div>
  );
};
