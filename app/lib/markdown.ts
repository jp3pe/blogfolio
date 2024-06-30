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
 * @param html - The HTML content to style.
 * @param cssFilePath - The file path to the CSS file containing the styles to apply.
 * @returns The styled HTML content.
 */
const applyCssToHtml = (html: string, cssFilePath: string): string => {
  try {
    const cssStyles = fs.readFileSync(cssFilePath, "utf8");
    const uniqueClassName = "custom-style-" + new Date().getTime();
    const styleTag = `<style>.${uniqueClassName} { ${cssStyles} }</style>`;
    const wrappedHtml = `<div class="${uniqueClassName}">${html}</div>`;

    return `${styleTag}${wrappedHtml}`;
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
