interface InputProps {
    title: string;
    id: string;
    type: string;
    autoComplete: string;
    required: boolean;
    placeholder?: string;
}

export function Input(props: InputProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-50"
      >
        {props.title}
      </label>
      <div className="mt-2">
        <input
          id={props.id}
          name={props.id}
          type={props.type}
          placeholder={props.placeholder}
          autoComplete={props.autoComplete}
          required={props.required}
          className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}
