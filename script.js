/*
// Track followers only when logged in
var isFollowed = false;
var followerCount = 0;
var followButton = document.getElementById("followButton");
var countElement = document.getElementById("count");

function toggleFollow() {
  isFollowed = !isFollowed;
  updateButtonText();
  updateFollowerCount();
}

function updateButtonText() {
  followButton.textContent = isFollowed ? "Followed" : "Follow";
  followButton.classList.toggle("followed", isFollowed);
}

function updateFollowerCount() {
  followerCount = isFollowed
    ? followerCount + 1
    : Math.max(followerCount - 1, 0);
  countElement.textContent = followerCount;
}
*/
// Function to navigate to url
function navigateTo(url) {
  window.parent.location.href = url;
}

// Function to preview the selected image
function previewImage() {
  const input = document.getElementById("productImage");
  const preview = document.getElementById("imagePreview");

  // Ensure that a file is selected
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Create an image element and set its source to the preview
      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Image Preview";
      img.style.maxWidth = "100%";
      preview.innerHTML = ""; // Clear previous previews
      preview.appendChild(img);
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.innerHTML = ""; // Clear the preview if no file is selected
  }
}

// Function to open the pop-up form
function openPopupForm() {
  document.getElementById("popupForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Function to close the pop-up form
function closePopupForm() {
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Function to clear the form fields and reset the photo preview
function clearInputFields() {
  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("categories").value = "";
  document.getElementById("location").value = "";
  document.getElementById("status").value = "";
  document.getElementById("productImage").value = "";
  document.getElementById("imagePreview").innerHTML = "";
}

// Override addProduct function to clear input fields after adding
const originalAddProduct = addProduct;
addProduct = function () {
  originalAddProduct();
  clearInputFields();
};

// Load products from local storage on page load
let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  // Get values from the form
  const productName = document.getElementById("productName").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const categories = document.getElementById("categories").value;
  const location = document.getElementById("location").value;
  const status = document.getElementById("status").value;

  // Get the data URL of the processed image
  const dataURL =
    document.getElementById("imagePreview").querySelector("img")?.src || "";

  // Create a product object
  const product = {
    name: productName,
    description: productDescription,
    categories: categories,
    location: location,
    status: status,
    image: dataURL,
  };

  // Add the product to the array
  products.push(product);

  // Save products to local storage
  localStorage.setItem("products", JSON.stringify(products));

  // Display the updated product list
  displayProducts();
}

function deleteProduct(index) {
  // Remove the product at the specified index
  products.splice(index, 1);

  // Save products to local storage
  localStorage.setItem("products", JSON.stringify(products));

  // Display the updated product list
  displayProducts();
}

function displayProducts() {
  // Reverse the order of products to display newest first
  products = products.reverse();
  // Get the product container element
  const productContainer = document.getElementById("productContainer");

  // Clear previous entries
  productContainer.innerHTML = "";

  // Populate the product container
  products.forEach((product, index) => {
    // Create an item wrapper
    const itemWrapper = document.createElement("div");
    itemWrapper.classList.add("item-wrapper");

    // Create product image section
    const productImg = document.createElement("div");
    productImg.classList.add("product-img");
    productImg.onclick = function () {
      navigateTo("../product-detail/product-detail.html");
    };
    const img = document.createElement("img");
    img.src = product.image || "../source images/default-image.jpg";
    img.alt = "Product Image";
    productImg.appendChild(img);

    // Create product info section
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");
    productInfo.onclick = function () {
      navigateTo("../product-detail/product-detail.html");
    };
    const productNameParagraph = document.createElement("p");
    productNameParagraph.classList.add("bold");
    productNameParagraph.textContent = product.name;
    /*
      const productDescriptionParagraph = document.createElement("p");
      productDescriptionParagraph.classList.add("small-font");
      productDescriptionParagraph.textContent = product.description;
      */
    const productCategories = document.createElement("p");
    productCategories.classList.add("small-font");
    productCategories.textContent = product.categories;

    productInfo.appendChild(productNameParagraph);
    productInfo.appendChild(productCategories);

    // Create user and request section
    const userAndRequest = document.createElement("div");
    userAndRequest.classList.add("user-and-request");

    // Create image container
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    const avatarImg = document.createElement("img");
    avatarImg.src =
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";
    avatarImg.alt = "avatar";
    imgContainer.appendChild(avatarImg);

    // Create username and star section
    const usernameAndStar = document.createElement("div");
    usernameAndStar.classList.add("username-and-star");
    const username = document.createElement("div");
    username.classList.add("username", "small-font", "bold");
    username.textContent = "Username";
    const stars = document.createElement("div");
    stars.classList.add("stars");
    for (let i = 0; i < 5; i++) {
      const starImg = document.createElement("img");
      starImg.src = "../source images/star.png";
      stars.appendChild(starImg);
    }
    usernameAndStar.appendChild(username);
    usernameAndStar.appendChild(stars);

    // Create request button
    const requestButton = document.createElement("button");
    requestButton.classList.add("btn-request");
    requestButton.type = "button";
    requestButton.textContent = "Request";

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteProduct(index);
    };

    // Append everything to the item wrapper
    userAndRequest.appendChild(imgContainer);
    userAndRequest.appendChild(usernameAndStar);
    userAndRequest.appendChild(requestButton);
    userAndRequest.appendChild(deleteButton);

    // Append sections to the item wrapper
    itemWrapper.appendChild(productImg);
    itemWrapper.appendChild(productInfo);
    itemWrapper.appendChild(userAndRequest);

    // Append the item wrapper to the product container
    productContainer.appendChild(itemWrapper);
  });
}

// Display existing products on page load
displayProducts();

