// JavaScript for registration page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons()

  // Initialize language
  initializeLanguage()

  // Setup event listeners
  setupEventListeners()
})

function initializeLanguage() {
  const languageSelector = document.getElementById("language-selector")
  const currentLang = getCurrentLanguage()

  languageSelector.value = currentLang
  updatePageTranslations()

  languageSelector.addEventListener("change", function () {
    setCurrentLanguage(this.value)
    updatePageTranslations()
    updateFormLabels()
  })
}

function setupEventListeners() {
  // User type radio buttons
  const userTypeRadios = document.querySelectorAll('input[name="userType"]')
  userTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      toggleGuideInfo(this.value)
      updateRegisterSubtitle(this.value)
    })
  })

  // Form submission
  const registrationForm = document.getElementById("registration-form")
  if (registrationForm) {
    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handleRegistration()
    })
  }

  // Password confirmation validation
  const password = document.getElementById("password")
  const confirmPassword = document.getElementById("confirmPassword")

  if (confirmPassword) {
    confirmPassword.addEventListener("blur", () => {
      validatePasswordMatch()
    })
  }

  if (password) {
    password.addEventListener("input", () => {
      if (confirmPassword.value) {
        validatePasswordMatch()
      }
    })
  }
}

function toggleGuideInfo(userType) {
  const guideInfo = document.getElementById("guide-info")
  if (guideInfo) {
    if (userType === "guide") {
      guideInfo.classList.remove("hidden")
      // Make guide fields required
      const guideFields = guideInfo.querySelectorAll("input, select, textarea")
      guideFields.forEach((field) => {
        if (field.name !== "description") {
          // Description is optional
          field.required = true
        }
      })
    } else {
      guideInfo.classList.add("hidden")
      // Remove required attribute from guide fields
      const guideFields = guideInfo.querySelectorAll("input, select, textarea")
      guideFields.forEach((field) => {
        field.required = false
      })
    }
  }
}

function updateRegisterSubtitle(userType) {
  const subtitle = document.getElementById("register-subtitle")
  if (subtitle) {
    const currentLang = getCurrentLanguage()
    const text = userType === "guide" ? t("professionalGuide") : t("regularUser")
    subtitle.textContent = text
  }
}

function updateFormLabels() {
  // Update specialization options based on language
  const specialization = document.getElementById("specialization")
  const location = document.getElementById("location")
  const currentLang = getCurrentLanguage()

  if (specialization) {
    const specializations = {
      uz: ["Tarix", "Me'morchilik", "Madaniyat", "Tabiat", "San'at", "Shahar gidi"],
      ru: ["История", "Архитектура", "Культура", "Природа", "Искусство", "Городской гид"],
      en: ["History", "Architecture", "Culture", "Nature", "Art", "City Guide"],
    }

    // Clear existing options except the first one
    specialization.innerHTML = '<option value="">Select specialization</option>'

    specializations[currentLang].forEach((spec) => {
      const option = document.createElement("option")
      option.value = spec.toLowerCase()
      option.textContent = spec
      specialization.appendChild(option)
    })
  }

  if (location) {
    const locations = {
      uz: ["Toshkent", "Samarqand", "Buxoro", "Xiva", "Farg'ona", "Nukus", "Namangan", "Andijon"],
      ru: ["Ташкент", "Самарканд", "Бухара", "Хива", "Фергана", "Нукус", "Наманган", "Андижан"],
      en: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Fergana", "Nukus", "Namangan", "Andijan"],
    }

    // Clear existing options except the first one
    location.innerHTML = '<option value="">Select location</option>'

    locations[currentLang].forEach((loc) => {
      const option = document.createElement("option")
      option.value = loc.toLowerCase()
      option.textContent = loc
      location.appendChild(option)
    })
  }
}

function validatePasswordMatch() {
  const password = document.getElementById("password")
  const confirmPassword = document.getElementById("confirmPassword")

  if (password && confirmPassword) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match")
      confirmPassword.style.borderColor = "#ef4444"
    } else {
      confirmPassword.setCustomValidity("")
      confirmPassword.style.borderColor = "#fdba74"
    }
  }
}

function handleRegistration() {
    const formData = new FormData(document.getElementById('registration-form'));
    const userType = formData.get('userType');
    
    // Collect form data
    const registrationData = {
        userType: userType,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        password: formData.get('password')
    };
    
    // Add guide-specific data if user is a guide
    if (userType === 'guide') {
        registrationData.guideInfo = {
            experience: formData.get('experience'),
            hourlyRate: formData.get('hourlyRate'),
            specialization: formData.get('specialization'),
            location: formData.get('location'),
            languages: formData.getAll('languages'),
            description: formData.get('description')
        };
    }
    
    // Validate required fields
    if (!validateForm(registrationData)) {
        return;
    }
