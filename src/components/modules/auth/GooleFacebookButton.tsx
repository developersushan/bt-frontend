import React from 'react';

// Bold Google Brand Icon (Matching Facebook 'f' weight, 16px)
const GoogleIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12.24 10.285V13.4h6.887c-.287 1.834-2.18 5.372-6.887 5.372-4.14 0-7.517-3.427-7.517-7.657s3.377-7.657 7.517-7.657c2.352 0 3.923.993 4.822 1.859l2.457-2.383C17.925 1.513 15.342 0 12.24 0 5.48 0 0 5.373 0 12s5.48 12 12.24 12c7.06 0 11.758-4.92 11.758-11.874 0-.8-.088-1.406-.195-2.016H12.24z" />
  </svg>
);

// Bold Facebook Icon (16px)
const FacebookIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
  </svg>
);

const GooleFacebookButton = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* Google Button */}
      <button className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-[#ff0000] hover:bg-[#e60000] active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer">
        <GoogleIcon className="size-4 text-white shrink-0" />
        <span className="leading-none">Google</span>
      </button>

      {/* Facebook Button */}
      <button className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-white bg-[#3b5998] hover:bg-[#344e86] active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer">
        <FacebookIcon className="size-4 text-white shrink-0" />
        <span className="leading-none">Facebook</span>
      </button>
    </div>
  );
};

export default GooleFacebookButton;