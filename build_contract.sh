cd contracts
rm -rf build
solc -o build --bin --overwrite --optimize --abi Order.sol

cd build
cat Platform.abi | base64 --wrap=0 > Platform.abi.b64
cat CargoCoin.abi | base64 --wrap=0 > CargoCoin.abi.b64
cat Order.abi | base64 --wrap=0 > Order.abi.b64
