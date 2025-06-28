// Main JavaScript for TravelUz homepage
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  const lucide = window.lucide // Declare lucide variable
  lucide.createIcons()

  // Initialize language
  initializeLanguage()

  // Load historical places
  loadHistoricalPlaces()

  // Setup event listeners
  setupEventListeners()
})

function initializeLanguage() {
  const languageSelector = document.getElementById("language-selector")
  const currentLang = getCurrentLanguage() // Declare getCurrentLanguage variable

  languageSelector.value = currentLang
  updatePageTranslations() // Declare updatePageTranslations variable

  languageSelector.addEventListener("change", function () {
    setCurrentLanguage(this.value) // Declare setCurrentLanguage variable
    updatePageTranslations()
    loadHistoricalPlaces() // Reload content with new language
  })
}

function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Search functionality
  const searchInput = document.getElementById("search-input")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filterPlaces(this.value)
    })
  }

  // User type selector
  const userTypeSelector = document.getElementById("user-type-selector")
  if (userTypeSelector) {
    userTypeSelector.addEventListener("change", function () {
      console.log("User type changed to:", this.value)
    })
  }
}

function loadHistoricalPlaces() {
  const placesGrid = document.getElementById("places-grid")
  const placesCount = document.getElementById("places-count")
  const currentLang = getCurrentLanguage()
  const historicalPlaces = window.historicalPlaces // Declare historicalPlaces variable

  if (!placesGrid) return

  placesGrid.innerHTML = ""

  historicalPlaces.forEach((place) => {
    const placeCard = createPlaceCard(place, currentLang)
    placesGrid.appendChild(placeCard)
  })

  // Update places count
  if (placesCount) {
    const countText = currentLang === "uz" ? "joy" : currentLang === "ru" ? "мест" : "places"
    placesCount.textContent = `${historicalPlaces.length} ${countText}`
  }
}

function createPlaceCard(place, lang) {
  const card = document.createElement("div")
  card.className =
    "card-hover overflow-hidden bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl shadow-lg"

  card.innerHTML = `
        <div class="relative">
            <img 
                src="${place.image}" 
                alt="${place.name[lang]}"
                class="w-full h-48 object-cover"
                loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <button class="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-lg p-2 rounded-full transition-all">
                <i data-lucide="heart" class="w-4 h-4 text-red-500"></i>
            </button>
            <div class="absolute bottom-3 left-3">
                <span class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${place.price}
                </span>
            </div>
        </div>
        <div class="p-6">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h3 class="text-lg font-bold text-gray-800">${place.name[lang]}</h3>
                    <p class="flex items-center mt-1 text-orange-600">
                        <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                        ${place.location[lang]}
                    </p>
                </div>
                <div class="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1"></i>
                    <span class="text-sm font-medium text-yellow-700">${place.rating}</span>
                </div>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${place.description[lang]}</p>
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center text-sm text-gray-500">
                    <i data-lucide="clock" class="w-4 h-4 mr-1"></i>
                    ${place.duration}
                </div>
            </div>
            <div class="flex space-x-2">
                <button onclick="bookPlace(${place.id})" class="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 px-4 rounded-md shadow-lg transition-all">
                    ${t("bookNow")} // Declare t variable
                </button>
                <button onclick="viewDetails(${place.id})" class="flex-1 border border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent py-2 px-4 rounded-md transition-all">
                    ${t("viewDetails")}
                </button>
            </div>
        </div>
    `

  // Re-initialize Lucide icons for the new card
  setTimeout(() => {
    window.lucide.createIcons()
  }, 0)

  return card
}

function filterPlaces(searchTerm) {
  const currentLang = getCurrentLanguage()
  const historicalPlaces = window.historicalPlaces // Declare historicalPlaces variable
  const filteredPlaces = historicalPlaces.filter(
    (place) =>
      place.name[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.location[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description[currentLang].toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const placesGrid = document.getElementById("places-grid")
  const placesCount = document.getElementById("places-count")

  if (!placesGrid) return

  placesGrid.innerHTML = ""

  filteredPlaces.forEach((place) => {
    const placeCard = createPlaceCard(place, currentLang)
    placesGrid.appendChild(placeCard)
  })

  // Update places count
  if (placesCount) {
    const countText = currentLang === "uz" ? "joy" : currentLang === "ru" ? "мест" : "places"
    placesCount.textContent = `${filteredPlaces.length} ${countText}`
  }
}

function bookPlace(placeId) {
  // Store selected place in localStorage for payment page
  const historicalPlaces = window.historicalPlaces // Declare historicalPlaces variable
  const place = historicalPlaces.find((p) => p.id === placeId)
  if (place) {
    localStorage.setItem("selectedPlace", JSON.stringify(place))
    window.location.href = "payment.html"
  }
}

function viewDetails(placeId) {
  // Show place details (could open a modal or navigate to details page)
  const historicalPlaces = window.historicalPlaces // Declare historicalPlaces variable
  const currentLang = getCurrentLanguage()
  const t = window.t // Declare t variable

  const place = historicalPlaces.find((p) => p.id === placeId)

  if (place) {
    alert(
      `${place.name[currentLang]}\n\n${place.description[currentLang]}\n\n${t("location")}: ${place.location[currentLang]}\n${t("rating")}: ${place.rating}\n${t("price")}: ${place.price}`,
    )
  }
}

// Call animation after places are loaded
function addFadeInAnimation() {
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
}

// Call animation after places are loaded
setTimeout(addFadeInAnimation, 100)

// Declare global variables
window.lucide = {} // Placeholder for Lucide library
window.historicalPlaces = [] // Placeholder for historical places data
window.getCurrentLanguage = () => "en" // Placeholder function
window.updatePageTranslations = () => {} // Placeholder function
window.setCurrentLanguage = (lang) => {} // Placeholder function
window.t = (key) => key // Placeholder function
