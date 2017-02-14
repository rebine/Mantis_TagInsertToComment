# Mantis_TagInsertToComment
Mantis Plugin TagInsertToComment

# Requirements
- Mantis bt 1.3.0 higher.
- For code highlighting [BBCodePlus] 
https://github.com/mantisbt-plugins/BBCodePlus
- For insert attachment image [Mantis_ImagePasteOnComment]
https://github.com/rebine/Mantis_ImagePasteOnComment

# Usage

# 説明
- config/config_inc.php には右記の記述を追加してください。「$g_html_valid_tags .= ',blockquote'; 」
- テキストエリアへボタンやキーボードショートカットでタグを入れます。
- テキストエリアへの拡張ボタンが出ます。
- pre タグで囲むと明るい青枠で囲まれます。（キーボードショートカットはALT+p)
- blockquote タグで囲むと明るいオレンジ色で囲まれます。（キーボードショートカットはALT+b)
- strong タグで囲むと赤文字になります。
- em タグで囲むと青文字になります。
- code、imageボタンは他のプラグインで拡張されたタグを入れます。
- バグ報告の一番上にスクロールするボタンがあります。（画像張り込みに便利です）
- backspaseをinput タグ（特にテキストエリア）以外で禁止しています。Google Chrome52と同じ理由で。

##タグは、選択範囲次第で出力が変わります。
- 選択範囲がないときにはテキストエリア文書の末尾に改行込みで入ります。
- 選択範囲に改行が含まれているときには、選択範囲の上下に入ります。
- 選択範囲に改行がない場合は、左右に入ります。

# 改造予定
特にありませんが、キーボードショートカットは変更できるようにしたいような気がします。（たぶん不要）

# ショートカットのキーバインドやCSSは僕の使いやすいものです。
カスタマイズはご自分で。jsファイルを読んでショートカットキーを変更してみてください。
cssも適当に変更してください。
