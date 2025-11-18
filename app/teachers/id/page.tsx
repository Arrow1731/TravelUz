"use client"

import React, { useState } from "react"
import { notFound } from "next/navigation"
import AIChat from "@/components/AIChat"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Globe } from "lucide-react"

interface Teacher {
  id: string
  name: string
  avatar: string
  profileUrl: string
  subjects: { uz: string; ru: string; en: string }
  bios: { uz: string; ru: string; en: string }
}

const teachers: Teacher[] = [
  // ... all 15 teachers here
]

interface TeacherPageProps {
  params: { id: string }
}

export default function TeacherProfile({ params }: TeacherPageProps) {
  const teacher = teachers.find(t => t.id === params.id)

  if (!teacher) return notFound()

  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz")

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* LANGUAGE SELECT */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
        <Select value={language} onValueChange={(v) => setLanguage(v as "uz" | "ru" | "en")}>
          <SelectTrigger className="w-20">
            <Globe className="w-4 h-4 text-orange-600" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uz">UZ</SelectItem>
            <SelectItem value="ru">RU</SelectItem>
            <SelectItem value="en">EN</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-6">
        {/* LEFT: Teacher Info */}
        <div className="flex-1 bg-white/90 rounded-xl shadow-xl p-6 flex flex-col gap-4">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-orange-600 mx-auto md:mx-0"
          />
          <h2 className="text-2xl font-semibold text-orange-600 text-center md:text-left">{teacher.name}</h2>
          <p className="text-gray-600 text-center md:text-left">{teacher.subjects[language]}</p>
          <p className="text-gray-500 mt-2">{teacher.bios[language]}</p>
        </div>

        {/* RIGHT: AI Chat */}
        <div className="md:w-1/3 fixed md:static bottom-4 right-4 md:right-auto md:bottom-auto z-50 w-80 md:w-full">
          <div className="bg-white/90 p-4 rounded-xl shadow-xl flex flex-col">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">Chat with {teacher.name}</h3>
            <AIChat
              teachers={[
                {
                  id: teacher.id,
                  name: teacher.name,
                  avatar: teacher.avatar,
                  subject: teacher.subjects[language],
                  bio: teacher.bios[language],
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}