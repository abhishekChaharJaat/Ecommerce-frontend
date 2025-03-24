import React from "react";

const Button = (props) => {
  const { type, className, title, onClick, icon, loading } = props;

  return (
    <div>
      <button
        type={type}
        className={`active:scale-90 tranistion- cursor-pointer  group relative w-full flex justify-center gap-[8px] py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none hover:ring-2 hover:ring-offset-1 hover:ring-slat-400 ${className}`}
        onClick={onClick}
      >
        {loading ? (
          <div className="w-5 h-5 border border-t-[2px] border-white border-solid rounded-full animate-spin"></div>
        ) : (
          title
        )}
        <span>{icon}</span>
      </button>
    </div>
  );
};

export default Button;
