(function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const themeIcon = document.getElementById("theme-icon");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
        if (themeIcon) themeIcon.className = "fa-solid fa-sun";
    }
    if (darkModeToggle) {
        darkModeToggle.onclick = function (e) {
            e.preventDefault();
            document.body.classList.toggle("dark-theme");
            if (document.body.classList.contains("dark-theme")) {
                if (themeIcon) themeIcon.className = "fa-solid fa-sun";
                localStorage.setItem("theme", "dark");
            } else {
                if (themeIcon) themeIcon.className = "fa-regular fa-moon";
                localStorage.setItem("theme", "light");
            }
        };
    }
})();

