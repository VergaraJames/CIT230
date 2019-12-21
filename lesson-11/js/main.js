// Responsive Navigation Function
function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
};

//Get current year 
var yearnow = new Date();
document.getElementById("thisyear").innerHTML = yearnow.getFullYear();

//Current Date 
const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};
document.getElementById("currentdate").textContent = new Date().toLocaleString("en-GB", options);

//Event Header - Banner Pancakes
new Date().getDay() == 6 ? document.getElementById("banner").innerHTML = "Preston Pancakes in the Park!  9:00 a.m. Saturday at the city park pavilion." : document.getElementById("banner").style.display = "block";

//Web Font Load API
WebFont.load({
    google: {
        families: ["Barlow", "Parisienne", "Quicksand", "Antic+Slab", "Cookie", "Cormorant+Garamond",
            "Inconsolata", "Karla", "Oswald"
        ]
    }
});

// Lazy Images
document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.classList.remove("lazy");
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
});