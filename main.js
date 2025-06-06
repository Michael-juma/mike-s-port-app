// Get current page for navigation highlighting
function getCurrentPage() {
  const path = window.location.pathname
  const page = path.split("/").pop() || "index.html"
  return page
}

// Set active navigation link
function setActiveNavLink() {
  const currentPage = getCurrentPage()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })
}

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Typing effect function
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing effect for hero title (only on home page)
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle && getCurrentPage() === "index.html") {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80)
    }, 500)
  }
})

// Enhanced hover effects for skill cards
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
    this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Contact card click analytics and feedback
document.querySelectorAll(".contact-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    const platform = this.querySelector(".contact-title").textContent
    console.log(`Contact clicked: ${platform}`)

    // Add visual feedback
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = ""
    }, 150)
  })
})

// Image hover effects
document.querySelectorAll(".image-container").forEach((container) => {
  container.addEventListener("mouseenter", function () {
    const overlay = this.querySelector(".image-overlay")
    if (overlay) {
      overlay.style.transform = "translateY(0)"
    }
  })

  container.addEventListener("mouseleave", function () {
    const overlay = this.querySelector(".image-overlay")
    if (overlay) {
      overlay.style.transform = "translateY(100%)"
    }
  })
})

// Profile image animation (only on home page)
window.addEventListener("load", () => {
  const profileImage = document.querySelector(".profile-image")
  if (profileImage && getCurrentPage() === "index.html") {
    profileImage.style.opacity = "0"
    profileImage.style.transform = "scale(0.8)"

    setTimeout(() => {
      profileImage.style.transition = "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
      profileImage.style.opacity = "1"
      profileImage.style.transform = "scale(1)"
    }, 300)
  }
})

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f59e0b, #2563eb);
        z-index: 9999;
        transition: width 0.1s ease;
    `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  })
}

// Initialize scroll progress on load
document.addEventListener("DOMContentLoaded", createScrollProgress)

// Mobile menu close on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// Page transition effects
function addPageTransitions() {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.3s ease"

  window.addEventListener("load", () => {
    document.body.style.opacity = "1"
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setActiveNavLink()
  addPageTransitions()
})

// Smooth page transitions for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href")

    // Only apply transition for internal links
    if (href && !href.startsWith("http") && !href.startsWith("#")) {
      e.preventDefault()

      document.body.style.opacity = "0"

      setTimeout(() => {
        window.location.href = href
      }, 150)
    }
  })
})
