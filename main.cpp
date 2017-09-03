/* ========================================================================
   $File: $
   $Date: $
   $Revision: $
   $Creator: Creative GP $
   $Notice: (C) Copyright 2017 by CreativeGP, Inc. All Rights Reserved. $
   ======================================================================== */
#define CPP
#include <meta.h>

#include <stdio.h>
#include <string.h>
#include <stdarg.h>

#include <vector>
#include <map>
#include <iostream>
#include <iterator>
#include <sstream>
#include <fstream>
#include <regex>
#include <algorithm>
#include <cctype>


using namespace std;

typedef unsigned long ttype;

enum Token_Type
{
    TTNone = 1 <<  0,
    TTComment = 1 <<  1,
    TTStr = 1 <<  2,
    TTReturn = 1 <<  3,
    TTNL = 1 <<  4,
    TTString = 1 <<  5,
    TTListBegin = 1 <<  6,
    TTListEnd = 1 <<  7,
    TTList = 1 <<  8,
    TTAtom = 1 <<  9,
    TTEqualToSubst = 1 << 10,
    // TTWobType = 1 << 11,
    // TTNone = 1 << 12,
    // TTNone = 1 << 13,
    // TTNone = 1 << 14,
    // TTNone = 1 << 15,
    // TTNone = 1 << 16,
    // TTNone = 1 << 17,
    // TTNone = 1 << 18,
    // TTNone = 1 << 19,
    // TTNone = 1 << 20,
    // TTNone = 1 << 21,
    // TTNone = 1 << 22,
    // TTNone = 1 << 23,
    // TTNone = 1 << 24,
    // TTNone = 1 << 25,
    // TTNone = 1 << 26,
    // TTNone = 1 << 27,
    // TTNone = 1 << 28,
    // TTNone = 1 << 29,
    // TTNone = 1 << 30,
    // TTNone = 1 << 31,
    // TTNone = 1 << 32,
    // TTNone = 1 << 33,
    // TTNone = 1 << 34,
    // TTNone = 1 << 35,
    // TTNone = 1 << 36,
    // TTNone = 1 << 37,
    // TTNone = 1 << 38,
    // TTNone = 1 << 39,
    // TTNone = 1 << 40,
    // TTNone = 1 << 41,
    // TTNone = 1 << 42,
    // TTNone = 1 << 43,
    // TTNone = 1 << 44,
    // TTNone = 1 << 45,
    // TTNone = 1 << 46,
    // TTNone = 1 << 47,
    // TTNone = 1 << 48,
    // TTNone = 1 << 49,
    // TTNone = 1 << 50,
    // TTNone = 1 << 51,
    // TTNone = 1 << 52,
    // TTNone = 1 << 53,
    // TTNone = 1 << 54,
    // TTNone = 1 << 55,
    // TTNone = 1 << 56,
    // TTNone = 1 << 57,
    // TTNone = 1 << 58,
    // TTNone = 1 << 59,
    // TTNone = 1 << 60,
    // TTNone = 1 << 61,
    // TTNone = 1 << 62,
    // TTNone = 1 << 63,
    // TTNone = 1 << 64,
    // TTNone = 1 << 65,
    // TTNone = 1 << 66,
    // TTNone = 1 << 67,
    // TTNone = 1 << 68,
    // TTNone = 1 << 69,
    // TTNone = 1 << 70,
    // TTNone = 1 << 71,
    // TTNone = 1 << 72,
    // TTNone = 1 << 73,
    // TTNone = 1 << 74,
    // TTNone = 1 << 75,
    // TTNone = 1 << 76,
    // TTNone = 1 << 77,
    // TTNone = 1 << 78,
    // TTNone = 1 << 79 
};
struct Variable;
struct Token;
struct Block;
struct Line;

