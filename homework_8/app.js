'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});

let cartIconWrapSpan = document.querySelector('.cartIconWrap span');
function setCounterValue() {
    if (cartIconWrapSpan.classList.contains('hidden')) {
        cartIconWrapSpan.classList.remove('hidden');
    }

    cartIconWrapSpan.innerHTML = Number(cartIconWrapSpan.innerHTML) + 1;
}

let basketList = document.querySelector('.basketList');
let basketListTable = basketList.querySelector('table');
let basketTotalValue = document.querySelector('.basketTotalValue');
function setProductInfo(dataOfProduct) {
    let productRow = basketListTable
        .querySelector(`tr[data-product-id="${dataOfProduct.id}"]`);

    let productPrice = 0;
    if (productRow) {
        let productCount = Number(productRow.cells[1].innerHTML);
        productPrice = parseFloat(productRow.cells[2].innerHTML);

        productRow.cells[1].innerHTML = ++productCount;
        productRow.cells[3].innerHTML = parseFloat(productCount * productPrice).toFixed(2);
    } else {
        productRow = basketListTable.insertRow(basketListTable.rows.length);
        productRow.dataset.productId = dataOfProduct.id;
        productPrice = parseFloat(dataOfProduct.price);

        productRow.insertCell(0).innerHTML = dataOfProduct.name;
        productRow.insertCell(1).innerHTML = 1;
        productRow.insertCell(2).innerHTML = productPrice;
        productRow.insertCell(3).innerHTML = productPrice;
    }

    let productTotalPrice = parseFloat(basketTotalValue.innerHTML);
    basketTotalValue.innerHTML = (productTotalPrice + productPrice).toFixed(2);
}

let featuredImgDark = document.querySelectorAll('.featuredImgDark');
featuredImgDark.forEach(element => {
    element.addEventListener('click', function(event) {
        if (event.target.tagName !== 'BUTTON') {
            return;
        }

        setCounterValue();
        setProductInfo(event.target.dataset);

    });
});

const cartIconWrap = document.querySelector('.cartIconWrap');
cartIconWrap.addEventListener('click',  function () {
    basketList.classList.toggle('hidden');
})

document.addEventListener('click', event => {
	const basketListDiv = event.composedPath().includes(basketList);
    const cartIconDiv = event.composedPath().includes(cartIconWrap);

	if (!basketListDiv && !cartIconDiv) {
        basketList.classList.add('hidden');
	}
})