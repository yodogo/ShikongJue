export const warriorTheme = {
    id: 'warrior',
    name: "武斗：关公战秦琼",
    description: "穿越时空的巅峰决战：武圣 vs 门神",
    background: "/arena_bg.png",
    characters: {
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
            portrait: "/themes/warrior/guan_yu.png",
            combatImg: "/themes/warrior/guan_yu_combat.png",
            attackImages: {
                0: "/themes/warrior/guan_yu_attack_a.png",
                1: "/themes/warrior/guan_yu_attack_s.png",
                2: "/themes/warrior/guan_yu_attack_d.png",
                basic: "/themes/warrior/guan_yu_attack_f.png"
            }
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
                { name: "撒手锏", damage: 1.4, effect: "造成眩晕", prob: 0.2 },
                { name: "马踏黄河", damage: 1.3, effect: "提高防御", prob: 0.4 },
                { name: "双锏无双", damage: 2.2, effect: "必杀技", prob: 1.0 }
            ],
            portrait: "/themes/warrior/qin_qiong.png",
            combatImg: "/themes/warrior/qin_qiong_combat.png",
            attackImages: {
                0: "/themes/warrior/qin_qiong_attack_h.png",
                1: "/themes/warrior/qin_qiong_attack_j.png",
                2: "/themes/warrior/qin_qiong_attack_k.png",
                basic: "/themes/warrior/qin_qiong_attack_l.png"
            }
        }
    }
};
