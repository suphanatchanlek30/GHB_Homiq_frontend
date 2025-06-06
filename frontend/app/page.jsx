import HeaderLogo from "../components/HeaderLogo";
import BannerCard from "../components/BannerCard";
import InfoCard from "../components/InfoCard";
import BankButton from "../components/BankButton";
import MobileNavbar from "../components/MobileNavbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f6f9] pb-20">
      {/* Header Logo */}
      <HeaderLogo />

      {/* Banner */}
      <BannerCard />

      {/* ประกาศ */}
      <InfoCard
        title="ประกาศ"
        subtitle="ประกาศสำคัญ"
        time="12.43 น."
        detail="ขอแจ้งประกาศถึงเงื่อนไขหรือฟีเจอร์ใหม่ที่สำคัญในเร็วๆ นี้เพื่อประสบการณ์ที่ดีที่สุดสำหรับคุณ"
        date="09 พ.ค. 66 12:43 น."
        colorTitle="text-[#FF7A00]"
      />

      {/* คำแนะนำ */}
      <InfoCard
        title="คำแนะนำ"
        subtitle="คำแนะนำเกี่ยวกับการผ่อน"
        time="11.40 น."
        detail="เตรียมพร้อมและตรวจสอบการผ่อนชำระของคุณเสมอเพื่อป้องกันปัญหาในอนาคต"
        date="10 พ.ค. 66 11:40 น."
        colorTitle="text-[#FF7A00]"
      />

      {/* ปุ่มจัดการบัญชีธนาคาร */}
      <BankButton />

      {/* Navbar ด้านล่าง */}
      <MobileNavbar />
    </div>
  );
}
