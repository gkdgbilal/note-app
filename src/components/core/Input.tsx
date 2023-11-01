import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type InputProps = {
  username: string;
  password: string;
};

const Input = (props: UseControllerProps<InputProps>) => {
  const { field, fieldState } = useController(props);
  return (
    <div>
      <input {...field} placeholder={props.name} />
    </div>
  );
};

export default Input;
