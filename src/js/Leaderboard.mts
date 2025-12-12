interface LeaderboardEntry {    //sluzi za definiranje vrijednosti u JSON zapisu leaderboarda
    username: string;
    score: number;
}

const leaderboard_DOM = document.getElementById("leaderboard")

function loadLeaderboard(): LeaderboardEntry[] {    //cita leaderboard i upsiuje vrijednosti u DOM
    const data: LeaderboardEntry[] = JSON.parse(localStorage.getItem("leaderboard") ?? "[]"); //vraca prazan array ako nije nista upisano

    let html = "";  //sadrzaj koji se dodaje

    data.forEach((entry) => {
        html += `<li>${entry.username}<span>${entry.score}</span?</li>`   //generira element za svaki zapis
    })

    leaderboard_DOM!.innerHTML += html; //dodavanej sadrzaja

    return data;
}

function addToLeaderboard(leaderboard_JSON: LeaderboardEntry[], username: string, score: number): void {    //dodaje novi zapis u leaderboard i sprema ga
    let i = 0;
    while (i < leaderboard_JSON.length && leaderboard_JSON[i].score > score) i++;   //dok nije kraj ili dok se ne dode do prvog manjeg/jednakog elementa

    leaderboard_JSON.splice(i, 0, { username, score });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard_JSON));
}

export { loadLeaderboard, addToLeaderboard, LeaderboardEntry };