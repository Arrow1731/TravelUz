// // "use client"

// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// // import { Globe, User, UserCheck } from "lucide-react"
// // import Link from "next/link"

// // type Language = "uz" | "ru" | "en"

// // const translations = {
// //   uz: { title: "TravelUz", register: "Ro'yxatdan o'tish", userType: "Foydalanuvchi turi", regularUser: "Oddiy foydalanuvchi", professionalGuide: "Professional gid", personalInfo: "Shaxsiy ma'lumotlar", firstName: "Ism", lastName: "Familiya", email: "Email", phone: "Telefon", password: "Parol", confirmPassword: "Parolni tasdiqlash", profilePhoto: "Profil rasmi", uploadPhoto: "Rasm yuklash", guideInfo: "Gid ma'lumotlari", experience: "Tajriba (yillarda)", specialization: "Mutaxassislik", languages: "Tillar", hourlyRate: "Soatlik narx ($)", description: "O'zingiz haqingizda", certifications: "Sertifikatlar", location: "Joylashuv", agreeTerms: "Foydalanish shartlariga roziman", createAccount: "Hisob yaratish", alreadyHaveAccount: "Hisobingiz bormi?", signIn: "Kirish", home: "Bosh sahifa", hotels: "Mehmonxonalar", guides: "Gidlar" },

// //   ru: { title: "TravelUz", register: "Регистрация", userType: "Тип пользователя", regularUser: "Обычный пользователь", professionalGuide: "Профессиональный гид", personalInfo: "Личная информация", firstName: "Имя", lastName: "Фамилия", email: "Email", phone: "Телефон", password: "Пароль", confirmPassword: "Подтвердить пароль", profilePhoto: "Фото профиля", uploadPhoto: "Загрузить фото", guideInfo: "Информация о гиде", experience: "Опыт (в годах)", specialization: "Специализация", languages: "Языки", hourlyRate: "Почасовая оплата ($)", description: "О себе", certifications: "Сертификаты", location: "Местоположение", agreeTerms: "Согласен с условиями использования", createAccount: "Создать аккаунт", alreadyHaveAccount: "Уже есть аккаунт?", signIn: "Войти", home: "Главная", hotels: "Отели", guides: "Гиды" },

// //   en: { title: "TravelUz", register: "Register", userType: "User Type", regularUser: "Regular User", professionalGuide: "Professional Guide", personalInfo: "Personal Information", firstName: "First Name", lastName: "Last Name", email: "Email", phone: "Phone", password: "Password", confirmPassword: "Confirm Password", profilePhoto: "Profile Photo", uploadPhoto: "Upload Photo", guideInfo: "Guide Information", experience: "Experience (years)", specialization: "Specialization", languages: "Languages", hourlyRate: "Hourly Rate ($)", description: "About Yourself", certifications: "Certifications", location: "Location", agreeTerms: "I agree to the terms of service", createAccount: "Create Account", alreadyHaveAccount: "Already have an account?", signIn: "Sign In", home: "Home", hotels: "Hotels", guides: "Guides" },
// // }

// // const specializations = {
// //   uz: ["Tarix", "Me'morchilik", "Madaniyat", "Tabiat", "San'at", "Shahar gidi"],
// //   ru: ["История", "Архитектура", "Культура", "Природа", "Искусство", "Городской гид"],
// //   en: ["History", "Architecture", "Culture", "Nature", "Art", "City Guide"],
// // }

// // const locations = {
// //   uz: ["Toshkent", "Samarqand", "Buxoro", "Xiva", "Farg'ona", "Nukus", "Namangan", "Andijon"],
// //   ru: ["Ташкент", "Самарканд", "Бухара", "Хива", "Фергана", "Нукус", "Наманган", "Андижан"],
// //   en: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Fergana", "Nukus", "Namangan", "Andijan"],
// // }

