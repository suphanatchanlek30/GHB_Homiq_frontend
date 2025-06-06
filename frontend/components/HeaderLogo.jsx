import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="text-center mt-6 mb-4">
      {/* โลโก้ HomiQ */}
      <Image src="/GHB_Homiq_frontend/frontend/public/Logo/Logo_main_white.png" alt="HomiQ Logo" width={120} height={60} className="mx-auto" />
      <h1 className="font-bold text-3xl text-[#FF7A00] m-0">
        Hom<span className="text-[#222]">IQ</span>
      </h1>
    </div>
  );
} 