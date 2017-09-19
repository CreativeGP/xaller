pushd ../src
# pylint genfunc | sed -e "s/C:\(.*\),\(.*\)/..\/src\/genfunc.py:\1:\2/g"
./xaller.py -d -i ../test/$1
popd
