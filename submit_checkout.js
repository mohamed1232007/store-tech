const scriptURL =
    "https://script.google.com/macros/s/AKfycbxbU6_Ry3f_9m2wtD8Yld8Xaz43ahbnKFiUO6Jvr4S1IlkUe1peekjjMavjXhbnPCkkNA/exec";

let form = document.getElementById("form_contact");

function createToast() {
    const toast = document.createElement("div");
    toast.id = "form-toast";
    toast.className = "toast-message";
    document.body.appendChild(toast);
    return toast;
}

function showToast(type, message) {
    const icon = type === "success" ? "✓" : "⚠";
    let toast = document.getElementById("form-toast");

    if (!toast) {
        toast = createToast();
    }

    toast.className = `toast-message ${type} show`;
    toast.innerHTML = `<span class="toast-icon">${icon}</span><p>${message}</p>`;

    clearTimeout(toast.hideTimeout);
    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = "Processing...";
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            body: new FormData(form),
        })
            .then((response) => {
                showToast("success", "Order placed successfully!");
                setTimeout(() => {
                    localStorage.removeItem("cart");
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                showToast("error", "Error: Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Place order";
            });
    });
}
