"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Globe, Languages, Award, Clock, MessageCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

type Language = "uz" | "ru" | "en"

const translations = {
  uz: {
    title: "TravelUz",
    guides: "Gidlar",
    searchPlaceholder: "Gidlarni qidiring...",
    location: "Joylashuv",
    rating: "Reyting",
    experience: "Tajriba",
    languages: "Tillar",
    speciality: "Mutaxassislik",
    reviews: "Sharhlar",
    hourlyRate: "Soatlik narx",
    contactGuide: "Gid bilan bog'lanish",
    viewProfile: "Profilni ko'rish",
    home: "Bosh sahifa",
    hotels: "Mehmonxonalar",
    register: "Ro'yxatdan o'tish",
    years: "yil",
    verified: "Tasdiqlangan",
    topRated: "Eng yuqori baholangan",
    newGuides: "Yangi gidlar",
  },
  ru: {
    title: "TravelUz",
    guides: "Гиды",
    searchPlaceholder: "Поиск гидов...",
    location: "Местоположение",
    rating: "Рейтинг",
    experience: "Опыт",
    languages: "Языки",
    speciality: "Специальность",
    reviews: "Отзывы",
    hourlyRate: "Почасовая оплата",
    contactGuide: "Связаться с гидом",
    viewProfile: "Посмотреть профиль",
    home: "Главная",
    hotels: "Отели",
    register: "Регистрация",
    years: "лет",
    verified: "Проверен",
    topRated: "Лучшие по рейтингу",
    newGuides: "Новые гиды",
  },
  en: {
    title: "TravelUz",
    guides: "Guides",
    searchPlaceholder: "Search guides...",
    location: "Location",
    rating: "Rating",
    experience: "Experience",
    languages: "Languages",
    speciality: "Speciality",
    reviews: "Reviews",
    hourlyRate: "Hourly Rate",
    contactGuide: "Contact Guide",
    viewProfile: "View Profile",
    home: "Home",
    hotels: "Hotels",
    register: "Register",
    years: "years",
    verified: "Verified",
    topRated: "Top Rated",
    newGuides: "New Guides",
  },
}

const guides = [
  {
    id: 1,
    name: "Aziz Karimov",
    location: {
      uz: "Samarqand",
      ru: "Самарканд",
      en: "Samarkand",
    },
    speciality: {
      uz: "Tarix mutaxassisi",
      ru: "Специалист по истории",
      en: "History Specialist",
    },
    description: {
      uz: "15 yillik tajribaga ega professional gid. Samarqandning barcha tarixiy joylarini mukammal biladi.",
      ru: "Профессиональный гид с 15-летним опытом. Отлично знает все исторические места Самарканда.",
      en: "Professional guide with 15 years of experience. Excellent knowledge of all historical places in Samarkand.",
    },
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviews: 156,
    experience: 15,
    languages: ["UZ", "RU", "EN", "TR"],
    hourlyRate: 25,
    verified: true,
    category: "topRated",
  },
  {
    id: 2,
    name: "Malika Tosheva",
    location: {
      uz: "Buxoro",
      ru: "Бухара",
      en: "Bukhara",
    },
    speciality: {
      uz: "Me'morchilik gidi",
      ru: "Архитектурный гид",
      en: "Architecture Guide",
    },
    description: {
      uz: "Buxoroning noyob me'moriy yodgorliklarini chuqur o'rganuvchi mutaxassis.",
      ru: "Специалист, глубоко изучающий уникальные архитектурные памятники Бухары.",
      en: "Specialist deeply studying the unique architectural monuments of Bukhara.",
    },
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviews: 89,
    experience: 8,
    languages: ["UZ", "RU", "EN"],
    hourlyRate: 20,
    verified: true,
    category: "topRated",
  },
  {
    id: 3,
    name: "Bobur Rahimov",
    location: {
      uz: "Xiva",
      ru: "Хива",
      en: "Khiva",
    },
    speciality: {
      uz: "Madaniyat gidi",
      ru: "Культурный гид",
      en: "Cultural Guide",
    },
    description: {
      uz: "Xivaning boy madaniy merosini sevib o'rganuvchi yosh mutaxassis.",
      ru: "Молодой специалист, изучающий богое культурное наследие Хивы.",
      en: "Young specialist studying the rich cultural heritage of Khiva.",
    },
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.6,
    reviews: 45,
    experience: 5,
    languages: ["UZ", "RU"],
    hourlyRate: 18,
    verified: true,
    category: "newGuides",
  },
  // {
  //   id: 4,
  //   name: "Nigora Abdullayeva",
  //   location: {
  //     uz: "Toshkent",
  //     ru: "Ташкент",
  //     en: "Tashkent",
  //   },
  //   speciality: {
  //     uz: "Shahar gidi",
  //     ru: "Городской гид",
  //     en: "City Guide",
  //   },
  //   description: {
  //     uz: "Toshkentning zamonaviy va tarixiy joylarini birlashtiruvchi professional gid.",
  //     ru: "Профессиональный гид, объединяющий современные и исторические места Ташкента.",
  //     en: "Professional guide combining modern and historical places of Tashkent.",
  //   },
  //   image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  //   rating: 4.7,
  //   reviews: 78,
  //   experience: 10,
  //   languages: ["UZ", "RU", "EN"],
  //   hourlyRate: 22,
  //   verified: true,
  //   category: "topRated",
  // },
  // {
  //   id: 5,
  //   name: "Jasur Mirzayev",
  //   location: {
  //     uz: "Farg'ona",
  //     ru: "Фергана",
  //     en: "Fergana",
  //   },
  //   speciality: {
  //     uz: "Tabiat gidi",
  //     ru: "Природный гид",
  //     en: "Nature Guide",
  //   },
  //   description: {
  //     uz: "Farg'ona vodiysining tabiy go'zalliklarini ko'rsatuvchi mutaxassis.",
  //     ru: "Специалист, показывающий природные красоты Ферганской долины.",
  //     en: "Specialist showing the natural beauty of Fergana Valley.",
  //   },
  //   image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  //   rating: 4.5,
  //   reviews: 32,
  //   experience: 3,
  //   languages: ["UZ", "RU"],
  //   hourlyRate: 15,
  //   verified: false,
  //   category: "newGuides",
  // },
  // {
  //   id: 6,
  //   name: "Dilnoza Saidova",
  //   location: {
  //     uz: "Nukus",
  //     ru: "Нукус",
  //     en: "Nukus",
  //   },
  //   speciality: {
  //     uz: "San'at gidi",
  //     ru: "Искусствовед",
  //     en: "Art Guide",
  //   },
  //   description: {
  //     uz: "Savitskiy muzeyi va zamonaviy san'at bo'yicha mutaxassis.",
  //     ru: "Специалист по музею Савицкого и современному искусству.",
  //     en: "Specialist in Savitsky Museum and contemporary art.",
  //   },
  //   image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  //   rating: 4.4,
  //   reviews: 28,
  //   experience: 4,
  //   languages: ["UZ", "RU", "EN"],
  //   hourlyRate: 16,
  //   verified: true,
  //   category: "newGuides",
  // },
]

