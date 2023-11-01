import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import cn from "clsx";
import axios from "axios";
import { useRouter } from "next/router";

const PriorityEnum = z.enum(["0", "1", "2", "3", "4", "5"]);

const noteSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  priority: PriorityEnum,
  // image: z.string().url().optional(),
});

export type NoteFormType = z.infer<typeof noteSchema>;

const NewNote = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteSchema),
  });

  const submitHandler = async (data: NoteFormType) => {
    const { title, description, priority } = data;
    try {
      const res = await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
          title,
          description,
          priority,
        })
        .then((res) => res.data);
      reset();
      alert("Note created successfully!");
      router.push("/");
      console.log(res);
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full h-screen max-w-md space-y-8 mx-auto"
    >
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add New Note
        </h2>
      </div>
      <div>
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          {...register("title")}
          className="w-full border py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          placeholder="Title"
        />
        {errors.title && <p className="text-red-600">This field is required</p>}
      </div>
      <div>
        <label htmlFor="priority" className="sr-only">
          Priority
        </label>
        <Controller
          render={({ field }) => (
            <select
              {...field}
              className="w-full border py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            >
              <option disabled>Select priority</option>
              {PriorityEnum.options.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          )}
          name="priority"
          control={control}
        />
        {errors.priority && (
          <p className="text-red-600">This field is required</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full border py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-600">This field is required</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default NewNote;
