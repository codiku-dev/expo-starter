module.exports = {
  presets: [
    ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ],
  plugins: [
   
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {  
          '@': './',
        },
      },
    ]
    ,
    'react-native-reanimated/plugin'
  ],
};
