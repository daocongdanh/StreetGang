import { useState, useEffect, useReducer } from "react";
import { Breadcrumb, Modal, Checkbox } from "antd";
import { Link } from "react-router";
import Button from "../../components/Button/Button";
import { useOutletContext } from "react-router";
import {
  addToCart,
  updateCart,
  deleteCart,
  getCartByUser,
} from "../../services/cartService";
import { useMessage } from "../../contexts/MessageContext";
import "./CartPage.scss";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";

const CartPage = () => {
  const { fetchCartCount } = useOutletContext();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { success } = useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        if (!userId) return;
        const response = await getCartByUser(userId);
        setCartItems(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleUpdateQuantity = async (productId, quantity) => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    if (!userId) return;
    setCartItems(
      cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity: quantity } : item
      )
    );
    await updateCart(productId, { quantity: quantity, userId: userId });
  };

  const handleOk = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    if (!userId) return;
    await deleteCart(userId, selectedItem.productId);
    fetchCartCount();
    setIsModalOpen(false);
    setCartItems(cartItems.filter((item) => item.productId !== selectedItem.productId));
    success("Đã xóa sản phẩm khỏi giỏ hàng");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cartPage">
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: `Giỏ hàng (${cartItems.length})`,
          },
        ]}
        style={{ paddingTop: "8px" }}
      />

      <main>
        <section>
          <h1>Giỏ hàng của bạn</h1>
          <article>
            {cartItems.length === 0 ? (
              <p>Giỏ hàng của bạn đang trống</p>
            ) : (
              <>
                <p>
                  Bạn đang có <strong>{cartItems.length} sản phẩm</strong> trong
                  giỏ hàng
                </p>
                <div className="cart-list">
                  {cartItems.map((item, index) => (
                    <div className="cart-item" key={index}>
                      <div className="content-left">
                        <div className="item-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div
                          className="item-remove"
                          onClick={() => {
                            setSelectedItem(item);
                            setIsModalOpen(true);
                          }}
                        >
                          Xóa
                        </div>
                      </div>
                      <div className="content-center">
                        <div className="item-name text-[15px] text-[#080808]">
                          <Link to={`/products/${item.slug}`}>{item.name}</Link>
                        </div>
                        {item.color && item.size && (
                          <div className="item-variant text-[12px] text-[#777777]">
                            {item.color} / {item.size}
                          </div>
                        )}
                        <div className="item-price text-[14px] text-[#8F9BB3] font-[600] mt-2">
                          {item.price.toLocaleString("en-EN")}₫
                        </div>
                      </div>
                      <div className="content-right">
                        <QuantitySelector product={item} handleUpdateQuantity={handleUpdateQuantity}/>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="note-container">
                  <h2>Ghi chú đơn hàng</h2>
                  <textarea  id="note" name="note"></textarea>
                </div>
              </>
            )}
          </article>
        </section>
        <aside>
          <div className="order-detail">
            <h1>Thông tin đơn hàng</h1>
            <div className="summary-total">
              <p>
                Tổng tiền: <span>{totalPrice.toLocaleString("en-EN")}₫</span>
              </p>
            </div>
            <div className="summary-action">
              <ul>
                <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
              </ul>
              {totalPrice < 90000 && (
                <div className="alert-notification">
                  Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh toán
                </div>
              )}
              <Button
                title="THANH TOÁN"
                block={true}
                size={14}
                radius={5}
                hoverEffect={false}
                bgColor="red"
                disabled={totalPrice < 90000}
              />
            </div>
          </div>
          <div className="policy-notification">
            <h2>Chính sách mua hàng</h2>
            <p>
              Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối
              thiểu <strong>90.000₫</strong> trở lên.
            </p>
          </div>
        </aside>
      </main>
      <Modal
        title={
          <div className="text-center">
            Bạn chắc chắn muốn bỏ sản phẩm này ra khỏi giỏ hàng?
          </div>
        }
        centered={true}
        open={isModalOpen}
        closable={false}
        footer={null}
      >
        <div className="cart-modal-buttons">
          <Button
            size={12}
            title="HỦY"
            hoverEffect={false}
            textColor="black"
            bgColor="#DFDFDF"
            onClick={handleCancel}
          />
          <Button
            size={12}
            title="ĐỒNG Ý"
            hoverEffect={false}
            onClick={handleOk}
          />
        </div>
      </Modal>
    </div>
  );
};

export default CartPage;
