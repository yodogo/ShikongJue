export const characters = {
    guanYu: {
        name: "关羽",
        title: "武圣",
        hp: 1200,
        maxHp: 1200,
        atk: 150,
        def: 80,
        spd: 60,
        skills: [
            { name: "青龙斩", damage: 1.5, effect: "概率造成流血", prob: 0.3 },
            { name: "威震华夏", damage: 1.2, effect: "降低敌方防御", prob: 0.5 },
            { name: "单刀赴会", damage: 2.0, effect: "必杀技", prob: 1.0 }
        ],
        portrait: "/guan_yu.webp"
    },
    qinQiong: {
        name: "秦琼",
        title: "门神",
        hp: 1100,
        maxHp: 1100,
        atk: 140,
        def: 90,
        spd: 70,
        skills: [
            { name: "撒手锏", damage: 1.6, effect: "有几率造成晕眩", prob: 0.2 },
            { name: "马踏黄河", damage: 1.3, effect: "提高自身速度", prob: 0.4 },
            { name: "双锏无双", damage: 2.2, effect: "必杀技", prob: 1.0 }
        ],
        portrait: "/qin_qiong.webp"
    }
};

export class BattleEngine {
    constructor(charA, charB) {
        this.charA = { ...charA };
        this.charB = { ...charB };
        this.logs = [];
        this.turn = 1;
    }

    calculateDamage(attacker, defender, skill) {
        const baseDamage = attacker.atk * skill.damage;
        const reducedDamage = Math.max(10, baseDamage - defender.def);
        const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        return Math.floor(reducedDamage * variance);
    }

    executeAction(attackerName, actionType, skillIndex = -1) {
        // Determine who is attacking
        let attacker = this.charA.name === attackerName ? this.charA : this.charB;
        let defender = this.charA.name === attackerName ? this.charB : this.charA;

        if (attacker.hp <= 0 || defender.hp <= 0) return { status: "finished", winner: attacker.hp > 0 ? attacker : defender, logs: this.logs };

        let actionName = "普通攻击";
        let baseDamageMultiplier = 1.0;

        if (actionType === 'skill' && skillIndex >= 0 && skillIndex < attacker.skills.length) {
            const skill = attacker.skills[skillIndex];
            actionName = skill.name;
            baseDamageMultiplier = skill.damage;
        }

        const baseDamage = attacker.atk * baseDamageMultiplier;
        const reducedDamage = Math.max(10, baseDamage - defender.def);
        const variance = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
        const damage = Math.floor(reducedDamage * variance);

        defender.hp -= damage;
        if (defender.hp < 0) defender.hp = 0;

        this.logs.push(`${attacker.name} 使用了 【${actionName}】，对 ${defender.name} 造成了 ${damage} 点伤害！`);

        if (defender.hp <= 0) {
            this.logs.push(`${defender.name} 倒下了！ ${attacker.name} 获得了胜利！`);
            return { status: "finished", winner: attacker, logs: this.logs, damageDealt: damage };
        }

        // Keep latest 30 logs to avoid overflow
        if (this.logs.length > 30) this.logs.shift();

        return { status: "ongoing", logs: this.logs, damageDealt: damage };
    }
}
