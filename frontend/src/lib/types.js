
// Note: Converting this to JS means we lose type enforcement
// These are documentation comments only in JS

/**
 * @typedef {'paragraph' | 'heading-1' | 'heading-2' | 'heading-3' | 'bulleted-list' | 'numbered-list' | 'to-do' | 'image' | 'divider' | 'code' | 'table' | 'quote' | 'callout' | 'embed'} BlockType
 */

/**
 * @typedef {Object} Block
 * @property {string} id
 * @property {BlockType} type
 * @property {string} content
 * @property {Object} [properties]
 * @property {boolean} [properties.checked]
 * @property {string} [properties.language]
 * @property {string} [properties.src]
 * @property {string} [properties.alt]
 */

/**
 * @typedef {Object} PageData
 * @property {string} id
 * @property {string} title
 * @property {string} [icon]
 * @property {Block[]} blocks
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {PageData[]} [children]
 */

/**
 * @typedef {Object} Workspace
 * @property {string} id
 * @property {string} name
 * @property {PageData[]} pages
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [avatar]
 */
