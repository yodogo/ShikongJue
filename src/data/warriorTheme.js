import guanYuPng from '../assets/themes/warrior/guan_yu.png';
import guanYuCombatPng from '../assets/themes/warrior/guan_yu_combat.png';
import guanYuAttackAPng from '../assets/themes/warrior/guan_yu_attack_a.png';
import guanYuAttackSPng from '../assets/themes/warrior/guan_yu_attack_s.png';
import guanYuAttackDPng from '../assets/themes/warrior/guan_yu_attack_d.png';
import guanYuAttackFPng from '../assets/themes/warrior/guan_yu_attack_f.png';
import qinQiongPng from '../assets/themes/warrior/qin_qiong.png';
import qinQiongCombatPng from '../assets/themes/warrior/qin_qiong_combat.png';
import qinQiongAttackHPng from '../assets/themes/warrior/qin_qiong_attack_h.png';
import qinQiongAttackJPng from '../assets/themes/warrior/qin_qiong_attack_j.png';
import qinQiongAttackKPng from '../assets/themes/warrior/qin_qiong_attack_k.png';
import qinQiongAttackLPng from '../assets/themes/warrior/qin_qiong_attack_l.png';
import warriorCoverPng from '../assets/themes/warrior/cover.png';

export const warriorTheme = {
    id: 'warrior',
    name: "武斗：关公战秦琼",
    description: "穿越时空的巅峰决战：武圣 vs 门神",
    background: "/themes/warrior/warrior_bg.png",
    cover: warriorCoverPng,
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
            portrait: guanYuPng,
            combatImg: guanYuCombatPng,
            attackImages: {
                0: guanYuAttackAPng,
                1: guanYuAttackSPng,
                2: guanYuAttackDPng,
                basic: guanYuAttackFPng
            },
            needsFlip: false
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
            portrait: qinQiongPng,
            combatImg: qinQiongCombatPng,
            attackImages: {
                0: qinQiongAttackHPng,
                1: qinQiongAttackJPng,
                2: qinQiongAttackKPng,
                basic: qinQiongAttackLPng
            },
            needsFlip: false
        }
    }
};
