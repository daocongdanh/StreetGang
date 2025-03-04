const Button = ({
  title,
  block,
  size = 16,
  radius = 2,
  hoverEffect = true,
}) => {
  return (
    <button
      className={`
        ${block ? "block w-full" : "inline-block"} 
        my-5 px-7 py-3 
        text-[${size}px] font-medium text-white 
        rounded-[${radius}px] tracking-widest 
        bg-[#252a2b] transition-all duration-500 ease-in-out 
        cursor-pointer
      `}
      type="submit"
      style={
        hoverEffect
          ? {
              backgroundImage:
                "linear-gradient(to right, #7e8080 50%, #252a2b 50%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "right bottom",
            }
          : {}
      }
      onMouseEnter={(e) => {
        if (hoverEffect) e.target.style.backgroundPosition = "left bottom";
      }}
      onMouseLeave={(e) => {
        if (hoverEffect) e.target.style.backgroundPosition = "right bottom";
      }}
    >
      {title}
    </button>
  );
};

export default Button;
