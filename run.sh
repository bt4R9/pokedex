function runInNewTab {
if [ $TERM_PROGRAM == "iTerm.app" ]
then
osascript &>/dev/null \
<<EOF
        tell application "iTerm"
            activate
            tell current window to set tb to create tab with default profile
            tell current session of current window to write text "cd $PWD"
            tell current session of current window to write text "$1"
        end tell
EOF
else
osascript -e "tell application \"Terminal\" to activate"
osascript -e "tell application \"System Events\" to tell process \"Terminal\" to keystroke \"t\" using command down"
osascript -e "tell application \"Terminal\" to do script \"$1\" in selected tab of the front window"
fi
}

PWD=$(pwd)
NODE_BIN=/usr/local/bin/node
NPM_BIN=/usr/local/bin/npm
MONGO_BIN=/usr/local/bin/mongod
WEBPACK_BIN=./node_modules/.bin/webpack
NODEMON_BIN=./node_modules/.bin/nodemon

COLOR_GREEN='\033[0;32m'
COLOR_NO='\033[m'

NODE_VERSION=$($NODE_BIN -v | sed 's/[^0-9\.]*//g')
NPM_VERSION=$($NPM_BIN -v)
MONGO_VERSION=$($MONGO_BIN -version | grep 'db version' | sed 's/[^0-9\.]*//g')

echo "${COLOR_GREEN}node  $NODE_VERSION${COLOR_NO}"
echo "${COLOR_GREEN}npm   $NPM_VERSION${COLOR_NO}"
echo "${COLOR_GREEN}mongo $MONGO_VERSION${COLOR_NO}"

npm i
rm -rf ./build
npm run mongo:stop

runInNewTab "npm run webserver:start"
runInNewTab "npm run webpack:start"