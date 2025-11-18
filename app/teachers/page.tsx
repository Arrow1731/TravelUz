"use client"

import React, { useState } from "react"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Globe } from "lucide-react"
import Link from "next/link"
import TeacherCard from "@/components/TeachersCard"

interface Teacher {
  id: string
  name: string
  avatar: string
  profileUrl: string
  subjects: { uz: string; ru: string; en: string }
  bios: { uz: string; ru: string; en: string }
}

const translations = {
  uz: { title: "TravelUz", home: "Bosh sahifa", teachers: "O'qituvchilar" },
  ru: { title: "TravelUz", home: "Главная", teachers: "Учителя" },
  en: { title: "TravelUz", home: "Home", teachers: "Teachers" },
}

// All 15 teachers with foreign languages
const teachers: Teacher[] = [
  {
    id: "t1",
    name: "Dr. Nuriddin",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    profileUrl: "/teachers/t1",
    subjects: { uz: "Ingliz tili", ru: "Английский язык", en: "English" },
    bios: {
      uz: "Tajriba: ingliz tili, IELTS tayyorlash va suhbat darslari.",
      ru: "Опыт: английский язык, подготовка к IELTS, разговорные уроки.",
      en: "Experience: English language, IELTS preparation, conversation lessons.",
    },
  },
  {
    id: "t2",
    name: "Ms. Dilnoza",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    profileUrl: "/teachers/t2",
    subjects: { uz: "Rus tili", ru: "Русский язык", en: "Russian" },
    bios: {
      uz: "Rus tili o'qituvchisi, yozma va og'zaki muloqotga e'tibor beradi.",
      ru: "Преподаватель русского языка, внимание на письменное и устное общение.",
      en: "Russian language teacher, focuses on written and spoken communication.",
    },
  },
  {
    id: "t3",
    name: "Mr. Aziz",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    profileUrl: "/teachers/t3",
    subjects: { uz: "Fransuz tili", ru: "Французский язык", en: "French" },
    bios: {
      uz: "Fransuz tili o'qituvchisi, boshlang'ich va ilg'or darajalar.",
      ru: "Преподаватель французского языка, начальный и продвинутый уровень.",
      en: "French language teacher, beginner and advanced levels.",
    },
  },
  {
    id: "t4",
    name: "Ms. Malika",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    profileUrl: "/teachers/t4",
    subjects: { uz: "Nemis tili", ru: "Немецкий язык", en: "German" },
    bios: {
      uz: "Nemis tili o'qituvchisi, talaffuz va grammatikaga e'tibor beradi.",
      ru: "Преподаватель немецкого языка, внимание на произношение и грамматику.",
      en: "German language teacher, focuses on pronunciation and grammar.",
    },
  },
  {
    id: "t5",
    name: "Mr. Timur",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    profileUrl: "/teachers/t5",
    subjects: { uz: "Ispan tili", ru: "Испанский язык", en: "Spanish" },
    bios: {
      uz: "Ispan tili darslari, suhbat va madaniyat bilan birga.",
      ru: "Уроки испанского языка с разговорной практикой и культурой.",
      en: "Spanish lessons with conversation practice and cultural context.",
    },
  },
  {
    id: "t6",
    name: "Ms. Sofia",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    profileUrl: "/teachers/t6",
    subjects: { uz: "Italian tili", ru: "Итальянский язык", en: "Italian" },
    bios: {
      uz: "Italian tili o'qituvchisi, grammatika va talaffuzga e'tibor beradi.",
      ru: "Преподаватель итальянского языка, внимание на грамматику и произношение.",
      en: "Italian teacher, focuses on grammar and pronunciation.",
    },
  },
  {
    id: "t7",
    name: "Mr. Alex",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    profileUrl: "/teachers/t7",
    subjects: { uz: "Xitoy tili", ru: "Китайский язык", en: "Chinese" },
    bios: {
      uz: "Xitoy tili o'qituvchisi, yozma va og'zaki muloqotga e'tibor beradi.",
      ru: "Преподаватель китайского языка, внимание на письменное и устное общение.",
      en: "Chinese language teacher, focuses on writing and speaking.",
    },
  },
  {
    id: "t8",
    name: "Ms. Amina",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    profileUrl: "/teachers/t8",
    subjects: { uz: "Yapon tili", ru: "Японский язык", en: "Japanese" },
    bios: {
      uz: "Yapon tili o'qituvchisi, boshlang'ich va ilg'or darajalar.",
      ru: "Преподаватель японского языка, начальный и продвинутый уровень.",
      en: "Japanese teacher, beginner and advanced levels.",
    },
  },
  {
    id: "t9",
    name: "Mr. John",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    profileUrl: "/teachers/t9",
    subjects: { uz: "Koreys tili", ru: "Корейский язык", en: "Korean" },
    bios: {
      uz: "Koreys tili o'qituvchisi, suhbat va talaffuz mashqlari.",
      ru: "Преподаватель корейского языка, разговорная практика и произношение.",
      en: "Korean teacher, conversation and pronunciation exercises.",
    },
  },
  {
    id: "t10",
    name: "Ms. Lara",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    profileUrl: "/teachers/t10",
    subjects: { uz: "Arab tili", ru: "Арабский язык", en: "Arabic" },
    bios: {
      uz: "Arab tili o'qituvchisi, madaniy kontekst bilan darslar.",
      ru: "Преподаватель арабского языка, уроки с культурным контекстом.",
      en: "Arabic teacher, lessons with cultural context.",
    },
  },
  {
    id: "t11",
    name: "Mr. David",
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    profileUrl: "/teachers/t11",
    subjects: { uz: "Nemis tili", ru: "Немецкий язык", en: "German" },
    bios: {
      uz: "Nemis tili, talaffuz va grammatikaga e'tibor bilan.",
      ru: "Немецкий язык с акцентом на произношение и грамматику.",
      en: "German teacher, focuses on pronunciation and grammar.",
    },
  },
  {
    id: "t12",
    name: "Ms. Emma",
    avatar: "https://randomuser.me/api/portraits/women/52.jpg",
    profileUrl: "/teachers/t12",
    subjects: { uz: "Fransuz tili", ru: "Французский язык", en: "French" },
    bios: {
      uz: "Fransuz tili, suhbat va yozma mashqlar bilan.",
      ru: "Французский язык с разговорными и письменными упражнениями.",
      en: "French teacher, with conversation and writing exercises.",
    },
  },
  {
    id: "t13",
    name: "Mr. Leo",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    profileUrl: "/teachers/t13",
    subjects: { uz: "Ispan tili", ru: "Испанский язык", en: "Spanish" },
    bios: {
      uz: "Ispan tili, talaffuz va suhbat mashqlariga e'tibor beradi.",
      ru: "Испанский язык, акцент на произношение и разговорную практику.",
      en: "Spanish teacher, focuses on pronunciation and conversation practice.",
    },
  },
  {
    id: "t14",
    name: "Ms. Nadia",
    avatar: "https://randomuser.me/api/portraits/women/77.jpg",
    profileUrl: "/teachers/t14",
    subjects: { uz: "Rus tili", ru: "Русский язык", en: "Russian" },
    bios: {
      uz: "Rus tili o'qituvchisi, suhbat va grammatikaga e'tibor beradi.",
      ru: "Преподаватель русского языка, внимание на разговор и грамматику.",
      en: "Russian teacher, focuses on conversation and grammar.",
    },
  },
  {
    id: "t15",
    name: "Mr. Alexey",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    profileUrl: "/teachers/t15",
    subjects: { uz: "Ingliz tili", ru: "Английский язык", en: "English" },
    bios: {
      uz: "Ingliz tili o'qituvchisi, IELTS va suhbat darslariga ixtisoslashgan.",
      ru: "Преподаватель английского языка, специализация на IELTS и разговорные уроки.",
      en: "English teacher, specialized in IELTS and conversation lessons.",
    },
  },
]

export default function TeachersPage() {
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz")
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* NAVBAR */}
      <header className="bg-white/90 shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-600">{t.title}</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-orange-600">{t.home}</Link>
            <Link href="/teachers" className="text-orange-600 font-medium">{t.teachers}</Link>
          </nav>
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
      </header>

      {/* TEACHERS GRID */}
      <main className="max-w-7xl mx-auto py-12 px-4">
        <h1 className="text-2xl font-semibold mb-6 text-center">{t.teachers}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              language={language}
              onViewProfile={() => window.open(teacher.profileUrl, "_blank")}
            />
          ))}
        </div>
      </main>
    </div>
  )
}