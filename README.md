# Getting Started

run the following to download the package

```
npm i -g @sklyerx/express-typescript
```

after installing the package and navigating to the directory you want to create your project in run

```
express-typescript directoryName --git true/false --download true/false --npm true/false
```

### Explaning params

- `directoryName` is the name of the directory/project that you are going to develop your app in.
- `--git` the --git param that you add to the cli is going to initialize an empty git repo. This is enabled by default
- `--download` the --download param that you add to the cli is going to download the npm modules that come with the package.
- `--npm` Finally when you add the npm param you can use npm or yarn as your package manager.

---

<br>
<br>

## Couple things to know

this npm package is not a framework or a library! it is not a replacement for express or any of the expressjs frameworks.

What this tool actually is:

- a generator tool that creates apis
- cli tool
