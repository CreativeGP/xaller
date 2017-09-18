pushd ../src
pylint TokenClass | sed -e "s/R:\(.*\),\(.*\)/..\/src\/TokenClass.py:\1:\2/g"
./xaller.py -d -i ../test/$1
popd
