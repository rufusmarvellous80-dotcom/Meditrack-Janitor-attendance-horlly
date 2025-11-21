
'use client'
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import jsPDF from 'jspdf'

type Attendance = {
  name: string
  timeIn?: string
  timeOut?: string
  breakIn?: string
  breakOut?: string
  status?: string
  late?: boolean
}

export default function AttendanceForm({date, facility, role}:{date:string,facility:string,role:string}) {
  const [staff, setStaff] = useState<Attendance[]>([])
  const [adminPass, setAdminPass] = useState('')

  useEffect(()=>{
    const key = `med_shifts_${facility}_${date}`
    const assigned = JSON.parse(localStorage.getItem(key) || '[]')
    // transform to attendance list
    const arr = assigned.map((a:any)=>({ name: a.name, status: 'Present' }))
    setStaff(arr)
  },[date,facility])

  function update(index:number, field:string, value:string) {
    const next = [...staff]
    // @ts-ignore
    next[index][field] = value
    // auto-late detection
    if (field === 'timeIn') {
      const val = value
      // naive detection per prompt
      const morningCut = '07:05'
      const nightCut = '17:05'
      if (val > morningCut && val < '24:00') next[index].late = true
    }
    setStaff(next)
  }

  function saveAll() {
    if (adminPass !== 'admin') { alert('Admin password required to submit'); return }
    const key = `med_attendance_${facility}_${date}`
    localStorage.setItem(key, JSON.stringify(staff))
    // auto-generate PDF
    const doc = new jsPDF()
    doc.text(`Meditrack — Attendance ${date} — ${facility}`, 10, 10)
    staff.forEach((s,i)=> {
      doc.text(`${i+1}. ${s.name} — ${s.status} — In: ${s.timeIn || '-'} Out: ${s.timeOut || '-'}`, 10, 20 + i*8)
    })
    doc.save(`attendance-${date}.pdf`)
    alert('Saved and PDF generated (downloaded)')
  }

  function downloadPDF() {
    const doc = new jsPDF()
    doc.text(`Meditrack — Attendance ${date} — ${facility}`, 10, 10)
    staff.forEach((s,i)=> {
      doc.text(`${i+1}. ${s.name} — ${s.status} — In: ${s.timeIn || '-'} Out: ${s.timeOut || '-'}`, 10, 20 + i*8)
    })
    doc.save(`attendance-${date}.pdf`)
  }

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">Admin password to save/edit</label>
        <input value={adminPass} onChange={e=>setAdminPass(e.target.value)} type="password" className="p-2 border rounded w-1/3" />
      </div>
      {staff.length === 0 && <div className="text-sm text-gray-600">No staff assigned for this date. Use the shift calendar to add staff.</div>}
      <div className="space-y-4">
        {staff.map((s, idx)=>(
          <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center border-b pb-2">
            <div className="col-span-2 font-medium">{s.name}</div>
            <div>
              <input placeholder="Time In (HH:MM)" value={s.timeIn||''} onChange={e=>update(idx,'timeIn',e.target.value)} className="p-1 border rounded w-28" />
            </div>
            <div>
              <input placeholder="Time Out (HH:MM)" value={s.timeOut||''} onChange={e=>update(idx,'timeOut',e.target.value)} className="p-1 border rounded w-28" />
            </div>
            <div>
              <select value={s.status||'Present'} onChange={e=>update(idx,'status',e.target.value)} className="p-1 border rounded">
                <option>Present</option>
                <option>Absent</option>
                <option>On Leave</option>
              </select>
            </div>
            <div>
              {s.late ? <span className="text-red-600 text-sm">Late</span> : <span className="text-sm text-gray-600">On time</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button onClick={downloadPDF} className="p-2 border rounded">Download PDF</button>
        <button onClick={saveAll} className="btn-gradient">Save & Generate PDF</button>
      </div>
    </div>
  )
}
