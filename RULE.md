- ## 変数命名規則
  - 基本キャメルケース
  - 長くてもわかりやすいものにする

  - 定数
    -  大文字スネークケース
    -  FCの中に入れない
    -  長い場合や使いまわすファイルに切り出す
 
- ## ファイル名規則
  - ページ
    - index.page.tsx
  - ステート
    - index.state.tsx   
  - 型
    - index.model.ts
  - 定数
    - index.const.ts   

- ## PR
  - 基本１機能１PR
  - issueに紐づける
  - レビューをしたもののみマージ

- ## ブランチ名
  - feature/{$issue_number}
  - refactor/{$issue_number}
  - fix/{$issue_number}
