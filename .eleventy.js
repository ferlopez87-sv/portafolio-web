module.exports = function(eleventyConfig) {
  // Passthrough copy for Decap CMS admin folder, styles and assets
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Casos de estudio collection sorted by order
  eleventyConfig.addCollection("casos", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/casos/*.md")
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });

  // Secure JSON serialization: escapes < and > so </script> cannot break out of
  // a <script> tag context even though the HTML parser is not JSON-aware.
  eleventyConfig.addFilter("tojson", function(value) {
    return JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e");
  });

  // URL allowlist: only permit http/https/mailto and relative URLs (/ or #).
  // Rejects javascript:, data:, and any other protocol.
  eleventyConfig.addFilter("urlsafe", function(value) {
    const str = String(value ?? "");
    if (/^(https?:|mailto:|\/|#)/i.test(str)) return str;
    return "#";
  });

  // Google Analytics Measurement ID validator.
  // Only allows the strict GA4 format G- followed by alphanumeric chars.
  eleventyConfig.addFilter("is_valid_ga_id", function(value) {
    return /^G-[A-Z0-9]{6,12}$/.test(String(value ?? ""));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data"
    }
  };
};
