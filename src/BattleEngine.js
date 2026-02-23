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
        portrait: "/guan_yu.png"
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
        portrait: "/qin_qiong.png"
    },
    liBai: {
        name: "李白",
        title: "诗仙",
        hp: 1000,
        maxHp: 1000,
        atk: 160,
        def: 50,
        spd: 90,
        isPoet: true,
        skills: [
            { name: "将进酒", damage: 1.8, verse: "君不见，黄河之水天上来，奔流到海不复回。" },
            { name: "蜀道难", damage: 1.5, verse: "蜀道之难，难于上青天。" },
            { name: "行路难", damage: 2.2, verse: "长风破浪会有时，直挂云帆济沧海。" }
        ],
        portrait: "/li_bai.png"
    },
    suShi: {
        name: "苏轼",
        title: "词圣",
        hp: 1050,
        maxHp: 1050,
        atk: 145,
        def: 70,
        spd: 80,
        isPoet: true,
        skills: [
            { name: "赤壁怀古", damage: 1.7, verse: "大江东去，浪淘尽，千古风流人物。" },
            { name: "明月几时有", damage: 1.4, verse: "明月几时有？把酒问青天。" },
            { name: "定风波", damage: 2.0, verse: "回首向来萧瑟处，归去，也无风雨也无晴。" }
        ],
        portrait: "/su_shi.png"
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

        this.logs.push(`${attacker.name} 吟诵了 【${actionName}】，对 ${defender.name} 造成了 ${damage} 点心神冲击！`);

        if (defender.hp <= 0) {
            this.logs.push(`${defender.name} 词穷力竭！ ${attacker.name} 在文坛大胜！`);
            return { status: "finished", winner: attacker, logs: this.logs, damageDealt: damage, verse: verse };
        }

        // Keep latest 30 logs to avoid overflow
        if (this.logs.length > 30) this.logs.shift();

        return { status: "ongoing", logs: this.logs, damageDealt: damage, verse: verse };
    }
}
