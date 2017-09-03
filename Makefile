arg =
all: main.cpp
	@g++ main.cpp -I ~/Libraries -g -w -o cxi

	./cxi $(arg)

