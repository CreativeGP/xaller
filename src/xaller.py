#!/usr/bin/python3
# -*- coding: utf-8 -*-

"""Xaller alpha 
programmer: CreativeGP
"""
import atexit
import json
import os
import sys
import copy
import time
import pickle
import tarfile

from multiprocessing import Pool
from multiprocessing import Process

# TODO(future)
# Dirty型の比較（これから）
# 変数の初期化

# DBG


import Global

import TokenClass

import ValueClass
import WebClass

import genfunc

Global.vtypes = [ValueClass.Type('int', 'Integer'),
                 ValueClass.Type('string', 'String'),
                 ValueClass.Type('bool', 'Boolean')]

atexit.register(genfunc.report)


def deal_with_cmdargs():
    """Deal with command line arguments."""
    # -hを発見した時点でヘルプ文字列を出力して終了する
    args = sys.argv
    if len(args) < 3:
        if '-h' in args:
            print("-----CGP Xaller Interpreter (v1.0)-----")
            print("cxi -ioh")
            print("Usage")
            print("-h /to show help.")
            print("-i  ilename /to tell cxi  iles to interpret.")
            print("-o name /to tell cxi a name to name output  iles.\n")
            sys.exit(0)
        print("Missing operations.\n")
        sys.exit(0)

    # -dを見つけた際にはデバッグモード
    if '-d' in args:
        Global.bDbg = True

    # -tを見つけた際にはタイムスタンプを押す
    if '-t' in args:
        Global.bTime = True

    # -cを見つけた際にはタイムスタンプを押す
    if '-c' in args:
        Global.bPreCompile = True

    # その他のスイッチを見つけた場合はその次にある引数がデータになる
    if '-o' in args and args.index('-o')+1 < len(args):
        Global.output = args[args.index('-o')+1]
    if '-i' in args and args.index('-i')+1 < len(args):
        Global.input = args[args.index('-i')+1]

    # 出力名が指定されていなかったときは自動で決める
    if Global.output == '':
        Global.output = os.path.basename(Global.input)

    # NOTE(cgp) Make the paths of input and output file absolute.
    # TODO(cgp) Support user and environment variables.
    # TODO(cgp) May suupport expanding symbolic link?
    Global.input = os.path.abspath(Global.input)
    Global.output = os.path.abspath(Global.output)

    # NOTE(cgp) Change the current directory into the input file directory.
    # For os.path.abspath().
    os.chdir(os.path.dirname(Global.input))

    genfunc.dbgprint('Input file name: ' + Global.input)


def out_html():
    """Output the HTML file which just loads JS file."""
    # TODO(cgp) calc.xal -> (calc.xal.html => calc.html)
    html = open('%s.html' % Global.output, 'w')
    html.write("""
    <html>
    <head>
    <meta charset="UTF-8">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
    </head>
    <body style="margin: 0; padding: 0; background-color: black;">

    <script src="%s">
    </script>
    </body>
    </html>
   """
               # TODO(cgp) calc.xal -> (calc.xal.html => calc.html)
               # NOTE(cgp) Use relative path to behave well online.
               % os.path.relpath(Global.output + ".js"))
    html.close()


def deal_with_import(filename):
    """Deal with xaller import statement."""

    # このままだとコメントが反映されないので一回トークン解析してからもとのファイルに戻す
    origin_tokens = TokenClass.Token.tokenize(filename)
    extended_tokens = copy.deepcopy(origin_tokens)
    with open(filename) as raw_file:
        raw = raw_file.read().splitlines()
        offset = 0
        for i in range(len(origin_tokens))[1:-1]:
            if ((genfunc.is_plain(origin_tokens[i-1])
                 and origin_tokens[i-1].string == '<'
                 and origin_tokens[i+1].string == '>')):
                # NOTE(cgp) If there is a plain angle bracket, get a file name
                # to import from raw file to contain spaces.
                # TODO(cgp) Support user and environment variables.
                raw_line = raw[origin_tokens[i].real_line - 1]
                importfile = raw_line[raw_line.find('<')+2:raw_line.find('>')-1]

                if os.path.isabs(importfile):
                    # NOTE(cgp) If the path is absolute, import the file as it is.
                    pass
                else:
                    # NOTE(cgp) Change relative path into absolute.
                    # Here note that the working directory has already been
                    # changed into the source file directory.
                    importfile = os.path.abspath(importfile)

                if not Global.bPreCompile:
                    # プリコンパイルモードではない場合はプリコンパイルファイルを探してあればそちらを使う
                    name, ext = os.path.splitext(os.path.basename(raw_line[raw_line.find('<')+2:raw_line.find('>')-1]))
                    pcp_path = os.path.dirname(importfile) + "/" + name + ".pcp"
                    if os.path.isfile(pcp_path):
                        genfunc.dbgprint("Pre-compiled file found. (%s" % pcp_path)
                        Global.imported.append([pcp_path, 0, [True, False]])
                        continue

                if not os.path.isfile(importfile):
                    genfunc.err("File not found. '%s'" % importfile)

                # TODO(cgp) May suupport expanding symbolic link?
                new_tokens = deal_with_import(importfile)
                Global.imported.append(
                    [importfile, sum(1 for line in open(importfile)), [False, False]])

                # 新しいファイルのトークンの行番号をずらす
                # TokenClass.Token.shift_line(new_tokens, i - 1)

                # 新しいファイル名もトークン化して、もとのトークンに埋め込む
                # i-1 ~ i+2 <...>
                # NOTE(cgp) ループはorigin_tokens、操作しているリストは追加された
                # extended_tokensなのでこの操作にはその差を記録してあるoffsetが必要
                # TODO(cgp) 二重インポートに対応する
                del extended_tokens[i+offset-1:i+offset+2]
                extended_tokens = genfunc.insert(extended_tokens, i + offset - 1, new_tokens)
                # NOTE(cgp) オフセット設定時は<...>を消したことを考慮して3を引く
                offset += len(new_tokens) - 3
    return extended_tokens


