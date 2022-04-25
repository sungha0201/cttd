import sass from 'sass';
import postcss from 'postcss';
import postcssClean from 'postcss-clean';
import autoprefixer from 'autoprefixer';
import postcssConfig from './config/postcss.js';

const REGEX_STYLE_SCSS =
  /(^[ \t]+)?<style type=["']text\/scss["']>([\s\S]*?)<\/style>/gm;

function makeCssBlock(css, { blockIndent = '', indentCssWith = '  ' }) {
  const cssIndent = blockIndent + indentCssWith;
  const cssBlock =
    blockIndent +
    '<style type="text/css">\n' +
    css.replace(/(^)(.)/gm, (_, __, firstChar) => cssIndent + firstChar) +
    '\n' +
    blockIndent +
    '</style>';
  return cssBlock;
}

export default async function processScssBlocks(content) {
  let processed = content;
  let result;

  while ((result = REGEX_STYLE_SCSS.exec(content))) {
    const [match, indent = '', scss] = result;
    const compiled = sass.compileString(scss);
    const prefixed = await postcss([
      autoprefixer(postcssConfig.autoprefixer),
    ]).process(compiled.css, { from: undefined });
    const formatted = await postcss([
      postcssClean(postcssConfig.clean),
    ]).process(prefixed.css, { from: undefined });
    const cssBlock = makeCssBlock(formatted.css, { blockIndent: indent });
    processed = processed.replace(match, cssBlock);
  }

  return processed;
}
