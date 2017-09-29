pkill -f test
rm -rf ../db
mkdir ../db
testrpc --secure -m "sample" --unlock "0x3754c2502102ee53d62f0395134ef22b95d6128f" --unlock "0x3c2b7046705d0762808bdd2e2274050cc3712bed" --db "/home/dtrenin/job/eth/db"
