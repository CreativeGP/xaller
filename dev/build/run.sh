pushd ../src
pylint ValueClass | sed -e "s/R:\(.*\),\(.*\)/..\/src\/ValueClass.py:\1:\2/g"
./xaller.py -d -i ../test/$1
popd
