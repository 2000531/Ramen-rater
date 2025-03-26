document.addEventListener('DOMContentLoaded', main);

const ramens = [
    { id: 1, name: "kojiro", restaurant: "Ichiran", image: "kojiro.jpg", rating: 5, comment: "Classic and tasty." },
    { id: 2, name: "naruto", restaurant: "Menya", image: "naruto.jpg", rating: 4, comment: "Rich and flavorful." },
    { id: 3, name: "nirvana", restaurant: "Ramen-ya", image: "nirvana.jpg", rating: 5, comment: "Creamy broth." },
    { id: 4, name: "gyukotsu", restaurant: "Hot Spot", image: "gyukotsu.jpg", rating: 10, comment: "Absolutely amazing!" },
    { id: 5, name: "shoyu", restaurant: "Green Bowl", image: "shoyu.jpg", rating: 3, comment: "Decent vegetarian option." },
];

function setupRamenImages() {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  ramens.forEach(ramen => {
      const img = document.createElement('img');
      img.src = ramen.image;
      img.alt = ramen.name;
      img.dataset.id = ramen.id;
      img.addEventListener('click', handleClick);
      ramenMenu.appendChild(img);
  });

  // Display the first ramen by default
  if (ramens.length > 0) {
      displayRamenDetails(ramens[0]);
      // Highlight first image
      document.querySelector('#ramen-menu img').style.borderColor = '#ff6b6b';
  }
}

function displayRamenDetails(ramen) {
  const ramenDetail = document.getElementById('ramen-details');
  ramenDetail.innerHTML = `
      <img src="${ramen.image}" alt="${ramen.name}" 
             style="width:200px; height:150px; object-fit:cover; border-radius:8px; margin-bottom:15px;">
      <h2>${ramen.name}</h2>
      <p><strong>Restaurant:</strong> ${ramen.restaurant}</p>
      <p><strong>Rating:</strong> ${ramen.rating}/10</p>
      <p><strong>Comment:</strong> ${ramen.comment}</p>
  `;
}


function handleClick(event) {
    // Remove border from all images
    document.querySelectorAll('#ramen-menu img').forEach(img => {
        img.style.borderColor = 'transparent';
    });
    
    // Add border to clicked image
    event.target.style.borderColor = '#ff6b6b';
    
    const ramenId = parseInt(event.target.dataset.id);
    const selectedRamen = ramens.find(ramen => ramen.id === ramenId);
    if (selectedRamen) {
        displayRamenDetails(selectedRamen);
    }
}


function displayRamenDetails(ramen) {
    const ramenDetail = document.getElementById('ramen-details');
    ramenDetail.innerHTML = `
        <img src="${ramen.image}" alt="${ramen.name}">
        <h2>${ramen.name}</h2>
        <p><strong>Restaurant:</strong> ${ramen.restaurant}</p>
        <p><strong>Rating:</strong> ${ramen.rating}/10</p>
        <p><strong>Comment:</strong> ${ramen.comment}</p>
    `;
}

function addSubmitListener() {
    const form = document.getElementById('new-ramen-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const restaurant = document.getElementById('restaurant').value;
        const image = document.getElementById('image').value;
        const rating = parseInt(document.getElementById('rating').value);
        const comment = document.getElementById('comment').value;

        const newRamen = {
            id: ramens.length + 1,
            name: name,
            restaurant: restaurant,
            image: image,
            rating: rating,
            comment: comment
        };

        ramens.push(newRamen);
        // Add the new ramen image to the ramen-menu div
        const newImg = document.createElement('img');
        newImg.src = image;
        newImg.alt = name;
        newImg.dataset.id = ramens.length;
        newImg.addEventListener('click', handleClick);
        document.getElementById('ramen-menu').appendChild(newImg);

        form.reset();
    });
}


function main() {
    setupRamenImages();
    addSubmitListener();
}

