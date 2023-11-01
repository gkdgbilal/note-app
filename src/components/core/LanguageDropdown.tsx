import { useTranslation } from "next-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  return (
    <div>
      <select
        className="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        defaultValue={i18n.language}
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
