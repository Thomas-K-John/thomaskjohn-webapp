document.addEventListener("DOMContentLoaded", function () {
  // Toggle experience details
  const toggles = document.querySelectorAll(".experience-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !expanded);
      const details = this.nextElementSibling;
      if (details) {
        details.hidden = expanded;
      }
    });
  });

  // Toggle nav menu on mobile
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Collapse menu after clicking a nav link
    const navItems = navLinks.querySelectorAll("a");
    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Make a POST request to the visitor counter API
  fetch(
    "https://mvhb7uyk21.execute-api.us-east-1.amazonaws.com/prod/visitor_counter",
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Visitor Count:", data.Count);
      // Optionally display the count in the page
      const counterElement = document.getElementById("visitor-count");
      if (counterElement && data.Count !== undefined) {
        counterElement.textContent = data.Count;
      }
    })
    .catch((error) => {
      console.error("Error fetching visitor count:", error);
    });
});
