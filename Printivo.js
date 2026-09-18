
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const icon = menuBtn.querySelector("i");
    if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking link */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });

});


const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");


function searchProducts() {

    const searchValue =
        searchInput.value.toLowerCase().trim();
    let found = 0;

    products.forEach(product => {

        const productName =
            product.dataset.name.toLowerCase();
        if (
            productName.includes(searchValue) ||
            searchValue === ""
        ) {

            product.style.display = "";

            found++;

        } else {

            product.style.display = "none";

        }

    });

    if (found === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


searchInput.addEventListener("keyup", event => {

    if (event.key === "Enter") {
        searchProducts();
    }

});


function quickSearch(value) {

    searchInput.value = value;

    searchProducts();

}


function orderProduct(productName) {

    showToast(
        productName +
        " selected. Product customization coming next!"
    );

}


function openModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeModal(id) {

    const modal = document.getElementById(id);

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";

}


function switchModal(current, next) {

    closeModal(current);

    setTimeout(() => {
        openModal(next);
    }, 150);

}


document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            modal.classList.remove("active");

            document.body.style.overflow = "";

        }

    });

});



document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal").forEach(modal => {
            modal.classList.remove("active");
        });

        document.body.style.overflow = "";

    }

});



function login(event) {

    event.preventDefault();

    closeModal("loginModal");

    showToast(
        "Login submitted successfully!"
    );

}



function signup(event) {

    event.preventDefault();

    closeModal("signupModal");

    showToast(
        "Account created successfully!"
    );

}



const newsletterForm =
    document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    if (!email) return;

    showToast(
        "Thanks! You are now subscribed."
    );

    newsletterForm.reset();

});



let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}



window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 20) {

        navbar.style.boxShadow =
            "0 5px 25px rgba(0,0,0,.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});



const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document.querySelectorAll(".product-card").forEach(card => {

    card.style.opacity = "0";

    card.style.transform = "translateY(20px)";

    card.style.transition =

        "opacity .5s ease, transform .5s ease";
        
    observer.observe(card);

});