# Getting Started

[NPM](https://npmjs.org/@sklyerx/exts)

run the following to download the package

```
$ npm i -g @sklyerx/exts
```

after installing the package and navigating to the directory you want to create your project in run

```
$ exts directoryName --git true/false --download true/false --npm true/false
```

if you get an error because of "lack of permission". Run the command with the `sudo` class behind it

Ex:

```
$ sudo exts directoryName --git boolean --download boolean --npm boolean
```

### Video examples

#### Create

![Create Project CLI with params](https://cdn.discordapp.com/attachments/1082466285348212836/1084671354344833024/Full_CLI.gif)

#### Generate new route with param

![Generate new route with param](https://cdn.discordapp.com/attachments/1082466285348212836/1084671353812176946/Full_CLI_Generate.gif)

#### Generate new route without param

![Generate new route without param](https://cdn.discordapp.com/attachments/1082466285348212836/1084671353224953896/CLI_Generate.gif)

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
