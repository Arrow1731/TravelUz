// components/TeacherCard.tsx
"use client"

import React from "react"

interface Teacher {
  id: string
  name: string
  avatar: string
  subjects: { uz: string; ru: string; en: string }
  bios: { uz: string; ru: string; en: string }
}

interface Props {
  teacher: Teacher
  language: "uz" | "ru" | "en"
  onViewProfile?: () => void
}

export default function TeacherCard({ teacher, language, onViewProfile }: Props) {
  return (
    <div className="bg-white/90 rounded-xl shadow-lg p-5 text-center hover:shadow-2xl transition cursor-pointer">
      <img
        src={teacher.avatar}
        alt={teacher.name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-orange-600"
      />
      <h3 className="text-xl font-semibold text-orange-600">{teacher.name}</h3>
      <p className="text-gray-600">{teacher.subjects[language]}</p>
      <p className="text-gray-500 text-sm mt-1">{teacher.bios[language]}</p>
      {onViewProfile && (
        <button
          onClick={onViewProfile}
          className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:brightness-110 transition"
        >
          View Profile
        </button>
      )}
    </div>
  )
}