# from Global import *
import re
from genfunc import *

class TokenType:
    def __init__(self):
        self.Comment = False
        self.Return = False
        self.NL = False
        self.String = False
        self.StringIns = False
        self.ListBegin = False
        self.ListEnd = False
        self.List = False
        self.Atom = False
        self.EqualToSubst = False

class Token:
    def __init__(self, line, string = ''):
        self.ttype = TokenType()
        self.string = string
        self.line = line
        self.real_line = 0 # 実際のファイルでの行番号

    def find_keyword(tokens, keyword):
        ''' トークンの中にキーワードがあるかどうかを識別する '''
        for t in tokens:
            if is_plain(t) and t.string == keyword:
                return True
        return False

    def tokenize(filename):
        comment = False
        string = False
        bufferstr = ''
        lc = 0
        tokens = []
        for line in open(filename, 'r'):
            nl = False
            lc += 1
            for i in range(len(line)):
                # String
                if not comment and string and line[i] == '\'':
                    t = Token(lc, bufferstr)
                    t.ttype.String = True
                    t.real_line = lc
                    tokens.append(t)
                    string = False
                    bufferstr = ''
                    continue
                if not comment and string:
                    bufferstr += '\\n' if line[i] == '\n' else line[i]
                if not comment and not string and line[i] == '\'':
                    string = True

                # Comment
                if not string and comment and line[i] == '\n':
                    t = Token(lc, bufferstr)
                    t.ttype.Comment = True
                    t.real_line = lc
                    tokens.append(t)
                    comment = False
                    bufferstr = ''
                if not string and comment:
                    bufferstr += line[i]
                if not string and not comment and line[i] == '#':

                    comment = True

                if not string and not comment:
                    if re.match("[!-/:-@[-`{-~]", line[i]) and line[i] != '_' and line[i] != '$' and line[i] != '.':
                        if bufferstr != '':
                            t = Token(lc, bufferstr)
                            t.real_line = lc
                            tokens.append(t)
                            bufferstr = ''
                        t = Token(lc, line[i])
                        t.real_line = lc
                        tokens.append(t)
                    elif re.match("\s", line[i]):
                        if bufferstr != '':
                            t = Token(lc, bufferstr)
                            t.real_line = lc
                            tokens.append(t)
                            bufferstr = ''
                    else:
                        bufferstr += line[i]

                    if nl:

                        tokens[-1].ttype.NL = True;
                        nl = False

                    if line[i] == "\n":
                        tokens[-1].ttype.Return = True;
                        nl = True

        tokens[0].ttype.NL = True
        for idx, t in enumerate(tokens):
            if t.ttype.Return:
                if idx+1 <= len(tokens)-1: tokens[idx+1].ttype.NL = True
        
        return tokens


class Line:
    def __init__(self, num):
        self.tokens = []
        self.num = num
        self.token_ind = 0

    def parse(tokens):
        lc = 1
        lines = []
        lines.append(Line(lc))
        lines[0].token_ind = 0
        for idx, t in enumerate(tokens):
            t.line = lc
            lines[lc-1].tokens.append(t)
            if t.ttype.Return:
                lines.append(Line(lc))
                lines[lc].token_ind = idx
                lc += 1
        return lines


class Block:
    def __init__(self):
        self.root = []
        self.body = []
        self.doms = []
        self.token_ind = 0
        self.indent = 0
        self.num = 0

    def report():
        for idx, b in enumerate(blocks):
            dbgprintnoln("Block" + str(idx) +" Root:\n")
        for t in b.root:
            dbgprintnoln(t.string + " ")

        dbgprintnoln("\nBody:\n")
        for t in b.body:
            dbgprintnoln(t.string + " ")

        dbgprintnoln("\nDominations:\n")
        for d in b.doms:
            dbgprintnoln("Block" + str(blocks[d].num) + " is dominating this block.\n")
        dbgprintnoln("\n\n")


    def parse(tokens):
        indent_size = 0
        blocks = []
        for i in range(len(tokens)):
            if tokens[i].string == '{':
                if len(tokens) != 1: tokens[i-1].ttype.Return = True
                tokens[i].ttype.NL = True
                tokens[i].ttype.Return = True
                if i+1 <= len(tokens)-1: tokens[i+1].ttype.NL = True

                indent_size += 1

                bl = Block()
                for b in blocks:
                    if b.indent != 0 and b.indent <= indent_size:
                        bl.doms.append(b.num)
                for j in range(i)[::-1]:
                    bl.root.append(tokens[j])
                    if tokens[j].ttype.NL: break
                bl.root = bl.root[::-1]
                bl.indent = indent_size
                bl.num = len(blocks)+1
                bl.token_ind = i+1
                blocks.append(bl)

            # NOTE: indent_sizeをデクリメントする前に置く！
            for b in blocks:
                if b.indent != 0 and b.indent <= indent_size:
                    b.body.append(tokens[i])
                else:
                    b.indent = 0

            if tokens[i].string == '}':
                if len(tokens) != 1: tokens[i-1].ttype.Return = True
                tokens[i].ttype.NL = True
                tokens[i].ttype.Return = True
                if len(tokens) <= i+1 and i+1 < len(tokens): tokens[i+1].ttype.NL = True
                indent_size -= 1

        return blocks
