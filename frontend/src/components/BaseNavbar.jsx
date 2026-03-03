import { NavLink } from "react-router-dom";

export default function BaseNavbar({ leftContent, rightContent }) {
  return (
    <div className="h-16 bg-[#101828] text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center relative overflow-hidden shadow-md shadow-gray-700">
              <div className="absolute inset-0 bg-gray-900"></div>
              <span className="relative z-10 text-[#008AFF] font-bold text-xl mr-[1px]">
                T
              </span>
              <span className="relative z-10 text-white font-bold text-xl">
                H
              </span>
            </div>
            <span className="font-bold tracking-tight text-lg hidden md:block">
              TurboHire
            </span>
          </div>

          {leftContent}

        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          {rightContent}
        </div>

      </div>
    </div>
  );
}