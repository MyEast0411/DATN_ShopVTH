import { useState, useEffect } from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timeout;
    if (isSubmitted) {
      timeout = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.subject && formData.message) {
      setIsSubmitting(true);
      console.log(formData);
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setFormData({ email: "", subject: "", message: "" });
      }, 2000);
    } else {
      alert("Please fill out all fields");
    }
  };

  return (
    <>
      <InfoTop />
      <Header />
      <div className="container min-h-[650px]">
        <Breadcrumbs size="lg" className="my-3 ">
          <BreadcrumbItem>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link className="text-[#B4B4B3] cursor-default">
              Liên hệ chúng tôi
            </Link>
          </BreadcrumbItem>
        </Breadcrumbs>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-6 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
              Liên hệ chúng tôi
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
              Có vấn đề kỹ thuật? Muốn gửi phản hồi về một tính năng beta? Cần
              thông tin về kế hoạch kinh doanh của chúng tôi? Hãy cho chúng tôi
              biết.
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Tiêu đề
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Hãy cho chúng tôi biết làm thế nào để chúng tôi có thể giúp bạn."
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Tin nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Để lại lời nhắn..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 duration-200 text-white font-bold py-2 px-4 rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
              </button>
            </form>
            {isSubmitted && (
              <p className="mt-4 text-center text-green-500">
                Phản hồi đã được gửi thành công!
              </p>
            )}
            <p className="mt-5">
              Nếu bạn không thích sử dụng biểu mẫu, bạn có thể gửi email cho
              chúng tôi .{" "}
              <a
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                href="https://mail.google.com/mail/u/0/#inbox?compose=new"
              >
                jordanvth@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
