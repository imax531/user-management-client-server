import { Input } from "@components/Input";
import { BaseSyntheticEvent } from "react";

interface AddUserFormProps {
    onAddUser: (username: string) => void;
  }
  
  export function AddUserForm(props: AddUserFormProps) {
    return (
      <form
        className="space-y-6 mt-8"
        onSubmit={(e: BaseSyntheticEvent) => {
          e.preventDefault();
          props.onAddUser(e.target.username.value);
        }}
      >
        <Input
          id="username"
          title="Add user"
          type="username"
          required={true}
          autoComplete="username"
          placeholder="Username"
        />
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add
          </button>
        </div>
      </form>
    );
  }