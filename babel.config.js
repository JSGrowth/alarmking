module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@screens': './srcs/screens',
          '@common': './srcs/common',
          '@srcs': './srcs',
        },
      },
    ],
  ],
};
