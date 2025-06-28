// JavaScript for hotels page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  const lucide = window.lucide // Assuming Lucide is available globally
  lucide.createIcons()

  // Initialize language
  const getCurrentLanguage = window.getCurrentLanguage // Assuming getCurrentLanguage is available globally
  const setCurrentLanguage = window.setCurrentLanguage // Assuming setCurrentLanguage is available globally
  const updatePageTranslations = window.updatePageTranslations // Assuming updatePageTranslations is available globally
  initializeLanguage()

  // Load hotels
  const hotels = window.hotels // Assuming hotels data is available globally
  loadHotels()

  // Setup event listeners
  setupEventListeners()

  // Set default dates
  setDefaultDates()
})

function initializeLanguage() {
  const languageSelector = document.getElementById("language-selector")
  const currentLang = getCurrentLanguage()

  languageSelector.value = currentLang
  updatePageTranslations()

  languageSelector.addEventListener("change", function () {
    setCurrentLanguage(this.value)
    updatePageTranslations()
    loadHotels() // Reload content with new language
  })
}

function setupEventListeners() {
  // Hotel search functionality
  const hotelSearch = document.getElementById("hotel-search")
  if (hotelSearch) {
    hotelSearch.addEventListener("input", function () {
      filterHotels(this.value)
    })
  }

  // Search hotels button
  const searchBtn = document.getElementById("search-hotels-btn")
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      performHotelSearch()
    })
  }

  // Date inputs
  const checkinDate = document.getElementById("checkin-date")
  const checkoutDate = document.getElementById("checkout-date")

  if (checkinDate) {
    checkinDate.addEventListener("change", () => {
      validateDates()
    })
  }

  if (checkoutDate) {
    checkoutDate.addEventListener("change", () => {
      validateDates()
    })
  }
}

function setDefaultDates() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const checkinDate = document.getElementById("checkin-date")
  const checkoutDate = document.getElementById("checkout-date")

  if (checkinDate) {
    checkinDate.value = today.toISOString().split("T")[0]
    checkinDate.min = today.toISOString().split("T")[0]
  }

  if (checkoutDate) {
    checkoutDate.value = tomorrow.toISOString().split("T")[0]
    checkoutDate.min = tomorrow.toISOString().split("T")[0]
  }
}

function validateDates() {
  const checkinDate = document.getElementById("checkin-date")
  const checkoutDate = document.getElementById("checkout-date")

  if (checkinDate && checkoutDate) {
    const checkin = new Date(checkinDate.value)
    const checkout = new Date(checkoutDate.value)

    if (checkout <= checkin) {
      const newCheckout = new Date(checkin)
      newCheckout.setDate(newCheckout.getDate() + 1)
      checkoutDate.value = newCheckout.toISOString().split("T")[0]
    }
  }
}

function loadHotels() {
  const hotelsGrid = document.getElementById("hotels-grid")
  const currentLang = getCurrentLanguage()

  if (!hotelsGrid) return

  hotelsGrid.innerHTML = ""

  hotels.forEach((hotel) => {
    const hotelCard = createHotelCard(hotel, currentLang)
    hotelsGrid.appendChild(hotelCard)
  })
}