// // export default function RegisterPage() {
// //   const [language, setLanguage] = useState<Language>("uz")
// //   const [userType, setUserType] = useState<"user" | "guide">("user")

// //   const [formData, setFormData] = useState({
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     confirmPassword: "",
// //     experience: "",
// //     specialization: "",
// //     languages: [] as string[],
// //     hourlyRate: "",
// //     description: "",
// //     location: "",
// //     agreeTerms: false,
// //   })

// //   const t = translations[language]

// //   const handleLanguageToggle = (lang: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       languages: prev.languages.includes(lang)
// //         ? prev.languages.filter(l => l !== lang)
// //         : [...prev.languages, lang],
// //     }))
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">

// //       {/* HEADER */}
// //       <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 sticky top-0 z-50">
// //         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

// //           <Link href="/">
// //             <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
// //               {t.title}
// //             </h1>
// //           </Link>

// //           <nav className="hidden md:flex items-center space-x-6">
// //             <Link href="/" className="hover:text-orange-600">{t.home}</Link>
// //             <Link href="/hotels" className="hover:text-orange-600">{t.hotels}</Link>
// //             <Link href="/guides" className="hover:text-orange-600">{t.guides}</Link>
// //             <Link href="/register" className="text-orange-600 font-medium">{t.register}</Link>
// //           </nav>

// //           <Select value={language} onValueChange={(v: Language) => setLanguage(v)}>
// //             <SelectTrigger className="w-20 border-orange-200">
// //               <Globe className="w-4 h-4 text-orange-600" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               <SelectItem value="uz">UZ</SelectItem>
// //               <SelectItem value="ru">RU</SelectItem>
// //               <SelectItem value="en">EN</SelectItem>
// //             </SelectContent>
// //           </Select>

// //         </div>
// //       </header>

// //       {/* FORM */}
// //       <div className="py-12 px-4">
// //         <div className="max-w-2xl mx-auto">
// //           <Card className="shadow-xl bg-white/90">

// //             <CardHeader className="text-center">
// //               <CardTitle className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
// //                 {t.register}
// //               </CardTitle>
// //               <CardDescription>
// //                 {userType === "user" ? t.regularUser : t.professionalGuide}
// //               </CardDescription>
// //             </CardHeader>

// //             <CardContent className="space-y-6">

// //               {/* USER TYPE SELECTOR */}
// //               <div className="space-y-3">
// //                 <Label>{t.userType}</Label>
// //                 <RadioGroup value={userType} onValueChange={(v: "user" | "guide") => setUserType(v)}>

// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem id="user" value="user" />
// //                     <Label htmlFor="user" className="flex items-center">
// //                       <User className="w-4 h-4 mr-2 text-orange-600" />
// //                       {t.regularUser}
// //                     </Label>
// //                   </div>

// //                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
// //                     <RadioGroupItem id="guide" value="guide" />
// //                     <Label htmlFor="guide" className="flex items-center">
// //                       <UserCheck className="w-4 h-4 mr-2 text-orange-600" />
// //                       {t.professionalGuide}
// //                     </Label>
// //                   </div>
// //                 </RadioGroup>
// //               </div>

// //               {/* PERSONAL INFO */}
// //               <div className="space-y-4">
// //                 <h3 className="text-lg font-semibold border-b pb-2">{t.personalInfo}</h3>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <Label>{t.firstName}</Label>
// //                     <Input value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
// //                   </div>
// //                   <div>
// //                     <Label>{t.lastName}</Label>
// //                     <Input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <Label>{t.email}</Label>
// //                   <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
// //                 </div>

// //                 <div>
// //                   <Label>{t.phone}</Label>
// //                   <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
// //                 </div>

// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div>
// //                     <Label>{t.password}</Label>
// //                     <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
// //                   </div>
// //                   <div>
// //                     <Label>{t.confirmPassword}</Label>
// //                     <Input type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* GUIDE INFO */}
// //               {userType === "guide" && (
// //                 <div className="space-y-4">
// //                   <h3 className="text-lg font-semibold border-b pb-2">{t.guideInfo}</h3>

// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <Label>{t.experience}</Label>
// //                       <Input type="number" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
// //                     </div>
// //                     <div>
// //                       <Label>{t.hourlyRate}</Label>
// //                       <Input type="number" value={formData.hourlyRate} onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })} />
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <Label>{t.specialization}</Label>
// //                     <Select onValueChange={v => setFormData({ ...formData, specialization: v })}>
// //                       <SelectTrigger>
// //                         <SelectValue placeholder={t.specialization} />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         {specializations[language].map((spec) => (
// //                           <SelectItem key={spec} value={spec}>{spec}</SelectItem>
// //                         ))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>

// //                   <div>
// //                     <Label>{t.location}</Label>
// //                     <Select onValueChange={v => setFormData({ ...formData, location: v })}>
// //                       <SelectTrigger>
// //                         <SelectValue placeholder={t.location} />
// //                       </SelectTrigger>
// //                       <SelectContent>
// //                         {locations[language].map((loc) => (
// //                           <SelectItem key={loc} value={loc}>{loc}</SelectItem>
// //                         ))}
// //                       </SelectContent>
// //                     </Select>
// //                   </div>

// //                   <div>
// //                     <Label>{t.languages}</Label>
// //                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
// //                       {["UZ", "RU", "EN", "TR"].map((lang) => (
// //                         <div key={lang} className="flex items-center space-x-2">
// //                           <Checkbox checked={formData.languages.includes(lang)} onCheckedChange={() => handleLanguageToggle(lang)} />
// //                           <span>{lang}</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div>
// //                     <Label>{t.description}</Label>
// //                     <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
// //                   </div>
// //                 </div>
// //               )}

// //               {/* TERMS */}
// //               <div className="flex items-center space-x-2">
// //                 <Checkbox checked={formData.agreeTerms} onCheckedChange={(v) => setFormData({ ...formData, agreeTerms: !!v })} />
// //                 <Label>{t.agreeTerms}</Label>
// //               </div>

// //               {/* SUBMIT */}
// //               <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white">
// //                 {t.createAccount}
// //               </Button>

// //               <p className="text-center text-gray-600">
// //                 {t.alreadyHaveAccount}{" "}
// //                 <Link href="/login" className="text-orange-600">{t.signIn}</Link>
// //               </p>

// //             </CardContent>

// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }




























// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Globe, User, UserCheck, UserCog } from "lucide-react"
// import Link from "next/link"

// type Language = "uz" | "ru" | "en"
// type UserType = "user" | "guide" | "teacher"

// const translations = {
//   uz: {
//     title: "TravelUz",
//     register: "Ro'yxatdan o'tish",
//     userType: "Foydalanuvchi turi",
//     regularUser: "Oddiy foydalanuvchi",
//     professionalGuide: "Professional gid",
//     teacher: "O'qituvchi",
//     personalInfo: "Shaxsiy ma'lumotlar",
//     firstName: "Ism",
//     lastName: "Familiya",
//     email: "Email",
//     phone: "Telefon",
//     password: "Parol",
//     confirmPassword: "Parolni tasdiqlash",
//     uploadPhoto: "Rasm yuklash",
//     guideInfo: "Gid ma'lumotlari",
//     experience: "Tajriba (yillarda)",
//     specialization: "Mutaxassislik",
//     languages: "Tillar",
//     hourlyRate: "Soatlik narx ($)",
//     description: "O'zingiz haqingizda",
//     location: "Joylashuv",
//     agreeTerms: "Foydalanish shartlariga roziman",
//     createAccount: "Hisob yaratish",
//     alreadyHaveAccount: "Hisobingiz bormi?",
//     signIn: "Kirish",
//     home: "Bosh sahifa",
//     hotels: "Mehmonxonalar",
//     guides: "Gidlar",
//   },

