import { Marked } from "@ts-stack/markdown";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import fs from "fs";

/**
 * Converts a markdown string to safe HTML by parsing and sanitizing it.
 *
 * @param markdown - The markdown string to convert.
 * @returns The sanitized HTML string.
 */
const convertMarkdownToSafeHtml = (markdown: string): string => {
  const dirtyHtml = Marked.parse(markdown);
  const cleanHtml = DOMPurify(new JSDOM("<!DOCTYPE html>").window).sanitize(
    dirtyHtml
  );

  return cleanHtml;
};

/**
 * Applies CSS styles to an HTML string.
 *
 * @param html - The HTML string to apply CSS styles to.
 * @param cssFilePath - The file path of the CSS file containing the styles to apply.
 * @returns The HTML string with the applied CSS styles.
 * @throws If there is an error reading the CSS file or applying the styles.
 */
const applyCssToHtml = (
  html: string,
  cssFilePath: string
): string => {
  try {
    const cssStyles = fs.readFileSync(cssFilePath, "utf8");
    const styleTag = `<style>${cssStyles}</style>`;
    return `${styleTag}${html}`;
  } catch (error) {
    console.error("Error reading CSS file:", error);
    throw new Error("Failed to apply CSS to HTML.");
  }
};

/**
 * Converts markdown to styled HTML by applying CSS styles.
 *
 * @param markdown - The markdown content to convert.
 * @param cssFilePath - The file path to the CSS file containing the styles to apply.
 * @returns The styled HTML content.
 */
export const markdownToStyledHtml = (
  markdown: string,
  cssFilePath: string
): string => {
  const cleanHtml = convertMarkdownToSafeHtml(markdown);
  const styledHtml = applyCssToHtml(cleanHtml, cssFilePath);

  return styledHtml;
};