struct Variable
{
    string name;
    string value;
    string type;
};
struct Token
{
    ttype type;
    string str;
//    Block *p_dom;
};
struct Line
{
    int num;
    vector<Token> tokens;
    string str;
};
struct Block
{
    vector<Token> root;
    vector<Token> body;
    vector<int> doms; // NOTE: blocks はベクタ内での配列を動かさないようにする。
    int in;
    int num;
};
struct Program_Info
{
    int character_count;
    int token_count;
    int line_count;
};

bool is_plain(Token t);
bool is_number(Token t);
bool is_value(Token t);
void err(char *format, ...);
void add_token(Token);
string tokens2str(const vector<Token>);
bool safe(vector<Token>::iterator it, int b, int e);
vector<Token>::iterator nl(vector<Token>::iterator it);
Variable *find_var_by_name(string name);
string to_value(vector<Token> tokens)
{
    stringstream ss;
    for (Token t: tokens)
    {
        ss << t.str;
    }
    return ss.str();
}

void parse_tokens(string);
void mean_tokens();
void parse_lines(char *);
void parse_blocks();

void detect_var(vector<Token>::iterator it);
void replace_var(vector<Token>::iterator it);

static vector<Token> tokens = {};
static vector<Variable> vars;
static vector<Line> lines;
static vector<Block> blocks;
static bool error = false;

int main(int argc, char *argv[])
{
    Program_Info proginfo =
        {};
    string js, php;

    map<const char*, char*> args =
        {
            {"i", "null"},
            {"o", "null"},
            {"h", "null"}
        };
    
    if (argc >=2)
    {
        for (int arg = 1;
             arg < argc;
             arg++)
        {
            if (argv[arg][0] == '-')
            {
                switch (argv[arg][1])
                {
                    case 'i': args["i"] = argv[arg+1]; break;
                    case 'o': args["o"] = argv[arg+1]; break;
                    case 'h': args["h"] = argv[arg+1]; break;
                }
            }
        }

        if (args["h"] != "null")
        {
            // Show help and quit.
            printf("-----CGP Xaller Interpreter (v1.0)-----\n");
            printf("cxi -ioh\n");
            printf("\n");
            printf("Usage\n");
            printf("-h /to show help.\n");
            printf("-i filename /to tell cxi files to interpret.\n");
            printf("-o name /to tell cxi a name to name output files.\n");
            printf("\n");
            return 0;
        } else
        {
            // open file
            ifstream in(args["i"]);
            if (in.fail())
           
            {
                printf("Error: Input file could not be loaded.");
                return 0;
            }
            string buffer((istreambuf_iterator<char>(in)),
                          istreambuf_iterator<char>());
            in.close();

            parse_tokens(buffer);
            parse_lines((char *)buffer.c_str());
            parse_blocks();
            mean_tokens();

            for (int i = 0; i < tokens.size(); ++i)
            {
                replace_var(tokens.begin()+i);
                //detect_var(tokens.begin()+i);
            }

            for (Variable v: vars)
           
            {
                printf("Variable| (name, type) (%s, %s)\n", v.name.c_str(), v.type.c_str());
            }
            printf("There are %d variables.\n", vars.size());

            if (error)
            {
                return -1;
            } else
            {
                ofstream ojs("output.js", ofstream::out);
                ofstream ophp("output.php", ofstream::out);
                ojs << js << endl;
                ophp << php << endl;
                ojs.close();
                ophp.close();
            }

            int last = 0;
            for (Token t: tokens)
            {
                // last = set_token_type(t);
                printf("%d\t|%s\n", t.type, t.str.c_str());
            }
            printf("Takens count: %d\n",  tokens.size());
        }
        
    } else
    {
        printf("Error: Invalid arguments.");
    }
    return 0;
}

void detect_var(vector<Token>::iterator it)
{
    // プログラム変数を検出
    Token t = *(it);

    // TODO: 一応プログラム変数になる条件のつもり、不具合があればここを修正
    if (is_plain(t) && !is_value(t) &&
        t.type & TTNL && t.str == "("
        // && tokens[i+2].str == ")"
        )
   
    {
        Token name = *(it+1);
        Token type = *(it+3);
        Variable v = {};
        v.name = name.str;
        v.type = type.str;

        if ((*(it+4)).type & TTEqualToSubst)
        {
            // TODO: 値の検出
        }

        vars.push_back(v);
    }
}

