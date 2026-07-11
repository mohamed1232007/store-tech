const scriptURL =
    "https://script.google.com/macros/s/AKfycbxbU6_Ry3f_9m2wtD8Yld8Xaz43ahbnKFiUO6Jvr4S1IlkUe1peekjjMavjXhbnPCkkNA/exec";

let form = document.getElementById("form_contact");

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
                alert("✓ Order placed successfully!");
                setTimeout(() => {
                    localStorage.removeItem("cart");
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                console.error("Error:", error.message);
                alert("⚠ Error: Please try again.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Place order";
            });
    });
}
