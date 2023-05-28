import { KeyboardEvent, useEffect, useRef, useState } from "react";

interface SubmitableInputProps {
  onSubmit: (value: string) => void;
  onCancel: () => void;
  className?: string;
}

export function SubmitableInput(props: SubmitableInputProps) {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => inputRef?.current?.focus(), [inputRef]);

  function onKeyDown(e: KeyboardEvent) {
    if (e?.code === "Enter") {
      props.onSubmit(value);
    }
    if (e?.code === "Escape") {
      props.onCancel();
    }
  }

  return (
    <input
      ref={inputRef}
      className={props.className}
      value={value}
      onKeyDown={onKeyDown}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
