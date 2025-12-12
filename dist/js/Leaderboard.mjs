const leaderboard_DOM = document.getElementById("leaderboard");
function loadLeaderboard() {
    const data = JSON.parse(localStorage.getItem("leaderboard") ?? "[]"); //vraca prazan array ako nije nista upisano
    let html = ""; //sadrzaj koji se dodaje
    data.forEach((entry) => {
        html += `<li>${entry.username}<span>${entry.score}</span?</li>`; //generira element za svaki zapis
    });
    leaderboard_DOM.innerHTML += html; //dodavanej sadrzaja
    return data;
}
function addToLeaderboard(leaderboard_JSON, username, score) {
    if (username == "") {
        alert("Username cannot be empty!");
        return;
    }
    let i = 0;
    while (i < leaderboard_JSON.length && leaderboard_JSON[i].score > score)
        i++; //dok nije kraj ili dok se ne dode do prvog manjeg/jednakog elementa
    leaderboard_JSON.splice(i, 0, { username, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard_JSON));
    if (confirm("If you choose to submit your result now, the game will end!\n\nAre you sure?"))
        window.location.reload();
}
export { loadLeaderboard, addToLeaderboard };
