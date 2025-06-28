"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MapPin, Star, CalendarIcon, Globe, Wifi, Car, Coffee, Utensils, Dumbbell, Waves } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { format } from "date-fns"

type Language = "uz" | "ru" | "en"

const translations = {
  uz: {
    title: "TravelUz",
    hotels: "Mehmonxonalar",
    searchPlaceholder: "Mehmonxonalarni qidiring...",
    checkIn: "Kelish sanasi",
    checkOut: "Ketish sanasi",
    guests: "Mehmonlar",
    searchHotels: "Mehmonxonalarni qidirish",
    location: "Joylashuv",
    rating: "Reyting",
    price: "Narx",
    perNight: "tuniga",
    bookNow: "Hozir bron qilish",
    viewDetails: "Batafsil ko'rish",
    amenities: "Qulayliklar",
    home: "Bosh sahifa",
    guides: "Gidlar",
    register: "Ro'yxatdan o'tish",
    myProfile: "Mening profilim",
    guideProfile: "Gid profili",
  },
  ru: {
    title: "TravelUz",
    hotels: "Отели",
    searchPlaceholder: "Поиск отелей...",
    checkIn: "Дата заезда",
    checkOut: "Дата выезда",
    guests: "Гости",
    searchHotels: "Поиск отелей",
    location: "Местоположение",
    rating: "Рейтинг",
    price: "Цена",
    perNight: "за ночь",
    bookNow: "Забронировать",
    viewDetails: "Подробнее",
    amenities: "Удобства",
    home: "Главная",
    guides: "Гиды",
    register: "Регистрация",
    myProfile: "Мой профиль",
    guideProfile: "Профиль гида",
  },
  en: {
    title: "TravelUz",
    hotels: "Hotels",
    searchPlaceholder: "Search hotels...",
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    searchHotels: "Search Hotels",
    location: "Location",
    rating: "Rating",
    price: "Price",
    perNight: "per night",
    bookNow: "Book Now",
    viewDetails: "View Details",
    amenities: "Amenities",
    home: "Home",
    guides: "Guides",
    register: "Register",
    myProfile: "My Profile",
    guideProfile: "Guide Profile",
  },
}