void replace_var(vector<Token>::iterator it)
{
    // 変数名になりうる値を見つけたら、それが変数名のリストにあるかどうかを確認、
    // 変数名になかったら関数名のリストにあるかどうかを確認する
    // この関数では関数名のリストになかった場合、処理する
    if (safe(it, -1, 1))
    {
        Variable *v;
        if (v = find_var_by_name((*it).str))
        {
            if (is_plain(*it) && (*(it+1)).type & TTEqualToSubst)
            {
                // 代入
//                cout << "Substration (" << v->name << ") by " << to_value(vector<Token>(it+2, nl(it)-1)) << "." << endl;
//                v->value = to_value(vector<Token>(it+2, nl(it)-1));
                cout << "Substration (" << v->name << ") by " << (*(it+2)).str << "." << endl;
                v->value = (*(it+2)).str;
                return;
            }
            // else if (is_plain(*nl(it)) && (*nl(it)).str == "{")
            // 複数行定義
            else if (is_plain(*it))
            {
                // 展開
                (*it).str = v->value;
                cout << "Replacement (" << v->name << ") by " << v->value << "." << endl;
            }
        } 
        else if (is_plain(*(it-1)) && !is_value(*(it-1)) &&
                 (*(it-1)).type & TTNL && (*(it-1)).str == "(")
                 // && tokens[i+2].str == ")"
        {
            if (safe(it, -1, 1))
            {
                Token name = *(it);
                Token type = *(it+2);
                Variable v = {};

                v.name = name.str;
                v.type = type.str;

                vars.push_back(v);
            }
            else
            {
                // TODO: Diagnostics
            }
        }
    }
}

void parse_blocks()
{
    cout << "///////////////////////// Block Information /////////////////////////" << endl;
    int indent_size = 0;
    for (int i = 0; i < tokens.size(); ++i)
    {
        if (tokens[i].str == "{")
        {
            if (tokens.size() != 1) tokens[i-1].type |= TTReturn;
            tokens[i].type |= TTNL | TTReturn;
            if (tokens.size() <= i+1) tokens[i+1].type |= TTNL;

            ++indent_size;
            
            Block b = {};
            cout << endl << "In adding Block " << blocks.size()+1 << endl;
            for (int j = 0; j < blocks.size(); ++j)
            {
                if (blocks[j].in != 0 && blocks[j].in <= indent_size)
                {
                    cout << "There is domination by Block " << blocks[j].num << " " << endl;
                    b.doms.push_back(j);
                }
            }
            for (int j = i-1;;--j)
            {
                b.root.push_back(tokens[j]);
                if (tokens[j].type & TTNL) break;
            }
            reverse(b.root.begin(), b.root.end());
            b.in = indent_size;
            b.num = blocks.size()+1;
            blocks.push_back(b);
        }
        // NOTE: indent_sizeをデクリメントする前に置く！
        for (int j = 0; j < blocks.size(); ++j)
        {
            if (blocks[j].in != 0 && blocks[j].in <= indent_size)
            {
                blocks[j].body.push_back(tokens[i]);
            } else
            {
                blocks[j].in = 0;
            }
        }
        if (tokens[i].str == "}")
        {
            if (tokens.size() != 1) tokens[i-1].type |= TTReturn;
            tokens[i].type |= TTNL | TTReturn;
            if (tokens.size() <= i+1) tokens[i+1].type |= TTNL;

            --indent_size;
        }

    }
    for (int j = 0; j < blocks.size(); ++j)
    {
        cout << "Block" << j << " Root:" << endl;
        for (int i = 0; i < blocks[j].root.size(); i++)
        {
            cout << blocks[j].root[i].str << " ";
        }
        cout << endl << "Body:" << endl;
        for (int i = 0; i < blocks[j].body.size(); i++)
        {
            cout << blocks[j].body[i].str << " ";
        }
        cout << endl << "Dominations:" << endl;
        for (int i = 0; i < blocks[j].doms.size(); i++)
        {
            cout << "Block" << blocks[blocks[j].doms[i]].num << " is dominating this block." << endl;
        }
        
        cout << endl << endl;
    }        
    cout << "///////////////////////// Block Information End /////////////////////////" << endl << endl;
}

