"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Star, User, Globe, Menu, Heart, Clock, Users, Hotel, UserCheck } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

type Language = "uz" | "ru" | "en"

const translations = {
  uz: {
    title: "TravelUz",
    subtitle: "O'zbekistonning go'zal joylarini kashf eting",
    searchPlaceholder: "Joylarni qidiring...",
    historicalPlaces: "Tarixiy joylar",
    hotels: "Mehmonxonalar",
    guides: "Gidlar",
    myProfile: "Mening profilim",
    guideProfile: "Gid profili",
    register: "Ro'yxatdan o'tish",
    location: "Joylashuv",
    rating: "Reyting",
    duration: "Davomiyligi",
    price: "Narx",
    bookNow: "Hozir bron qilish",
    viewDetails: "Batafsil ko'rish",
    popularDestinations: "Mashhur yo'nalishlar",
    topGuides: "Eng yaxshi gidlar",
    home: "Bosh sahifa",
    about: "Haqida",
    contact: "Aloqa",
  },
  ru: {
    title: "TravelUz",
    subtitle: "Откройте для себя красивые места Узбекистана",
    searchPlaceholder: "Поиск мест...",
    historicalPlaces: "Исторические места",
    hotels: "Отели",
    guides: "Гиды",
    myProfile: "Мой профиль",
    guideProfile: "Профиль гида",
    register: "Регистрация",
    location: "Местоположение",
    rating: "Рейтинг",
    duration: "Продолжительность",
    price: "Цена",
    bookNow: "Забронировать",
    viewDetails: "Подробнее",
    popularDestinations: "Популярные направления",
    topGuides: "Лучшие гиды",
    home: "Главная",
    about: "О нас",
    contact: "Контакты",
  },
  en: {
    title: "TravelUz",
    subtitle: "Discover the beautiful places of Uzbekistan",
    searchPlaceholder: "Search places...",
    historicalPlaces: "Historical Places",
    hotels: "Hotels",
    guides: "Guides",
    myProfile: "My Profile",
    guideProfile: "Guide Profile",
    register: "Register",
    location: "Location",
    rating: "Rating",
    duration: "Duration",
    price: "Price",
    bookNow: "Book Now",
    viewDetails: "View Details",
    popularDestinations: "Popular Destinations",
    topGuides: "Top Guides",
    home: "Home",
    about: "About",
    contact: "Contact",
  },
}

