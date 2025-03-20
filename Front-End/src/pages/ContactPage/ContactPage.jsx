import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faClock } from "@fortawesome/free-regular-svg-icons";
import Button from "../../components/Button/Button";

export default function ContactPage() {
  return (
    <div className="container mx-auto py-3">
      <div className="breadcrumb-shop">
        <nav className="text-sm flex items-center space-x-2">
          <a href="/" className="text-gray-600 font-semibold">
            Trang chủ
          </a>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">Liên hệ với chúng tôi</span>
        </nav>
      </div>

      <div className="w-full mb-1 py-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1673422941585!2d106.68970721533428!3d10.798492161737538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528cf107250bf%3A0xe913b2031ee19470!2zMTIgxJDGsOG7nW5nIEhvYSBHaeG6pXksIFBoxrDhu51uZyA3LCBQaMO6IE5odeG6rW4sIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1661330260689!5m2!1svi!2s"
          className="w-full h-[450px] border-none"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="flex flex-col md:flex-row gap-8 pt-8 mb-9">
        <div className="w-full md:w-2/5">
          <h2 className="text-3xl font-semibold mb-6">Thông tin liên hệ</h2>
          <ul className="space-y-6">
            {[
              {
                icon: faLocationDot,
                title: "Địa chỉ",
                text: "12 Đường Hoa Hồng, Phường 7, Quận Phú Nhuận, Thành phố Hồ Chí Minh, Việt Nam",
              },
              {
                icon: faEnvelope,
                title: "Email",
                text: "streetgangco.ltd@gmail.com",
              },
              { icon: faPhone, title: "Điện thoại", text: "0767 060 995" },
              {
                icon: faClock,
                title: "Thời gian làm việc",
                text: "Thứ 2 đến CN từ 9h đến 21h",
              },
            ].map((item, index) => (
              <li key={index} className="flex flex-wrap items-start space-x-4">
                <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600 break-words text-sm">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-3/5">
          <h2 className="text-3xl font-semibold mb-4">
            Gửi thắc mắc cho chúng tôi
          </h2>
          <p className="text-base text-gray-900 mb-4 ">
            Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng
            tôi sẽ liên lạc lại với bạn sớm nhất có thể .
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Tên của bạn"
              className="w-full p-3 border border-gray-300"
              required
            />
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-1/2 p-3 border border-gray-300"
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại của bạn"
                className="w-1/2 p-3 border border-gray-300"
                required
              />
            </div>
            <textarea
              placeholder="Nội dung"
              className="w-full p-[20px] border border-gray-300 h-32 resize-none"
              required
            ></textarea>
            <p className=" text-gray-500 text-sm">
              This site is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
                className="text-blue-500 hover:underline"
              >
                {" "}
                Privacy Policy
              </a>
              &nbsp;and&nbsp;
              <a
                href="https://policies.google.com/terms"
                className="text-blue-500 hover:underline"
              >
                {" "}
                Terms of Service
              </a>
              &nbsp; apply.
            </p>
            <Button title={"GỬI CHO CHÚNG TÔI"} />
          </form>
        </div>
      </div>
    </div>
  );
}