void parse_lines(char *buffer)
{
    // プログラム原文から文字列を取ってくる、行番号も入れる
    char *x = buffer;
    for (int i = 0; i < strlen(buffer); ++i)
    {
        if (buffer[i] == '\n')
        {
            char t[256];
            Line line =
                {};
            strncpy(t, x, (size_t)((buffer+i)-x));
            line.str = t;
            line.num = lines.size()+1;
            lines.push_back(line);
            x = (buffer+i)+1;
        }
    }

    // トークンのループを回して最初からトークンも設定していく
    int l = 0;
    for (int i = 0; i < tokens.size(); ++i)
    {
        for (;;i++)
        {
            lines[l].tokens.push_back(tokens[i]);
            if (tokens[i].type & TTReturn)
            {
                ++l;
                break;
            }
        }
    }
}

void parse_tokens(string data)
{
    bool prev_w = false;
    string::iterator on = data.begin();
    string::iterator off = data.begin();

    for (string::iterator on = data.begin(); on != data.end(); ++on)
    {
        if (true
            && (*on != '_')
            && (false
                || (0x21 <= *on && *on <= 0x2f)
                || (0x3a <= *on && *on <= 0x40)
                || (0x5b <= *on && *on <= 0x60)
                || (0x7b <= *on && *on <= 0x7e)
                ))
        {
            // take string on to off
            string s(off, on);
            Token t = {0, s};
            add_token(t);
            ++off;
        } else if (*on == ' ' || *on == '\t')
        {
        } else if (*on == '\n') {
            
        } else {
            prev_w = true;
        }
    }

    bool comment = false;
    bool comment_lines = false;
    bool string = false;
    bool list = false;
    bool wob = true;
    for (int i = 0;
         i < tokens.size();
         ++i)
    {
        ttype type = 0;

        // Comment
        if (tokens[i].str == "#") comment = true;
        if (comment) type |= TTComment;
        if (comment && tokens[i].type & TTReturn) comment = false;

        // String
        if (tokens[i].str == "'") string = !string;
        if (string && tokens[i].str != "'") type |= TTString;

        // List
        if (tokens[i].str == ")")
        {
            type |= TTListEnd;
            list = false;
        }
        if (list)
        {
            type |= TTList;
        }
        if (tokens[i].str == "(")
        {
            type |= TTListBegin;
            list = true;
        }
                
        tokens[i].type |= type;
    }
}

// void parse_tokens(char *data)
// {
//     bool prev_w = false;
//     char *it = (char *)data;

//     for (; *data != '\0'; data++)
//     {
//         if (true
//             && (*data != '_')
//             && (false
//                 || (0x21 <= *data && *data <= 0x2f)
//                 || (0x3a <= *data && *data <= 0x40)
//                 || (0x5b <= *data && *data <= 0x60)
//                 || (0x7b <= *data && *data <= 0x7e)
//                 || (*data == '\n')
//                 ))
       
//         {
//             // symbol
//             if(prev_w)
//             {
//                 prev_w = false;
//                 char t[256];
//                 strncpy(t, it, data-it);
//                 t[data-it] = 0;
//                 ttype type = TTNone;
//                 if (*data == '\n')
//                 {
//                     type |= TTReturn;
//                     add_token(Token{type, (string)t});
//                     it = ++data;
//                     continue;
//                 }
//                 add_token(Token{type, (string)t});
//             }
                    
