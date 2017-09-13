# 値の変換 ---
# 普通に変換（ビルドイン変換）
# 自分で変換関数を書く

# 型を作る ---
# typedef 型の別名
# struct 構造体(class)
# -(name):inherit {
# (x)int
# }

# int、string の基本型を継承する場合、メンバ変数を持てない

# int, string -- 純粋な型

# 型システム完成

# if for 配列 プリプロセッサ

# coding: utf-8
-(HTML):string {}

-(Button) {
    (_web)string
    (text)string
    @ (__init) {
        .text = 'Button from xaller.'
	._web = 'Button'
    }
}
-(Textbox) {
    (_web)string
    (rows)int
    (cols)int
    @ (__init) {
	._web = 'Textbox'
    }
}


@ (foo (s)int)
{
    return (+ s 33)
}


(i)int
loop {
    (eq i 10) ? {
        escape
    }
    i = (+ i 1)
}

end


