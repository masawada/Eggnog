Eggnog - a presentation software on JavaScript  
==============================================  
  
目次  
----  
1. 動作環境  
2. ライブラリの読み込み  
3. メソッド  
4. 記法  
5. 表示型  
6. スタイルの指定  
7. ライセンス  
  
  
動作環境  
--------  
  JavaScriptが動作するブラウザ。  
    
  
ライブラリの読み込み・初期化  
----------------------------  
  var eggnog = Eggnog.init(slide slideObject, base DOM, width number, height number);  
    
  slide:  
    スライドオブジェクト。スライドの記法は「記法」項参照。  
  
  base:  
    スライドを表示させるDOMオブジェクトまたはそのidを指定。  
  
  width:  
    スライドの横幅。数値で指定する（px等の単位は付けない。）  
    
  height:  
    スライドの横幅。widthと同じように指定可能。  
  
  
メソッド  
--------  
  var eggnog = Eggnog.init();  
    
  eggnog.next(); // 次ブロックを表示。全ブロックが表示されていたら次のページへ移動  
    
  eggnog.prev(); // 現在ブロックを削除。ない場合はひとつ前のページに移動  
    
  eggnog.jumpTo(page number, block number); // 指定ページ・ブロックに移動  
    
  eggnog.setSize(width number, height number); // 縦横のサイズを変更。'window'指定可能  
    
  var note = eggnog.getNote(); // 現在ページの発表者ノートを取得  
  
  
記法  
----  
  JSON形式で記述する。  
  
例:  
  
var slide = {  
    title: 'タイトル',  
    aspect: 4/3, //　縦横のアスペクト比   
    pages: [{ // 各スライドのまとまり  
        note: 'メモ',　// スライド単位の発表者ノート  
        blocks: [{ // スライド内で順次表示させる要素のまとまり  
            elements: [{  
                type: 'title', // 型。詳細は「表示型」項参照  
                value: 'Hello, world', // 要素の表示される部分  
                style: { // 適用されるスタイル。  
                    width: '100%',  
                    fontSize: '100%'  
                }  
            },{  
                // ブロック内の要素は複数作成可能  
            }],  
            script: function(){ // ブロック読み込み時に実行されるスクリプト  
                // your script here  
            }  
        }],  
        script: function(){ // スライド読み込み時に実行されるスクリプト  
            // your script here  
        }  
    },{  
        // ページは複数作成可能  
    }]  
};  
  
  最終的にこの形に収まれば良い。  
  テンプレート関数を作成して動的に生成することなども可能である。  
  
  
表示型  
------  
  Eggnogには以下の表示型がある。  
  要素により使い分けること。  
    
  1. title  
    スライドの見出しに用いる型。html上ではh1要素として表示される。  
    ひとつのスライド内に0または1つ表示させるのが好ましい。  
      
    使用できるプロパティ  
    type: 'title',  
    value: 'タイトル',  
    style: {  
        // CSS Style  
    }  
      
  2. text  
    文字列を表示する場合に用いる型。html上ではp要素として表示される。  
      
    使用できるプロパティ  
    type: 'text',  
    value: '文字列',  
    style: {  
        // CSS Style  
    }  
      
  3. image  
    画像を表示する場合に用いる型。html上ではimg要素として表示される。  
      
    使用できるプロパティ  
    type: 'image',  
    src: 'html本体から画像までの相対パスor絶対パス',  
    style: {  
        // CSS Style  
    }  
      
  4. tag  
    タグを直書きする場合に用いる型。html上ではdivタグの中に指定したタグが表示される。  
      
    使用できるプロパティ  
      
    type: 'tag',  
    tag: '<tag></tag>'  
  
  
スタイルの指定  
-------------  
  block内でstyleを指定する場合、jQueryと同じ記法を用いる。  
    
  style: {  
    key: val,  
    ...  
  }  
    
  keyはCSSのプロパティ。font-sizeなどハイフンが入る場合はそのあとの文字を大文字にする。（font-size -> fontSize）  
  
  
ライセンス  
----------  
The MIT License (MIT)  
  
Copyright (c) 2011 andantesoftware.com  
  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
  
ChangeLog  
---------  
2011.09.08: OperaでsetSizeにwindow指定できないバグ修正  
            READMEの一部を修正。  
2011.09.05: ファーストコミット