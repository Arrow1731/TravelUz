"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Globe, CreditCard, Smartphone, Building, Shield, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

type Language = "uz" | "ru" | "en"

const translations = {
  uz: {
    title: "TravelUz",
    payment: "To'lov",
    paymentMethod: "To'lov usuli",
    creditCard: "Kredit karta",
    paypal: "PayPal",
    bankTransfer: "Bank o'tkazmasi",
    mobilePay: "Mobil to'lov",
    cardDetails: "Karta ma'lumotlari",
    cardNumber: "Karta raqami",
    expiryDate: "Amal qilish muddati",
    cvv: "CVV",
    cardholderName: "Karta egasining ismi",
    billingAddress: "Hisob-kitob manzili",
    country: "Mamlakat",
    city: "Shahar",
    address: "Manzil",
    zipCode: "Pochta indeksi",
    orderSummary: "Buyurtma xulosasi",
    subtotal: "Jami",
    tax: "Soliq",
    total: "Umumiy summa",
    payNow: "Hozir to'lash",
    securePayment: "Xavfsiz to'lov",
    backToBooking: "Bronlashga qaytish",
    processingFee: "Xizmat haqi",
    home: "Bosh sahifa",
    hotels: "Mehmonxonalar",
    guides: "Gidlar",
    register: "Ro'yxatdan o'tish",
  },
  ru: {
    title: "TravelUz",
    payment: "Оплата",
    paymentMethod: "Способ оплаты",
    creditCard: "Кредитная карта",
    paypal: "PayPal",
    bankTransfer: "Банковский перевод",
    mobilePay: "Мобильная оплата",
    cardDetails: "Данные карты",
    cardNumber: "Номер карты",
    expiryDate: "Срок действия",
    cvv: "CVV",
    cardholderName: "Имя держателя карты",
    billingAddress: "Адрес для выставления счета",
    country: "Страна",
    city: "Город",
    address: "Адрес",
    zipCode: "Почтовый индекс",
    orderSummary: "Сводка заказа",
    subtotal: "Промежуточный итог",
    tax: "Налог",
    total: "Общая сумма",
    payNow: "Оплатить сейчас",
    securePayment: "Безопасная оплата",
    backToBooking: "Вернуться к бронированию",
    processingFee: "Комиссия за обработку",
    home: "Главная",
    hotels: "Отели",
    guides: "Гиды",
    register: "Регистрация",
  },
  en: {
    title: "TravelUz",
    payment: "Payment",
    paymentMethod: "Payment Method",
    creditCard: "Credit Card",
    paypal: "PayPal",
    bankTransfer: "Bank Transfer",
    mobilePay: "Mobile Payment",
    cardDetails: "Card Details",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    cardholderName: "Cardholder Name",
    billingAddress: "Billing Address",
    country: "Country",
    city: "City",
    address: "Address",
    zipCode: "ZIP Code",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    tax: "Tax",
    total: "Total",
    payNow: "Pay Now",
    securePayment: "Secure Payment",
    backToBooking: "Back to Booking",
    processingFee: "Processing Fee",
    home: "Home",
    hotels: "Hotels",
    guides: "Guides",
    register: "Register",
  },
}

const orderItems = [
  {
    id: 1,
    name: {
      uz: "Registon Plaza Hotel - 2 kecha",
      ru: "Отель Регистан Плаза - 2 ночи",
      en: "Registan Plaza Hotel - 2 nights",
    },
    price: 240,
    type: "hotel",
  },
  {
    id: 2,
    name: {
      uz: "Aziz Karimov - Tarix gidi (4 soat)",
      ru: "Азиз Каримов - Исторический гид (4 часа)",
      en: "Aziz Karimov - History Guide (4 hours)",
    },
    price: 100,
    type: "guide",
  },
]

