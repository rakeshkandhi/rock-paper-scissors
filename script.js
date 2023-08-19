let btn = document.querySelectorAll("#btn");
let selection = document.getElementById("selection");
btn.forEach((button) =>
    button.addEventListener("click", () => {
        selection.textContent = `User selected ${button.textContent}`;
    })
);
