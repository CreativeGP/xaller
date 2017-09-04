# Global Variables
exel = 1  # Line to excute next.
retl = [] # Lineto return from func.
fs = [-1] # Running function index (default -1).
outjs = '' # JS File to output
bDbg = False # Flag output for debug.

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

