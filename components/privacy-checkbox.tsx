"use client"

import { useState } from "react"
import Link from "next/link"

interface PrivacyCheckboxProps {
  onChange: (accepted: boolean) => void
  required?: boolean
}

export default function PrivacyCheckbox({ onChange, required = true }: PrivacyCheckboxProps) {
  const [accepted, setAccepted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccepted(e.target.checked)
    onChange(e.target.checked)
  }

  return (
    <div className="flex items-start gap-2">
      <input
        type="checkbox"
        id="privacy-policy"
        checked={accepted}
        onChange={handleChange}
        required={required}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#EE8900] focus:ring-[#EE8900]"
      />
      <label htmlFor="privacy-policy" className="text-sm text-gray-600">
        I have read and agree to the{" "}
        <Link href="/privacy-policy" className="text-[#EE8900] hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/cookie-policy" className="text-[#EE8900] hover:underline">
          Cookie Policy
        </Link>
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  )
} 