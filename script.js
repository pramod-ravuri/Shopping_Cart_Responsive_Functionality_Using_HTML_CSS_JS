const sliderItems = document.querySelectorAll(".header-slider ul .slider-item");
const prevBtn = document.querySelector(".control-previous");
const nextBtn = document.querySelector(".control-next");

let n = 0;

function changeSlide() {
  for (let i = 0; i < sliderItems.length; i++) {
    sliderItems[i].style.display = "none";
  }
  sliderItems[n].style.display = "block";
}

changeSlide();

prevBtn.addEventListener("click", (e) => {
  if (n > 0) {
    n--;
  } else {
    n = sliderItems.length - 1;
  }
  changeSlide();
});

nextBtn.addEventListener("click", (e) => {
  if (n < sliderItems.length - 1) {
    n++;
  } else {
    n = 0;
  }
  changeSlide();
});

document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const cardContainer = document.getElementById("card-container");
  const cartCount = document.getElementById("count");
  const modal = document.getElementById("myModal");
  const modalContent = modal.querySelector(".modal-content");
  let itemCount = 0;
  let cartItems = [];

  // Function to create a card element
  function createCard(item) {
    const card = document.createElement("div");
    card.classList.add("col-md-6","col-lg-4", "mb-3","img-fluid");

    card.innerHTML = `
            <div class="card">
                <img src="${item.url}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text"><span>Brand:</span> ${item.brand}</p>
                    <p class="${
                      item.inStock ? "text-success" : "text-danger"
                    }">${item.inStock ? "In Stock" : "Out of Stock"}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="#" class="btn btn-primary">&dollar;${
                          item.price
                        }</a>
                        <a href="#" class="btn btn-warning add-to-cart-btn" data-id="${
                          item.id
                        }">Add To Cart</a>
                    </div>
                </div>
            </div>
        `;

    return card;
  }

  // Display Modal

  function DisplayModal(item) {
    const cardDetails = document.createElement("div");
    cardDetails.classList.add("w-50", "mb-3", "m-auto");

    cardDetails.innerHTML = `
            <div class="card">
                <img src="${item.url}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text"><span class="fw-semibold">Brand:</span> ${item.brand}</p>
                    <p>${item.description}</p>
                    <div class="text-center">
                        <a href="#" class="btn btn-primary w-50">&dollar;${item.price}</a>
                    </div>
                </div>
            </div>
        `;

    return cardDetails;
  }

  // Fetch product data

  async function fetchProductData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productData = [
          {
            id: 1,
            name: "Floral Print Crew-Neck T-shirt",
            description: "Casual Short Sleeve Shirt, Women's Shirt",
            price: 30,
            brand: "Rio",
            url: "https://assets.ajio.com/medias/sys_master/root/h30/h6d/16189998333982/-473Wx593H-460556079-black-MODEL.jpg",
            inStock: true,
          },
          {
            id: 2,
            name: "DNMX Typographic Round-Neck T-shirt",
            description:
              "comfortable and loose-fitting suitable for both men and women",
            price: 40,
            brand: "Hawt",
            url: "https://assets.ajio.com/medias/sys_master/root/hce/hf4/11344689561630/-473Wx593H-460151772-stone-MODEL.jpg",
            inStock: true,
          },
          {
            id: 3,
            name: "Colourblock Crew-Neck T-shirt",
            price: 35,
            description:
              "Houndstooth Casual Slightly Stretch Button Up Short Sleeve Shirt, Men's Shirt For Summer",
            brand: "Minga London",
            url: "https://assets.ajio.com/medias/sys_master/root/20240326/pJDV/6602a13705ac7d77bbda2a89/-473Wx593H-466665898-multi-MODEL.jpg",
            inStock: false,
          },
          {
            id: 4,
            name: "Brand Print Crew-Neck T-shirt",
            price: 25,
            description:
              "A soft, breathable jersey which is an excellent choice for the warmest day",
            brand: "Merchmallow",
            url: "https://assets.ajio.com/medias/sys_master/root/20220521/9qL2/62886585f997dd03e2019023/-473Wx593H-460829594-khaki-MODEL.jpg",
            inStock: true,
          },
          {
            id: 5,
            name: "Veirdo Regular Fit Crew-Neck T-shirt",
            description:
              "This shirt is made with a luxuriously soft triblend fabric, and features a herd of elephants with foil highlights parading along the front",
            price: 55,
            brand: "Billabong",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPDQqFQwU75GrRn7SHDaQ8TUQaAplJ_7McZ_QI4fSJjZ3jDegKgtC4pNBx3P-qipN0Hq8&usqp=CAU",
            inStock: true,
          },
          {
            id: 6,
            name: "Graphic Print Crew-Neck T-shirt",
            description:
              "The machine-washable fabric is easy to care for, and the super soft, lightweight cotton jersey with slub texture feels great against the skin",
            price: 40,
            brand: "Gant",
            url: "https://assets.ajio.com/medias/sys_master/root/20230321/5cCB/6418f558aeb26924e3d7711a/-473Wx593H-465699970-black-MODEL.jpg",
            inStock: false,
          },
          {
            id: 7,
            name: "EPPE Regular Crew-Neck T-shirt",
            description:
              "The ribbed V–neck and short sleeves make this t–shirt comfortable to wear",
            price: 30,
            brand: "Dillinger",
            url: "https://assets.ajio.com/medias/sys_master/root/20230629/qEjo/649cf2fbeebac147fc36b48c/-473Wx593H-466079339-brown-MODEL.jpg",
            inStock: true,
          },
          {
            id: 8,
            name: "AUSK Stripped Crew-Neck T-shirt",
            description:
              "The Sydney Short-sleeve Cropped Crew Neck T-shirt is made from 100% cotton and is machine washable for easy care.",
            price: 25,
            brand: "Trends Tower",
            url: "https://assets.ajio.com/medias/sys_master/root/20220401/lVcb/6246f501f997dd03e243012b/-473Wx593H-460309126-white-MODEL.jpg",
            inStock: false,
          },
          {
            id: 9,
            name: "Striped Round-Neck T-shirt",
            description:
              "It has a lightweight short sleeve design with a wonderful soft touch, and a lightly ribbed, wide V-neckline",
            price: 20,
            brand: "Free Authority",
            url: "https://assets.ajio.com/medias/sys_master/root/h79/hcf/9426190434334/-473Wx593H-460021675-mustard-MODEL.jpg",
            inStock: true,
          },
          {
            id: 10,
            name: "Acid Washed Crew-Neck T-shirt",
            description:
              "This short–sleeve tee is a must–have for every woman‘s wardrobe",
            price: 45,
            brand: "Outryt",
            url: "https://assets.ajio.com/medias/sys_master/root/20221019/TZoE/634ef4bbaeb269659c4ce847/-1117Wx1400H-443003442-white-MODEL.jpg",
            inStock: true,
          },
          {
            id: 11,
            name: "T-shirt with Printed Crew-Neck",
            description:
              "This stylish and unique shirt is perfect for making a statement at any formal or semi–formal event",
            price: 30,
            brand: "Threadcurry",
            url: "https://i.pinimg.com/474x/1e/90/9c/1e909c44aa9561e17c7bd4d9890c0ddf.jpg",
            inStock: false,
          },
          {
            id: 12,
            name: "Grey Melange Crew-Neck T-shirt",
            description:
              "Made from 100% cotton, this t–shirt is perfect for layering or wearing alone",
            price: 50,
            brand: "Ajio",
            url: "https://assets.ajio.com/medias/sys_master/root/20220316/fjDi/6230dbb0f997dd03e2151d94/-473Wx593H-441309036-pink-MODEL.jpg",
            inStock: false,
          },
        ];
        resolve(productData);
      }, 1000);
    });
  }

  // Display cards based on filtered data

  function displayFilteredCards(filteredData) {
    cardContainer.innerHTML = ""; // Clear previous cards

    filteredData.forEach((item) => {
      const card = createCard(item);
      cardContainer.appendChild(card);
    });
  }

  // Filter cards based on search query
  function filterCards(searchText, data) {
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchText.toLowerCase())
    );

    displayFilteredCards(filteredData);
  }

  // Fetch product data and display initial cards
  const productData = await fetchProductData();
  filterCards("", productData);

  // Event listener for search input
  searchInput.addEventListener("input", function () {
    const searchText = this.value.trim();
    filterCards(searchText, productData); // Filter cards based on search query
  });

  // Event listener for "Add To Cart" buttons
  cardContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
      const itemId = parseInt(event.target.getAttribute("data-id"));
      const selectedItem = productData.find((item) => item.id === itemId);
      if (selectedItem && !cartItems.some((item) => item.id === itemId)) {
        cartItems.push(selectedItem);
        itemCount++;
        cartCount.textContent = itemCount;
      }
    }
  });

  // Event listener for cart icon click to display modal
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.addEventListener("click", () => {
    modalContent.innerHTML = ""; // Clear previous modal content
    cartItems.forEach((item) => {
      const card = DisplayModal(item);
      modalContent.appendChild(card);
    });
    modal.style.display = "block"; // Display the modal
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
