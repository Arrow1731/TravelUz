"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Globe, User, UserCheck, Upload, Camera } from "lucide-react"
import Link from "next/link"

type Language = "uz" | "ru" | "en"

const translations = {
  uz: {
    title: "TravelUz",
    register: "Ro'yxatdan o'tish",
    userType: "Foydalanuvchi turi",
    regularUser: "Oddiy foydalanuvchi",
    professionalGuide: "Professional gid",
    personalInfo: "Shaxsiy ma'lumotlar",
    firstName: "Ism",
    lastName: "Familiya",
    email: "Email",
    phone: "Telefon",
    password: "Parol",
    confirmPassword: "Parolni tasdiqlash",
    profilePhoto: "Profil rasmi",
    uploadPhoto: "Rasm yuklash",
    guideInfo: "Gid ma'lumotlari",
    experience: "Tajriba (yillarda)",
    specialization: "Mutaxassislik",
    languages: "Tillar",
    hourlyRate: "Soatlik narx ($)",
    description: "O'zingiz haqingizda",
    certifications: "Sertifikatlar",
    location: "Joylashuv",
    agreeTerms: "Foydalanish shartlariga roziman",
    createAccount: "Hisob yaratish",
    alreadyHaveAccount: "Hisobingiz bormi?",
    signIn: "Kirish",
    home: "Bosh sahifa",
    hotels: "Mehmonxonalar",
    guides: "Gidlar",
  },
  ru: {
    title: "TravelUz",
    register: "Регистрация",
    userType: "Тип пользователя",
    regularUser: "Обычный пользователь",
    professionalGuide: "Профессиональный гид",
    personalInfo: "Личная информация",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Email",
    phone: "Телефон",
    password: "Пароль",
    confirmPassword: "Подтвердить пароль",
    profilePhoto: "Фото профиля",
    uploadPhoto: "Загрузить фото",
    guideInfo: "Информация о гиде",
    experience: "Опыт (в годах)",
    specialization: "Специализация",
    languages: "Языки",
    hourlyRate: "Почасовая оплата ($)",
    description: "О себе",
    certifications: "Сертификаты",
    location: "Местоположение",
    agreeTerms: "Согласен с условиями использования",
    createAccount: "Создать аккаунт",
    alreadyHaveAccount: "Уже есть аккаунт?",
    signIn: "Войти",
    home: "Главная",
    hotels: "Отели",
    guides: "Гиды",
  },
  en: {
    title: "TravelUz",
    register: "Register",
    userType: "User Type",
    regularUser: "Regular User",
    professionalGuide: "Professional Guide",
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    confirmPassword: "Confirm Password",
    profilePhoto: "Profile Photo",
    uploadPhoto: "Upload Photo",
    guideInfo: "Guide Information",
    experience: "Experience (years)",
    specialization: "Specialization",
    languages: "Languages",
    hourlyRate: "Hourly Rate ($)",
    description: "About Yourself",
    certifications: "Certifications",
    location: "Location",
    agreeTerms: "I agree to the terms of service",
    createAccount: "Create Account",
    alreadyHaveAccount: "Already have an account?",
    signIn: "Sign In",
    home: "Home",
    hotels: "Hotels",
    guides: "Guides",
  },
}

const specializations = {
  uz: ["Tarix", "Me'morchilik", "Madaniyat", "Tabiat", "San'at", "Shahar gidi"],
  ru: ["История", "Архитектура", "Культура", "Природа", "Искусство", "Городской гид"],
  en: ["History", "Architecture", "Culture", "Nature", "Art", "City Guide"],
}

const locations = {
  uz: ["Toshkent", "Samarqand", "Buxoro", "Xiva", "Farg'ona", "Nukus", "Namangan", "Andijon"],
  ru: ["Ташкент", "Самарканд", "Бухара", "Хива", "Фергана", "Нукус", "Наманган", "Андижан"],
  en: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Fergana", "Nukus", "Namangan", "Andijan"],
}

export default function RegisterPage() {
  const [language, setLanguage] = useState<Language>("uz")
  const [userType, setUserType] = useState<"user" | "guide">("user")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    experience: "",
    specialization: "",
    languages: [] as string[],
    hourlyRate: "",
    description: "",
    location: "",
    agreeTerms: false,
  })

  const t = translations[language]

  const handleLanguageToggle = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang) ? prev.languages.filter((l) => l !== lang) : [...prev.languages, lang],
    }))
  }

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
              <Link href="/guides" className="text-gray-600 hover:text-orange-600 transition-colors">
                {t.guides}
              </Link>
              <Link href="/register" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
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

      {/* Registration Form */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-orange-100 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {t.register}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {userType === "user" ? t.regularUser : t.professionalGuide}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700">{t.userType}</Label>
                <RadioGroup value={userType} onValueChange={(value: "user" | "guide") => setUserType(value)}>
                  <div className="flex items-center space-x-2 p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="flex items-center cursor-pointer">
                      <User className="w-4 h-4 mr-2 text-orange-600" />
                      {t.regularUser}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                    <RadioGroupItem value="guide" id="guide" />
                    <Label htmlFor="guide" className="flex items-center cursor-pointer">
                      <UserCheck className="w-4 h-4 mr-2 text-orange-600" />
                      {t.professionalGuide}
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-orange-200 pb-2">
                  {t.personalInfo}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.firstName}</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.lastName}</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">{t.password}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="space-y-2">
                  <Label>{t.profilePhoto}</Label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-orange-600" />
                    </div>
                    <Button
                      variant="outline"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {t.uploadPhoto}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Guide-specific Information */}
              {userType === "guide" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b border-orange-200 pb-2">{t.guideInfo}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">{t.experience}</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hourlyRate">{t.hourlyRate}</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">{t.specialization}</Label>
                    <Select
                      value={formData.specialization}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, specialization: value }))}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations[language].map((spec) => (
                          <SelectItem key={spec} value={spec}>
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">{t.location}</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations[language].map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t.languages}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["UZ", "RU", "EN", "TR", "DE", "FR", "ES", "IT"].map((lang) => (
                        <div key={lang} className="flex items-center space-x-2">
                          <Checkbox
                            id={lang}
                            checked={formData.languages.includes(lang)}
                            onCheckedChange={() => handleLanguageToggle(lang)}
                          />
                          <Label htmlFor={lang} className="text-sm">
                            {lang}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t.description}</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="border-orange-200 focus:border-orange-400 min-h-[100px]"
                      placeholder={
                        language === "uz"
                          ? "O'zingiz va xizmatlaringiz haqida yozing..."
                          : language === "ru"
                            ? "Расскажите о себе и своих услугах..."
                            : "Tell about yourself and your services..."
                      }
                    />
                  </div>
                </div>
              )}

              {/* Terms Agreement */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm text-gray-600">
                  {t.agreeTerms}
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg py-3 text-lg"
                disabled={!formData.agreeTerms}
              >
                {t.createAccount}
              </Button>

              {/* Sign In Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  {t.alreadyHaveAccount}{" "}
                  <Link href="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                    {t.signIn}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