const historicalPlaces = [
  {
    id: 1,
    name: {
      uz: "Registon maydoni",
      ru: "Площадь Регистан",
      en: "Registan Square",
    },
    location: {
      uz: "Samarqand",
      ru: "Самарканд",
      en: "Samarkand",
    },
    description: {
      uz: "O'rta Asiyoning eng go'zal me'moriy yodgorligi",
      ru: "Самый красивый архитектурный памятник Центральной Азии",
      en: "The most beautiful architectural monument of Central Asia",
    },
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=300&fit=crop",
    rating: 4.9,
    duration: "2-3 soat",
    price: "$25",
  },
  {
    id: 2,
    name: {
      uz: "Ichan Qal'a",
      ru: "Ичан-Кала",
      en: "Itchan Kala",
    },
    location: {
      uz: "Xiva",
      ru: "Хива",
      en: "Khiva",
    },
    description: {
      uz: "UNESCO tomonidan himoyalangan tarixiy shahar",
      ru: "Исторический город под защитой ЮНЕСКО",
      en: "UNESCO protected historical city",
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    rating: 4.8,
    duration: "4-5 soat",
    price: "$30",
  },
  {
    id: 3,
    name: {
      uz: "Bibi-Xonum masjidi",
      ru: "Мечеть Биби-Ханум",
      en: "Bibi-Khanym Mosque",
    },
    location: {
      uz: "Samarqand",
      ru: "Самарканд",
      en: "Samarkand",
    },
    description: {
      uz: "Amir Temurning ulug' masjidi",
      ru: "Великая мечеть Амира Темура",
      en: "The great mosque of Amir Temur",
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    rating: 4.7,
    duration: "1-2 soat",
    price: "$20",
  },
  {
    id: 4,
    name: {
      uz: "Shohizinda maqbarasi",
      ru: "Мавзолей Шахи-Зинда",
      en: "Shah-i-Zinda Mausoleum",
    },
    location: {
      uz: "Samarqand",
      ru: "Самарканд",
      en: "Samarkand",
    },
    description: {
      uz: "Noyob gumbazli maqbaralar majmuasi",
      ru: "Уникальный комплекс купольных мавзолеев",
      en: "Unique complex of domed mausoleums",
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    rating: 4.8,
    duration: "2-3 soat",
    price: "$22",
  },
  {
    id: 5,
    name: {
      uz: "Gur-Emir maqbarasi",
      ru: "Мавзолей Гур-Эмир",
      en: "Gur-e-Amir Mausoleum",
    },
    location: {
      uz: "Samarqand",
      ru: "Самарканд",
      en: "Samarkand",
    },
    description: {
      uz: "Amir Temur va uning avlodlarining maqbarasi",
      ru: "Мавзолей Амира Темура и его потомков",
      en: "Mausoleum of Amir Temur and his descendants",
    },
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=500&h=300&fit=crop",
    rating: 4.6,
    duration: "1-2 soat",
    price: "$18",
  },
  {
    id: 6,
    name: {
      uz: "Lyabi-Hauz majmuasi",
      ru: "Комплекс Ляби-Хауз",
      en: "Lyabi-Hauz Complex",
    },
    location: {
      uz: "Buxoro",
      ru: "Бухара",
      en: "Bukhara",
    },
    description: {
      uz: "Qadimiy hovuz atrofidagi me'moriy majmua",
      ru: "Архитектурный комплекс вокруг древнего пруда",
      en: "Architectural complex around an ancient pond",
    },
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    rating: 4.5,
    duration: "2-3 soat",
    price: "$15",
  },
]

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("uz")
  const [searchQuery, setSearchQuery] = useState("")
  const [userType, setUserType] = useState<"user" | "guide">("user")

  const t = translations[language]

  const filteredPlaces = historicalPlaces.filter(
    (place) =>
      place.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                {t.home}
              </Link>
              <Link
                href="/hotels"
                className="text-gray-600 hover:text-orange-600 transition-colors flex items-center space-x-1"
              >
                <Hotel className="w-4 h-4" />
                <span>{t.hotels}</span>
              </Link>
              <Link
                href="/guides"
                className="text-gray-600 hover:text-orange-600 transition-colors flex items-center space-x-1"
              >
                <Users className="w-4 h-4" />
                <span>{t.guides}</span>
              </Link>
              <Link
                href="/register"
                className="text-gray-600 hover:text-orange-600 transition-colors flex items-center space-x-1"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.register}</span>
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

              <Select value={userType} onValueChange={(value: "user" | "guide") => setUserType(value)}>
                <SelectTrigger className="w-32 border-orange-200 focus:border-orange-400">
                  <User className="w-4 h-4 text-orange-600" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">{t.myProfile}</SelectItem>
                  <SelectItem value="guide">{t.guideProfile}</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="md:hidden border-orange-200 hover:bg-orange-50 bg-transparent"
                  >
                    <Menu className="w-4 h-4 text-orange-600" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-gradient-to-b from-orange-50 to-red-50">
                  <SheetHeader>
                    <SheetTitle className="text-orange-600">{t.title}</SheetTitle>
                    <SheetDescription>{t.subtitle}</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-6">
                    <Link
                      href="/"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <span>{t.home}</span>
                    </Link>
                    <Link
                      href="/hotels"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <Hotel className="w-4 h-4" />
                      <span>{t.hotels}</span>
                    </Link>
                    <Link
                      href="/guides"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <Users className="w-4 h-4" />
                      <span>{t.guides}</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>{t.register}</span>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
            {t.subtitle}
          </h2>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-4 text-lg border-orange-200 focus:border-orange-400 focus:ring-orange-400 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800">{t.historicalPlaces}</h3>
          <Badge variant="secondary" className="text-sm bg-orange-100 text-orange-800 border-orange-200">
            {filteredPlaces.length} {language === "uz" ? "joy" : language === "ru" ? "мест" : "places"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <Card
              key={place.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100"
            >
              <div className="relative">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name[language]}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg"
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </Button>
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-orange-600 hover:bg-orange-700 text-white">{place.price}</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-gray-800">{place.name[language]}</CardTitle>
                    <CardDescription className="flex items-center mt-1 text-orange-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {place.location[language]}
                    </CardDescription>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-yellow-700">{place.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.description[language]}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {place.duration}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg">
                    {t.bookNow}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    {t.viewDetails}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">{t.title}</h3>
              <p className="text-orange-100">{t.subtitle}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-orange-100 hover:text-white transition-colors">
                  {t.home}
                </Link>
                <Link href="/hotels" className="block text-orange-100 hover:text-white transition-colors">
                  {t.hotels}
                </Link>
                <Link href="/guides" className="block text-orange-100 hover:text-white transition-colors">
                  {t.guides}
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.about}</h4>
              <div className="space-y-2">
                <p className="text-orange-100">Professional travel services</p>
                <p className="text-orange-100">Expert local guides</p>
                <p className="text-orange-100">Best hotel deals</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.contact}</h4>
              <div className="space-y-2 text-orange-100">
                <p>+998 90 123 45 67</p>
                <p>info@traveluz.com</p>
                <p>Tashkent, Uzbekistan</p>
              </div>
            </div>
          </div>
          <div className="border-t border-orange-500 mt-8 pt-8 text-center text-orange-100">
            <p>&copy; 2024 TravelUz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
