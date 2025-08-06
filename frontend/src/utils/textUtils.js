/**
 * Truncate text to specified length with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Extract excerpt from blog content
 */
export const getExcerpt = (content, maxLength = 200) => {
  if (!content) return '';
  
  // Remove extra whitespace and newlines
  const cleanContent = content.replace(/\s+/g, ' ').trim();
  
  if (cleanContent.length <= maxLength) return cleanContent;
  
  // Find the last complete word within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
};

/**
 * Convert blog content to paragraphs
 */
export const contentToParagraphs = (content) => {
  if (!content) return [];
  return content.split('\n').filter(paragraph => paragraph.trim());
};

/**
 * Estimate reading time based on content
 */
export const estimateReadingTime = (content) => {
  if (!content) return 0;
  
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime;
};

/**
 * Generate blog slug from title
 */
export const generateSlug = (title) => {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