def prepare_js():
    """Prepare JS file, running xaller programs."""
    json_file = open((os.path.dirname(os.path.abspath(__file__))
                     + "/html_rule.json"), 'r')
    Global.html_rules = json.load(json_file)

    if not Global.bPreCompile:
        # 'strtrimr':'',
        # 'strtriml'
        # 'strridx':',', 'strrep':'',
        genfunc.out("""function strlen$(str) { return str.length; }""")
        genfunc.out("""function substr$(str, start, length=-1) { if (length == -1) { length = str.length - start;} return str.substr(start, length); }""")
        genfunc.out("""
    function strtrim$(str, char) {
        res = ''
        for (var i = 0; i < str.length; i++) {
            if (str[i] != char) { res += str[i]; }
        }
        return res;
    }
    """)
        genfunc.out("""
    function strtriml$(str, char) {
        res = ''
        if (str[0] != char) { return str; }
        for (var i = 0; i < str.length; i++) {
            if (str[i] != char) { res = str.substr(i); break; }
        }
        return res;
    }
    """)
        genfunc.out("""
    function strtrimr$(str, char) {
        res = ''
        if (str[str.length-1] != char) { return str; }
        for (var i = str.length-1; i >= 0; i--) {
            if (str[i] != char) { res = str.substr(0, i+1); break; }
        }
        return res;
    }
    """)
        genfunc.out("""function stridx$(cmpstr, string, start=0) { return cmpstr.indexOf(string, start); }""")
        genfunc.out("""function strridx$(cmpstr, string, start=0) { return cmpstr.lastIndexOf(string, start); }""")
        genfunc.out("""function strrep$(src, pattern, replacement) {
//    var regExp = new RegExp(pattern, "g");
        return src.split(pattern).join(replacement); }""")
        genfunc.out("""function timeout$(func, ms) { setTimeout(func, ms); }""")
        genfunc.out("""function css$(target, proper, value) { target.css(proper, value); }""")
        genfunc.out("$(function() {")

    # RUN!!!!!
    # 静的な翻訳
    Global.exel = 0
    while True:
        if len(Global.lines) <= Global.exel and Global.bPreCompile:
            # もしプリコンパイルモードだったときにはabortは効かないので
            # 自動で終了するようにする
            break

        runline = Global.lines[Global.exel]
        if not genfunc.translate(runline.tokens):
            break
        if genfunc.translate.element_stack:
            element_block = Global.blocks[genfunc.translate.element_stack[-1]]
            if (len(genfunc.translate.element_stack) > 0 and
                    element_block.body[-1].line <= Global.exel):
                genfunc.translate.element_stack.pop()
        Global.exel += 1

    if not Global.bPreCompile:
        genfunc.out("});")

    # インデントを出力、基本は閉じ括弧開き括弧でインデント数を操作しているが、
    # 単独閉じ括弧の場合に小細工を加えている(See L131)
    indent = 0
    idx = 0
    tmps = Global.outjs
    for i, char in enumerate(tmps):
        if char == '{':
            indent += 1
        if i < len(tmps)-1 and char == '\n' and not tmps[i+1] == '}':
            tab_string = '\t'*indent
            Global.outjs = genfunc.insert(Global.outjs, idx+1, tab_string)
            idx += indent
        elif i < len(tmps)-1 and tmps[i+1] == '}':
            indent -= 1
            tab_string = '\t' * indent
            Global.outjs = genfunc.insert(Global.outjs, idx + 1, tab_string)
            idx += indent
            indent += 1
        elif char == '}':
            indent -= 1
        idx += 1

def out_js():
    """Output JS file."""
    # TODO(cgp) calc.xal -> (calc.xal.js => calc.js)
    if Global.bPreCompile:
        pcp = tarfile.TarFile(os.path.splitext(Global.output)[0] + ".pcp", 'w')

        tmp = open(Global.output + ".pickle", 'wb')
        pickle.dump((Global.Vars, Global.Funcs, Global.vtypes, Global.wobs, Global.blocks, Global.tokens, Global.lines), tmp)
        tmp.close()
        pcp.add(Global.output + ".pickle")
        os.remove(Global.output + ".pickle")

        tmp = open(Global.output + ".js", 'wb')
        tmp.write(Global.outjs)
        tmp.close()
        pcp.add(Global.output + ".js")
        os.remove(Global.output + ".js")

        pcp.close()
    else:
        js_file = open(Global.output + ".js", 'w')
        js_file.write(Global.outjs)
        js_file.close()


def main():
    """Process entry point."""
    now = time.time()
    deal_with_cmdargs()
    if not Global.bPreCompile: out_html()

    Global.tokens = deal_with_import(Global.input)
    Global.blocks = TokenClass.Block.parse(Global.tokens)
    # TODO(cgp): インポート時のエラー行調整
    Global.lines = TokenClass.Line.parse(Global.tokens, 0)

    prepare_js()
    if Global.bTime: print("Elapsed time: " + str(time.time()-now))
    out_js()

#    if Global.bTime: print("Elapsed time: " + str(time.time()-now))

if __name__ == '__main__':
    main()
