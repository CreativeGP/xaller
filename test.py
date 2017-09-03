def prepro(s):
    if not '$' in s:
        return eval_tokens(s)._string
    ans = prepro(s[s.index('$'):s.rindex('$')])

prepro("
