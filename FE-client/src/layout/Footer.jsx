import Logo from "../assets/logo.png";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex align-center justify-center font-bold">
            <img src={Logo} className="logo" alt="" />
            <span>JORDAN VTH</span>
          </div>

          <p className="mx-auto mt-6 text-center leading-relaxed text-gray-500">
            Bản quyền © 2023 Mọi quyền được bảo lưu bởi Jordan VTH.
          </p>
          <ul className="mt-12 flex align-center justify-center gap-6 md:gap-8">
            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">Facebook</span>
                <BsFacebook className="icon-footer-facebook" />
              </a>
            </li>

            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">Instagram</span>
                <AiFillInstagram className="icon-footer-instagram" />
              </a>
            </li>

            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">Twitter</span>
                <AiFillTwitterCircle className="icon-footer-twitter" />
              </a>
            </li>

            <li>
              <a
                href="/"
                rel="noreferrer"
                target="_blank"
                className="text-gray-700 transition hover:text-gray-700/75"
              >
                <span className="sr-only">GitHub</span>
                <BsGithub className="icon-footer-github" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