//   ru: {
//     title: "TravelUz",
//     register: "Регистрация",
//     userType: "Тип пользователя",
//     regularUser: "Обычный пользователь",
//     professionalGuide: "Профессиональный гид",
//     teacher: "Учитель",
//     personalInfo: "Личная информация",
//     firstName: "Имя",
//     lastName: "Фамилия",
//     email: "Email",
//     phone: "Телефон",
//     password: "Пароль",
//     confirmPassword: "Подтвердить пароль",
//     uploadPhoto: "Загрузить фото",
//     guideInfo: "Информация о гиде",
//     experience: "Опыт (в годах)",
//     specialization: "Специализация",
//     languages: "Языки",
//     hourlyRate: "Почасовая оплата ($)",
//     description: "О себе",
//     location: "Местоположение",
//     agreeTerms: "Согласен с условиями использования",
//     createAccount: "Создать аккаунт",
//     alreadyHaveAccount: "Уже есть аккаунт?",
//     signIn: "Войти",
//     home: "Главная",
//     hotels: "Отели",
//     guides: "Гиды",
//   },

//   en: {
//     title: "TravelUz",
//     register: "Register",
//     userType: "User Type",
//     regularUser: "Regular User",
//     professionalGuide: "Professional Guide",
//     teacher: "Teacher",
//     personalInfo: "Personal Information",
//     firstName: "First Name",
//     lastName: "Last Name",
//     email: "Email",
//     phone: "Phone",
//     password: "Password",
//     confirmPassword: "Confirm Password",
//     uploadPhoto: "Upload Photo",
//     guideInfo: "Guide Information",
//     experience: "Experience (years)",
//     specialization: "Specialization",
//     languages: "Languages",
//     hourlyRate: "Hourly Rate ($)",
//     description: "About Yourself",
//     location: "Location",
//     agreeTerms: "I agree to the terms of service",
//     createAccount: "Create Account",
//     alreadyHaveAccount: "Already have an account?",
//     signIn: "Sign In",
//     home: "Home",
//     hotels: "Hotels",
//     guides: "Guides",
//   },
// }

// const specializations = {
//   uz: ["Tarix", "Me'morchilik", "Madaniyat", "Tabiat", "San'at", "Shahar gidi"],
//   ru: ["История", "Архитектура", "Культура", "Природа", "Искусство", "Городской гид"],
//   en: ["History", "Architecture", "Culture", "Nature", "Art", "City Guide"],
// }

// const locations = {
//   uz: ["Toshkent", "Samarqand", "Buxoro", "Xiva", "Farg'ona", "Nukus", "Namangan", "Andijon"],
//   ru: ["Ташкент", "Самарканд", "Бухара", "Хива", "Фергана", "Нукус", "Наманган", "Андижан"],
//   en: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Fergana", "Nukus", "Namangan", "Andijan"],
// }

// export default function RegisterPage() {
//   const [language, setLanguage] = useState<Language>("uz")
//   const [userType, setUserType] = useState<UserType>("user")

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     experience: "",
//     specialization: "",
//     languages: [] as string[],
//     hourlyRate: "",
//     description: "",
//     location: "",
//     agreeTerms: false,
//   })

//   const t = translations[language]

//   const handleLanguageToggle = (lang: string) => {
//     setFormData(prev => ({
//       ...prev,
//       languages: prev.languages.includes(lang)
//         ? prev.languages.filter(l => l !== lang)
//         : [...prev.languages, lang],
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">

//       {/* HEADER */}
//       <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-orange-100 sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

//           <Link href="/">
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//               {t.title}
//             </h1>
//           </Link>

//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/" className="hover:text-orange-600">{t.home}</Link>
//             <Link href="/hotels" className="hover:text-orange-600">{t.hotels}</Link>
//             <Link href="/guides" className="hover:text-orange-600">{t.guides}</Link>
//             <Link href="/register" className="text-orange-600 font-medium">{t.register}</Link>
//           </nav>

