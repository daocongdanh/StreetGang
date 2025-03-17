import React from "react";
export default function MemberPage() {
  const members = [
    {
      name: "Đào Đức Danh",
      mssv: "22731781",
      avatar: "../public/logo.png",
    },
    {
      name: "Nguyễn Huỳnh Minh Hiếu",
      mssv: "22671131",
      avatar: "../public/logo.png",
    },
    {
      name: "Phan Khánh Chương",
      mssv: "22674951",
      avatar: "../public/logo.png",
    },
    {
      name: "Lê Việt Hoàng",
      mssv: "22679731",
      avatar: "../public/logo.png",
    },
    {
      name: "Huỳnh Hoài Thanh",
      mssv: "23633801",
      avatar: "../public/logo.png",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col items-center"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 transform transition-transform duration-300 hover:scale-110">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold">{member.name}</h3>
            <p className="text-gray-600">MSSV: {member.mssv}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
