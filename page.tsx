
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [facility, setFacility] = useState('General Hospital')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('janitor')
  const [error,setError] = useState('')

  // facility passwords per prompt
  const facilityPasswords: Record<string, string> = {
    'General Hospital': 'admin1',
    'LASUCOM': 'admin2'
  }
  // role override admin password
  const adminOverride = 'admin'

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const fp = facilityPasswords[facility]
    if (password === fp || password === adminOverride) {
      // store session (very simple)
      sessionStorage.setItem('med_facility', facility)
      sessionStorage.setItem('med_role', role)
      router.push('/dashboard')
    } else {
      setError('Invalid facility password')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Meditrack — Facility Login</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <label className="block">
            <div className="text-sm mb-1">Facility</div>
            <select value={facility} onChange={e=>setFacility(e.target.value)} className="w-full p-2 border rounded">
              <option>General Hospital</option>
              <option>LASUCOM</option>
            </select>
          </label>

          <label className="block">
            <div className="text-sm mb-1">Role</div>
            <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border rounded">
              <option value="janitor">Janitor</option>
              <option value="security">Security</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label className="block">
            <div className="text-sm mb-1">Password</div>
            <input value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded" type="password" />
          </label>

          {error && <div className="text-red-600">{error}</div>}

          <div className="flex justify-end">
            <button className="btn-gradient" type="submit">Login</button>
          </div>
        </form>
        <div className="text-xs mt-3 text-gray-600">Facility passwords: General Hospital: admin1 | LASUCOM: admin2 | Admin override: admin</div>
      </div>
    </main>
  )
}