//           <Select value={language} onValueChange={(v: Language) => setLanguage(v)}>
//             <SelectTrigger className="w-20 border-orange-200">
//               <Globe className="w-4 h-4 text-orange-600" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="uz">UZ</SelectItem>
//               <SelectItem value="ru">RU</SelectItem>
//               <SelectItem value="en">EN</SelectItem>
//             </SelectContent>
//           </Select>

//         </div>
//       </header>

//       {/* FORM */}
//       <div className="py-12 px-4">
//         <div className="max-w-2xl mx-auto">
//           <Card className="shadow-xl bg-white/90">

//             <CardHeader className="text-center">
//               <CardTitle className="text-3xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//                 {t.register}
//               </CardTitle>

//               <CardDescription>
//                 {userType === "user" && t.regularUser}
//                 {userType === "guide" && t.professionalGuide}
//                 {userType === "teacher" && t.teacher}
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6">

//               {/* USER TYPE SELECTOR */}
//               <div className="space-y-3">
//                 <Label>{t.userType}</Label>
//                 <RadioGroup value={userType} onValueChange={(v: UserType) => setUserType(v)}>

//                   {/* USER */}
//                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
//                     <RadioGroupItem id="user" value="user" />
//                     <Label htmlFor="user" className="flex items-center">
//                       <User className="w-4 h-4 mr-2 text-orange-600" />
//                       {t.regularUser}
//                     </Label>
//                   </div>

//                   {/* GUIDE */}
//                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
//                     <RadioGroupItem id="guide" value="guide" />
//                     <Label htmlFor="guide" className="flex items-center">
//                       <UserCheck className="w-4 h-4 mr-2 text-orange-600" />
//                       {t.professionalGuide}
//                     </Label>
//                   </div>

//                   {/* TEACHER (NEW) */}
//                   <div className="flex items-center space-x-2 p-3 border rounded-lg">
//                     <RadioGroupItem id="teacher" value="teacher" />
//                     <Label htmlFor="teacher" className="flex items-center">
//                       <UserCog className="w-4 h-4 mr-2 text-orange-600" />
//                       {t.teacher}
//                     </Label>
//                   </div>

//                 </RadioGroup>
//               </div>

//               {/* PERSONAL INFO */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold border-b pb-2">{t.personalInfo}</h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label>{t.firstName}</Label>
//                     <Input value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
//                   </div>
//                   <div>
//                     <Label>{t.lastName}</Label>
//                     <Input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
//                   </div>
//                 </div>

//                 <div>
//                   <Label>{t.email}</Label>
//                   <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
//                 </div>

//                 <div>
//                   <Label>{t.phone}</Label>
//                   <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label>{t.password}</Label>
//                     <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
//                   </div>
//                   <div>
//                     <Label>{t.confirmPassword}</Label>
//                     <Input type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
//                   </div>
//                 </div>
//               </div>

//               {/* GUIDE INFO — ONLY FOR GUIDE */}
//               {userType === "guide" && (
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold border-b pb-2">{t.guideInfo}</h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <Label>{t.experience}</Label>
//                       <Input type="number" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
//                     </div>
//                     <div>
//                       <Label>{t.hourlyRate}</Label>
//                       <Input type="number" value={formData.hourlyRate} onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })} />
//                     </div>
//                   </div>

