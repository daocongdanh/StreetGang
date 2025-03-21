import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { getAllPaymentMethods } from "../../services/paymentMethodService";
import { ConfigProvider, Radio } from "antd";
import { useNavigate } from "react-router";
import { createOrder } from "../../services/orderService";
import { useCart } from "../../contexts/CartContext";
import { getUserById } from "../../services/userService";
import { useMessage } from "../../contexts/MessageContext";

const CheckoutPage = () => {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [address, setAddress] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, fetchCart } = useCart();
  const { error } = useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const userResponse = await getUserById(userId);
        const paymentMethodResponse = await getAllPaymentMethods();
        setUser(userResponse.data);
        setPaymentMethod(paymentMethodResponse.data);
        setAddress(
          userResponse.data.address.filter((item) => item.isDefault)[0].detail
        );
        setPaymentMethodId(paymentMethodResponse.data[0]._id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  const handleCheckout = async () => {
    if (address === null || address === "") {
      error("Vui lòng nhập địa chỉ");
      return;
    }
    const data = {
      address: address,
      totalAmount: cart?.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      ),
      fee: 30000,
      paymentMethodId: paymentMethodId,
      userId,
    };

    try {
      setIsLoading(true);
      const orderResponse = await createOrder(data);
      if (typeof orderResponse.data === "string") {
        window.location.href = orderResponse.data;
      } else {
        navigate("/payment-status/00");
      }
      fetchCart();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-between items-start text-[#333333] pb-[]">
        <div className="bg-[#FFFFFF] w-[65%] border-r-[1px] border-gray-200 px-[15px]">
          <h1 className="pt-[56px] text-[20px] font-bold mb-[10px]">
            Thông tin nhận hàng
          </h1>
          <div className="flex flex-col mb-[15px]">
            <label
              className="w-[20%] text-[14px] text-start font-[500] mb-[10px]"
              htmlFor="name"
            >
              Khách hàng
            </label>
            <input
              defaultValue={user?.fullName}
              id="name"
              type="text"
              className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[14px] w-full focus:border-black rounded-[8px]"
              placeholder="Họ và tên"
              required
            />
          </div>
          <div className="flex flex-col mb-[15px]">
            <label
              className="w-[20%] text-[14px] text-start font-[500] mb-[10px]"
              htmlFor="phone"
            >
              Số điện thoại
            </label>
            <input
              defaultValue={user?.phone}
              id="phone"
              type="text"
              className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[14px] w-full focus:border-black rounded-[8px]"
              placeholder="Số điện thoại"
              required
            />
          </div>
          <div className="flex flex-col mb-[15px]">
            <label
              className="w-[20%] text-[14px] text-start font-[500] mb-[10px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              defaultValue={user?.email}
              id="email"
              type="email"
              className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[14px] w-full focus:border-black rounded-[8px]"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col mb-[15px]">
            <label
              className="w-[20%] text-[14px] text-start font-[500] mb-[10px]"
              htmlFor="address"
            >
              Địa chỉ
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={
                user?.address.filter((item) => item.isDefault)[0].detail
              }
              id="address"
              type="text"
              className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[14px] w-full focus:border-black rounded-[8px]"
              placeholder="Địa chỉ"
              required
            />
          </div>
          <h1 className="py-[10px] text-[20px] font-bold mb-[10px]">
            Phương thức vận chuyển
          </h1>
          <div className="flex items-center justify-between p-[18px] border-[1px] text-[14px] border-gray-400 rounded-[8px]">
            <div className="flex items-center justify-between">
              <div className="w-[16px] h-[16px] rounded-full cursor-pointer bg-[#338DBC] mr-[10px] relative">
                <span className="w-[6px] h-[6px] bg-white rounded-full absolute top-[32%] left-[32%]"></span>
              </div>
              <span className="font-[500]">Toàn Quốc</span>
            </div>
            <span className="font-[500]">30,000 đ</span>
          </div>
          <h1 className="py-[10px] text-[20px] font-bold mb-[10px]">
            Phương thức Thanh toán
          </h1>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#338DBC",
              },
            }}
          >
            <Radio.Group
              className="w-full"
              value={paymentMethodId}
              onChange={(e) => setPaymentMethodId(e.target.value)}
            >
              {paymentMethod &&
                paymentMethod.map((item, index) => (
                  <div
                    key={`payment${index}`}
                    className="flex items-center justify-between p-[18px] border-[1px] text-[14px] border-gray-400 rounded-[8px] mb-[15px]"
                  >
                    <div className="flex items-center">
                      <Radio value={item._id}></Radio>
                      <div className="w-[50px] h-[50px] mr-[10px]">
                        <img
                          src={`http://localhost:8080/api/v1/files/${item.image}`}
                          alt="Hinh anh"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="font-[500]">{item.name}</span>
                    </div>
                  </div>
                ))}
            </Radio.Group>
          </ConfigProvider>
          <div className="text-end">
            <div className="inline-block" onClick={handleCheckout}>
              <Button
                title="Hoàn tất đơn hàng"
                size={14}
                radius={8}
                loading={isLoading}
              />
            </div>
          </div>
        </div>
        <div className="bg-[#FAFAFA] flex-1 pt-[56px] pl-[40px]">
          {cart &&
            cart.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-[15px]"
              >
                <div className="flex items-center">
                  <div className="w-[70px] h-[70px] border-[1px] border-gray-300 relative rounded-[10px]">
                    <img
                      src={item.image}
                      alt="Hinh anh"
                      className="rounded-[10px] w-full h-full object-contain"
                    />
                    <span className="cursor-pointer w-[20px] h-[20px] flex justify-center items-center rounded-full text-[8px] bg-[#8f9bb3] text-white absolute top-[-9px] right-[-9px]">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="px-[18px] font-[500]">
                    <p className="text-[15px]">{item.name}</p>
                    <p className="text-[12px] text-[#777777] mb-[10px]">
                      {item.color} / {item.size}
                    </p>
                  </div>
                </div>
                <p className="text-[14px] font-[500]">
                  {(item.price * item.quantity).toLocaleString("en-US")}₫
                </p>
              </div>
            ))}
          <div className="border-y-[1px] border-gray-300 flex items-center justify-between">
            <input
              id="phone"
              type="text"
              className="h-[45px] py-[5px] px-[20px] outline-none border-[1px] border-gray-400 font-[500] text-[14px] w-[60%] focus:border-black rounded-[8px]"
              placeholder="Mã giảm giá"
            />
            <Button title="Sử dụng" size={14} radius={8} />
          </div>
          <div className="text-[14px] font-[500] text-[#717171] py-[15px] border-b-[1px] border-gray-300">
            <div className="flex items-center justify-between mb-[8px]">
              <span>Tạm tính</span>
              <span>
                {cart?.items
                  .reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  )
                  .toLocaleString("en-US")}
                ₫
              </span>
            </div>
            <div className="flex items-center justify-between mb-[8px]">
              <span>Phí vận chuyển</span>
              <span>30,000₫</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Giảm giá</span>
              <span>0₫</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-[15px] font-[500]">
            <span>Tổng cộng</span>
            <div className="">
              <span className="text-[24px]">
                {(
                  cart?.items.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  ) + 30000
                ).toLocaleString("en-US")}
              </span>
              ₫
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
