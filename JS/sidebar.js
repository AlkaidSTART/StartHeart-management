document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initFloatingButton();
  initScrollSpy();
});

// Sidebar Logic
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.querySelector(".mobile-overlay");
  const body = document.body;

  window.toggleSidebar = function () {
    if (window.innerWidth > 768) {
      // Desktop toggle
      sidebar.classList.toggle("collapsed");
      body.classList.toggle("sidebar-collapsed");
    } else {
      // Mobile toggle
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
    }
  };

  window.toggleSubmenu = function (link) {
    const parent = link.parentElement;
    const submenu = parent.querySelector(".submenu");
    const arrow = link.querySelector(".menu-arrow");

    // Close other open menus? Optional. Let's keep multiple open for now or close others.
    // Close others logic:
    /*
    document.querySelectorAll('.menu-item.open').forEach(item => {
      if (item !== parent) {
        item.classList.remove('open');
        gsap.to(item.querySelector('.submenu'), { height: 0, duration: 0.3 });
      }
    });
    */

    if (parent.classList.contains("open")) {
      parent.classList.remove("open");
      gsap.to(submenu, { height: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(arrow, { rotation: 0, duration: 0.3 });
    } else {
      parent.classList.add("open");
      gsap.set(submenu, { height: "auto" });
      gsap.from(submenu, { height: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(arrow, { rotation: 180, duration: 0.3 });
    }
  };
}

// Floating Button Logic with GSAP
let isFloatingMenuOpen = false;

function initFloatingButton() {
  if (window.__floatingAssistantInitialized) {
    return;
  }

  const mainBtn = document.getElementById("starBtn");
  const menuItemsContainer = document.querySelector(".star-menu-items");
  const menuItems = document.querySelectorAll(".star-menu-item");
  if (!mainBtn || !menuItemsContainer) {
    return; // floating button not present on page
  }
  const icon = mainBtn.querySelector(".star-btn-icon");

  isFloatingMenuOpen = false;

  mainBtn.addEventListener("click", () => {
    isFloatingMenuOpen = !isFloatingMenuOpen;

    if (isFloatingMenuOpen) {
      // Open animation
      gsap.to(mainBtn, { rotation: 45, duration: 0.3, ease: "back.out(1.7)" });
      gsap.to(menuItemsContainer, { autoAlpha: 1, duration: 0.1 });

      gsap.fromTo(
        menuItems,
        { y: 20, opacity: 0, x: 20 },
        {
          y: 0,
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "back.out(1.2)",
        },
      );
    } else {
      // Close animation
      gsap.to(mainBtn, { rotation: 0, duration: 0.3, ease: "power2.out" });

      gsap.to(menuItems, {
        y: 20,
        opacity: 0,
        x: 20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(menuItemsContainer, { autoAlpha: 0, delay: 0.3, duration: 0.1 });
    }
  });

  // Hover effect on main button
  mainBtn.addEventListener("mouseenter", () => {
    if (!isFloatingMenuOpen) {
      gsap.to(mainBtn, {
        scale: 1.1,
        duration: 0.3,
        ease: "elastic.out(1, 0.3)",
      });
    }
  });

  mainBtn.addEventListener("mouseleave", () => {
    if (!isFloatingMenuOpen) {
      gsap.to(mainBtn, { scale: 1, duration: 0.3, ease: "power2.out" });
    }
  });

  if (typeof window.handleAssistantClick !== "function") {
    window.handleAssistantClick = function () {
      if (isFloatingMenuOpen) {
        mainBtn.click();
      }
      if (typeof toggleChatPopup === "function") {
        toggleChatPopup(true);
      }
    };
  }
}

// Scroll Spy for Sidebar
function initScrollSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".submenu-item a");

  // Using Intersection Observer for better performance
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Trigger when section is near top
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        updateActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  function updateActiveLink(id) {
    // Remove active class from all submenu items
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.style.backgroundColor = "";
      link.style.color = "";
    });

    // Add active class to corresponding link
    const activeLink = document.querySelector(`.submenu-item a[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
      gsap.to(activeLink, {
        backgroundColor: "rgba(24, 144, 255, 0.1)",
        color: "#1890ff",
        duration: 0.3,
      });

      // Also ensure the parent menu is open
      const parentMenuItem = activeLink.closest(".menu-item");
      if (parentMenuItem && !parentMenuItem.classList.contains("open")) {
        // Just trigger the click on the parent link to open it
        // Or manually open it without animation if preferred to avoid distracting jumps
        // For now, let's just highlight the parent link
        const parentLink = parentMenuItem.querySelector(".menu-link");
        parentLink.classList.add("active");
      }
    }
  }
}