//                   <div>
//                     <Label>{t.specialization}</Label>
//                     <Select onValueChange={v => setFormData({ ...formData, specialization: v })}>
//                       <SelectTrigger>
//                         <SelectValue placeholder={t.specialization} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {specializations[language].map((spec) => (
//                           <SelectItem key={spec} value={spec}>{spec}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label>{t.location}</Label>
//                     <Select onValueChange={v => setFormData({ ...formData, location: v })}>
//                       <SelectTrigger>
//                         <SelectValue placeholder={t.location} />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {locations[language].map((loc) => (
//                           <SelectItem key={loc} value={loc}>{loc}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label>{t.languages}</Label>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                       {["UZ", "RU", "EN", "TR"].map((lang) => (
//                         <div key={lang} className="flex items-center space-x-2">
//                           <Checkbox checked={formData.languages.includes(lang)} onCheckedChange={() => handleLanguageToggle(lang)} />
//                           <span>{lang}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <Label>{t.description}</Label>
//                     <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
//                   </div>
//                 </div>
//               )}

//               {/* TERMS */}
//               <div className="flex items-center space-x-2">
//                 <Checkbox checked={formData.agreeTerms} onCheckedChange={(v) => setFormData({ ...formData, agreeTerms: !!v })} />
//                 <Label>{t.agreeTerms}</Label>
//               </div>

//               {/* SUBMIT */}
//               <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white">
//                 {t.createAccount}
//               </Button>

//               <p className="text-center text-gray-600">
//                 {t.alreadyHaveAccount}{" "}
//                 <Link href="/login" className="text-orange-600">{t.signIn}</Link>
//               </p>

//             </CardContent>

//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }













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
import { Globe, User, UserCheck, GraduationCap } from "lucide-react"
import Link from "next/link"

type Language = "uz" | "ru" | "en"

