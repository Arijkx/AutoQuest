const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        tabContents.forEach(content => content.classList.remove('active'));
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});
const player = {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    gold: 0,
    diamonds: 0,
    totalCompletedQuests: 0,
    totalGoldEarned: 0,
    bonusGold: 0,
    bonusXP: 0,
    bonusDiamonds: 0
};
function questRequiredLevel(id) {
    return 1 + (id - 1) * 3;
}
function formatTime(seconds) {
    if (seconds <= 0) return "—";
    let s = Math.floor(seconds);
    const d = Math.floor(s / 86400);
    s %= 86400;
    const h = Math.floor(s / 3600);
    s %= 3600;
    const m = Math.floor(s / 60);
    s %= 60;
    let parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);
    if (parts.length === 0) return "0s";
    return parts.join(" ");
}
const quests = [
    { id: 1, name: "Collect Wood in the Forest", duration: 10, baseXpReward: 50, baseGoldReward: 20, level: 1, upgradeCost: 50, startTime: null, completed: false, autoRepeat: false },
    { id: 2, name: "Free the Village from Bandits", duration: 30, baseXpReward: 150, baseGoldReward: 50, level: 1, upgradeCost: 200, startTime: null, completed: false, autoRepeat: false },
    { id: 3, name: "Explore the Ancient Ruins", duration: 60, baseXpReward: 300, baseGoldReward: 100, level: 1, upgradeCost: 500, startTime: null, completed: false, autoRepeat: false },
    { id: 4, name: "Ambush", duration: 120, baseXpReward: 500, baseGoldReward: 200, level: 1, upgradeCost: 700, startTime: null, completed: false, autoRepeat: false },
    { id: 5, name: "Treasure Diving", duration: 180, baseXpReward: 800, baseGoldReward: 300, level: 1, upgradeCost: 1000, startTime: null, completed: false, autoRepeat: false },
    { id: 6, name: "Cursed Temple", duration: 300, baseXpReward: 1200, baseGoldReward: 400, level: 1, upgradeCost: 1800, startTime: null, completed: false, autoRepeat: false },
    { id: 7, name: "Guardian of the Valley", duration: 480, baseXpReward: 2000, baseGoldReward: 700, level: 1, upgradeCost: 3000, startTime: null, completed: false, autoRepeat: false },
    { id: 8, name: "The Spider Cave", duration: 600, baseXpReward: 3000, baseGoldReward: 1000, level: 1, upgradeCost: 4500, startTime: null, completed: false, autoRepeat: false },
    { id: 9, name: "The Dragon", duration: 900, baseXpReward: 5000, baseGoldReward: 2000, level: 1, upgradeCost: 7000, startTime: null, completed: false, autoRepeat: false },
    { id: 10, name: "Giant Troll", duration: 1200, baseXpReward: 8000, baseGoldReward: 3000, level: 1, upgradeCost: 10000, startTime: null, completed: false, autoRepeat: false },
    { id: 11, name: "Underwater City", duration: 1500, baseXpReward: 12000, baseGoldReward: 4000, level: 1, upgradeCost: 15000, startTime: null, completed: false, autoRepeat: false },
    { id: 12, name: "Fire Temple", duration: 1800, baseXpReward: 18000, baseGoldReward: 6000, level: 1, upgradeCost: 20000, startTime: null, completed: false, autoRepeat: false },
    { id: 13, name: "Magic Forest", duration: 2100, baseXpReward: 25000, baseGoldReward: 8000, level: 1, upgradeCost: 25000, startTime: null, completed: false, autoRepeat: false },
    { id: 14, name: "Dark Palace", duration: 2400, baseXpReward: 32000, baseGoldReward: 10000, level: 1, upgradeCost: 35000, startTime: null, completed: false, autoRepeat: false },
    { id: 15, name: "Flying Fortress", duration: 2700, baseXpReward: 40000, baseGoldReward: 12000, level: 1, upgradeCost: 50000, startTime: null, completed: false, autoRepeat: false },
    { id: 16, name: "Icy Mountain", duration: 3000, baseXpReward: 50000, baseGoldReward: 15000, level: 1, upgradeCost: 65000, startTime: null, completed: false, autoRepeat: false },
    { id: 17, name: "Hell Gate", duration: 3600, baseXpReward: 60000, baseGoldReward: 18000, level: 1, upgradeCost: 80000, startTime: null, completed: false, autoRepeat: false },
    { id: 18, name: "Portal of Shadows", duration: 4200, baseXpReward: 75000, baseGoldReward: 22000, level: 1, upgradeCost: 100000, startTime: null, completed: false, autoRepeat: false },
    { id: 19, name: "Heavenly Forge", duration: 4800, baseXpReward: 90000, baseGoldReward: 27000, level: 1, upgradeCost: 120000, startTime: null, completed: false, autoRepeat: false },
    { id: 20, name: "Arena Battle", duration: 5400, baseXpReward: 110000, baseGoldReward: 33000, level: 1, upgradeCost: 150000, startTime: null, completed: false, autoRepeat: false },
    { id: 21, name: "Storm Peak", duration: 6000, baseXpReward: 130000, baseGoldReward: 40000, level: 1, upgradeCost: 180000, startTime: null, completed: false, autoRepeat: false },
    { id: 22, name: "Tomb of the Gods", duration: 6600, baseXpReward: 160000, baseGoldReward: 50000, level: 1, upgradeCost: 220000, startTime: null, completed: false, autoRepeat: false },
    { id: 23, name: "Arcane Library", duration: 7200, baseXpReward: 190000, baseGoldReward: 60000, level: 1, upgradeCost: 300000, startTime: null, completed: false, autoRepeat: false },
    { id: 24, name: "The Finale", duration: 9000, baseXpReward: 250000, baseGoldReward: 80000, level: 1, upgradeCost: 500000, startTime: null, completed: false, autoRepeat: false }
];
const achievements = [
    {
        id: 1,
        type: "playerLevel",
        threshold: 10,
        goldReward: 100000,
        xpReward: 2500,
        diamondReward: 5,
        claimed: false,
        name: "Reach Player Level 10"
    },
    {
        id: 2,
        type: "playerLevel",
        threshold: 20,
        goldReward: 500000,
        xpReward: 10000,
        diamondReward: 10,
        claimed: false,
        name: "Reach Player Level 20"
    },
    {
        id: 3,
        type: "playerLevel",
        threshold: 30,
        goldReward: 1000000,
        xpReward: 25000,
        diamondReward: 15,
        claimed: false,
        name: "Reach Player Level 30"
    },
    {
        id: 4,
        type: "playerLevel",
        threshold: 40,
        goldReward: 2000000,
        xpReward: 50000,
        diamondReward: 20,
        claimed: false,
        name: "Reach Player Level 40"
    },
    {
        id: 5,
        type: "playerLevel",
        threshold: 50,
        goldReward: 5000000,
        xpReward: 100000,
        diamondReward: 25,
        claimed: false,
        name: "Reach Player Level 50"
    },
    {
        id: 6,
        type: "playerLevel",
        threshold: 60,
        goldReward: 10000000,
        xpReward: 200000,
        diamondReward: 30,
        claimed: false,
        name: "Reach Player Level 60"
    },
    {
        id: 7,
        type: "playerLevel",
        threshold: 70,
        goldReward: 20000000,
        xpReward: 400000,
        diamondReward: 35,
        claimed: false,
        name: "Reach Player Level 70"
    },
    {
        id: 8,
        type: "playerLevel",
        threshold: 80,
        goldReward: 50000000,
        xpReward: 800000,
        diamondReward: 40,
        claimed: false,
        name: "Reach Player Level 80"
    },
    {
        id: 9,
        type: "playerLevel",
        threshold: 90,
        goldReward: 100000000,
        xpReward: 1600000,
        diamondReward: 45,
        claimed: false,
        name: "Reach Player Level 90"
    },
    {
        id: 10,
        type: "playerLevel",
        threshold: 100,
        goldReward: 500000000,
        xpReward: 5000000,
        diamondReward: 50,
        claimed: false,
        name: "Reach Player Level 100"
    },
    {
        id: 11,
        type: "questLevel",
        threshold: 5,
        goldReward: 10000,
        xpReward: 1000,
        diamondReward: 2,
        claimed: false,
        name: "Upgrade a Quest to Level 5"
    },
    {
        id: 12,
        type: "questLevel",
        threshold: 10,
        goldReward: 25000,
        xpReward: 2500,
        diamondReward: 4,
        claimed: false,
        name: "Upgrade a Quest to Level 10"
    },
    {
        id: 13,
        type: "questLevel",
        threshold: 15,
        goldReward: 50000,
        xpReward: 5000,
        diamondReward: 6,
        claimed: false,
        name: "Upgrade a Quest to Level 15"
    },
    {
        id: 14,
        type: "questLevel",
        threshold: 20,
        goldReward: 100000,
        xpReward: 10000,
        diamondReward: 8,
        claimed: false,
        name: "Upgrade a Quest to Level 20"
    },
    {
        id: 15,
        type: "questLevel",
        threshold: 25,
        goldReward: 250000,
        xpReward: 25000,
        diamondReward: 10,
        claimed: false,
        name: "Upgrade a Quest to Level 25"
    },
    {
        id: 16,
        type: "questLevel",
        threshold: 30,
        goldReward: 500000,
        xpReward: 50000,
        diamondReward: 12,
        claimed: false,
        name: "Upgrade a Quest to Level 30"
    },
    {
        id: 17,
        type: "questLevel",
        threshold: 40,
        goldReward: 2000000,
        xpReward: 200000,
        diamondReward: 15,
        claimed: false,
        name: "Upgrade a Quest to Level 40"
    },
    {
        id: 18,
        type: "questLevel",
        threshold: 50,
        goldReward: 10000000,
        xpReward: 1000000,
        diamondReward: 20,
        claimed: false,
        name: "Upgrade a Quest to Level 50"
    },
    {
        id: 19,
        type: "questLevel",
        threshold: 75,
        goldReward: 200000000,
        xpReward: 20000000,
        diamondReward: 25,
        claimed: false,
        name: "Upgrade a Quest to Level 75"
    },
    {
        id: 20,
        type: "questLevel",
        threshold: 100,
        goldReward: 1000000000,
        xpReward: 100000000,
        diamondReward: 30,
        claimed: false,
        name: "Upgrade a Quest to Level 100"
    }
];
const shopItems = [
    {
        itemId: 1,
        name: "Gold Boost",
        description: "10% more gold from quests",
        costDiamonds: 10,
        purchased: false,
        icon: "💴",
        applyEffect: function () {
            player.bonusGold += 0.1;
        }
    },
    {
        itemId: 2,
        name: "XP Boost",
        description: "10% more experience from quests",
        costDiamonds: 15,
        purchased: false,
        icon: "⭐",
        applyEffect: function () {
            player.bonusXP += 0.1;
        }
    },
    {
        itemId: 3,
        name: "Diamond Boost",
        description: "10% more diamonds from quests",
        costDiamonds: 20,
        purchased: false,
        icon: "💎",
        applyEffect: function () {
            player.bonusDiamonds += 0.1;
        }
    }
];
let lastTimestamp = Date.now();
function logMessage(msg) {
    const logDiv = document.getElementById('log');
    if (!logDiv) return;
    logDiv.innerHTML += `<p>${msg}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}
function saveGame() {
    localStorage.setItem('playerData', JSON.stringify(player));
    localStorage.setItem('quests', JSON.stringify(quests));
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('shopItems', JSON.stringify(shopItems));
    localStorage.setItem('lastTimestamp', Date.now().toString());
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
function loadGame() {
    const savedPlayer = localStorage.getItem('playerData');
    const savedQuests = localStorage.getItem('quests');
    const savedAchiev = localStorage.getItem('achievements');
    const savedShop = localStorage.getItem('shopItems');
    const savedTimestamp = localStorage.getItem('lastTimestamp');
    if (savedPlayer) Object.assign(player, JSON.parse(savedPlayer));
    if (savedQuests) {
        const loadedQuests = JSON.parse(savedQuests);
        quests.forEach(q => {
            const found = loadedQuests.find(lq => lq.id === q.id);
            if (found) Object.assign(q, found);
        });
    }
    if (savedAchiev) {
        const loadedAchiev = JSON.parse(savedAchiev);
        achievements.forEach(a => {
            const found = loadedAchiev.find(la => la.id === a.id);
            if (found) Object.assign(a, found);
        });
    }
    if (savedShop) {
        const loadedShop = JSON.parse(savedShop);
        shopItems.forEach(item => {
            const found = loadedShop.find(ls => ls.itemId === item.itemId);
            if (found) {
                item.purchased = found.purchased;
            }
        });
    }
    if (savedTimestamp) {
        lastTimestamp = parseInt(savedTimestamp, 10);
    }
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}
function updateUI() {
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('playerXP').textContent = player.xp;
    document.getElementById('playerXPToNext').textContent = player.xpToNextLevel;
    document.getElementById('playerGold').textContent = player.gold.toLocaleString('en-US');
    document.getElementById('playerDiamonds').textContent = player.diamonds.toLocaleString('en-US');
    const xpBar = document.getElementById('xpBar');
    xpBar.style.width = Math.min((player.xp / player.xpToNextLevel) * 100, 100) + "%";
    document.getElementById('completedQuests').textContent = player.totalCompletedQuests;
    document.getElementById('totalGoldEarned').textContent = player.totalGoldEarned.toLocaleString('en-US');
    document.getElementById('goldBonus').textContent = (player.bonusGold * 100).toFixed(0);
    document.getElementById('xpBonus').textContent = (player.bonusXP * 100).toFixed(0);
    document.getElementById('diamondBonus').textContent = (player.bonusDiamonds * 100).toFixed(0);
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = "";
    shopItems.forEach(item => {
        if (item.purchased) {
            const span = document.createElement('span');
            span.className = "item-icon";
            span.title = item.name + ": " + item.description;
            span.textContent = item.icon;
            itemsContainer.appendChild(span);
        }
    });
    renderQuests();
    renderAchievements();
    renderShop();
}
function renderQuests() {
    const questContainer = document.getElementById('quest-container');
    questContainer.innerHTML = "";
    quests.forEach(quest => {
        const minLevel = questRequiredLevel(quest.id);
        const isUnlocked = player.level >= minLevel;
        const div = document.createElement('div');
        div.className = "quest";
        let timeLeft = 0;
        let progressPercent = 0;
        let elapsed = 0;
        if (quest.startTime && !quest.completed) {
            elapsed = (Date.now() - quest.startTime) / 1000;
            timeLeft = Math.max(quest.duration - elapsed, 0);
            progressPercent = (elapsed / quest.duration) * 100;
            if (progressPercent > 100) progressPercent = 100;
        } else if (quest.completed) {
            progressPercent = 100;
        }
        let xpReward = quest.baseXpReward * quest.level;
        let goldReward = quest.baseGoldReward * quest.level;
        div.innerHTML = `
      <div class="quest-header">
        <h2>${quest.name}</h2>
        <span class="quest-level">Level ${quest.level}</span>
      </div>
      <div class="quest-body">
        <p><strong>Required Player Level:</strong> ${minLevel}</p>
        <p><strong>Duration:</strong> ${formatTime(quest.duration)}</p>
        <p><strong>Rewards:</strong> ${xpReward} XP, ${goldReward} Gold</p>
        <p><strong>Upgrade Cost:</strong> ${quest.upgradeCost} Gold</p>
        <p><strong>Time Left:</strong> ${formatTime(timeLeft)}</p>
        <p><strong>Status:</strong> ${!isUnlocked
                ? "Locked (Player level too low)"
                : quest.completed
                    ? "Completed"
                    : quest.startTime
                        ? "In progress..."
                        : "Not started yet"
            }</p>
      </div>
      <div class="quest-progress-container">
        <div class="quest-progress-bar" style="width:${progressPercent}%;"></div>
      </div>
      <div class="quest-actions"></div>
    `;
        const actionsDiv = div.querySelector('.quest-actions');
        const btnStart = document.createElement('button');
        btnStart.textContent = "Start Quest";
        btnStart.disabled = (!isUnlocked || (quest.startTime && !quest.completed));
        btnStart.addEventListener('click', () => startQuest(quest.id));

        const btnUpgrade = document.createElement('button');
        btnUpgrade.textContent = "Upgrade Quest";
        btnUpgrade.disabled = !isUnlocked || (player.gold < quest.upgradeCost);
        btnUpgrade.addEventListener('click', () => upgradeQuest(quest.id));

        const btnAuto = document.createElement('button');
        btnAuto.textContent = quest.autoRepeat ? "Auto-Repeat: ON" : "Auto-Repeat: OFF";
        if (!isUnlocked || player.level < 5) {
            btnAuto.disabled = true;
            btnAuto.title = !isUnlocked
                ? "Requires Player Level " + minLevel
                : "Requires Player Level 5 for Auto-Repeat";
        }
        btnAuto.addEventListener('click', () => toggleAutoRepeat(quest.id));
        actionsDiv.appendChild(btnStart);
        actionsDiv.appendChild(btnUpgrade);
        actionsDiv.appendChild(btnAuto);
        questContainer.appendChild(div);
    });
}
function renderAchievements() {
    const container = document.getElementById('achievement-container');
    container.innerHTML = "";
    achievements.forEach(ach => {
        const isMet = isAchievementMet(ach);
        let statusClass = "locked";
        let statusText = "Locked";
        if (ach.claimed) {
            statusClass = "claimed";
            statusText = "Claimed";
        } else if (isMet) {
            statusClass = "claimable";
            statusText = "Claimable!";
        }
        let rewardText = `
      <strong>Reward:</strong>
      <span style="color:gold;">💰 ${ach.goldReward.toLocaleString('en-US')}</span>,
      <span style="color:orange;">⭐ ${ach.xpReward.toLocaleString('en-US')}</span>
    `;
        if (ach.diamondReward && ach.diamondReward > 0) {
            rewardText += `, <span style="color:#9c27b0;">💎 ${ach.diamondReward}</span>`;
        }
        const div = document.createElement('div');
        div.className = "achievement-card";
        div.innerHTML = `
      <div class="achievement-header">
        <h3>${ach.name}</h3>
        <span class="achievement-status ${statusClass}">${statusText}</span>
      </div>
      <div class="achievement-body">
        <p>${rewardText}</p>
      </div>
      <div class="achievement-actions"></div>
    `;
        if (!ach.claimed) {
            const btnClaim = document.createElement('button');
            btnClaim.textContent = "Claim";
            btnClaim.disabled = !isMet;
            btnClaim.addEventListener('click', () => claimAchievement(ach.id));
            div.querySelector('.achievement-actions').appendChild(btnClaim);
        }
        container.appendChild(div);
    });
}
function renderShop() {
    const container = document.getElementById('shop-container');
    container.innerHTML = "";
    shopItems.forEach(item => {
        if (!item.purchased) {
            const div = document.createElement('div');
            div.className = "shop-item";
            div.innerHTML = `
        <div class="shop-header">
          <h3>${item.name}</h3>
          <span class="shop-cost">💎 x ${item.costDiamonds}</span>
        </div>
        <div class="shop-body">
          <p>${item.description}</p>
        </div>
        <div class="shop-actions"></div>
      `;
            const btnBuy = document.createElement('button');
            btnBuy.textContent = "Buy";
            if (player.diamonds < item.costDiamonds) {
                btnBuy.disabled = true;
            }
            btnBuy.addEventListener('click', () => purchaseItem(item.itemId));
            div.querySelector('.shop-actions').appendChild(btnBuy);
            container.appendChild(div);
        }
    });
    if (container.innerHTML.trim() === "") {
        container.innerHTML = "<p>No items available or everything already purchased.</p>";
    }
}
function purchaseItem(itemId) {
    const shopItem = shopItems.find(i => i.itemId === itemId);
    if (!shopItem) return;
    if (shopItem.purchased) {
        logMessage("You have already purchased this item.");
        return;
    }
    if (player.diamonds < shopItem.costDiamonds) {
        logMessage(`Not enough diamonds (required: ${shopItem.costDiamonds}).`);
        return;
    }
    player.diamonds -= shopItem.costDiamonds;
    shopItem.purchased = true;
    shopItem.applyEffect();
    logMessage(`Item "${shopItem.name}" purchased! Effect: ${shopItem.description}`);
    updateUI();
    saveGame();
}
function isAchievementMet(ach) {
    if (ach.type === "playerLevel") {
        return player.level >= ach.threshold;
    } else if (ach.type === "questLevel") {
        return quests.some(q => q.level >= ach.threshold);
    }
    return false;
}
function claimAchievement(achId) {
    const ach = achievements.find(a => a.id === achId);
    if (!ach || ach.claimed) return;
    if (!isAchievementMet(ach)) {
        logMessage("You do not meet the requirements yet.");
        return;
    }
    player.gold += ach.goldReward;
    addXP(ach.xpReward);
    if (ach.diamondReward && ach.diamondReward > 0) {
        player.diamonds += ach.diamondReward;
    }
    ach.claimed = true;
    logMessage(
        `Achievement "${ach.name}" claimed! +${ach.goldReward} gold, +${ach.xpReward} XP` +
        (ach.diamondReward && ach.diamondReward > 0
            ? `, +${ach.diamondReward} diamond(s).`
            : ".")
    );
    updateUI();
    saveGame();
}
function addXP(amount) {
    player.xp += amount;
    if (player.xp >= player.xpToNextLevel) {
        player.level++;
        player.xp -= player.xpToNextLevel;
        player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.2);
        logMessage(`Congratulations! You are now level ${player.level}!`);
    }
}
function startQuest(questId) {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;
    const minLevel = questRequiredLevel(quest.id);
    if (player.level < minLevel) {
        logMessage(`You need at least Player Level ${minLevel} to start this quest.`);
        return;
    }
    if (quest.completed) {
        quest.completed = false;
        quest.startTime = null;
    }
    if (!quest.startTime && !quest.completed) {
        quest.startTime = Date.now();
        logMessage(`Quest "${quest.name}" (Level ${quest.level}) started.`);
        updateUI();
        saveGame();
    }
}
function upgradeQuest(questId) {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;
    const minLevel = questRequiredLevel(quest.id);
    if (player.level < minLevel) {
        logMessage(`Quest is locked (requires level ${minLevel}).`);
        return;
    }
    if (player.gold >= quest.upgradeCost) {
        player.gold -= quest.upgradeCost;
        quest.level++;
        quest.upgradeCost = Math.floor(quest.upgradeCost * 2);
        logMessage(`You have upgraded "${quest.name}" to level ${quest.level}!`);
        updateUI();
        saveGame();
    } else {
        logMessage(`Not enough gold (required: ${quest.upgradeCost}).`);
    }
}
function checkQuestCompletion() {
    const now = Date.now();
    quests.forEach(quest => {
        if (quest.startTime && !quest.completed) {
            const elapsed = (now - quest.startTime) / 1000;
            if (elapsed >= quest.duration) {
                quest.completed = true;
                let xpReward = quest.baseXpReward * quest.level;
                let goldReward = quest.baseGoldReward * quest.level;
                xpReward = Math.floor(xpReward * (1 + player.bonusXP));
                goldReward = Math.floor(goldReward * (1 + player.bonusGold));
                addXP(xpReward);
                player.gold += goldReward;
                player.totalCompletedQuests++;
                player.totalGoldEarned += goldReward;
                if (Math.random() < 0.05) {
                    let diamondDrop = Math.floor(Math.random() * 10) + 1;
                    diamondDrop = Math.floor(diamondDrop * (1 + player.bonusDiamonds));
                    player.diamonds += diamondDrop;
                    logMessage(`Quest "${quest.name}" completed! +${xpReward} XP, +${goldReward} gold, +${diamondDrop} diamond(s).`);
                } else {
                    logMessage(`Quest "${quest.name}" completed! +${xpReward} XP, +${goldReward} gold.`);
                }
                if (quest.autoRepeat) {
                    quest.completed = false;
                    quest.startTime = Date.now();
                    logMessage(`Quest "${quest.name}" has automatically restarted!`);
                }
            }
        }
    });
}
function toggleAutoRepeat(questId) {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;
    const minLevel = questRequiredLevel(quest.id);
    if (player.level < minLevel) {
        logMessage(`Quest is locked (requires level ${minLevel}).`);
        return;
    }
    if (player.level < 5) {
        logMessage("You must be at least level 5 to enable auto-repeat.");
        return;
    }
    quest.autoRepeat = !quest.autoRepeat;
    logMessage(`Auto-Repeat for "${quest.name}" is now ${quest.autoRepeat ? "enabled" : "disabled"}.`);
    updateUI();
    saveGame();
}
function handleAFKProgress() {
    const currentTimestamp = Date.now();
    checkQuestCompletion();
    lastTimestamp = currentTimestamp;
}
function resetGame() {
    player.level = 1;
    player.xp = 0;
    player.xpToNextLevel = 100;
    player.gold = 0;
    player.diamonds = 0;
    player.totalCompletedQuests = 0;
    player.totalGoldEarned = 0;
    player.bonusGold = 0;
    player.bonusXP = 0;
    player.bonusDiamonds = 0;
    quests.forEach(q => {
        q.level = 1;
        q.startTime = null;
        q.completed = false;
        q.autoRepeat = false;
        if (q.id === 1) q.upgradeCost = 50;
        if (q.id === 2) q.upgradeCost = 200;
        if (q.id === 3) q.upgradeCost = 500;
        if (q.id === 4) q.upgradeCost = 700;
    });
    achievements.forEach(a => a.claimed = false);
    shopItems.forEach(item => {
        item.purchased = false;
    });
    saveGame();
    updateUI();
    logMessage("Game progress has been reset to starting values.");
}
const resetBtn = document.getElementById('resetGameButton');
if (resetBtn) resetBtn.addEventListener('click', resetGame);
const darkModeBtn = document.getElementById('toggleDarkModeButton');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}
const exportBtn = document.getElementById('exportGameButton');
const importBtn = document.getElementById('importGameButton');
const importFileInput = document.getElementById('importGameFile');
if (exportBtn) {
    exportBtn.addEventListener('click', function () {
        const saveData = {
            player: player,
            quests: quests,
            achievements: achievements,
            shopItems: shopItems
        };
        const jsonData = JSON.stringify(saveData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'afk-quest-save.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        logMessage("Game progress successfully exported.");
    });
}
if (importBtn) {
    importBtn.addEventListener('click', function () {
        importFileInput.click();
    });
}
if (importFileInput) {
    importFileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
            try {
                const data = JSON.parse(evt.target.result);
                if (data.player) Object.assign(player, data.player);
                if (data.quests && Array.isArray(data.quests)) {
                    quests.forEach(q => {
                        const importedQuest = data.quests.find(iq => iq.id === q.id);
                        if (importedQuest) Object.assign(q, importedQuest);
                    });
                }
                if (data.achievements && Array.isArray(data.achievements)) {
                    achievements.forEach(a => {
                        const importedAch = data.achievements.find(ia => ia.id === a.id);
                        if (importedAch) Object.assign(a, importedAch);
                    });
                }
                if (data.shopItems && Array.isArray(data.shopItems)) {
                    shopItems.forEach(item => {
                        const importedItem = data.shopItems.find(si => si.itemId === item.itemId);
                        if (importedItem) {
                            item.purchased = importedItem.purchased;
                        }
                    });
                }
                updateUI();
                saveGame();
                logMessage("Game progress successfully imported and updated!");
            } catch (err) {
                logMessage("Error during import: " + err);
            }
        };
        reader.readAsText(file);
    });
}
loadGame();
handleAFKProgress();
updateUI();
setInterval(() => {
    checkQuestCompletion();
    updateUI();
    saveGame();
}, 1000);