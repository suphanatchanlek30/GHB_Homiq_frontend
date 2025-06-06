import HeaderLogo from "../components/HeaderLogo";
import BannerCard from "../components/BannerCard";
import InfoCard from "../components/InfoCard";
import BankButton from "../components/BankButton";
import MobileNavbar from "../components/MobileNavbar";

export default function Home() {
  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 w-full h-full bg-cover bg-no-repeat" style={{ backgroundImage: 'url(/Back/orange.svg)' }} />

      <HeaderLogo />

      <BannerCard />

      <InfoCard
        title="ประกาศ"
        subtitle="ประกาศสำคัญ"
        time="12.43 น."
        detail="ขอแจ้งประกาศถึงเงื่อนไขหรือฟีเจอร์ใหม่ที่สำคัญในเร็วๆ นี้เพื่อประสบการณ์ที่ดีที่สุดสำหรับคุณ"
        date="09 พ.ค. 66 12:43 น."
        colorTitle="text-[#FF7A00]"
      />

      <InfoCard
        title="คำแนะนำ"
        subtitle="คำแนะนำเกี่ยวกับการผ่อน"
        time="11.40 น."
        detail="เตรียมพร้อมและตรวจสอบการผ่อนชำระของคุณเสมอเพื่อป้องกันปัญหาในอนาคต"
        date="10 พ.ค. 66 11:40 น."
        colorTitle="text-[#FF7A00]"
      />

      <BankButton />

      <MobileNavbar />
    </div>
  );
}
