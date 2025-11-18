"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

type Language = "uz" | "ru" | "en"

const translations = {
  uz: {
    title: "TravelUz",
    login: "Kirish",
    email: "Email",
    password: "Parol",
    rememberMe: "Meni eslab qol",
    forgotPassword: "Parolni unutdingizmi?",
    signIn: "Kirish",
    noAccount: "Hisobingiz yo‘qmi?",
    register: "Ro'yxatdan o'tish",
  },
  ru: {
    title: "TravelUz",
    login: "Вход",
    email: "Email",
    password: "Пароль",
    rememberMe: "Запомнить меня",
    forgotPassword: "Забыли пароль?",
    signIn: "Войти",
    noAccount: "Нет аккаунта?",
    register: "Регистрация",
  },
  en: {
    title: "TravelUz",
    login: "Login",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    register: "Register",
  },
}

export default function LoginPage() {
  const [language, setLanguage] = useState<Language>("uz")
  const t = translations[language]
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Mock login logic (replace with Firebase/Auth or backend)
      if (email === "teacher@example.com" && password === "123456") {
        router.push("/teachers")
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">

      {/* HEADER */}
      <header className="bg-white/90 shadow-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-600">{t.title}</h1>
          </Link>

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

      {/* LOGIN FORM */}
      <div className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl bg-white/90">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-orange-600">{t.login}</CardTitle>
              <CardDescription>{t.signIn} {t.title}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <Label>{t.email}</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>{t.password}</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white" disabled={loading}>
                  {loading ? "Loading..." : t.signIn}
                </Button>
              </form>

              <p className="text-center text-gray-600">
                {t.noAccount}{" "}
                <Link href="/register" className="text-orange-600">{t.register}</Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}