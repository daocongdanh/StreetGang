import { useState, useEffect } from "react";
import { Button, InputNumber } from "antd";

const QuantitySelector = ({product, handleUpdateQuantity}) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const handleChange = (value) => {
    if (value >= 1) setQuantity(value);
  };

  useEffect(() => {
    handleUpdateQuantity(product.productId, quantity);
  }, [quantity]);

  return (
    <>
      <div className="text-right mb-1 font-bold text-[15px]">{(product.price*quantity).toLocaleString("en-EN")}₫</div> 
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          onClick={() => handleChange(quantity - 1)}
          disabled={quantity <= 1}
          style={{ width: "32px" }}
        >
          -
        </Button>

        <InputNumber
          min={1}
          value={quantity}
          onChange={handleChange}
          controls={false}
          style={{ width: "32px" }}
        />

        <Button
          onClick={() => handleChange(quantity + 1)}
          style={{ width: "32px" }}
        >
          +
        </Button>
      </div>
    </>
  );
};

export default QuantitySelector;
