#!/usr/bin/env bash
MYDIR=`pwd`
echo "$MYDIR"
rm -r CHANGELOG.md
cmd='conventional-changelog --commit-path='$MYDIR' -p angular -i CHANGELOG.md -s 1'
eval "${cmd}" &>/dev/null