export default function PaymentPage() {
  const [language, setLanguage] = useState<Language>("uz")
  const [paymentMethod, setPaymentMethod] = useState("creditCard")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
  })

  const t = translations[language]

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0)
  const processingFee = Math.round(subtotal * 0.03)
  const tax = Math.round(subtotal * 0.12)
  const total = subtotal + processingFee + tax

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

      {/* Payment Form */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link
              href="/hotels"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToBooking}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-orange-100 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-orange-600" />
                    {t.payment}
                  </CardTitle>
                  <CardDescription className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.securePayment}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium text-gray-700">{t.paymentMethod}</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="creditCard" id="creditCard" />
                        <Label htmlFor="creditCard" className="flex items-center cursor-pointer">
                          <CreditCard className="w-4 h-4 mr-2 text-orange-600" />
                          {t.creditCard}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                          <div className="w-4 h-4 mr-2 bg-blue-600 rounded"></div>
                          {t.paypal}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                        <Label htmlFor="bankTransfer" className="flex items-center cursor-pointer">
                          <Building className="w-4 h-4 mr-2 text-orange-600" />
                          {t.bankTransfer}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                        <RadioGroupItem value="mobilePay" id="mobilePay" />
                        <Label htmlFor="mobilePay" className="flex items-center cursor-pointer">
                          <Smartphone className="w-4 h-4 mr-2 text-orange-600" />
                          {t.mobilePay}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === "creditCard" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 border-b border-orange-200 pb-2">
                        {t.cardDetails}
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">{t.cardNumber}</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                          className="border-orange-200 focus:border-orange-400"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">{t.expiryDate}</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                            className="border-orange-200 focus:border-orange-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">{t.cvv}</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData((prev) => ({ ...prev, cvv: e.target.value }))}
                            className="border-orange-200 focus:border-orange-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardholderName">{t.cardholderName}</Label>
                        <Input
                          id="cardholderName"
                          placeholder="John Doe"
                          value={formData.cardholderName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                          className="border-orange-200 focus:border-orange-400"
                        />
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 border-b border-orange-200 pb-2 mt-6">
                        {t.billingAddress}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">{t.country}</Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, country: value }))}
                          >
                            <SelectTrigger className="border-orange-200 focus:border-orange-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="uz">Uzbekistan</SelectItem>
                              <SelectItem value="ru">Russia</SelectItem>
                              <SelectItem value="kz">Kazakhstan</SelectItem>
                              <SelectItem value="us">United States</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">{t.city}</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                            className="border-orange-200 focus:border-orange-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">{t.address}</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                          className="border-orange-200 focus:border-orange-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">{t.zipCode}</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                          className="border-orange-200 focus:border-orange-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Other Payment Methods */}
                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                          <div className="text-white font-bold text-xl">PP</div>
                        </div>
                        <p className="text-gray-600">You will be redirected to PayPal to complete your payment</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "bankTransfer" && (
                    <div className="text-center py-8">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <Building className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-600">Bank transfer details will be provided after confirmation</p>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "mobilePay" && (
                    <div className="text-center py-8">
                      <div className="bg-green-50 p-6 rounded-lg">
                        <Smartphone className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <p className="text-gray-600">Mobile payment options: Click, Payme, Uzcard</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-2xl border-orange-100 bg-white/90 backdrop-blur-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800">{t.orderSummary}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name[language]}</p>
                        <Badge variant="outline" className="mt-1 text-xs border-orange-200 text-orange-600">
                          {item.type === "hotel" ? "Hotel" : "Guide"}
                        </Badge>
                      </div>
                      <p className="font-semibold text-gray-800">${item.price}</p>
                    </div>
                  ))}

                  <Separator className="bg-orange-200" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>{t.subtotal}</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t.processingFee}</span>
                      <span>${processingFee}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t.tax}</span>
                      <span>${tax}</span>
                    </div>
                  </div>

                  <Separator className="bg-orange-200" />

                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>{t.total}</span>
                    <span>${total}</span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg py-3 text-lg mt-6">
                    {t.payNow} ${total}
                  </Button>

                  <div className="text-center text-xs text-gray-500 mt-4">
                    <Shield className="w-4 h-4 inline mr-1" />
                    {t.securePayment}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
