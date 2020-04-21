module.exports = {
  params: ({ args }) => {
    return {
      fileExtension: ["js", "ts"].includes(args.format) ? args.format : "js",
      subdirectory: args["dir"] || false,
    };
  },
};
