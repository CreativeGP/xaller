# -*- coding: utf-8 -*-
# from Global import *

"""Xaller alpha
programmer: CreativeGP
"""
import genfunc
import re
import Global

class TokenType(object):
    """Hold types of token.

    It is a good way to use Enum class to represent types of token.
    This class express Enum class in a pesudo manner because Enum class
    is not supported in python2.x.

    Attributes:
        Comment: Indicates the token is in comment.
        Return: Indicates the token is at the end of the line.
        NL: Indicates the token is at the beginning of the new line.
        String: Indicates the token is in string.
    """

    # pylint: disable=too-many-instance-attributes,too-few-public-methods


    def __init__(self):
        # NOTE(cgp) Camelcase is used to name class members because
        # is is used as if this have been Emum class.
        # Ignore pylint's error messages.
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

class Token(object):
    """This class represents a token.

    Token is a minimum unit to read Xaller.

    Attributes:
        ttype: A TokenType object.
        string: An actual string of the token.
        line: An integer number of row that the token positions.
        real_line: An integer number of actual line that the token positions.
                   (contained blank lines)
    """

    def __init__(self, line, string=''):
        self.ttype = TokenType()
        self.string = string
        self.line = line
        self.real_line = 0 # 実際のファイルでの行番号

    @staticmethod
    def find_keyword(tokens, keyword):
        ''' トークンの中にキーワードがあるかどうかを識別する '''
        for tkn in tokens:
            if genfunc.is_plain(tkn) and tkn.string == keyword:
                return True
        return False

    @staticmethod
    def line_num(tokens):
        """Count the number of rows. """

        linum = 0
        for tkn in tokens:
            if tkn.ttype.NL:
                linum += 1
        return linum

    @staticmethod
    def shift_line(tokens, ofs):
        """Shift the line number.

        Args:
            tokens: A list of token to shift the line number.
            ofs: How many to shift.
        """

        for tkn in tokens:
            tkn.line += ofs


    @staticmethod
    def untokenize(tokens):
        """Convert list of token into a long string.

        Attention: Spaces won't be restored.
        """

        # TODO Restore spaces.
        data = ""
        for tkn in tokens:
            data += tkn.string
            if tkn.ttype.NL:
                data += '\n'
        return data

    @staticmethod
    def tokenize(filename):
        """Convert the file to Xaller tokens."""
        comment = False
        string = False
        bufferstr = ''
        line_count = 0
        tokens = []
        for line in open(filename, 'r'):
            new_line = False
            line_count += 1

            # NOTE(cgp) Ignore pylint's error message.
            # These codes need only index. 
            for i in range(len(line)):
                # String
                if not comment and string and line[i] == '\'':
                    token = Token(line_count, bufferstr)
                    token.ttype.String = True
                    token.real_line = line_count
                    tokens.append(token)
                    string = False
                    bufferstr = ''
                    continue
                if not comment and string:
                    bufferstr += '\\n' if line[i] == '\n' else line[i]
                if not comment and not string and line[i] == '\'':
                    string = True

                # Comment
                if not string and comment and line[i] == '\n':
                    token = Token(line_count, bufferstr)
                    token.ttype.Comment = True
                    token.real_line = line_count
                    tokens.append(token)
                    comment = False
                    bufferstr = ''
                if not string and comment:
                    bufferstr += line[i]
                if not string and not comment and line[i] == '#':

                    comment = True

                if not string and not comment:
                    if ((re.match("[!-/:-@[-`{-~]", line[i])
                         and line[i] != '_'
                         and line[i] != '$'
                         and line[i] != '.')):
                        if bufferstr != '':
                            token = Token(line_count, bufferstr)
                            token.real_line = line_count
                            tokens.append(token)
                            bufferstr = ''
                        token = Token(line_count, line[i])
                        token.real_line = line_count
                        tokens.append(token)
                    elif re.match(r'\s', line[i]):
                        if bufferstr != '':
                            token = Token(line_count, bufferstr)
                            token.real_line = line_count
                            tokens.append(token)
                            bufferstr = ''
                    else:
                        bufferstr += line[i]

                    if new_line:
                        tokens[-1].ttype.NEW_LINE = True
                        new_line = False

                    if line[i] == "\n":
                        tokens[-1].ttype.Return = True
                        new_line = True

        tokens[0].ttype.NEW_LINE = True
        for idx, token in enumerate(tokens):
            # Avoid exception because there are potentialities to cause an Index Error.
            try:
                if token.ttype.Return and idx+1 <= len(tokens)-1:
                    tokens[idx+1].ttype.NEW_LINE = True
                # Unitify unequal symbols and equal symbol to enable <= and >= of buildin functions.
                if (token.string == '<' or token.string == '>') and tokens[idx+1].string == '=':
                    del tokens[idx+1]
                    tokenstring += '='
            except IndexError:
                pass

        return tokens


