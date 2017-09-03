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

# # coding: utf-8
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



# +(button1)Button
# # var s;
# +(s)string
# # s = $('button1').html()
# s = button1.text
# button$s$
# button1.text = button1.text => $('button1').html()

-(T) {
    (member)int
    (member2)int
    @ (func) {
        return 1
    }
}

@ (S) {
    (t)T
    t.member = 100
    return t
}

(i)int
i = $(S)$.member

end
