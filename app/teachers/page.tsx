"use client";

import React, { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Globe } from "lucide-react";
import Link from "next/link";
import TeacherCard from "@/components/TeachersCard";
import { teachers } from "./data";

const translations = {
  uz: { title: "TravelUz", home: "Bosh sahifa", teachers: "O'qituvchilar" },
  ru: { title: "TravelUz", home: "Главная", teachers: "Учителя" },
  en: { title: "TravelUz", home: "Home", teachers: "Teachers" },
};

export default function TeachersPage() {
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Navbar */}
      <header className="bg-white/90 shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/"><h1 className="text-2xl font-bold text-orange-600">{t.title}</h1></Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-orange-600">{t.home}</Link>
            <Link href="/teachers" className="text-orange-600 font-medium">{t.teachers}</Link>
          </nav>
          <Select value={language} onValueChange={(v) => setLanguage(v as "uz" | "ru" | "en")}>
            <SelectTrigger className="w-20"><Globe className="w-4 h-4 text-orange-600" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="uz">UZ</SelectItem>
              <SelectItem value="ru">RU</SelectItem>
              <SelectItem value="en">EN</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* Teachers Grid */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">{t.teachers}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              language={language}
              onViewProfile={() => window.open(`/teachers/${teacher.id}`, "_blank")}
            />
          ))}
        </div>
      </main>
    </div>
  );
}