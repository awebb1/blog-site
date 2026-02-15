const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  const md = markdownIt({
    html: true,
    linkify: false,
    typographer: true,
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/fonts");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addTransform("wrapTables", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      content = content.replace(/<table>/g, '<div class="table-wrapper"><table>');
      content = content.replace(/<\/table>/g, '</table></div>');
    }
    return content;
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("tagList", function (collectionApi) {
    var tags = new Set();
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").forEach(function (item) {
      (item.data.tags || []).forEach(function (tag) {
        if (tag !== "post") tags.add(tag);
      });
    });
    return Array.from(tags).sort();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
