const featuredItemsEl = document.querySelector(".featuredItems");
const productListEl = document.querySelector(".product-list");
const cartCountEl = document.querySelector(".cart-count");
const totalPriceEl = document.querySelector(".total-price__price span");
const header = document.querySelector(".header");
const cartItemsBox = header.querySelector(".cart-items-box");
const basket = {};
let totalPrice = 0;

featuredItemsEl.addEventListener('click', event => {
  if (event.target.classList.contains("add-to-cart")) {
    const parent = event.target.closest(".featuredItem");
    addToCart(parent);
  }
});

header.addEventListener('click', event => {
  if (event.target.classList.contains("cartIcon")) {
    cartItemsBox.classList.toggle("invisibility");
  }
});

/**
 * Функция занимается изменением html разметки продукта
 * @param {number} mode - При 1 отрисовать новый продукт, 
 * при 0 - продукт обновляется
 * @param {number} basketId - id продукта
 */
function outputCartItemInHtml(mode, basketId) {
  switch (mode) {
      case 1:
        productListEl.insertAdjacentHTML("beforeend", `
          <div class="cart-product cart_bottom-border pr-id-${basketId}">
            <div class="cart-product__item"><span class="pr-name">${basket[basketId].name}</span></div>
            <div class="cart-product__item"><span class="pr-count">${1}</span> шт</div>
            <div class="cart-product__item"><span class="pr-price">${basket[basketId].price}</span>$</div>
            <div class="cart-product__item"><span class="pr-fullPrice">${basket[basketId].price}</span>$</div>
          </div>
        `);
        console.log("test");
        break;
      case 0:
        productListEl.querySelector(`.pr-id-${basketId} .pr-count`)
          .textContent++;
        productListEl.querySelector(`.pr-id-${basketId} .pr-fullPrice`)
          .textContent = basket[basketId].count * basket[basketId].price;
        break;
      default:
          break;
  };
}
function addToCart(parent) {
  if (!basket.hasOwnProperty(parent.dataset.id)) {
    basket[parent.dataset.id] = {
      name : parent.dataset.name, 
      price: +parent.dataset.price, 
      count: 1,
    };
    outputCartItemInHtml(1, parent.dataset.id);
  } else {
    basket[parent.dataset.id].count++;
    outputCartItemInHtml(0, parent.dataset.id);
  }
  totalPrice += +parent.dataset.price;
  totalPriceEl.textContent = totalPrice;
  cartCountEl.textContent++;
}