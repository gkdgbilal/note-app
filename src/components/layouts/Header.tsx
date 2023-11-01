import Link from "next/link";
import LanguageDropdown from "../core/LanguageDropdown";
import ThemeSwitcher from "../core/ThemeSwitcher";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <div className="flex items-center justify-between p-4">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={72} height={72} />
        </Link>
        <div className="flex items-center gap-x-2">
          <Link href="/notes/newNote">
            <button className="bg-blue-400 text-white px-4 py-2 rounded">
              {t("addNote")}
            </button>
          </Link>
          <ThemeSwitcher />
          <LanguageDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
