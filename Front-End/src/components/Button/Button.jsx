const Button = ({
  title,
  block,
  size = 16,
  radius = 2,
  hoverEffect = true,
  className = "",
  textColor = "white",
  bgColor = "#252a2b",
  bgImage = "linear-gradient(to right, #7e8080 50%, #252a2b 50%)",
  disabled = false,
  onClick = () => {},
}) => {
  return (
    <button
      className={`
        ${block ? "block w-full" : "inline-block"} 
        my-5 px-7 py-3 
        text-[${size}px] font-medium text-${textColor}
        rounded-[${radius}px] tracking-widest  
        transition-all duration-500 ease-in-out 
        cursor-pointer disabled:cursor-not-allowed 
        ${disabled ? "opacity-80" : ""}
        ${className}
      `}
      type="submit"
      disabled={disabled}
      style={
        disabled
          ? { backgroundColor: "#252a2b" }
          : hoverEffect
          ? {
              backgroundImage: bgImage,
              backgroundSize: "200% 100%",
              backgroundPosition: "right bottom",
            }
          : {backgroundColor: bgColor}
      }
      onMouseEnter={(e) => {
        if (!disabled && hoverEffect)
          e.target.style.backgroundPosition = "left bottom";
      }}
      onMouseLeave={(e) => {
        if (!disabled && hoverEffect)
          e.target.style.backgroundPosition = "right bottom";
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
