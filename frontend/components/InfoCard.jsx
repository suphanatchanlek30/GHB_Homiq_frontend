export default function InfoCard({ title, subtitle, time, detail, date, colorTitle }) {
  return (
    <div className="mb-4 mx-4">
      {/* หัวข้อ เช่น ประกาศ หรือ คำแนะนำ */}
      <h2 className={"text-lg mb-2 " + colorTitle}>{title}</h2>
      <div className="bg-white rounded-2xl p-4 shadow mb-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold">{subtitle}</span>
          <span className="text-gray-400 text-sm">{time}</span>
        </div>
        <div className="text-gray-600 text-base mt-2">{detail}</div>
        <div className="text-gray-300 text-xs mt-2">{date}</div>
      </div>
    </div>
  );
} 