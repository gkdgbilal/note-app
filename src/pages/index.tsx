import Layout from "@/components/layouts/Layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Home(props: any) {
  const { t } = useTranslation();
  const router = useRouter();
  const [notes, setNotes] = useState(props.notes);
  const [ascendingOrder, setAscendingOrder] = useState<boolean>(true);
  console.log(notes);
  const handleDeleteNote = async (id: string) => {
    try {
      if (confirm("Are you sure to delete this category?")) {
        await axios
          .delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`)
          .then((res) => res.data)
          .finally(() => router.reload());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = () => {
    const sortedData = [...notes];

    if (ascendingOrder) {
      sortedData.sort((a, b) => b.priority - a.priority); // Artan sıralama
    } else {
      sortedData.sort((a, b) => a.priority - b.priority); // Azalan sıralama
    }

    setNotes(sortedData);
    setAscendingOrder(!ascendingOrder);
  };

  const searchHandler = async (e: any) => {
    e.preventDefault();
    const searchValue = e.target.value;
    const filteredNotes = notes.filter((note: any) =>
      note.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setNotes(filteredNotes);

    if (filteredNotes.length === 0) {
      alert("No note found!");
      router.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="w-full max-w-md" onSubmit={searchHandler}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          {t("search")}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={t("search")}
            onChange={searchHandler}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t("search")}
          </button>
        </div>
      </form>
      <div>
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
          onClick={handleSort}
        >
          {ascendingOrder ? t("asc") : t("desc")}
        </button>
      </div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {notes &&
            notes.map((note: any) => (
              <div
                key={note._id}
                className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              >
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <Link href="/">
                    <Image
                      alt="Placeholder"
                      className="block h-auto w-full"
                      height={400}
                      width={600}
                      src="https://picsum.photos/600/400/?random"
                    />
                  </Link>

                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <Link
                        className="no-underline hover:underline text-black"
                        href="/"
                      >
                        {note.title}
                      </Link>
                    </h1>
                  </header>

                  <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                    <Link
                      className="flex items-center no-underline hover:underline text-black"
                      href="/"
                    >
                      <p className="text-sm">{note.description}</p>
                    </Link>
                    <div className="mb-4">
                      <Link
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none "
                        href={`/notes/${note._id}`}
                      >
                        {t("edit")}
                      </Link>
                      <button
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </footer>
                </article>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/notes`)
    .then((res) => res.data.data);

  return {
    props: {
      notes: res,
    },
  };
};
