import React from "react";

const members = [
  { name: "Đào Đức Danh", mssv: "22731781", avatar: "danhkhung.jpg" },
  {
    name: "Phan Khánh Chương",
    mssv: "22674951",
    avatar: "chuong.jpg",
  },
  { name: "Huỳnh Kim Đảm", mssv: "22716751", avatar: "kimdam.jpg" },
  { name: "Phạm Ngọc Đăng", mssv: "22640201", avatar: "NgocDang.jpg" },
  {
    name: "Đặng Nguyên Danh",
    mssv: "22724221",
    avatar: "nguyendanh.jpg",
  },
];

export default function MemberPage() {
  return (
    <div className="p-8 rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-300 relative">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-4">
              <h5 className="text-xl font-semibold">{member.name}</h5>
              <p className="text-gray-600">MSSV: {member.mssv}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