class Line(object):
    """This class represents a line.

    Line is a second unit to read Xaller.
    Line is consist of the list of tokens.

    Attributes:
        tokens: A list of tokens consisting the line.
        number: An integer count of row from beginning of the code.
        token_ind:
    """

    def __init__(self, num):
        self.tokens = []
        self.num = num
        self.token_ind = 0

    @staticmethod
    def parse(tokens, header):
        """Parse tokens and generate Line class object."""
        line_count = 1
        lines = []
        lines.append(Line(line_count))
        lines[0].token_ind = 0
        for idx, token in enumerate(tokens):
            token.line = line_count # - header
            lines[line_count-1].tokens.append(token)
            if token.ttype.Return:
                lines.append(Line(line_count))
                lines[line_count].token_ind = idx
                line_count += 1
        return lines


class Block(object):
    """This class represents a block.

    Block is a third unit to read Xaller.
    Block is consist of the list of tokens.

    Attributes:
        $root {
            $body
        }
        roor: $root
        body: $body
        doms: A list of integer indexes of some of Global.blocks
              dominating this block.
        indent: DO NOT TOUCH THIS. This is used for parsing.
        num: A integer number to indentigy blocks.
    """

    def __init__(self):
        self.root = []
        self.body = []
        self.doms = []
        self.token_ind = 0
        self.indent = 0
        self.num = 0

    @staticmethod
    def report():
        """Report GLobal.blocks"""
        prnt = genfunc.dbgprintnoln
        for idx, block in enumerate(Global.blocks):
            prnt("Block" + str(idx) +" Root:\n")
            for token in block.root:
                prnt(token.string + " ")

            prnt("\nBody:\n")
            for token in block.body:
                prnt(token.string + " ")

            prnt("\nDominations:\n")
            for block_idx in block.doms:
                block = Global.blocks[block_idx]
                prnt("Block" + str(block.num) + " is dominating this block.\n")
        prnt("\n\n")


    @staticmethod
    def parse(tokens):
        """Generate a list of blocks from a list of tokens."""
        indent_size = 0
        blocks = []

        # NOTE(cgp) Ignore pylint's error message.
        # These codes need only index. 
        for i in range(len((tokens))):
            if tokens[i].string == '{':
                if len(tokens) != 1:
                    tokens[i-1].ttype.Return = True
                tokens[i].ttype.NL = True
                tokens[i].ttype.Return = True
                if i+1 <= len(tokens)-1:
                    tokens[i+1].ttype.NL = True

                indent_size += 1

                new_block = Block()
                for block in blocks:
                    if block.indent != 0 and block.indent <= indent_size:
                        new_block.doms.append(block.num)
                for tkn_idx in range(i)[::-1]:
                    new_block.root.append(tokens[tkn_idx])
                    if tokens[tkn_idx].ttype.NL:
                        break
                new_block.root = new_block.root[::-1]
                new_block.indent = indent_size
                new_block.num = len(blocks) + 1
                new_block.token_ind = i + 1
                blocks.append(new_block)

            # NOTE: indent_sizeをデクリメントする前に置く！
            for block in blocks:
                if block.indent != 0 and block.indent <= indent_size:
                    block.body.append(tokens[i])
                else:
                    block.indent = 0

            if tokens[i].string == '}':
                if len(tokens) != 1:
                    tokens[i-1].ttype.Return = True
                tokens[i].ttype.NL = True
                tokens[i].ttype.Return = True
                if ((len(tokens) <= i + 1
                     and i + 1 < len(tokens))):
                    tokens[i+1].ttype.NL = True
                indent_size -= 1

        return blocks
