"use client"
import { useRouter } from 'next/navigation'
import { FaChartLine, FaChartPie, FaBullseye } from 'react-icons/fa'

const menuButtons = [
  {
    label: 'วิเคราะห์การเงินอัตโนมัติ',
    subtitle: 'เชื่อมบัญชีหรืออัปโหลด Statement',
    path: '/financial/auto-analysis',
    icon: <FaChartLine className="text-2xl text-orange-500" />,
  },
  {
    label: 'จัดสรรสัดส่วนการใช้จ่าย',
    subtitle: 'ดูและวางแผนการใช้จ่ายรายเดือน',
    path: '/financial/allocation',
    icon: <FaChartPie className="text-2xl text-orange-500" />,
  },
  {
    label: 'วางแผนการผ่อน',
    subtitle: 'ตั้งเป้าหมายและคำนวณการผ่อนชำระ',
    path: '/financial/goal-planner',
    icon: <FaBullseye className="text-2xl text-orange-500" />,
  },
]

export default function MenuPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
      <div className="w-full max-w-md p-10 bg-white/95 rounded-3xl shadow-xl border border-orange-200 flex flex-col items-center">
        <div className="text-3xl font-extrabold text-orange-600 mb-10 tracking-wide drop-shadow-sm">เมนูการเงิน</div>
        <div className="w-full flex flex-col gap-7">
          {menuButtons.map((btn) => (
            <button
              key={btn.path}
              className="w-full flex items-center gap-5 px-7 py-6 bg-gradient-to-r from-orange-100 via-white to-orange-50 border border-orange-200 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.015] hover:border-orange-400 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-orange-200"
              onClick={() => router.push(btn.path)}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 via-white to-orange-100 border border-orange-100 shadow group-hover:bg-orange-50 transition">
                {btn.icon}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-lg font-bold text-orange-700 group-hover:text-orange-600 tracking-wide drop-shadow">{btn.label}</span>
                <span className="text-sm text-gray-500 mt-1 font-medium">{btn.subtitle}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 