# Global Variables
exel = 1  # Line to excute next.
retl = [] # Lineto return from func.
fs = [-1] # Running function index (default -1).
tfs = [None] # Translating function index (default -1).
outjs = '' # JS File to output
bDbg = False # Flag output for debug.
jsbuf = ''
lock = False

indent = 0

blocks = []
Vars = []
Funcs = []
vtypes = []
tokens = []
lines = []

import_paths = [
    "./",
    "../test/",
    ]

output = ''
input = ''