export default function GuidesPage() {
  const [language, setLanguage] = useState<Language>("uz")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const t = translations[language]

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.location[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.speciality[language].toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = filterCategory === "all" || guide.category === filterCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent cursor-pointer">
                  {t.title}
                </h1>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors">
                {t.home}
              </Link>
              <Link href="/hotels" className="text-gray-600 hover:text-orange-600 transition-colors">
                {t.hotels}
              </Link>
              <Link href="/guides" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                {t.guides}
              </Link>
              <Link href="/register" className="text-gray-600 hover:text-orange-600 transition-colors">
                {t.register}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger className="w-20 border-orange-200 focus:border-orange-400">
                  <Globe className="w-4 h-4 text-orange-600" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uz">UZ</SelectItem>
                  <SelectItem value="ru">RU</SelectItem>
                  <SelectItem value="en">EN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t.guides}
          </h2>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400"
              />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48 border-orange-200 focus:border-orange-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Guides</SelectItem>
                <SelectItem value="topRated">{t.topRated}</SelectItem>
                <SelectItem value="newGuides">{t.newGuides}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card
                key={guide.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100"
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-20 h-20 mx-auto border-4 border-orange-200">
                      <AvatarImage src={guide.image || "/placeholder.svg"} alt={guide.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                        {guide.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {guide.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <CardTitle className="text-xl text-gray-800">{guide.name}</CardTitle>
                  <CardDescription className="flex items-center justify-center mt-1 text-orange-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {guide.location[language]}
                  </CardDescription>

                  <div className="flex items-center justify-center mt-2">
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-yellow-700">{guide.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({guide.reviews})</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">{t.speciality}</h4>
                    <p className="text-sm text-orange-600">{guide.speciality[language]}</p>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">{guide.description[language]}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="font-medium">{t.experience}</span>
                      </div>
                      <p className="text-orange-600">
                        {guide.experience} {t.years}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Languages className="w-4 h-4 mr-1" />
                        <span className="font-medium">{t.languages}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {guide.languages.map((lang) => (
                          <Badge
                            key={lang}
                            variant="outline"
                            className="text-xs px-2 py-0 border-orange-200 text-orange-600"
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-orange-100">
                    <div>
                      <p className="text-sm text-gray-600">{t.hourlyRate}</p>
                      <p className="text-lg font-bold text-green-600">${guide.hourlyRate}/hr</p>
                    </div>
                    {guide.verified && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">{t.verified}</Badge>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Link href="/payment" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {t.contactGuide}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      {t.viewProfile}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
