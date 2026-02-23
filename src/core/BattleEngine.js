export class BattleEngine {
    constructor(charA, charB) {
        this.charA = { ...charA };
        this.charB = { ...charB };
        this.logs = [];
        this.usedLines = new Set();
        this.keyword = null;
    }

    setKeyword(keyword) {
        this.keyword = keyword;
        this.usedLines.clear();
    }

    validateLine(line) {
        if (!this.keyword) return { valid: false, reason: "未设置关键字" };
        if (!line.includes(this.keyword)) return { valid: false, reason: `诗句中不包含关键字“${this.keyword}”` };
        if (this.usedLines.has(line)) return { valid: false, reason: "该诗句已被使用过" };
        return { valid: true };
    }

    calculateDamage(attacker, defender, skill) {
        const baseDamage = attacker.atk * skill.damage;
        const reducedDamage = Math.max(10, baseDamage - defender.def);
        const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        return Math.floor(reducedDamage * variance);
    }

    executeAction(attackerName, actionType, skillIndex, actionParams = null) { // Added actionParams
        const attacker = attackerName === this.charA.name ? this.charA : this.charB;
        const defender = attackerName === this.charA.name ? this.charB : this.charA;

        let actionName = "普通攻击";
        let baseDamageMultiplier = 1.0;
        let verse = null;

        if (actionType === 'skill' && skillIndex >= 0 && skillIndex < attacker.skills.length) {
            const skill = attacker.skills[skillIndex];
            actionName = skill.name;
            baseDamageMultiplier = skill.damage;
            verse = skill.verse || null;
        } else if (actionType === 'ff_mode') {
            // Flying Flower Mode Action
            verse = actionParams; // We'll pass the verse directly here for simplicity in this mode
            actionName = "对诗";
            baseDamageMultiplier = 2.0; // Fixed multiplier for FF mode
        }

        const baseDamage = attacker.atk * baseDamageMultiplier;
        const reducedDamage = Math.max(10, baseDamage - (defender.def || 0));
        const variance = 0.9 + Math.random() * 0.2;
        const damage = Math.floor(reducedDamage * variance);

        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;

        if (attacker.isPoet) {
            this.logs.push(`${attacker.name} 吟诵了 【${actionName}】：${verse || '...'}`);
            this.logs.push(`对 ${defender.name} 造成了 ${damage} 点心神冲击！`);
        } else {
            this.logs.push(`${attacker.name} 使用了 【${actionName}】！`);
            this.logs.push(`对 ${defender.name} 造成了 ${damage} 点伤害！`);
        }

        if (verse) this.usedLines.add(verse);

        if (defender.hp <= 0) {
            const victoryMsg = attacker.isPoet ?
                `${defender.name} 词穷力竭！ ${attacker.name} 获得了胜利！` :
                `${defender.name} 倒下了！ ${attacker.name} 获得了胜利！`;
            this.logs.push(victoryMsg);
            return { status: "finished", winner: attacker, logs: this.logs, damageDealt: damage, verse: verse };
        }

        if (this.logs.length > 30) this.logs.shift();

        return { status: "ongoing", logs: this.logs, damageDealt: damage, verse: verse };
    }

    // New method for FF mode execution to avoid breaking signature
    executeFFAction(attackerName, verse) {
        const attacker = attackerName === this.charA.name ? this.charA : this.charB;
        const defender = attackerName === this.charA.name ? this.charB : this.charA;

        this.usedLines.add(verse);

        const baseDamage = attacker.atk * 1.5; // Fixed high damage for successful rhyme
        const damage = Math.floor(baseDamage * (0.9 + Math.random() * 0.2));

        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;

        this.logs.push(`${attacker.name} 对出了：${verse}`);
        this.logs.push(`对 ${defender.name} 造成了 ${damage} 点心神冲击！`);

        if (defender.hp <= 0) {
            this.logs.push(`${defender.name} 词穷力竭！ ${attacker.name} 在文坛大胜！`);
            return { status: "finished", winner: attacker, logs: this.logs, damageDealt: damage, verse: verse };
        }

        return { status: "ongoing", logs: this.logs, damageDealt: damage, verse: verse };
    }
}
