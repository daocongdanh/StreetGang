import React from "react";
import { AiFillEdit } from "react-icons/ai";
import Button from "../../../components/Button/Button";

export default function InformationPage() {
  return (
    <div className="bg-white py-[20px] px-[80px] min-h-[600px] rounded-[15px] border-[1px] border-gray-200 text-center">
       {[
          { label: "Họ và tên:", value: "Đào Đức Danh", type: "text" },
          { label: "Email:", value: "daocongdanh47@gmail.com", type: "email" },
          { label: "Số điện thoại:", value: "0392406660", type: "tel" },
          { label: "Địa chỉ:", value: "206/18 Đường số 20, Gò Vấp", type: "text", hasButton: true }
        ].map((field, index) => (
          <div key={index} className="mb-4 grid grid-cols-10 items-center">
            <label className="text-gray-700 font-semibold text-left pr-4 col-span-2 h-full flex items-center">
              {field.label}
            </label>
            <input
              type={field.type}
              className="col-span-7 p-2 border border-gray-300 rounded w-full"
              value={field.value}
            />
            {field.hasButton && (
              <button className="col-span-1 p-1 rounded ml-6 h-10">
                <AiFillEdit />
              </button>
            )}
          </div>
        ))}

        <div className="grid grid-cols-10">
          <div className="col-span-2"></div> 
          <Button title="Cập nhật" className="col-span-7 w-full rounded-lg" />
      </div>
    </div>
  );
}
