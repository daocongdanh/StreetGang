const Button = ({
  title,
  block,
  size = 16,
  radius = 2,
  hoverEffect = true,
  loading = false,
  className = "",
}) => {
  return (
    <button
      className={`
        ${block ? "block w-full" : "inline-block"} 
        my-5 px-7 py-3 
        text-[${size}px] text-white 
        rounded-[${radius}px] tracking-widest 
        bg-[#252a2b] transition-all duration-500 ease-in-out 
        cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
        flex items-center justify-center gap-2
        ${className}
      `}
      type="submit"
      disabled={loading}
      style={
        hoverEffect && !loading
          ? {
              backgroundImage:
                "linear-gradient(to right, #7e8080 50%, #252a2b 50%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "right bottom",
            }
          : {}
      }
      onMouseEnter={(e) => {
        if (hoverEffect && !loading)
          e.target.style.backgroundPosition = "left bottom";
      }}
      onMouseLeave={(e) => {
        if (hoverEffect && !loading)
          e.target.style.backgroundPosition = "right bottom";
      }}
    >
      {loading && (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span className="ml-3">{title}</span>
        </div>
      )}
      {!loading && <span>{title}</span>}
    </button>
  );
};

export default Button;
