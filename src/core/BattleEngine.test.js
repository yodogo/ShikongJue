import { describe, it, expect, beforeEach } from 'vitest';
import { BattleEngine } from './BattleEngine';

describe('BattleEngine', () => {
    let charA, charB, engine;

    beforeEach(() => {
        charA = {
            name: "关羽",
            atk: 150,
            def: 80,
            hp: 1200,
            maxHp: 1200,
            skills: [{ name: "技能1", damage: 1.5 }],
            isPoet: false
        };
        charB = {
            name: "李白",
            atk: 160,
            def: 50,
            hp: 1000,
            maxHp: 1000,
            skills: [{ name: "诗词1", damage: 1.8, verse: "床前明月光" }],
            isPoet: true
        };
        engine = new BattleEngine(charA, charB);
    });

    it('should calculate damage correctly for a basic attack', () => {
        const result = engine.executeAction("关羽", "attack", -1);
        expect(result.damageDealt).toBeGreaterThan(0);
        expect(engine.charB.hp).toBeLessThan(1000);
    });

    it('should use a multiplier for skills', () => {
        const resBasic = engine.executeAction("关羽", "attack", -1);

        // Reset engine
        const engine2 = new BattleEngine(charA, charB);
        const resSkill = engine2.executeAction("关羽", "skill", 0);

        expect(resSkill.damageDealt).toBeGreaterThan(resBasic.damageDealt);
    });

    it('should include a verse for poet skills', () => {
        const result = engine.executeAction("李白", "skill", 0);
        expect(result.verse).toBe("床前明月光");
    });

    it('should produce warrior-specific logs', () => {
        engine.executeAction("关羽", "attack", -1);
        expect(engine.logs[0]).toContain("使用了");
        expect(engine.logs[0]).toContain("点伤害");
    });

    it('should produce poet-specific logs', () => {
        engine.executeAction("李白", "skill", 0);
        expect(engine.logs[0]).toContain("吟诵了");
        expect(engine.logs[0]).toContain("点心神冲击");
    });

    it('should detect when a character is defeated', () => {
        engine.charB.hp = 10;
        const result = engine.executeAction("关羽", "attack", -1);
        expect(result.status).toBe("finished");
        expect(result.winner.name).toBe("关羽");
        expect(engine.logs[engine.logs.length - 1]).toContain("获得了胜利");
    });

    it('should detect poet victory message', () => {
        engine = new BattleEngine(charB, charA); // Li Bai vs Guan Yu
        engine.charB.hp = 10;
        const result = engine.executeAction("李白", "skill", 0);
        expect(result.status).toBe("finished");
        expect(engine.logs[engine.logs.length - 1]).toContain("词穷力竭");
    });
});
