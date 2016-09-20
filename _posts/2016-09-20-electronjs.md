---
layout: post
title: Electron - When JS comes to Desktop Apps
---

When [Node Webkit][1] was released, it was a big thing. There was a massive hype for creating desktop apps using nw.js. But it had
certain limitations and plus as per the [blog post][2] by the [author][3] itself, around WebKit library which lacked modern
browser features and was hard to use on other platforms, other than Linux.

After a lot of effort by contributers and Github, [Electron][4] was released. Which added far more better features and extensive API support, and tons
of libraries & modules by the community. I would suggest to follow [awesome-electron][5], as it packs some cool goodies and articles around cross platform app development.
If interested, check out [electron based apps][6]. Some of them will be rejected by your OS, because of certification issues but you can ignore them, as they are legit :smile: .

My personal favs are:

1. [Visual Studio Code][7]
2. [FastLane app][8] aka Uber 
3. [Sqlectron][9] Simple and lightweight SQL client desktop
4. [Playback][10] 

I have created 2 apps as well (Unofficial [AppearIn][11] desktop app & Countdown timer). They are working prototypes, just have to polish & publish it on Github (stay tuned!).

Today I will be discussing on how I organize and setup electron apps with features such as cross platform packaging & auto updater. The final structure looks something like this:

![image](https://cloud.githubusercontent.com/assets/2890683/18678453/ad368884-7f8e-11e6-96f0-3cfd692f8149.png)


[1]: http://nwjs.io/
[2]: http://cheng.guru/blog/2016/05/13/from-node-webkit-to-electron-1-0.html
[3]: http://cheng.guru/
[4]: http://electron.atom.io/
[5]: https://github.com/sindresorhus/awesome-electron
[6]: http://electron.atom.io/apps/
[7]: https://code.visualstudio.com/
[8]: https://fastlaneapp.co/
[9]: https://sqlectron.github.io/
[10]: https://github.com/mafintosh/playback
[11]: https://appear.in