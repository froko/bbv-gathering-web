## bbv Gathering 2019

# Tooling

---?image=assets/img/know-your-tools.jpg

@css[text-white text-20](Know Your Tools!)

---

# npm

Essential JavaScript development tools that help you go to market faster and build powerful applications using modern open source code.

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

+++

- npm comes with node.js
- Huge ecosystem for JavaScript development
- Dependency management & script host

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

+++

## `.npmrc`

```
save-exact=true
```

<br>

- Prevent automatic updates of packages. History proves that this doesn't work in the long run.
- Remove all carets (`^`) and tildes (`~`) in the `package.json` version fields.
- Do manual updates with `npm-check -u`

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

+++

## References

@ul[text-06](false)

- https://www.npmjs.com
- https://medium.freecodecamp.org/8-npm-tricks-you-can-use-to-impress-your-colleagues-dbdae1ef5f9e
- https://medium.freecodecamp.org/10-npm-tricks-that-will-make-you-a-pro-a945982afb25
- https://blog.usejournal.com/npm-tips-and-tricks-c96356fd1b12
  @ulend

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

---

# npm-check

Check for outdated, incorrect, and unused dependencies.

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

+++

## Update local packages

```bash
npm-check -u
```

<br>

## Update global packages

```bash
npm-check -u -g
```

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

+++

## References

@ul[text-06](false)

- https://www.npmjs.com/package/npm-check
  @ulend

@snap[north-east]
![npm](assets/img/npm.png)
@snapend

---

# Angular CLI

Create, build & test your Angular application.

@snap[north-east]
![cli](assets/img/angular-cli.png)
@snapend

+++

- Command line interface for Angular
- Scaffolding tool for your application
- Extensible & customizable through schematics

<br>

`npm install -g @angular/cli`

@snap[north-east]
![cli](assets/img/angular-cli.png)
@snapend

+++

## References

@ul[text-06](false)

- https://cli.angular.io
- https://app.pluralsight.com/library/courses/angular-cli
  @ulend

@snap[north-east]
![cli](assets/img/angular-cli.png)
@snapend

---

# TsLint

An extensible linter for the TypeScript language.

@snap[north-east]
![tslint](assets/img/tslint.png)
@snapend

+++

## `tslint.json`

```json
{
  "extends": "tslint:recommended",
  "rulesDirectory": ["codelyzer"],
  "rules": {
    "deprecation": {
      "severity": "warn"
    },
    "max-classes-per-file": false,
    "max-line-length": [true, 120],
    "member-ordering": [
      true,
      {
        "order": ["static-field", "instance-field", "static-method", "instance-method"]
      }
    ],
    "ordered-imports": false,
    "quotemark": [true, "single"],
    "trailing-comma": false
  }
}
```

@snap[north-east]
![tslint](assets/img/tslint.png)
@snapend

+++

## References

@ul[text-06](false)

- https://palantir.github.io/tslint/
- https://angular.io/cli/lint
- https://blog.angularindepth.com/bending-tslint-to-your-needs-6ae0a51e633
  @ulend

@snap[north-east]
![tslint](assets/img/tslint.png)
@snapend

---

# Prettier

An opinionated code formatter.

@snap[north-east]
![prettier](assets/img/prettier.png)
@snapend

+++

@snap[west text-left span-45]

### What is Prettier?

@ul[text-08](false)

- An opinionated code formatter
- Supports many languages
- Integrates with most editors
- Has few options
  @ulend
  @snapend

@snap[east text-left span-45]

### Why use Prettier?

@ul[text-08](false)

- You press save and your code is formatted
- No need to discuss style in code review
- Saves you time and energy
  @ulend
  @snapend

@snap[north-east]
![prettier](assets/img/prettier.png)
@snapend

+++

## `.prettierrc`

```json
{
  "printWidth": 120,
  "singleQuote": true,
  "useTabs": false,
  "tabWidth": 2,
  "semi": true,
  "bracketSpacing": true
}
```

@snap[north-east]
![prettier](assets/img/prettier.png)
@snapend

+++

## Usage ( `package.json` )

```json
{
  "scripts": {
    "format": "prettier --write \"./**/*{.ts,.js,.json}\""
  }
}
```

@snap[north-east]
![prettier](assets/img/prettier.png)
@snapend

+++

## References

@ul[text-06](false)

- https://prettier.io/
- https://www.npmjs.com/package/tslint-config-prettier
- https://christianlydemann.com/style-angular-apps-using-prettier-and-tslint/
  @ulend

@snap[north-east]
![prettier](assets/img/prettier.png)
@snapend

---

# husky

Git hooks made easy.

@snap[north-east]
![husky](assets/img/husky.jpg)
@snapend

+++

- Husky can prevent bad git commit, git push and more
- Only commit valid code according to TsLint and Prettier

@snap[north-east]
![husky](assets/img/husky.jpg)
@snapend

+++

## Usage ( `package.json` )

```json
{
  "scripts": {
    "lint": "ng lint",
    "format:fix": "pretty-quick --staged"
  },
  "husky": {
    "hooks": {
      "pre-commit": "run-s format:fix lint"
    }
  }
}
```

@snap[north-east]
![husky](assets/img/husky.jpg)
@snapend

+++

## References

@ul[text-06](false)

- https://www.npmjs.com/package/husky
- https://www.vojtechruzicka.com/githooks-husky/
  @ulend

@snap[north-east]
![husky](assets/img/husky.jpg)
@snapend

---

# @froko/ng-essentials

Adds better defaults to a new Angular application generated with the Angular-CLI.

@snap[north-east]
![ng-essentials](assets/img/ng-essentials.png)
@snapend

+++

- Heavily inspired by a blog post from Martin Hotell
- Removes update symbols from package.json
- Adds Prettier & Husky
- Removes protractor as e2e testing tool
- Optional support for jest
- Optional support for cypress or testcafe
- Optional support for wallaby

@snap[north-east]
![ng-essentials](assets/img/ng-essentials.png)
@snapend

+++

## References

@ul[text-06](false)

- https://www.npmjs.com/package/@froko/ng-essentials
- https://medium.com/@martin_hotell/use-react-tools-for-better-angular-apps-b0f14f3f8114
  @ulend

@snap[north-east]
![ng-essentials](assets/img/ng-essentials.png)
@snapend

---
