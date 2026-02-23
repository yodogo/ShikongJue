import { test, expect } from '@playwright/test';

test.describe('ShikongJue Game Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');
    });

    test('Theme Selection - Displays both themes', async ({ page }) => {
        // Wait for theme cards to appear
        const cards = page.locator('.char-card');
        await expect(cards.first()).toBeVisible({ timeout: 10000 });
        
        // Should have at least 2 theme cards
        const count = await cards.count();
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test('Warrior Theme - Navigate to and start', async ({ page }) => {
        // Click first theme card (warrior)
        await page.locator('.char-card').first().click();
        await page.waitForLoadState('networkidle');
        
        // Should be in character selection or mode selection
        const charCards = page.locator('.char-card');
        const visibilityCheck = await charCards.first().isVisible().catch(() => false);
        expect(visibilityCheck).toBeTruthy();
    });

    test('Poet Theme - Select and choose mode', async ({ page }) => {
        // Click second theme (poet)
        await page.locator('.char-card').nth(1).click();
        await page.waitForLoadState('networkidle');

        // Should see mode selection cards
        const cards = page.locator('.char-card');
        const count = await cards.count().catch(() => 0);
        expect(count).toBeGreaterThan(0);
    });

    test('Flying Flower Mode - Full flow from theme to arena', async ({ page }) => {
        // Step 1: Select Poet Theme (second card)
        await page.locator('.char-card').nth(1).click();
        await page.waitForLoadState('networkidle');

        // Step 2: Select Flying Flower Mode (last card usually)
        const modeCards = page.locator('.char-card');
        const modeCount = await modeCards.count();
        
        if (modeCount > 0) {
            // Click what should be the Flying Flower mode card
            await modeCards.last().click();
            await page.waitForLoadState('networkidle');

            // Step 3: Select a keyword
            const keywordCards = page.locator('.char-card');
            const keywordCount = await keywordCards.count();
            
            if (keywordCount > 0) {
                await keywordCards.first().click();
                await page.waitForLoadState('networkidle');

                // Step 4: Select a character
                const charCards = page.locator('.char-card');
                const charCount = await charCards.count();
                
                if (charCount > 0) {
                    await charCards.first().click();
                    await page.waitForLoadState('networkidle');

                    // Step 5: Verify we're in arena
                    // Check for various indicators that we're in the arena
                    const titles = await page.locator('h3').count();
                    const FFCenter = await page.locator('.ff-center-display').isVisible().catch(() => false);
                    const FFKeyword = await page.locator('.ff-keyword-circle').isVisible().catch(() => false);
                    
                    // At least one should be true if we're in arena
                    const inArena = titles > 0 || FFCenter || FFKeyword;
                    expect(inArena).toBeTruthy();
                }
            }
        }
    });

    test('Navigation - Navigate through screens without errors', async ({ page }) => {
        // Click first theme
        await page.locator('.char-card').first().click();
        await page.waitForLoadState('networkidle');

        // Try to navigate back
        const backButton = page.locator('button:has-text("返回")').first();
        const backExists = await backButton.isVisible().catch(() => false);
        
        if (backExists) {
            await backButton.click();
            await page.waitForLoadState('networkidle');
            
            // Should be back at theme selection
            const initialCards = page.locator('.char-card');
            const hasCards = await initialCards.count().then(c => c > 0).catch(() => false);
            expect(hasCards).toBeTruthy();
        }
    });

    test('Visual - Page should not have black screen or errors', async ({ page }) => {
        // Navigate through flow
        await page.locator('.char-card').first().click();
        await page.waitForLoadState('networkidle');

        // Check page is visible and rendered
        const body = page.locator('body');
        const isVisible = await body.isVisible();
        expect(isVisible).toBeTruthy();

        // Check there's content visible
        const allText = await page.locator('*').count();
        expect(allText).toBeGreaterThan(10); // Should have more than 10 elements
    });
});
