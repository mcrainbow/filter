"use strict";

const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 104,
    cat: "Dress",
  },
  {
    id: 3,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 4,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 5,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 6,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
  {
    id: 7,
    name: "Apple Watch ",
    img: "https://m.media-amazon.com/images/I/51NV+STh2IL._AC_SY355_.jpg",
    price: 289,
    cat: "Smart",
  },
  {
    id: 8,
    name: "Rolex Yacht-Master ",
    img: "https://spbluxwatches.ru/upload/resize_cache/iblock/0bf/465_700_12b64a3dc42b8868349dda077f089e4ff/0bfc493be995e046f4293402d5937049.png",
    price: 2200,
    cat: "Dress",
  },
  {
    id: 9,
    name: "Rolex Submariner Date ",
    img: "https://spbluxwatches.ru/upload/resize_cache/iblock/c96/465_700_12b64a3dc42b8868349dda077f089e4ff/c962b7f2f467b161b41045c388ea3e17.png",
    price: 4400,
    cat: "Luxury",
  },
];

//  Main Block

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".catigories");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

// ! Displaying products

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
       <div class="product">
          <img
          src=${product.img}
          alt=""
          />
          <span class="name">${product.name}</span>
          <span class="priceText">$${product.price}</span>
        </div>
    `
    )
    .join("");
};

displayProducts(data);

// ! Search Input

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

// ! Function to sort products by catigories

const sortProducts = (catigoeie) => {
  displayProducts(data.filter((item) => item.cat === catigoeie));
};

// ! Setting Categories

const setCategories = () => {
  const allCats = data.map((elem) => elem.cat);

  const filteredCats = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  console.log(filteredCats);

  categoriesContainer.innerHTML = filteredCats
    .map((item) => {
      return `
      <span class="catigorie">${item}</span>
    `;
    })
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    e.target.textContent === "All"
      ? displayProducts(data)
      : displayProducts(
          data.filter((item) => item.cat === e.target.textContent)
        );
  });
};

setCategories();

// ! Price range filter

const setPrices = () => {
  const priceList = data.map((item) => {
    return item.price;
  });

  const [maxPrice, minPrice] = [Math.max(...priceList), Math.min(...priceList)];
  [priceRange.min, priceRange.max, priceRange.value] = [
    minPrice,
    maxPrice,
    maxPrice,
  ];
  priceValue.textContent = `$${maxPrice}`;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = `$${e.target.value}`;
    displayProducts(
      data.filter((item) => {
        return item.price <= e.target.value;
      })
    );
  });
};

setPrices();
