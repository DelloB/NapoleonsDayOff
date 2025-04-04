const storyText = document.getElementById("story-text");
const choicesContainer = document.getElementById("choices-container");
const artContainer = document.getElementById("art-container");
const inputContainer = document.getElementById("input-container");
const usernameInput = document.getElementById("username");
const startButton = document.getElementById("startButton");
const CharismaScoreDisplay = document.getElementById("Charisma-score");
const Combat_StrengthScoreDisplay = document.getElementById("Combat_Strength-score");

let startTime, endTime, totalMinutes = 0;
let currentSection = "start";
let CharismaScore = 0;
let Combat_StrengthScore = 0;
let playerLevel = 1;
let playerName = "";
function getRandomScore() {
    return Math.floor(Math.random() * 9) + 7;
}
const story = {
    "start": {
        text: "Louis-Alexandre Berthier says: SALUTATIONS SIR, HOW WILL YOU BE PROCEEDING? ",
        choices: [
            { text: "Leadership Training (Leading)", next: "leading", art: "a.jpg" },
            { text: "Combat Drills (Combat)", next: "combat", art: "b.jpg" },
            { text: "Resource Gathering (Gathering)", next: "gathering", art: "c.jpg" },
            { text: "Army Inspection (Inspection)", next: "inspection", art: "d.jpg" }
        ],
        art: "Oni.png"
    },
    "leading": {
        text: "You Enter your private quarters, How will you hone your Leadership for the next battle?",
        choices: [
            { text: "Reflect on past failures and shortcomings", next: "leadingreflect", CharismaChange: 5, Combat_StrengthChange: 5 },
            { text: "Rehearse performances and speeches for soldier morale", next: "leadingspeech", CharismaChange: getRandomScore(), Combat_StrengthChange: -2 },
            { text: "Examine and embrace any possible new technologies to get a competitive edge", next: "leadingcompetitive", CharismaChange: 1, Combat_StrengthChange: 1 }
        ],
        art: "Twi.png"
    },
    "leadingreflect": {
        text: "You think back to a battle where one of your miscalculations cost you deeply.",
        choices: [
            { text: "Scrutinize your thought process and hone your critical thinking", next: "chapterEnd", CharismaChange: -5, Combat_StrengthChange: getRandomScore() }
        ],
        art: "foui.png"
    },
    "leadingspeech": {
        text: "You exercise your theatrical flair and explore several techniques to ensure impact in your future speeches.",
        choices: [
            { text: "Work on careful composition, strategic delivery and visual spectacle", next: "chapterEnd", CharismaChange: getRandomScore(), Combat_StrengthChange: -5 }
        ],
        art: "fivi.png"
    },
    "leadingcompetitive": {
        text: "You pressure your scientists and researchers to make many breakthroughs in your army's tools.",
        choices: [
            { text: "Take and apply these new findings", next: "chapterEnd", CharismaChange: getRandomScore(), Combat_StrengthChange: getRandomScore() }
        ],
        art: "sii.png"
    },
    "combat": {
        text: "You head to the training fields yourself. What combat aspect will you focus on?",
        choices: [
            { text: "Maneuverability and Speed", next: "combatSpeed", CharismaChange: 0, Combat_StrengthChange: 7 },
            { text: "Discipline and Morale", next: "combatDandM", CharismaChange: 18, Combat_StrengthChange: -4 },
            { text: "Strength and Stamina", next: "combatStrengthandStam", CharismaChange: 0, Combat_StrengthChange: getRandomScore() }
        ],
        art: "sevei.png"
    },
    "combatSpeed": {
        text: "You extensively practice marching, sidestepping and sprinting until you're exhausted.",
        choices: [
            { text: "Rest and let your legs heal and improve", next: "chapterEnd", CharismaChange: -1, Combat_StrengthChange: 5 }
        ],
        art: "twelvi.png"
    },
    "combatDandM": {
        text: "You undergo a strict and rigerous routine encompassing all the things that a leader must be adept in.",
        choices: [
            { text: "Repeat the routine over and over seeking perfection.", next: "chapterEnd", CharismaChange: 8, Combat_StrengthChange: -7 }
        ],
        art: "thirteei.png"
    },
    "combatStrengthandStam": {
        text: "You do some simple weight training.",
        choices: [
            { text: "Go for a steady 5 laps around the training grounds.", next: "chapterEnd", CharismaChange: -6, Combat_StrengthChange: getRandomScore() }
        ],
        art: "fifteei.png"
    },
    "gathering": {
        text: "You are preparing a team to further increase your overall resources. What do you focus on?",
        choices: [
            { text: "Human Resources", next: "gatheringHR", CharismaChange: 7, Combat_StrengthChange: 2 },
            { text: "Material and Financial Resources", next: "gatheringMatsandFinance", CharismaChange: 1, Combat_StrengthChange: 1 },
            { text: "Logistical and Technical Resources", next: "gatheringLogAndTech", CharismaChange: 8, Combat_StrengthChange: 7 }
        ],
        art: "fourteei.png"
    },
    "gatheringHR": {
        text: "You maintain your elite units and distribute propaganda.",
        choices: [
            { text: "Finish up any training and or recuritment.", next: "chapterEnd", CharismaChange: 15, Combat_StrengthChange: -10 }
        ],
        art: "sebn.png"
    },
    "gatheringMatsandFinance": {
        text: "You expand your arsenal of cannons, muskets and other weapons as well as ordering your supplies for your army.",
        choices: [
            { text: "Go over your supply chains again to maximise efficiency", next: "chapterEnd", CharismaChange: getRandomScore(), Combat_StrengthChange: getRandomScore() }
        ],
        art: "nini.png"
    },
    "gatheringLogAndTech": {
        text: "You revolutionise your logistical systems and give out some of your newer technology to more of your army.",
        choices: [
            { text: "Teach the affected parties how to use the new tools they have been provided.", next: "chapterEnd", CharismaChange: -5, Combat_StrengthChange: getRandomScore() }
        ],
        art: "eighi.png"
    },
    "inspection": {
        text: "You head over to your Army Barracks, what do you do?",
        choices: [
            { text: "Announce a collective gathering to make sure the important people are there and to do a head count", next: "inspectionHeadcount", CharismaChange: 5, Combat_StrengthChange: 0 },
            { text: "Look through the Army's weapons, calvary and rations to make sure they are all up to a good standard", next: "inspectionWeapons", CharismaChange: 0, Combat_StrengthChange: 5 },
            { text: "Test the Army's Loyalty and look out for any double agents or spies", next: "inspectionSpy", CharismaChange: 3, Combat_StrengthChange: 3 },
        ],
        art: "ight.png"
    },
    "inspectionHeadcount": {
        text: "You celebrate previous battles with your comrades and become more familiar with the numbers on your side.",
        choices: [
            { text: "Clean up in another group bonding activity", next: "chapterEnd", CharismaChange: 5, Combat_StrengthChange: 5 }
        ],
        art: "ighttt.png"
    },
    "inspectionWeapons": {
        text: "You assemble your quality control team and go through everything to make sure there are as many funcitonal tools at your disposal as possible.",
        choices: [
            { text: "Continue inspection", next: "chapterEnd", CharismaChange: 5, Combat_StrengthChange: 5 }
        ],
        art: "wpo.png"
    },
    "inspectionSpy": {
        text: "You employed tactics such as incentives and more to sniff out any possible rats in your army.",
        choices: [
            { text: "TEST YOUR ARMY'S LOYALTY", next: "chapterEnd", CharismaChange: 5, Combat_StrengthChange: 5 }
        ],
        art: "rats.png"
    },
    "chapterEnd": {
        text: "You finish up what you were doing. How do you proceed?",
        choices: [
            { text: "Choose another activity", next: "start", scoreChange: 0, Combat_StrengthChange: 0 },
            { text: "End the day", next: "end", scoreChange: 0, Combat_StrengthChange: 0 }
        ],
        art: "finnn.png"
    },
    "end": {
        text: "Your day of preperation comes to an end. Time to reflect.",
        choices: [],
        art: "dayend.jpg"
    }
};
function updateScoreDisplay() {
    CharismaScoreDisplay.textContent = CharismaScore;
    Combat_StrengthScoreDisplay.textContent = Combat_StrengthScore;
}
function updateStory(sectionId) {
    const section = story[sectionId];
    storyText.textContent = section.text;
    choicesContainer.innerHTML = "";
    artContainer.innerHTML = section.art ? `<img src="${section.art}" alt="${section.art}">` : "";
    section.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.addEventListener("click", () => {
            CharismaScore += choice.CharismaChange || 0;
            Combat_StrengthScore += choice.Combat_StrengthChange || 0;
            updateScoreDisplay();
            currentSection = choice.next;
            if (currentSection !== "end") {
                updateStory(currentSection);
            } else {
                endGame();
            }
        });
        choicesContainer.appendChild(button);
    });
}
function startGame() {
    playerName = usernameInput.value;
    inputContainer.style.display = 'none';
    startTime = new Date();
    updateScoreDisplay();
    updateStory(currentSection);
}
function endGame() {
    endTime = new Date();
    totalMinutes = Math.round((endTime - startTime) / 60000);
    outputData();
    storyText.textContent = `Your day of leisure concludes.  Charisma: ${CharismaScore}. Combat_Strength: ${Combat_StrengthScore}.  You spent ${totalMinutes} minutes on your journey.`;
    choicesContainer.innerHTML = "";
    artContainer.innerHTML = "";
}
function outputData() {
    const gameData = {
        username: playerName,
        minutesPlayed: totalMinutes,
        CharismaScore: CharismaScore,
        Combat_StrengthScore: Combat_StrengthScore,
        level: playerLevel
    };
    const jsonData = JSON.stringify(gameData);
    const blob = new Blob([jsonData], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leisureTimeData.json";
    a.click();
}
startButton.addEventListener("click", startGame);