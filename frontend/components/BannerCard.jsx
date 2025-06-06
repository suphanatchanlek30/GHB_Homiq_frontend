import Image from "next/image";

export default function BannerCard() {
  return (
    <div className="flex justify-center mb-6">
      {/* รูป Banner */}
      <Image src="/banner_sample.png" alt="Banner" width={400} height={200} className="rounded-xl shadow-md" />
    </div>
  );
} 