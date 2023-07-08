# cross swing
## init items
1. expo init rn-examp2 调用默认设置的模版
2. cd rn-examp2
3. mv * ../
4. mv .gitignore ../
5. cd ../ && rm -rf rn-examp2

To run your project, navigate to the directory and run one of the following yarn commands.

- cd rn-examp2
- yarn start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- yarn android
- yarn ios
- yarn web

## config package
[Install React Navigation](https://reactnavigation.org/docs/7.x/getting-started#installation)
```
yarn add @react-navigation/native

yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

yarn add @react-navigation/bottom-tabs

fix: npx expo install react-native-gesture-handler@~2.9.0 react-native-reanimated@~2.14.4 react-native-safe-area-context@4.5.0 react-native-screens@~3.20.0
```
## bugs

Cannot find module './assets/plus.png' or its corresponding type declarations.

create file react-app-env.d.ts, and add

```
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
```