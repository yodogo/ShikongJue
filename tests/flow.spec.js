import { test, expect } from '@playwright/test';

test.describe('GuanVsQin Game Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should allow selecting warrior theme and starting a battle', async ({ page }) => {
        // Theme Selection
        await page.click('text=武斗：关公战秦琼');

        // Character Selection
        await expect(page.locator('text=武圣 · 关羽')).toBeVisible();
        await page.click('text=武圣 · 关羽');

        // Arena
        await expect(page.locator('text=战斗开始！')).toBeVisible();
        await expect(page.locator('text=关羽')).toBeVisible();
        await expect(page.locator('text=秦琼')).toBeVisible();
    });

    test('should allow selecting poet theme and seeing ink splashes', async ({ page }) => {
        // Theme Selection
        await page.click('text=文斗：李白对苏轼');

        // Character Selection
        await expect(page.locator('text=诗仙 · 李白')).toBeVisible();
        await page.click('text=诗仙 · 李白');

        // Arena
        await expect(page.locator('text=战斗开始！')).toBeVisible();

        // Trigger Skill (Key 'A')
        await page.keyboard.press('a');

        // Check for ink splash (class .ink-splash)
        const inkSplash = page.locator('.ink-splash');
        await expect(inkSplash).toBeVisible();

        // Check for poetry verse overlay
        const verse = page.locator('.poetry-verse');
        await expect(verse).toBeVisible();
    });

    test('should allow returning to theme selection from character selection', async ({ page }) => {
        await page.click('text=武斗：关公战秦琼');
        await page.click('text=返回主题选择');
        await expect(page.locator('text=请先选择游戏进入的主题')).toBeVisible();
    });
});
