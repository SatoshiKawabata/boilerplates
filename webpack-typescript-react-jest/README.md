# フロントエンド開発環境構築ハンズオン - Webpack & TypeScript & React

## 始める前にnodeのバージョン確認
`v9.3.0`を使用しますが、webpack4をが動くバージョンだったらどれでもOKです。
```sh
node -v
> v9.3.0
```

## プロジェクトの作成
パッケージの内容について色々設定できますが、後から変更もできるのでとりあえずはエンター連打でOKだと思います。終わったら`package.json`が追加されています。
```
npm init
```

## webpackのインストール
```
npm i -D webpack webpack-cli
```

## HelloWorld
JSのエントリポイントを作成します。
`src/`配下は自分が書くコードで、`dist/`配下はビルド結果のjsが書き出される場所でそのjsファイルを読み込むhtmlファイルを置いています。

ディレクトリ構成
```
./dist
  /index.html
./src
  /index.js
```

```js
const h1 = document.createElement("h1");
h1.innerText = "HelloWorld";
document.body.appendChild(h1);
```

```html
...
<script src="./index.js"></script>
...
```

`webpack.config.js`を作成します。

```js
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js'
  }
};
```

## ビルド
これでビルドされて`dist/`にバンドルされた`index.js`が書き出されます。
```sh
./node_modules/.bin/webpack
```

ビルド後
```
./dist
  /index.html
  /index.js
```

`dist/index.html`を開くと"HelloWorld"が表示されます。

## webpack-dev-serverを導入する
インストール
```js
npm i -D webpack-dev-server
```

`webpack.config.js`に設定を追加
```js
  ...
  devServer: {
    contentBase: "./dist",
    port: "8888"
  }
  ...
```

起動
```sh
./node_modules/.bin/webpack-dev-server
```

`localhost:8888`でページにアクセスできます。この状態で既にソースのウォッチとホットリロードは効きます。

## CSSもバンドルする
`style-loader`と`css-loader`をインストール
```js
npm i -D style-loader css-loader
```

`css-loader`: cssファイルを解釈できるようにする
`style-loader`: styleタグを生成して、読み込んだcssのスタイルを書き込む

`webpack.config.js`に設定を追加
```js
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
  ...
```

cssファイルを追加
```css
.title {
  color: red;
}
```

jsでcssを読み込む
```js
import "./index.css";
const h1 = document.createElement("h1");
h1.innerText = "HelloWorld";
h1.classList.add("title");
document.body.appendChild(h1);
```

これで"HelloWorld"にスタイルが当たります。
devtoolで確認すると`style-loader`が↓のような感じで`style`タグを吐き出してくれてるのがわかるかと思います。
```html
<head>
  <style>
    .test {
      color: red;
    }
  </style>
</head>
<body>
...
</body>
```

## Reactを導入する
インストール
```sh
npm i -S react react-dom
```

jsでReactを使う
```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const h1 = React.createElement("h1", {
  className: "title"
}, "HelloWorld");

ReactDOM.render(
  h1,
  document.body
);
```
babelを導入していないのでjsx記法はまだ使えません。

## TypeScriptを導入する
インストール
```sh
npm i -D typescript ts-loader
```
`ts-loader`: TypeScriptを読み込むようにしてくれるモジュール

reactとreact-domの型定義ファイルをインストールする
これでライブラリのコードヒントが出るようになってくれます。
```sh
npm i -D @types/react @types/react-dom
```

`webpack.config.js`でTypeScriptの設定を追加します。
```js
  entry: './src/index.tsx',
  ...
  module: {
    rules: [
      ...
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.tsx', ".js", ".json"
    ]
  }
```

`index.js`→`index.tsx`に拡張子を変更します。tsxはTypeScriptでjsxを使用する時に使う拡張子のことです。
```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";

ReactDOM.render(
  <h1 className="title">HelloWorld</h1>,
  document.body
);
```

TypeScriptの設定ファイル`tsconfig.json`を追加します。[ここ](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)を参考にしました。
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react",
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
```

## jestを導入する
インストール
```sh
npm i -D jest @types/jest ts-jest
```

[ts-jestのリポジトリ](https://github.com/kulshekhar/ts-jest#usage)を参考に`package.json`に下記を追記します。
```json
  ...
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ]
  }
```

コンポーネントのテストを描きたいので先程の`h1`要素を`Title.jsx`として切り出します。
```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import Title from "./Title";

describe("Title component test.", () => {
  beforeEach(done => {
    ReactDOM.render(
      <Title />,
      document.body,
      done
    );
  });

  it("should render correctly.", () => {
    const title = document.querySelector("h1");
    expect(title.textContent).toBe("HelloWorld");
    expect(title.className).toBe("title");
  });
});
```

テストコードはこんな感じでいいと思います。
```js
import * as React from "react";
import * as ReactDOM from "react-dom";
import Title from "./Title";

describe("Title component test.", () => {
  beforeEach(done => {
    ReactDOM.render(
      <Title />,
      document.body,
      done
    );
  });

  it("should render correctly.", () => {
    const title = document.querySelector("h1");
    expect(title.textContent).toBe("HelloWorld");
    expect(title.className).toBe("title");
  });
});
```

テスト実行
たぶんreactのwarningが出ますがとりあえずOKです。`--watch`とかつければウォッチしてくれます。
```sh
./node_modules/.bin/jest
```

## (おまけ)CSS Modulesを導入する
`webpack.config.js`にmodulesの設定を足す
```js
        ...
        use: [
          { loader: "style-loader" },
          { loader: "css-loader?modules" }
        ]
        ...
```

cssファイルをオブジェクトのようにrequireすることができます。セレクタをハッシュ化してくれます。
```js
const style = require("./index.css");
console.log(style);
> {title: "lfEzW-QkJuIZ6SnG6kM-b"}
```

こんな感じでクラス名をjsx中に記述してやると擬似的にスタイルをスコーピングできます。
```js
import * as React from "react";
const style = require("./index.css");

export default () => (
  <h1 className={style.title}>HelloWorld</h1>
);
```
CSS Modulesのせいでテストがコケるので、`jest-css-modules`をインストールします。
```sh
npm i -D jest-css-modules
```

`package.json`にjestの設定を追加します。
```json
...
  "jest": {
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
      ".css": "<rootDir>/node_modules/jest-css-modules"
    },
...
```

これでひとまずテストが通るようになります。