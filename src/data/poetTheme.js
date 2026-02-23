export const poetTheme = {
    id: 'poet',
    name: "文斗：李白对苏轼",
    description: "千古一瞬的文坛较量：诗仙 vs 词圣",
    background: "/arena_bg.png", // Could be a different one later
    characters: {
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
            portrait: "/themes/poet/li_bai.png",
            combatImg: "/themes/poet/li_bai_combat.png"
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
            portrait: "/themes/poet/su_shi.png",
            combatImg: "/themes/poet/su_shi_combat.png"
        }
    }
};
