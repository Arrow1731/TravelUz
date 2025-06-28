// JavaScript for guides page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  const lucide = window.lucide // Declare lucide variable
  lucide.createIcons()

  // Initialize language
  initializeLanguage()

  // Load guides
  loadGuides()

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
    loadGuides() // Reload content with new language
  })
}

function setupEventListeners() {
  // Guide search functionality
  const guideSearch = document.getElementById("guide-search")
  if (guideSearch) {
    guideSearch.addEventListener("input", () => {
      filterGuides()
    })
  }

  // Category filter
  const filterCategory = document.getElementById("filter-category")
  if (filterCategory) {
    filterCategory.addEventListener("change", () => {
      filterGuides()
    })
  }
}

function loadGuides() {
  const guidesGrid = document.getElementById("guides-grid")
  const currentLang = getCurrentLanguage()

  if (!guidesGrid) return

  guidesGrid.innerHTML = ""

  const guides = window.guides // Declare guides variable
  guides.forEach((guide) => {
    const guideCard = createGuideCard(guide, currentLang)
    guidesGrid.appendChild(guideCard)
  })
}

function createGuideCard(guide, lang) {
  const card = document.createElement("div")
  card.className =
    "card-hover overflow-hidden bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl shadow-lg"

  const languageBadges = guide.languages
    .map((language) => `<span class="badge badge-primary text-xs px-2 py-0">${language}</span>`)
    .join("")

  const verifiedBadge = guide.verified ? `<span class="badge badge-success">${window.t("verified")}</span>` : ""

  const t = window.t // Declare t variable
  card.innerHTML = `
        <div class="p-6 text-center">
            <div class="relative mx-auto mb-4 w-20 h-20">
                <img 
                    src="${guide.image}" 
                    alt="${guide.name}"
                    class="w-20 h-20 rounded-full object-cover border-4 border-orange-200"
                    loading="lazy"
                />
                ${
                  guide.verified
                    ? `
                    <div class="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <i data-lucide="award" class="w-4 h-4 text-white"></i>
                    </div>
                `
                    : ""
                }
            </div>
            
            <h3 class="text-xl font-bold text-gray-800 mb-1">${guide.name}</h3>
            <p class="flex items-center justify-center mt-1 text-orange-600 mb-2">
                <i data-lucide="map-pin" class="w-4 h-4 mr-1"></i>
                ${guide.location[lang]}
            </p>
            
            <div class="flex items-center justify-center mb-4">
                <div class="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <i data-lucide="star" class="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1"></i>
                    <span class="text-sm font-medium text-yellow-700">${guide.rating}</span>
                    <span class="text-xs text-gray-500 ml-1">(${guide.reviews})</span>
                </div>
            </div>
        </div>
        
        <div class="px-6 pb-6 space-y-4">
            <div>
                <h4 class="font-medium text-gray-800 mb-1">${t("speciality")}</h4>
                <p class="text-sm text-orange-600">${guide.speciality[lang]}</p>
            </div>
            
            <p class="text-gray-600 text-sm line-clamp-3">${guide.description[lang]}</p>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <div class="flex items-center text-gray-600 mb-1">
                        <i data-lucide="clock" class="w-4 h-4 mr-1"></i>
                        <span class="font-medium">${t("experience")}</span>
                    </div>
                    <p class="text-orange-600">${guide.experience} ${t("years")}</p>
                </div>
                
                <div>
                    <div class="flex items-center text-gray-600 mb-1">
                        <i data-lucide="languages" class="w-4 h-4 mr-1"></i>
                        <span class="font-medium">${t("languages")}</span>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        ${languageBadges}
                    </div>
                </div>
            </div>
            
            <div class="flex items-center justify-between pt-2 border-t border-orange-100">
                <div>
                    <p class="text-sm text-gray-600">${t("hourlyRate")}</p>
                    <p class="text-lg font-bold text-green-600">$${guide.hourlyRate}/hr</p>
                </div>
                ${verifiedBadge}
            </div>
            
            <div class="flex space-x-2 pt-4">
                <button onclick="contactGuide(${guide.id})" class="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-2 px-4 rounded-md shadow-lg transition-all flex items-center justify-center">
                    <i data-lucide="message-circle" class="w-4 h-4 mr-2"></i>
                    ${t("contactGuide")}
                </button>
                <button onclick="viewGuideProfile(${guide.id})" class="flex-1 border border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent py-2 px-4 rounded-md transition-all">
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

function filterGuides() {
  const searchTerm = document.getElementById("guide-search").value.toLowerCase()
  const categoryFilter = document.getElementById("filter-category").value
  const currentLang = getCurrentLanguage()

  const guides = window.guides // Declare guides variable
  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.name.toLowerCase().includes(searchTerm) ||
      guide.location[currentLang].toLowerCase().includes(searchTerm) ||
      guide.speciality[currentLang].toLowerCase().includes(searchTerm) ||
      guide.description[currentLang].toLowerCase().includes(searchTerm)

    const matchesCategory = categoryFilter === "all" || guide.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const guidesGrid = document.getElementById("guides-grid")

  if (!guidesGrid) return

  guidesGrid.innerHTML = ""

  if (filteredGuides.length === 0) {
    guidesGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i data-lucide="search-x" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <p class="text-gray-600 text-lg">No guides found matching your criteria</p>
            </div>
        `
    lucide.createIcons()
  } else {
    filteredGuides.forEach((guide) => {
      const guideCard = createGuideCard(guide, currentLang)
      guidesGrid.appendChild(guideCard)
    })
  }
}

function contactGuide(guideId) {
  // Store selected guide in localStorage for payment page
  const guides = window.guides // Declare guides variable
  const guide = guides.find((g) => g.id === guideId)
  if (guide) {
    localStorage.setItem("selectedGuide", JSON.stringify(guide))
    window.location.href = "payment.html"
  }
}

function viewGuideProfile(guideId) {
  const guides = window.guides // Declare guides variable
  const guide = guides.find((g) => g.id === guideId)
  const currentLang = getCurrentLanguage()

  if (guide) {
    const languagesList = guide.languages.join(", ")
    const verifiedText = guide.verified ? ` (${window.t("verified")})` : ""

    alert(
      `${guide.name}${verifiedText}\n\n${guide.description[currentLang]}\n\n${window.t("location")}: ${guide.location[currentLang]}\n${window.t("speciality")}: ${guide.speciality[currentLang]}\n${window.t("experience")}: ${guide.experience} ${window.t("years")}\n${window.t("rating")}: ${guide.rating} (${guide.reviews} ${window.t("reviews")})\n${window.t("languages")}: ${languagesList}\n${window.t("hourlyRate")}: $${guide.hourlyRate}/hr`,
    )
  }
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