//
// 🔥 Translations updated with TEACHER USER TYPE
//
const translations = {
  uz: {
    title: "TravelUz",
    register: "Ro'yxatdan o'tish",
    userType: "Foydalanuvchi turi",
    regularUser: "Oddiy foydalanuvchi",
    professionalGuide: "Professional gid",
    teacher: "O'qituvchi",
    personalInfo: "Shaxsiy ma'lumotlar",
    firstName: "Ism",
    lastName: "Familiya",
    email: "Email",
    phone: "Telefon",
    password: "Parol",
    confirmPassword: "Parolni tasdiqlash",
    guideInfo: "Gid maʼlumotlari",
    teacherInfo: "O‘qituvchi maʼlumotlari",
    experience: "Tajriba (yillarda)",
    specialization: "Mutaxassislik / Fan",
    languages: "Tillar",
    hourlyRate: "Soatlik narx ($)",
    description: "O'zingiz haqingizda",
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
    teacher: "Учитель",
    personalInfo: "Личная информация",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Email",
    phone: "Телефон",
    password: "Пароль",
    confirmPassword: "Подтвердить пароль",
    guideInfo: "Информация о гиде",
    teacherInfo: "Информация об учителе",
    experience: "Опыт (в годах)",
    specialization: "Специализация / Предмет",
    languages: "Языки",
    hourlyRate: "Почасовая оплата ($)",
    description: "О себе",
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
    teacher: "Teacher",
    personalInfo: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
    confirmPassword: "Confirm Password",
    guideInfo: "Guide Information",
    teacherInfo: "Teacher Information",
    experience: "Experience (years)",
    specialization: "Specialization / Subject",
    languages: "Languages",
    hourlyRate: "Hourly Rate ($)",
    description: "About Yourself",
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

//
// SPECIALIZATIONS FOR GUIDE + TEACHER
//
const specializations = {
  uz: ["Ingliz tili", "Rus tili", "Tarix", "Matematika", "Shaxsiy rivojlanish"],
  ru: ["Английский язык", "Русский язык", "История", "Математика", "Личностное развитие"],
  en: ["English", "Russian", "History", "Mathematics", "Personal Development"],
}

const locations = {
  uz: ["Toshkent", "Samarqand", "Buxoro", "Xiva", "Farg'ona"],
  ru: ["Ташкент", "Самарканд", "Бухара", "Хива", "Фергана"],
  en: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Fergana"],
}

//
// *** MAIN COMPONENT ***
//
export default function RegisterPage() {
  const [language, setLanguage] = useState<Language>("uz")

  const [userType, setUserType] = useState<"user" | "guide" | "teacher">("user")

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

  const toggleLanguageSelection = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">

      {/* HEADER */}
      <header className="bg-white/90 shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-600">{t.title}</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-orange-600">{t.home}</Link>
            <Link href="/hotels" className="hover:text-orange-600">{t.hotels}</Link>
            <Link href="/guides" className="hover:text-orange-600">{t.guides}</Link>
            <Link href="/register" className="text-orange-600 font-medium">{t.register}</Link>
          </nav>

          <Select value={language} onValueChange={(v: Language) => setLanguage(v)}>
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

      {/* FORM */}
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl bg-white/90">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-orange-600">{t.register}</CardTitle>
              <CardDescription>
                {userType === "user" && t.regularUser}
                {userType === "guide" && t.professionalGuide}
                {userType === "teacher" && t.teacher}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* USER TYPE SELECTOR */}
              <div className="space-y-3">
                <Label>{t.userType}</Label>

                <RadioGroup value={userType} onValueChange={(v: any) => setUserType(v)}>

                  {/* USER */}
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem id="user" value="user" />
                    <Label htmlFor="user" className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-orange-600" />
                      {t.regularUser}
                    </Label>
                  </div>

                  {/* GUIDE */}
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem id="guide" value="guide" />
                    <Label htmlFor="guide" className="flex items-center">
                      <UserCheck className="w-4 h-4 mr-2 text-orange-600" />
                      {t.professionalGuide}
                    </Label>
                  </div>

                  {/* TEACHER */}
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem id="teacher" value="teacher" />
                    <Label htmlFor="teacher" className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-orange-600" />
                      {t.teacher}
                    </Label>
                  </div>

                </RadioGroup>
              </div>

              {/* PERSONAL INFO */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">{t.personalInfo}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t.firstName}</Label>
                    <Input value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} />
                  </div>
                  <div>
                    <Label>{t.lastName}</Label>
                    <Input value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} />
                  </div>
                </div>

                <div>
                  <Label>{t.email}</Label>
                  <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>

                <div>
                  <Label>{t.phone}</Label>
                  <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t.password}</Label>
                    <Input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                  </div>
                  <div>
                    <Label>{t.confirmPassword}</Label>
                    <Input type="password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* GUIDE & TEACHER SHARED SECTION */}
              {(userType === "guide" || userType === "teacher") && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">
                    {userType === "guide" ? t.guideInfo : t.teacherInfo}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.experience}</Label>
                      <Input type="number" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} />
                    </div>
                    <div>
                      <Label>{t.hourlyRate}</Label>
                      <Input type="number" value={formData.hourlyRate} onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <Label>{t.specialization}</Label>
                    <Select onValueChange={v => setFormData({ ...formData, specialization: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.specialization} />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations[language].map((spec) => (
                          <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t.location}</Label>
                    <Select onValueChange={v => setFormData({ ...formData, location: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.location} />
                      </SelectTrigger>
                      <SelectContent>
                        {locations[language].map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t.languages}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["UZ", "RU", "EN", "TR"].map((lang) => (
                        <div key={lang} className="flex items-center space-x-2">
                          <Checkbox checked={formData.languages.includes(lang)} onCheckedChange={() => toggleLanguageSelection(lang)} />
                          <span>{lang}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>{t.description}</Label>
                    <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                  </div>
                </div>
              )}

              {/* TERMS */}
              <div className="flex items-center space-x-2">
                <Checkbox checked={formData.agreeTerms} onCheckedChange={(v) => setFormData({ ...formData, agreeTerms: !!v })} />
                <Label>{t.agreeTerms}</Label>
              </div>

              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white">
                {t.createAccount}
              </Button>

              <p className="text-center text-gray-600">
                {t.alreadyHaveAccount}{" "}
                <Link href="/login" className="text-orange-600">{t.signIn}</Link>
              </p>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}