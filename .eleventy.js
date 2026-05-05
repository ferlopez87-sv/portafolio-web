module.exports = function(eleventyConfig) {
  // Passthrough copy for Decap CMS admin folder and styles
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
