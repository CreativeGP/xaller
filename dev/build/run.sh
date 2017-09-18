pushd ../src
pylint TokenClass
./xaller.py -d -i ../test/$1
popd
