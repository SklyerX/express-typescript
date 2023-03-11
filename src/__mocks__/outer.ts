export const tsconfig = String.raw`{
    "compilerOptions": {
        /* Visit https://aka.ms/tsconfig to read more about this file */

        /* Projects */
        // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
        // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
        // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
        // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
        // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
        // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

        /* Language and Environment */
        "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
        // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
        // "jsx": "preserve",                                /* Specify what JSX code is generated. */
        // "experimentalDecorators": true,                   /* Enable experimental support for TC39 stage 2 draft decorators. */
        // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
        // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
        // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
        // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
        // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
        // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
        // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
        // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

        /* Modules */
        "module": "commonjs",                                /* Specify what module code is generated. */
        // "rootDir": "./",                                  /* Specify the root folder within your source files. */
        // "moduleResolution": "node",                       /* Specify how TypeScript looks up a file from a given module specifier. */
        // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
        // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
        // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
        // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
        // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
        // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
        // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
        // "resolveJsonModule": true,                        /* Enable importing .json files. */
        // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

        /* JavaScript Support */
        // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
        // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
        // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

        /* Emit */
        // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
        // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
        // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
        // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
        // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
        "outDir": "./dist",                                   /* Specify an output folder for all emitted files. */
        // "removeComments": true,                           /* Disable emitting comments. */
        // "noEmit": true,                                   /* Disable emitting files from a compilation. */
        // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
        // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types. */
        // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
        // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
        // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
        // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
        // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
        // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
        // "newLine": "crlf",                                /* Set the newline character for emitting files. */
        // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
        // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
        // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
        // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
        // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */
        // "preserveValueImports": true,                     /* Preserve unused imported values in the JavaScript output that would otherwise be removed. */

        /* Interop Constraints */
        // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
        // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
        "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
        // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
        "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

        /* Type Checking */
        "strict": true,                                      /* Enable all strict type-checking options. */
        // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
        // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
        // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
        // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
        // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
        // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
        // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
        // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
        // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
        // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
        // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
        // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
        // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
        // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
        // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
        // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
        // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
        // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

        /* Completeness */
        // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
        "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
    }
}`;

export const packagejson = String.raw`{
    "name": "test-a",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "nodemon start",
      "build": "tsc"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/SklyerX/express-typescript-cli.git"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/SklyerX/express-typescript-cli/issues"
    },
    "homepage": "https://github.com/SklyerX/express-typescript-cli#readme",
    "devDependencies": {
      "@types/express": "^4.17.14",
      "@types/node": "^18.8.2",
      "ts-node": "^10.9.1",
      "typescript": "^4.8.4"
    },
    "dependencies": {
      "@types/cookie-parser": "^1.4.3",
      "@types/cors": "^2.8.12",
      "@types/glob": "^8.0.0",
      "@types/mongoose": "^5.11.97",
      "body-parser": "^1.20.0",
      "chalk": "^4.1.2",
      "cookie-parser": "^1.4.6",
      "cors": "^2.8.5",
      "dotenv": "^16.0.3",
      "express": "^4.18.1",
      "glob": "^8.0.3",
      "module-alias": "^2.2.2",
      "nodemon": "^2.0.20",
      "tsconfig-paths": "^4.1.0"
    },
    "extensionPack": [
      "eamodio.gitlens",
      "Alexander.errorlens",
      "beardedbear.beardedtheme",
      "xabikos.javascriptsnippets",
      "oderwat.indent-rainbow",
      "esbenp.prettier-vscode"
    ]
  }`;

export const nodemonjson = String.raw`{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node -r tsconfig-paths/register src/index"
}`;

export const prettier = [
  String.raw`{
    "singleQuote": true,
    "trailingComma": "all",
    "useTabs": false,
    "printWidth": 120,
    "tabWidth": 2,
    "overrides": [
      {
        "files": "*.yaml",
        "options": {
          "tadWidth": 2,
          "printWidth": 40,
          "singleQuote": true
        }
      }
    ]
  }`,
  String.raw`build
coverage`,
];

export const gitignore = String.raw`# Logs
logs
*.log
npm-debug.log*

# Dependencies
node_modules/

# Coverage
coverage

# Transpiled files
build/

# VS Code
.vscode
!.vscode/tasks.js

# JetBrains IDEs
.idea/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Misc
.DS_Store

.env
*report.html`;

export const eslint = [
  String.raw`{
    "env": {
      "browser": true,
      "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "rules": {}
  }`,
  String.raw`build
node_modules`,
];

export const dotenv = String.raw`PORT=3000
MONGODB_URI=MONGOOSE CONNECTION STRING HERE`;

export const editorconfig = String.raw`root = true

[*]
charset = utf-8
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

[*.{js,jsx,json,ts,tsx,yml}]
indent_size = 2
indent_style = space`;

export const extsconfigjson = (projectName: string) => String.raw`{
  "projectName": "${projectName}"
}`;
