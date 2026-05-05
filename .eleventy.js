module.exports = function(eleventyConfig) {
  // Passthrough copy for Decap CMS admin folder, styles and assets
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Casos de estudio collection sorted by order
  eleventyConfig.addCollection("casos", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/casos/*.md")
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};
