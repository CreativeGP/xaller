pushd ../src
# pylint genfunc | sed -e "s/R:\(.*\),\(.*\)/..\/src\/genfunc.py:\1:\2/g"
./xaller.py -i ../test/$1
popd
