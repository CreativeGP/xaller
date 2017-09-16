pushd ../src
pylint --max-line-length=80 xaller 
./xaller.py -d -i ../test/$1
popd