//             char t[2] =
//                 {*data, 0};
//             ttype type = TTNone;
//             if (*(data+1) == '\n')
//             {
//                 type |= TTReturn;
//                 data++;
//             }
//             add_token(Token{type, (string)t});
                    
//             it = data+1;
//             prev_w = false;
//         } else if (*data == ' ' || *data == '\t')
//         {
//             if (prev_w)
//             {
//                 char t[256];
//                 strncpy(t, it, data-it);
//                 t[data-it] = 0;
//                 ttype type = TTNone;
//                 if (*data == '\n')
//                 {
//                     type |= TTReturn;
//                     add_token(Token{type, (string)t});
//                     ++data;
//                     continue;
//                 }
//                 add_token(Token{type, (string)t});
//             }
//             it = data+1;
//             prev_w = false;
//             continue;
//         } else
//         {
//             // word
//             prev_w = true;
//         }
//     }

//     bool comment = false;
//     bool comment_lines = false;
//     bool string = false;
//     bool list = false;
//     bool wob = true;
//     for (int i = 0;
//          i < tokens.size();
//          ++i)
   
//     {
//         ttype type = 0;

//         // Comment
//         if (tokens[i].str == "#") comment = true;
//         if (comment) type |= TTComment;
//         if (comment && tokens[i].type & TTReturn) comment = false;

//         // String
//         if (tokens[i].str == "'") string = !string;
//         if (string && tokens[i].str != "'") type |= TTString;

//         // List
//         if (tokens[i].str == ")")
//         {
//             type |= TTListEnd;
//             list = false;
//         }
//         if (list)
//         {
//             type |= TTList;
//         }
//         if (tokens[i].str == "(")
//         {
//             type |= TTListBegin;
//             list = true;
//         }
                
//         tokens[i].type |= type;
//     }
// }

void mean_tokens()
{
    for (int i = 0;
         i < tokens.size();
         ++i)
   
    {
        ttype type = 0;

        // Atom
        if (is_plain(tokens[i]) &&
            tokens[i-1].type & TTListBegin &&
            tokens[i+1].type & TTListEnd)
       
        {
            type |= TTAtom;
        }

        if (is_plain(tokens[i]) &&
            tokens[i].str == "=")
       
        {
            type |= TTEqualToSubst;
        }

        tokens[i].type |= type;
    }
}

vector<Token>::iterator nl(vector<Token>::iterator it)
{
    ++it;
    while (!((*it).type & TTNL)) ++it;
    return it;
}

Variable *find_var_by_name(string name)
{
    for (int i = 0; i < vars.size(); ++i)
    {
        if (vars[i].name == name)
        {
            return &vars[i];
        }
    }
    return 0;
}

void add_token(Token t)
{
    if (t.str == "\n")
    {
        tokens[tokens.size()-1].type |= TTReturn;
        return;
    }
    if (tokens.size() == 0 || tokens[tokens.size()-1].type & TTReturn)
    {
        t.type |= TTNL;
    }
    cout << get_vector_size(tokens) << endl;
    tokens.push_back(t);
}

bool safe(vector<Token>::iterator it, int b, int e)
{
    int d = distance(tokens.begin(), it);
    return (-b <= d) && (tokens.size() > (d+e));
}

void err(char *format, ...)
{
    va_list args;

    error = true;
    va_start(args, format);
    ::vprintf(format, args);
    va_end(args);
}

bool is_plain(Token t)
{
    return !(t.type & TTComment) && !(t.type & TTString);
}

bool is_number(Token t)
{
    return all_of(t.str.begin(), t.str.end(), ::isdigit);
}

bool is_value(Token t)
{
    return is_number(t) || t.type & TTString || t.str == "'";
}



template <typename T>
int vector_finder(std::vector<T> vec, T number)
{
    auto itr = std::find(vec.begin(), vec.end(), number);
    size_t index = std::distance( vec.begin(), itr );
    if (index != vec.size())
    { // 発見できたとき
        return 1;
    }
    else
    { // 発見できなかったとき
        return 0;
    }
}
