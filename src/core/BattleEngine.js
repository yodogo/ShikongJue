export class BattleEngine {
    constructor(charA, charB) {
        this.charA = { ...charA };
        this.charB = { ...charB };
        this.logs = [];
    }

    calculateDamage(attacker, defender, skill) {
        const baseDamage = attacker.atk * skill.damage;
        const reducedDamage = Math.max(10, baseDamage - defender.def);
        const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        return Math.floor(reducedDamage * variance);
    }

    executeAction(attackerName, actionType, skillIndex) {
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
        }

        const baseDamage = attacker.atk * baseDamageMultiplier;
        const reducedDamage = Math.max(10, baseDamage - defender.def);
        const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        const damage = Math.floor(reducedDamage * variance);

        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;

        const actionVerb = attacker.isPoet ? "吟诵了" : "使用了";
        const damageType = attacker.isPoet ? "心神冲击" : "伤害";

        this.logs.push(`${attacker.name} ${actionVerb} 【${actionName}】，对 ${defender.name} 造成了 ${damage} 点${damageType}！`);

        if (defender.hp <= 0) {
            const winMsg = attacker.isPoet ? `${defender.name} 词穷力竭！ ${attacker.name} 在文坛大胜！` : `${defender.name} 倒下了！ ${attacker.name} 获得了胜利！`;
            this.logs.push(winMsg);
            return { status: "finished", winner: attacker, logs: this.logs, damageDealt: damage, verse: verse };
        }

        // Keep latest 30 logs to avoid overflow
        if (this.logs.length > 30) this.logs.shift();

        return { status: "ongoing", logs: this.logs, damageDealt: damage, verse: verse };
    }
}
