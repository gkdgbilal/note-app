import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";

const PriorityEnum = z.enum(["0", "1", "2", "3", "4", "5"]);

const noteSchema = z.object({
  _id: z.string().uuid(),
  title: z.string().min(3).max(50),
  description: z.string().min(3).max(50),
  priority: PriorityEnum,
  // image: z.string().url().optional(),
});

export type NoteFormType = z.infer<typeof noteSchema>;

interface EditNoteProps {
  noteItem: NoteFormType;
}

const EditNote: FC<EditNoteProps> = ({ noteItem }) => {
  const { t } = useTranslation();
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
        .put(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteItem._id}`, {
          title,
          description,
          priority,
        })
        .then((res) => res.data);
      if (res.success) {
        reset();
        alert("Note updated successfully!");
      } else {
        console.error("Update failed: ", res.error); // Hata mesajını konsola yazdırın
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full h-screen max-w-md space-y-8 mx-auto"
    >
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t("editNote")}
        </h2>
      </div>
      <div>
        <input
          {...register("title")}
          className="w-full border py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          placeholder={noteItem.title}
        />
        {errors.title && <p className="text-red-600">{t("required")}</p>}
      </div>
      <div>
        <Controller
          render={({ field }) => (
            <select
              {...field}
              className="w-full border py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            >
              <option disabled>{t("select-priority")}</option>
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
        {errors.priority && <p className="text-red-600">{t("required")}</p>}
      </div>
      <div>
        <textarea
          {...register("description")}
          className="w-full border py-3 px-4 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          placeholder={noteItem.description}
        />
        {errors.description && <p className="text-red-600">{t("required")}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {t("update")}
        </button>
      </div>
    </form>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params || {};

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`);

  return {
    props: {
      noteItem: res.data || [],
    },
  };
};

export default EditNote;
