/**
 * Poetry utilities for FF mode
 */

/**
 * Parse verse text into vertical display columns
 * @param {string} text - Verse text to parse
 * @returns {Array} Array of parsed lines
 */
export function parseVerseForVerticalDisplay(text) {
    return text.split(/[，。、；：？！]/).filter(s => s.trim());
}

/**
 * Extract poetry lines for vertical writing display
 * @param {string} verse - The verse text
 * @returns {Object} Parsed verse data
 */
export function formatVerseForDisplay(verse) {
    const lines = parseVerseForVerticalDisplay(verse);
    return {
        lines,
        hasContent: lines.length > 0,
    };
}

/**
 * Check if a verse contains a specific keyword
 * @param {string} verse - Verse text to check
 * @param {string} keyword - Keyword to search for
 * @returns {boolean} True if keyword is found
 */
export function verseContainsKeyword(verse, keyword) {
    return verse.includes(keyword);
}

/**
 * Get display source from verse source string
 * @param {string} source - Source string (e.g., "李白《静夜思》")
 * @returns {string} Formatted source
 */
export function formatVerseSource(source) {
    return source || '';
}

/**
 * Filter verses by author
 * @param {Array} verses - Array of verse objects
 * @param {string} author - Author name to filter by
 * @returns {Array} Filtered verses
 */
export function filterVersesByAuthor(verses, author) {
    return verses.filter(v => v.author === author);
}

/**
 * Filter out used verses
 * @param {Array} verses - Array of verse objects
 * @param {Set} usedLines - Set of used verse texts
 * @returns {Array} Filtered verses
 */
export function filterUnusedVerses(verses, usedLines) {
    return verses.filter(v => !usedLines.has(v.text));
}
