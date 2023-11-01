import Input from "@/components/core/Input";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    // mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    if (data.username === "admin" && data.password === "admin") {
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Login</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full max-w-md gap-y-2"
      >
        <Input control={control} name="username" rules={{ required: true }} />
        <Input control={control} name="password" rules={{ required: true }} />
        <button
          className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
