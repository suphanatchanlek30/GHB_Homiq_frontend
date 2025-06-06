import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="text-center mb-4">
      {/* โลโก้ HomiQ */}
      <Image src="/Logo/Logo_main_black.png" alt="HomiQ Logo" width={120} height={60} className="mx-auto" />
    </div>
  );
} 