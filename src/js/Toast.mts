import { delay } from "./main.mjs";

let toast = document.getElementById("toast")!;
let toastText = toast.querySelector("p")!;
let toastInfo = toast.querySelector("span")!;

function hideToast(): void {    //skirva toast
    toast.style.bottom = "-200px";
}

async function showToast(result: "win" | "lose" | "draw", bet: number): Promise<void> { //pokazuje toast te ga nakon delaya vraca i nastavlja sa radom
    switch (result) {
        case "lose":
            toastText.textContent = "You lost";
            toastInfo.textContent = `-${bet}`;
            toastInfo.style.color = "#9b1414"
            break;
        case "win":
            toastText.textContent = "You won!";
            toastInfo.textContent = `+${bet}`;
            toastInfo.style.color = "#15631b";
            break;
        case "draw":
            toastText.textContent = "Draw";
            toastInfo.textContent = "+0";
            toastInfo.style.color = "#646464"
    }

    await delay(2000);
    toast.style.bottom = "24px";

    await delay(2500);
    hideToast();
    return new Promise(resolve => setTimeout(resolve, 500));
}

export { showToast }