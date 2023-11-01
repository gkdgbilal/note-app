import { useEffect } from "react";

const ThemeSwitcher = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme"); // Kullanıcının tercihine göre tema ayarları
    if (theme) {
      document.documentElement.classList.add(theme);
    }
  }, []);

  // const toggleTheme = () => {
  //   const currentTheme = document.documentElement.classList.contains("light")
  //     ? "dark"
  //     : "light";
  //   document.documentElement.classList.toggle("light");
  //   document.documentElement.classList.toggle("dark");
  //   document.body.classList.toggle("light");
  //   document.body.classList.toggle("dark");
  //   localStorage.setItem("theme", currentTheme); // Kullanıcının tercihine göre tema ayarlarını kaydedin
  // };

  const toggleThemes = () => {
    const currentTheme = document.documentElement.classList.contains("light")
      ? "dark"
      : "light";
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("theme", currentTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("light")
      ? "dark"
      : "light";

    // document.documentElement'ın tema sınıflarını güncelle
    if (document.documentElement.classList.contains("light")) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.remove("!text-white");
      document.body.classList.add("bg-white");
      document.body.classList.add("!text-black");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.body.classList.remove("bg-white");
      document.body.classList.remove("!text-black");
      document.body.classList.add("bg-gray-900");
      document.body.classList.add("!text-white");
    }

    // document.body'yi temaya uygun olarak güncelle
    if (currentTheme === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }

    localStorage.setItem("theme", currentTheme);
  };

  return (
    <div>
      <input
        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault01"
        defaultChecked
        onChange={toggleTheme}
      />
    </div>
  );
};

export default ThemeSwitcher;
