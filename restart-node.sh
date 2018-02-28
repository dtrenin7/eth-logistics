pkill -f test
rm -rf ../db
mkdir ../db
# -debug --account="0xb7aac0fb0dc446ba46a57d52eb802485313e5aa987ee49741cd0c4e8d9a0cc19,100000000000000000000" --account="0x312450181c5e5c5d3d5ef5d970616af367a647bfd842d7f053db32cdc5c0c50b,100000000000000000000" -u 0
# --secure -m "anchor net slide thumb bleak mule feel demand note brush uphold hip" -u 0 -u 1 -u 2 -u 3 -u 4 -u 5 -u 6 -u 7 -u 8 -u 9
testrpc  --secure --secure -m "anchor net slide thumb bleak mule feel demand note brush uphold hip" -u 0 -u 1 -u 2 -u 3 -u 4 -u 5 -u 6 -u 7 -u 8 -u 9 --db "/home/dtrenin/job/eth/db"
