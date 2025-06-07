"use client"
import React, { useState, useCallback } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

const AutoAnalysis = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [dti, setDti] = useState(null); // สถานะสำหรับเก็บค่า DTI ที่ได้จากการวิเคราะห์ (Debt-to-Income Ratio)
    const [loading, setLoading] = useState(false); // สถานะสำหรับแสดงว่ากำลังรอผลลัพธ์จาก backend หรือไม่

    // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้เลือกไฟล์ผ่าน input (เลือกไฟล์จากเครื่อง)
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // ดึงไฟล์แรกที่ผู้ใช้เลือก
        if (file) {
            // ตรวจสอบขนาดไฟล์ ต้องไม่เกิน 100MB
            if (file.size <= 100 * 1024 * 1024) {
                setUploadedFile(file); // เก็บไฟล์ไว้ใน state
                setDti(null); // รีเซ็ตค่า DTI ทุกครั้งที่อัปโหลดไฟล์ใหม่
            } else {
                alert('File size exceeds 100MB limit.'); // แจ้งเตือนถ้าไฟล์ใหญ่เกิน
                setUploadedFile(null); // ไม่เก็บไฟล์ที่ไม่ผ่านเงื่อนไข
            }
        }
    };

    // ฟังก์ชันสำหรับจัดการ event dragover (จำเป็นต้อง preventDefault เพื่อให้ drop ได้)
    const handleDragOver = (event) => {
        event.preventDefault(); // ป้องกันพฤติกรรมปกติของ browser เพื่อให้สามารถ drag & drop ได้
    };

    // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้ drag & drop ไฟล์ลงในกล่องอัปโหลด
    const handleDrop = (event) => {
        event.preventDefault(); // ป้องกันพฤติกรรมปกติของ browser
        const file = event.dataTransfer.files[0]; // ดึงไฟล์แรกที่ถูก drop
        if (file) {
            // ตรวจสอบขนาดไฟล์ ต้องไม่เกิน 100MB
            if (file.size <= 100 * 1024 * 1024) {
                setUploadedFile(file); // เก็บไฟล์ไว้ใน state
                setDti(null); // รีเซ็ตค่า DTI ทุกครั้งที่อัปโหลดไฟล์ใหม่
            } else {
                alert('File size exceeds 100MB limit.'); // แจ้งเตือนถ้าไฟล์ใหญ่เกิน
                setUploadedFile(null); // ไม่เก็บไฟล์ที่ไม่ผ่านเงื่อนไข
            }
        }
    };

    // ฟังก์ชันจำลองการส่งไฟล์ไป backend เพื่อวิเคราะห์ DTI (Debt-to-Income Ratio)
    // ในโปรเจกต์จริงจะต้องส่งไฟล์ไปยัง backend API และรอผลลัพธ์กลับมา
    // ที่นี่ใช้ setTimeout เพื่อจำลองการรอ response จาก backend
    const simulateDtiAnalysis = async () => {
        if (!uploadedFile) return; // ถ้ายังไม่มีไฟล์ ไม่ต้องทำอะไร
        setLoading(true); // ตั้งค่าสถานะ loading เป็น true เพื่อแสดงข้อความกำลังวิเคราะห์
        setDti(null); // รีเซ็ตค่า DTI ระหว่างรอผลลัพธ์
        // จำลอง network delay (เช่น backend ใช้เวลาประมวลผล 1.8 วินาที)
        await new Promise((resolve) => setTimeout(resolve, 1800));
        // จำลองผลลัพธ์ DTI ที่ได้จาก backend (สุ่มเลขระหว่าง 20 ถึง 80)
        const simulatedDti = Math.floor(Math.random() * 60) + 20;
        setDti(simulatedDti); // อัปเดตค่า DTI ที่ได้จาก backend
        setLoading(false); // ปิดสถานะ loading
    };

    // ฟังก์ชันสำหรับคำนวณ path ของกราฟ DTI (gauge) ในรูปแบบ SVG
    // รับค่า DTI แล้วแปลงเป็น path arc (ครึ่งวงกลม) ที่แสดงผลตามค่า DTI
    const getDtiGaugePath = useCallback((dtiValue) => {
        if (dtiValue === null) return ""; // ถ้ายังไม่มีค่า DTI ไม่ต้องวาด arc
        const radius = 70; // รัศมีของครึ่งวงกลม
        const centerX = 100; // จุดศูนย์กลางแกน X ของ SVG
        const centerY = 100; // จุดศูนย์กลางแกน Y ของ SVG
        const maxDtiForFullArc = 100; // กำหนดว่า DTI 100 จะเต็มครึ่งวงกลม
        // คำนวณมุม (angle) ที่ต้องการวาด arc ตามค่า DTI (0 DTI = 180°, 100 DTI = 0°)
        const angle = 180 - (dtiValue / maxDtiForFullArc) * 180;
        // คำนวณจุดสิ้นสุดของ arc ตามมุมที่ได้
        const x = centerX + radius * Math.cos(angle * Math.PI / 180);
        const y = centerY - radius * Math.sin(angle * Math.PI / 180);
        // largeArcFlag ใช้กำหนดทิศทางการวาด arc (0 สำหรับ < 180°, 1 สำหรับ >= 180°)
        const largeArcFlag = angle <= 90 ? 0 : 1;
        // คืนค่า path สำหรับ SVG arc
        return `M30,100 A70,70 0 ${largeArcFlag} 1 ${x},${y}`;
    }, []);

    // ฟังก์ชันสำหรับคำนวณตำแหน่งของเข็ม (needle) ในกราฟ DTI
    // รับค่า DTI แล้วแปลงเป็นจุดปลายของเข็มใน SVG
    const getNeedleCoordinates = useCallback((dtiValue) => {
        if (dtiValue === null) return { x2: 100, y2: 100 }; // ถ้ายังไม่มีค่า DTI ให้เข็มอยู่ตรงกลาง
        const radius = 50; // รัศมีของเข็ม (สั้นกว่ากราฟ)
        const centerX = 100;
        const centerY = 100;
        const maxDtiForNeedle = 100; // DTI 100 จะอยู่สุดขวาของครึ่งวงกลม
        // คำนวณมุม (angle) ของเข็มตามค่า DTI
        const angle = 180 - (dtiValue / maxDtiForNeedle) * 180;
        // คำนวณจุดปลายของเข็ม
        const x2 = centerX + radius * Math.cos(angle * Math.PI / 180);
        const y2 = centerY - radius * Math.sin(angle * Math.PI / 180);
        return { x1: centerX, y1: centerY, x2, y2 };
    }, []);

    const needleCoords = getNeedleCoordinates(dti);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-white py-8">
            <div className="w-full max-w-md flex flex-col items-center bg-white bg-opacity-80 rounded-lg shadow p-8">
                {/* ส่วนหัวข้อและคำอธิบาย */}
                <h2 className="text-2xl md:text-3xl font-bold text-orange-500 text-center mb-4">วิเคราะห์การเงินอัตโนมัติ</h2>
                <p className="text-lg md:text-xl font-semibold text-orange-400 text-center mb-6">
                    เชื่อมต่อบัญชีหรืออัพโหลด Statement<br />
                    <span className="text-base font-normal">(Connect or Upload Section)</span>
                </p>

                {/* ส่วนปุ่มเชื่อมต่อบัญชีธนาคาร */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/bank-logo-ghb.png" alt="ธนาคารอาคารสงเคราะห์" className="w-24 h-24 object-contain rounded-lg shadow mb-4" />
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded transition text-lg shadow"
                        onClick={() => alert('Simulating connection to bank... (Not implemented)')}
                    >
                        เชื่อมต่อกับบัญชีธนาคาร
                    </button>
                </div>

                {/* ส่วนอัปโหลดไฟล์ Statement */}
                <h3 className="text-xl font-bold text-orange-500 text-center mb-6">อัปโหลดไฟล์ Statement</h3>
                <div className="w-full flex flex-col items-center mb-6">
                    {/* input type="file" ซ่อนอยู่ ใช้ label คลิกเพื่อเลือกไฟล์ */}
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                    />
                    {/* label นี้รองรับทั้งคลิกและ drag & drop */}
                    <label
                        htmlFor="file-upload"
                        className="w-full border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center py-8 mb-4 cursor-pointer hover:border-orange-400 transition"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {uploadedFile ? (
                            <div className="text-center">
                                <p className="text-green-600 font-semibold mb-2">File Uploaded:</p>
                                <p className="text-gray-800">{uploadedFile.name}</p>
                            </div>
                        ) : (
                            <>
                                {/* ไอคอนแสดงภาพตัวอย่างการอัปโหลด */}
                                <img src="/upload-icon.png" alt="upload icon" className="w-16 h-16 mb-2 opacity-60" />
                                <div className="flex flex-row items-center justify-center gap-2 mb-1">
                                    <span className="text-orange-500 font-bold text-lg">Click to upload</span>
                                    <span className="text-gray-500 font-semibold text-lg">or drag and drop</span>
                                </div>
                                <div className="text-gray-400 text-base">JPG, JPEG, PNG, PDF less than 100MB</div>
                            </>
                        )}
                    </label>

                    {/* ปุ่มสำหรับส่งไฟล์ไปวิเคราะห์ (mock API) */}
                    <button
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded transition text-lg shadow disabled:opacity-60"
                        onClick={simulateDtiAnalysis}
                        disabled={!uploadedFile || loading}
                    >
                        {loading ? 'กำลังวิเคราะห์...' : 'วิเคราะห์อัตโนมัติ'}
                    </button>
                </div>

                {/* ส่วนแสดงผลลัพธ์ DTI และกราฟ */}
                <h3 className="text-xl font-bold text-orange-500 text-center mb-4">การคำนวณ <span className="text-orange-400">Debt-to-Income Ratio</span></h3>
                <div className="relative flex flex-col items-center mb-4">
                    <Doughnut
                        data={{
                            datasets: [
                                {
                                    data: [dti !== null ? dti : 0, 100 - (dti !== null ? dti : 0)],
                                    backgroundColor: ['#F57C1F', '#E0E0E0'],
                                    borderWidth: 0,
                                    cutout: '80%',
                                    circumference: 180,
                                    rotation: 270,
                                },
                            ],
                        }}
                        options={{
                            plugins: { legend: { display: false }, tooltip: { enabled: false } },
                        }}
                        width={200}
                        height={100}
                    />
                    {/* ตัวเลข DTI ตรงกลางกราฟ */}
                    <div className="absolute top-32 left-1/2 -translate-x-1/2 -translate-y-[60%] text-4xl font-bold text-gray-800 select-none">
                        {dti !== null ? dti : 'N/A'}
                    </div>
                </div>
                <div className="text-gray-700 text-lg font-bold text-center mb-2">
                    ลดการใช้จ่ายเพื่อปรับ <span className="font-black">DTI</span> ให้เหมาะสมกับรายได้
                </div>
            </div>
        </div>
    );
};

export default AutoAnalysis;