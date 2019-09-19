var searchInp = document.getElementById("searchInp");

var currentIndex = 0;
var productNameInp = document.getElementById("ProductName");
var productPriceInp = document.getElementById("ProductPrice");
var productCompanyInp = document.getElementById("ProductCompany");
var productDescInp = document.getElementById("ProductDescription");
var addBtn = document.getElementById("addBtn");
var searchRow = document.getElementById("searchRow");

var productContainer;

if (localStorage.getItem("productContainer") == null) {
    productContainer = [];
} else {
    productContainer = JSON.parse(localStorage.getItem("productContainer"));
    displayData();
}

addBtn.onclick = function() {

    if (addBtn.innerHTML == "add product") {
        addProduct();
        displayData();
        clearForm()
    } else {
        uppdateProduct();
        displayData();
        clearForm()
    }

}

searchInp.onkeyup = function() {
        searchProducts(searchInp.value)
    }
    // Function Search
function searchProducts(term) {
    var searchCols = "";
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.includes(term)) {
            searchCols += `<div class="col-md-3 text-center">
            <div class="product">
                <h3>` + productContainer[i].name + `</h3>
                <p class="text-danger">` + productContainer[i].price + `</p>
                <p class="text-info">` + productContainer[i].company + `</p>
                <p class="text-justify">` + productContainer[i].desc + `</p>
                <button class="btn btn-danger mb-4" onclick="deleteProduct(` + i + `)">delete</button>
            </div>
        </div>`
        }
    }
    searchRow.innerHTML = searchCols;
}

// Function Update 
function setForm(i) {
    productNameInp.value = productContainer[i].name;
    productPriceInp.value = productContainer[i].price;
    productCompanyInp.value = productContainer[i].company;
    productDescInp.value = productContainer[i].desc;
    addBtn.innerHTML = "update product";
    currentIndex = i;
}

function uppdateProduct() {
    productContainer[currentIndex].name = productNameInp.value;
    productContainer[currentIndex].price = productPriceInp.value;
    productContainer[currentIndex].company = productCompanyInp.value;
    productContainer[currentIndex].desc = productDescInp.value;

    addBtn.innerHTML = "add product";
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
}

function addProduct() {
    var product = {
        name: productNameInp.value,
        price: productPriceInp.value,
        company: productCompanyInp.value,
        desc: productDescInp.value
    }
    productContainer.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
}

// Function Display
function displayData() {
    var cols = "";
    for (var i = 0; i < productContainer.length; i++) {
        cols += `<div class="col-md-3">
        <div class="product">
            <h3>` + productContainer[i].name + `</h3>
            <p class="text-danger">` + productContainer[i].price + `</p>
            <p class="text-info">` + productContainer[i].company + `</p>
            <p>` + productContainer[i].desc + `</p>
            <button class="btn btn-danger mb-4" onclick="deleteProduct(` + i + `)">delete</button>
            <button class="btn btn-info mb-4" onclick="setForm(` + i + `)">update</button>
        </div>
    </div>`
    }
    document.getElementById("rowData").innerHTML = cols;
}

function deleteProduct(id) {
    productContainer.splice(id, 1);
    localStorage.setItem("productContainer", JSON.stringify(productContainer));
    displayData();
}

function clearForm() {
    var inputs = document.getElementsByClassName("form-control");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}