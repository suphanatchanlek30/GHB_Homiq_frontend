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
    icon: <FaChartPie className="text-2xl text-orange-400" />,
  },
  {
    label: 'วางแผนการผ่อน',
    subtitle: 'ตั้งเป้าหมายและคำนวณการผ่อนชำระ',
    path: '/financial/goal-planner',
    icon: <FaBullseye className="text-2xl text-orange-600" />,
  },
]

export default function MenuPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-orange-200 flex flex-col items-center">
        <div className="text-3xl font-extrabold text-orange-600 mb-10 tracking-wide drop-shadow-sm">เมนูการเงิน</div>
        <div className="w-full flex flex-col gap-6">
          {menuButtons.map((btn) => (
            <button
              key={btn.path}
              className="w-full flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-orange-200 via-orange-100 to-orange-300 border border-orange-300 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] hover:from-orange-300 hover:to-orange-400 transition-all duration-200 group focus:outline-none"
              onClick={() => router.push(btn.path)}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow group-hover:bg-orange-50 transition">
                {btn.icon}
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-lg font-semibold text-orange-700 group-hover:text-orange-600">{btn.label}</span>
                <span className="text-sm text-gray-500 mt-1">{btn.subtitle}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 