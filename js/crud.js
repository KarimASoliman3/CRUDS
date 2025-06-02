// CRUDS ==> Store Mangement system

var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var productImgInput = document.getElementById("productImage");
var rowData = document.getElementById("rowData");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productList;
if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProduct(productList);
} else {
  productList = [];
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    descrp: productDescInput.value,
    image: "imgs/" + productImgInput.files[0]?.name,
  };
  productList.push(product);
  //   console.log(productList);
  //   clearForm();
  localStorage.setItem("products", JSON.stringify(productList));
  displayProduct(productList);
}

// to clear input after addProduct
function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescInput.value = null;
}

// function to display product
function displayProduct(arr) {
  var cartoona = "";
  for (var i = 0; i < arr.length; i++) {
    cartoona += `
                <div class="col-lg-3">
                    <div class="card">
                        <div class="p-2">
                            <button onclick="deleteProduct(${i})" class="float-end border-0 bg-transparent">
                                <i class="fa-solid fa-delete-left fa-2x"  style="color: #212529;" ></i>
                            </button>
                        </div>
                        <img src= "${arr[i].image}" class="card-img-top w-100" alt="" />
                        <div class="card-body">
                            <h2>${arr[i].name}</h2>
                            <p>${arr[i].descrp}</p>
                            <h2 class="h4">Price: ${arr[i].price} </h2>
                            <h2 class="h4">Category: ${arr[i].category}</h2>
                            <button onclick="setFormForUpdate(${i})" class="btn btn-danger w-100 mt-2">Update</button> 
                        </div>
                    </div>
                </div>
            `;
  }
  rowData.innerHTML = cartoona;
}

// delete
function deleteProduct(deleteIndex) {
  productList.splice(deleteIndex, 1);
    displayProduct(productList);
    localStorage.setItem("products", JSON.stringify(productList));

}

// search
function searchProduct() {
    var searchResult = [];
    for (var i = 0 ; i < productList.length ; i++){
      if (productList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
        searchResult.push(productList[i])
      }
    }   
    displayProduct(searchResult)     
}

var i ;   //global variable
//setFormForUpdate ===> for removing addBtn and add updateBtn  
function setFormForUpdate(updateIndex) {
  i = updateIndex;
  addBtn.classList.add('d-none');
  updateBtn.classList.remove('d-none');

  productNameInput.value = productList[updateIndex].name;
  productPriceInput.value = productList[updateIndex].price;
  productCategoryInput.value = productList[updateIndex].category;
  productDescInput.value = productList[updateIndex].descrp;
  // productImgInput.value = productList[updateIndex].image;

}


// update  i  = updateIndex; from setFormForUpdate();
function updateProduct(){
  addBtn.classList.remove('d-none');
  updateBtn.classList.add('d-none');

  productList[i].name = productNameInput.value;
  productList[i].price = productPriceInput.value;
  productList[i].category = productCategoryInput.value;
  productList[i].descrp = productDescInput.value;
  // productList[i].image = productImgInput.value;
  displayProduct(productList);
  localStorage.setItem("products", JSON.stringify(productList));
  clearForm();
}