"use strict";

//Search line
const searchLine = document.querySelectorAll(".search-line");
searchLine.forEach((item) => {
    item.addEventListener("click", function (event) {
        this.classList.add("search-line__active");
        this.querySelector(".search-line__input").focus();
        if (this.closest(".burger-menu__additional-container")) {
            this.closest(".burger-menu__additional-container").classList.add('burger-menu_active-search');
        }
    });
});


//Reset classes after click on document
document.addEventListener("click", function (event) {

    if (!event.target.classList.contains('search-line') &&
        !event.target.closest(".search-line")
    ) {
        searchLine.forEach((item) => {
            item.classList.remove('search-line__active');
            if (item.closest(".burger-menu__additional-container")) {
                item.closest(".burger-menu__additional-container").classList.remove('burger-menu_active-search');
            }
        });
    }
});

//Tabs
const tabMenuItemsList = document.querySelectorAll(".tabs-memu__item");
const tabs = document.querySelectorAll('.tab-content');

tabMenuItemsList.forEach((item) => {
    item.addEventListener("click", function (event) {
        event.preventDefault();
        const link = this.getAttribute("href");
        if (link) {
            activateTab(link.replace('#', ''));
            const refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + link;
            window.history.pushState({ path: refresh }, '', refresh);
        }
    });
});

//Close modal
const btnCloseModal = document.querySelectorAll(".js-close-modal");
const Modal = document.querySelector(".modal");
btnCloseModal.forEach((item) => {
    item.addEventListener("click", function (event) {
        Modal.classList.remove('modal_active');
    });
});

const modalBtn = document.querySelectorAll('[data-modal]');
modalBtn.forEach((item) => {
    item.addEventListener("click", function (event) {
        Modal.classList.add('modal_active');
    });
});


//Fixed head
window.addEventListener("scroll", scrollHead);

//Fixed head for scroll page
function scrollHead(event) {

    if (window.scrollY >= 100) {
        document.querySelector(".header").classList.add("header_fixed");
        document.querySelector(".search-line__input").classList.add("search-line__input_small");
    } else {
        document.querySelector(".header").classList.remove("header_fixed");
        document.querySelector(".search-line__input").classList.remove("search-line__input_small");
    }
}

// Document ready
document.addEventListener('DOMContentLoaded', () => {
    scrollHead();
    setActiveTab();
    setTimeout(() => {
        document.querySelector(".loader").classList.remove("loader_active");
    }, 500);

});

// Burger menu
const burgerMenuBtn = document.querySelectorAll(".burger-menu-btn");
const burgerMenu = document.querySelector('.burger-menu');

burgerMenuBtn.forEach((item) => {
    item.addEventListener("click", function (event) {
        burgerMenu.classList.toggle('burger-menu_active');
    });
});

//Form valid
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = document.querySelectorAll('[data-required]');
        inputs.forEach((input) => {
            const rule = input.getAttribute('data-required');
            const value = input.value;
            switch (rule) {
                case 'email':
                    if (!validateEmail(value)) {
                        input.classList.add('input_error')
                    }
                    break;
                case 'checked':
                    if (!input.checked) {
                        input.classList.add('checkbox_error')
                    }
                    break;
            }
        });
    });
});


//Check if email valide 
function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Activate tab after load page
function setActiveTab() {
    const matches = location.hash.match(new RegExp(/tab([0-9])*$/g));
    const tabId = matches ? matches[0] : null;
    activateTab(tabId);
}
//Activeta tab's content
function activateTab(tabId) {
    if (tabId) {
        if (document.getElementById(tabId)) {
            tabs.forEach((tab) => {
                tab.classList.remove('tab-content_active');
            });
            document.getElementById(tabId).classList.add('tab-content_active');

            tabMenuItemsList.forEach((tab) => {
                if (tab.getAttribute('href') === '#' + tabId) {
                    tab.classList.add('tabs-memu__item_active');
                } else {
                    tab.classList.remove('tabs-memu__item_active');
                }
            });
        }
    }
}

if ($(".js-select").length) {
    $(".js-select").styler({
        selectSmartPositioning: false,
    });
}