const hotels = [
  {
    id: 1,
    name: {
      uz: "Registon Plaza Hotel",
      ru: "Отель Регистан Плаза",
      en: "Registan Plaza Hotel",
    },
    location: {
      uz: "Samarqand",
      ru: "Самарканд",
      en: "Samarkand",
    },
    description: {
      uz: "Registon maydoniga yaqin joylashgan hashamatli mehmonxona",
      ru: "Роскошный отель рядом с площадью Регистан",
      en: "Luxury hotel near Registan Square",
    },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
    rating: 4.8,
    price: 120,
    amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
  },
  {
    id: 2,
    name: {
      uz: "Xiva Palace Hotel",
      ru: "Отель Хива Палас",
      en: "Khiva Palace Hotel",
    },
    location: {
      uz: "Xiva",
      ru: "Хива",
      en: "Khiva",
    },
    description: {
      uz: "Ichan Qal'a ichida joylashgan tarixiy mehmonxona",
      ru: "Исторический отель в Ичан-Кале",
      en: "Historic hotel inside Itchan Kala",
    },
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&h=300&fit=crop",
    rating: 4.6,
    price: 95,
    amenities: ["wifi", "restaurant", "breakfast"],
  },
  {
    id: 3,
    name: {
      uz: "Buxoro Grand Hotel",
      ru: "Гранд Отель Бухара",
      en: "Bukhara Grand Hotel",
    },
    location: {
      uz: "Buxoro",
      ru: "Бухара",
      en: "Bukhara",
    },
    description: {
      uz: "Zamonaviy qulayliklar bilan jihozlangan mehmonxona",
      ru: "Отель с современными удобствами",
      en: "Hotel with modern amenities",
    },
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop",
    rating: 4.7,
    price: 110,
    amenities: ["wifi", "parking", "restaurant", "gym"],
  },
  {
    id: 4,
    name: {
      uz: "Toshkent City Hotel",
      ru: "Отель Ташкент Сити",
      en: "Tashkent City Hotel",
    },
    location: {
      uz: "Toshkent",
      ru: "Ташкент",
      en: "Tashkent",
    },
    description: {
      uz: "Shahar markazida joylashgan zamonaviy mehmonxona",
      ru: "Современный отель в центре города",
      en: "Modern hotel in the city center",
    },
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&h=300&fit=crop",
    rating: 4.5,
    price: 85,
    amenities: ["wifi", "parking", "restaurant", "breakfast"],
  },
  {
    id: 5,
    name: {
      uz: "Fergana Valley Resort",
      ru: "Курорт Ферганская Долина",
      en: "Fergana Valley Resort",
    },
    location: {
      uz: "Farg'ona",
      ru: "Фергана",
      en: "Fergana",
    },
    description: {
      uz: "Tabiat qo'ynida joylashgan dam olish maskani",
      ru: "Курорт на лоне природы",
      en: "Nature resort getaway",
    },
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop",
    rating: 4.4,
    price: 75,
    amenities: ["wifi", "restaurant", "pool", "gym"],
  },
  {
    id: 6,
    name: {
      uz: "Nukus Business Hotel",
      ru: "Бизнес Отель Нукус",
      en: "Nukus Business Hotel",
    },
    location: {
      uz: "Nukus",
      ru: "Нукус",
      en: "Nukus",
    },
    description: {
      uz: "Biznes sayohatchilari uchun qulay mehmonxona",
      ru: "Удобный отель для бизнес-путешественников",
      en: "Convenient hotel for business travelers",
    },
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=300&fit=crop",
    rating: 4.3,
    price: 65,
    amenities: ["wifi", "parking", "breakfast"],
  },
]

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  restaurant: Utensils,
  gym: Dumbbell,
  pool: Waves,
}

export default function HotelsPage() {
  const [language, setLanguage] = useState<Language>("uz")
  const [searchQuery, setSearchQuery] = useState("")
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()
  const [guests, setGuests] = useState("2")

  const t = translations[language]

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location[language].toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
              <Link href="/hotels" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                {t.hotels}
              </Link>
              <Link href="/guides" className="text-gray-600 hover:text-orange-600 transition-colors">
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

      {/* Search Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            {t.hotels}
          </h2>

          <Card className="p-6 shadow-xl border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.searchPlaceholder}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.checkIn}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-orange-200 bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-orange-600" />
                      {checkInDate ? format(checkInDate, "PPP") : t.checkIn}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.checkOut}</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-orange-200 bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-orange-600" />
                      {checkOutDate ? format(checkOutDate, "PPP") : t.checkOut}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.guests}</label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 {t.guests}</SelectItem>
                    <SelectItem value="2">2 {t.guests}</SelectItem>
                    <SelectItem value="3">3 {t.guests}</SelectItem>
                    <SelectItem value="4">4 {t.guests}</SelectItem>
                    <SelectItem value="5">5+ {t.guests}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full md:w-auto bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg">
                {t.searchHotels}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-orange-100"
              >
                <div className="relative">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name[language]}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">
                      ${hotel.price} {t.perNight}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-gray-800">{hotel.name[language]}</CardTitle>
                      <CardDescription className="flex items-center mt-1 text-orange-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.location[language]}
                      </CardDescription>
                    </div>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium text-yellow-700">{hotel.rating}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description[language]}</p>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">{t.amenities}:</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity) => {
                        const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons]
                        return (
                          <div key={amenity} className="flex items-center bg-orange-50 px-2 py-1 rounded-full">
                            {IconComponent && <IconComponent className="w-3 h-3 text-orange-600 mr-1" />}
                            <span className="text-xs text-orange-700 capitalize">{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link href="/payment" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg">
                        {t.bookNow}
                      </Button>
                    </Link>
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
      </section>
    </div>
  )
}
