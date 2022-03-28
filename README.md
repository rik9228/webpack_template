# 静的サイト構築テンプレート

## 概要
静的サイトを構築する際に使うテンプレートです。

## 各種コマンド
  - `clean`："distファイルを削除"
  - `pug`：srcファイル配下の「.pug」拡張子を「dist]フォルダ配下「.html」拡張子にコンパイル
  - `pug:w`：`pug`を監視。htmlに変更があった場合に都度、`pug`を実行する。
  - `watch`：`webpack`を監視。
  - `webpack:d`：`webpack`を開発モード（development）でコンパイルのみする。
  - `webpack:p`：`webpack`を本番モード（production）でコンパイルのみする。
  - `dev`：`webpack`コマンドを監視しつつ、仮想サーバーを起動。pugファイルの変更も監視。distファイル配下のいずれかのファイルで変更があった場合は、自動でブラウザを更新する。
  - `build`：`webpack`コマンド（本番モード）と`pug`コマンドを実行。