function createHotelCard(hotel, lang) {
  const card = document.createElement("div")
  card.className =
    "card-hover overflow-hidden bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl shadow-lg"

  const amenityIcons = window.amenityIcons // Assuming amenityIcons is available globally
  const amenitiesHtml = hotel.amenities
    .map((amenity) => {
      const iconName = amenityIcons[amenity] || "check"
      return `
            <div class="flex items-center bg-orange-50 px-2 py-1 rounded-full">
                <i data-lucide="${iconName}" class="w-3 h-3 text-orange-600 mr-1"></i>
                <span class="text-xs text-orange-700 capitalize">${amenity}</span>
            </div>
        `
    })
    .join("")

  const t = window.t // Assuming t is available globally
  card.innerHTML = `
        <div class="relative">
            <img 
                src="${hotel.image}" 
                alt="${hotel.name[lang]}"
                class="w-full h-48 object-cover"
                loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div class="absolute top-3 right-3">
                <span class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    $${hotel.price} ${t("perNight")}
                </span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">${hotel.name[lang]}</h3>
                    <p class="flex items-center mt-1 text-orange-600">
                        <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                        ${hotel.location[lang]}
                    </p>
                </div>
                <div class="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1"></i>
                    <span class="text-sm font-medium text-yellow-700">${hotel.rating}</span>
                </div>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${hotel.description[lang]}</p>
            <div class="mb-4">
                <p class="text-sm font-medium text-gray-700 mb-2">${t("amenities")}:</p>
                <div class="flex flex-wrap gap-2">
                    ${amenitiesHtml}
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="bookHotel(${hotel.id})" class="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 px-4 rounded-md shadow-lg transition-all">
                    ${t("bookNow")}
                </button>
                <button onclick="viewHotelDetails(${hotel.id})" class="flex-1 border border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent py-2 px-4 rounded-md transition-all">
                    ${t("viewDetails")}
                </button>
            </div>
        </div>
    `

  // Re-initialize Lucide icons for the new card
  setTimeout(() => {
    lucide.createIcons()
  }, 0)

  return card
}

function filterHotels(searchTerm) {
  const currentLang = getCurrentLanguage()
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.description[currentLang].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const hotelsGrid = document.getElementById("hotels-grid")

  if (!hotelsGrid) return

  hotelsGrid.innerHTML = ""

  filteredHotels.forEach((hotel) => {
    const hotelCard = createHotelCard(hotel, currentLang)
    hotelsGrid.appendChild(hotelCard)
  })
}

function performHotelSearch() {
  const searchTerm = document.getElementById("hotel-search").value
  const checkinDate = document.getElementById("checkin-date").value
  const checkoutDate = document.getElementById("checkout-date").value
  const guests = document.getElementById("guests-select").value

  console.log("Hotel search:", {
    searchTerm,
    checkinDate,
    checkoutDate,
    guests,
  })

  // Filter hotels based on search criteria
  filterHotels(searchTerm)

  // Show search results message
  const currentLang = getCurrentLanguage()
  const message =
    currentLang === "uz"
      ? "Qidiruv natijalari yangilandi"
      : currentLang === "ru"
        ? "Результаты поиска обновлены"
        : "Search results updated"

  // You could show a toast notification here
  console.log(message)
}

function bookHotel(hotelId) {
  // Store selected hotel and booking details in localStorage
  const hotel = hotels.find((h) => h.id === hotelId)
  const checkinDate = document.getElementById("checkin-date").value
  const checkoutDate = document.getElementById("checkout-date").value
  const guests = document.getElementById("guests-select").value

  if (hotel) {
    const bookingData = {
      hotel,
      checkinDate,
      checkoutDate,
      guests,
      nights: calculateNights(checkinDate, checkoutDate),
      totalPrice: calculateTotalPrice(hotel.price, checkinDate, checkoutDate),
    }

    localStorage.setItem("hotelBooking", JSON.stringify(bookingData))
    window.location.href = "payment.html"
  }
}

function viewHotelDetails(hotelId) {
  const hotel = hotels.find((h) => h.id === hotelId)
  const currentLang = getCurrentLanguage()

  if (hotel) {
    const amenitiesList = hotel.amenities.join(", ")
    alert(
      `${hotel.name[currentLang]}\n\n${hotel.description[currentLang]}\n\n${t("location")}: ${hotel.location[currentLang]}\n${t("rating")}: ${hotel.rating}\n${t("price")}: $${hotel.price} ${t("perNight")}\n${t("amenities")}: ${amenitiesList}`,
    )
  }
}

function calculateNights(checkinDate, checkoutDate) {
  const checkin = new Date(checkinDate)
  const checkout = new Date(checkoutDate)
  const timeDiff = checkout.getTime() - checkin.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

function calculateTotalPrice(pricePerNight, checkinDate, checkoutDate) {
  const nights = calculateNights(checkinDate, checkoutDate)
  return pricePerNight * nights
}

// Add fade-in animation to cards when they load
setTimeout(() => {
  const cards = document.querySelectorAll(".card-hover")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"

    setTimeout(() => {
      card.style.transition = "all 0.5s ease"
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, index * 100)
  })
}, 100)
