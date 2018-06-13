# expo-react-native-web

**NOTE: My expo-web repo has been [merged](https://github.com/expo/expo-sdk/pull/107) in official Expo, Yay!**

**NOTE2: Unfortunately the PR had to be retracted due to dependency concerns.**

Also I'm now doubting if this is the correct way to move forward.
It seems Vincent Riemers [React Native DOM](https://github.com/vincentriemer/react-native-dom) is the better way to go than react-native-web.

**I will soon update this repo to use that instead. (update: not going to happen)**

This repo shows how an Expo app (the default tabs template) can be extended with React Native Web support.

[See my blog post here](https://medium.com/@ron.arts/web-support-for-create-react-native-app-80b16f930326).

## How to use

Clone this repo, and run `yarn`.

Then start `exp start -c` in one terminal, in another start `exp ios`.

In yet another terminal start `yarn start` and connect your browser to `http://localhost:8080`.

Try resizing the browser.