document.addEventListener("DOMContentLoaded", () => {

    // Load data from storage yangu yaani
    const savedRamen = localStorage.getItem("ramenData")
    if (savedRamen) {
      ramenData = JSON.parse(savedRamen)
    }
  
    // Navigation
    const navLinks = document.querySelectorAll("nav a")
    const sections = document.querySelectorAll("section")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href").substring(1)
  
        sections.forEach((section) => {
          section.classList.remove("active")
        })
  
        document.getElementById(targetId).classList.add("active")
      })
    })
  
    // Display ramen in containers
    function displayRamen(container, data) {
      const ramenContainer = document.getElementById(container)
      ramenContainer.innerHTML = ""
  
      if (data.length === 0) {
        ramenContainer.innerHTML = '<p class="no-results">No ramen found. Add some ramen to your collection!</p>'
        return
      }
  
      data.forEach((ramen) => {
        const ramenItem = document.createElement("div")
        ramenItem.className = "ramen-item"
        ramenItem.dataset.id = ramen.id
  
        const defaultImage = "file:///home/ronoh/development/code/se-prep/code-challenge/Ramen-rater/naruto.jpg"
  
        ramenItem.innerHTML = `
          <img src="${ramen.image || defaultImage}" alt="${ramen.name}" class="ramen-image">
          <div class="ramen-info">
            <div class="ramen-name">${ramen.name}</div>
            <div class="ramen-restaurant">${ramen.restaurant}</div>
            <div class="ramen-rating">${getStarRating(ramen.rating)}</div>
          </div>
        `
  
        ramenItem.addEventListener("click", () => showRamenDetail(ramen.id))
  
        ramenContainer.appendChild(ramenItem)
      })
    }
  
    // Generate star rating (everybody is rating out of10)
    function getStarRating(rating) {
      const fullStar = "★"
      const emptyStar = "☆"
      let stars = ""
  
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          stars += fullStar
        } else {
          stars += emptyStar
        }
      }
  
      return stars
    }
  
    // Show ramen detail in modal
    function showRamenDetail(id) {
      const ramen = ramenData.find((r) => r.id === id)
      if (!ramen) return
  
      const modal = document.getElementById("ramen-modal")
      const detailContainer = document.getElementById("ramen-detail")
  
      const defaultImage = "index.html"
  
      detailContainer.innerHTML = `
        <img src="${ramen.image || defaultImage}" alt="${ramen.name}" class="detail-image">
        <h3 class="detail-name">${ramen.name}</h3>
        <p class="detail-restaurant">${ramen.restaurant}</p>
        <div class="detail-rating">
          <p>Current Rating: ${getStarRating(ramen.rating)}</p>
        </div>
        ${ramen.comments ? `<div class="detail-comments"><p>${ramen.comments}</p></div>` : ""}
        
        <div class="update-rating">
          <h4>Update Rating</h4>
          <div class="star-rating detail-star-rating">
            <input type="radio" id="detail-star5" name="detail-rating" value="5" ${ramen.rating === 5 ? "checked" : ""}>
            <label for="detail-star5">★</label>
            <input type="radio" id="detail-star4" name="detail-rating" value="4" ${ramen.rating === 4 ? "checked" : ""}>
            <label for="detail-star4">★</label>
            <input type="radio" id="detail-star3" name="detail-rating" value="3" ${ramen.rating === 3 ? "checked" : ""}>
            <label for="detail-star3">★</label>
            <input type="radio" id="detail-star2" name="detail-rating" value="2" ${ramen.rating === 2 ? "checked" : ""}>
            <label for="detail-star2">★</label>
            <input type="radio" id="detail-star1" name="detail-rating" value="1" ${ramen.rating === 1 ? "checked" : ""}>
            <label for="detail-star1">★</label>
          </div>
          
          <div class="form-group">
            <label for="update-comments">Update Comments</label>
            <textarea id="update-comments" rows="4">${ramen.comments || ""}</textarea>
          </div>
          
          <button id="update-ramen-btn" data-id="${ramen.id}">Update Ramen</button>
        </div>
      `
  
      // Add event listener to update button
      const updateBtn = detailContainer.querySelector("#update-ramen-btn")
      updateBtn.addEventListener("click", () => updateRamen(ramen.id))
  
      // Show modal
      modal.style.display = "block"
    }
  
    // Update ramen rating and comments
    function updateRamen(id) {
      const ramen = ramenData.find((r) => r.id === id)
      if (!ramen) return
  
      const ratingInputs = document.querySelectorAll('input[name="detail-rating"]')
      let newRating = ramen.rating
  
      for (const input of ratingInputs) {
        if (input.checked) {
          newRating = Number.parseInt(input.value)
          break
        }
      }
  
      const newComments = document.getElementById("update-comments").value
  
      // Update ramen data
      ramen.rating = newRating
      ramen.comments = newComments
  
      // Save to localStorage
      localStorage.setItem("ramenData", JSON.stringify(ramenData))
  
      // Refresh displays
      displayRamen("ramen-container", filterRamen(document.getElementById("rating-filter").value))
      displayRamen("featured-ramen-container", getFeaturedRamen())
  
      // Close modal
      document.getElementById("ramen-modal").style.display = "none"
    }
  
    // Add new ramen
    function addNewRamen(e) {
      e.preventDefault()
  
      const name = document.getElementById("ramen-name").value
      const restaurant = document.getElementById("restaurant").value
      const image = document.getElementById("ramen-image").value
  
      const ratingInputs = document.querySelectorAll('input[name="initial-rating"]')
      let rating = 0
  
      for (const input of ratingInputs) {
        if (input.checked) {
          rating = Number.parseInt(input.value)
          break
        }
      }
  
      const comments = document.getElementById("comments").value
  
      // Generate a new ID
      const newId = ramenData.length > 0 ? Math.max(...ramenData.map((r) => r.id)) + 1 : 1
  
      // Create new ramen object
      const newRamen = {
        id: newId,
        name,
        restaurant,
        image,
        rating,
        comments,
      }
  
      // Add to data array
      ramenData.push(newRamen)
  
      // Save to localStorage
      localStorage.setItem("ramenData", JSON.stringify(ramenData))
  
      // Refresh displays
      displayRamen("ramen-container", filterRamen(document.getElementById("rating-filter").value))
      displayRamen("featured-ramen-container", getFeaturedRamen())
  
      // Reset form
      document.getElementById("ramen-form").reset()
  
      // Show success message
      alert("Ramen added successfully!")
  
      // Navigate to ramen list
      document.querySelector('a[href="#ramen-list"]').click()
    }
  
    // Filter ramen by rating
    function filterRamen(rating) {
      if (rating === "all") {
        return ramenData
      }
  
      const ratingValue = Number.parseInt(rating)
      return ramenData.filter((ramen) => ramen.rating === ratingValue)
    }
  
    // Get featured ramen (highest rated)
    function getFeaturedRamen() {
      if (ramenData.length === 0) return []
  
      // Sort by rating (descending)
      const sortedRamen = [...ramenData].sort((a, b) => b.rating - a.rating)
  
      // Return top 3 or fewer if less than 3 exist
      return sortedRamen.slice(0, 3)
    }
  
    // Event Listeners
  
    // Close modal when clicking the X
    document.querySelector(".close-button").addEventListener("click", () => {
      document.getElementById("ramen-modal").style.display = "none"
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (e) => {
      const modal = document.getElementById("ramen-modal")
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  
    // Add ramen form submission
    document.getElementById("ramen-form").addEventListener("submit", addNewRamen)
  
    // Rating filter change
    document.getElementById("rating-filter").addEventListener("change", function () {
      displayRamen("ramen-container", filterRamen(this.value))
    })
  
    // Counter functionality
    const countDisplay = document.getElementById("count")
    const incrementBtn = document.getElementById("increment")
    const decrementBtn = document.getElementById("decrement")
    const resetBtn = document.getElementById("reset")
  
    let count = 0
  
    incrementBtn.addEventListener("click", () => {
      count++
      countDisplay.textContent = count
    })
  
    decrementBtn.addEventListener("click", () => {
      count--
      countDisplay.textContent = count
    })
  
    resetBtn.addEventListener("click", () => {
      count = 0
      countDisplay.textContent = count
    })
  
    // Accordion functionality
    const accordionHeaders = document.querySelectorAll(".accordion-header")
  
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const accordionItem = this.parentElement
        accordionItem.classList.toggle("active")
      })
    })
  
    // Form handling
    const contactForm = document.getElementById("contact-form")
    const formResponse = document.getElementById("form-response")
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value
  
      // Simple validation
      if (name && email && message) {
        // In a real app, you would send this data to a server
        console.log("Form submitted:", { name, email, message })
  
        // Show success message
        formResponse.textContent = "Thank you for your message! We will get back to you soon."
        formResponse.className = "success"
  
        // Reset form
        contactForm.reset()
  
        // Hide message after 5 seconds
        setTimeout(() => {
          formResponse.style.display = "none"
        }, 5000)
      } else {
        // Show error message
        formResponse.textContent = "Please fill out all fields."
        formResponse.className = "error"
      }
    })
  
    // Initialize app
    displayRamen("ramen-container", ramenData)
    displayRamen("featured-ramen-container", getFeaturedRamen())
  })
  
  