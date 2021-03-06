Boilerplates for: 
    Angular Projects
    Laravel Projects
    Node prjects
    Grunt Sass Projects
    Simple HTML Projects




//===================================================//
// Git tips
//===================================================//
//Remove large files from commits
git filter-branch --tree-filter 'rm Cross.mov' HEAD
git push origin master --force

git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch sites.zip" -- --all

//Remove staged commits
git stash save --keep-index

//Drop staged stash
git stash drop 

//DELETE WORKING DIRECTORY CHANGES!!!!
git reset --hard HEAD~1

//view commit log
git log

//DELETE HEAD TO COMMIT
git reset --hard <sha1-commit-id>


//Force push to get rid of already pushed HEAD
git push origin HEAD --force

//Increase git http file size limit to prevent signal 13 error
git config http.postBuffer 52428800


//Ignore large files with terminal
find . -size +1G | cat >> .gitignore

//Remove all traces of file from repo
git filter-branch --index-filter 'git rm --cached --ignore-unmatch filename' HEAD

//Remove all traces of folder form repo
git filter-branch --tree-filter 'rm -rf foldername' HEAD

git push origin master --force

//Edit the last commit message
git commit --amend -m "New commit message"



//===================================================//
// Bash Tips
//===================================================//
//Transfer files from loacl machine to server SSH
scp PATHNAME_OVER_HERE target-host:/PATHNAME_OVER_THERE

//Lowercase all files in this directory and subDs
for i in $(find ./ -name '*.jpg'); do mv "$i" "$(echo $i|tr A-Z a-z)"; done




//===================================================//
// Build Node/Express Server on fresh Ubuntu server
//===================================================//

Ubuntu stable: 12.04 x64

login: ssh root@<ip address>
Make user: sudo adduser <username>
Make user sudo/admin: sudo adduser <username> sudo
Reboot: sudo reboot

-Login as new user after reboot-

Install NVM: curl https://raw.githubusercontent.com/creationix/nvm/v0.11.1/install.sh | bash

-Close and reopen terminal-
or…   force changes: source ~/.profile

Install git: sudo apt-get install git
Add SSH Public Key to Github:
	1. ssh-keygen -t rsa -C adam.gedney@gmail.com
	2. eval "$(ssh-agent -s)"
	3. ssh-add ~/.ssh/id_rsa
	4. cat ~/.ssh/id_rsa.pub
	5. Paste above key to github acct

Fetch Node versions: nvm ls-remote

Install Node: nvm install 0.11.14

Allow all users to use global node version: n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local

----Node is now installed and ready for production----

[install express (if needed)]
Install express globally: sudo npm install -g express-generator
Create www folder: mkdir www
Initiate new Express project in www: express
Get dependencies: npm install


[clone git repo into server (if it contains express project)]


Clone git repo onto server into www folder: git clone git@github.com:<repo path> www
Update dependencies in www: npm update


Install build essential to update bson: sudo apt-get install gcc make build-essential
Update dependencies: 1. rm -rf node_modules
		     2. npm cache clean
		     3. npm install


-Install forever and node-dev-
Install node-dev: npm install -g node-dev
Install forever: npm install forever -g



//=====================//
TIPS:
//=====================//
remove RSA Host entries (if server changes): ssh-keygen -R <hostname or ip>

check node version: node -v

change node version: nvm use 0.11.13

Start node-dev: node-dev app.js
Start forever: forever start app.js
Stop forever: forever stopall
Shutdown server: sudo poweroff
Reboot server: sudo reboot


FWD port 80 to 3000:
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000



    //Remove large files from commit cache
    git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch sites.zip" -- --all


    //Calculate slider percentage (Backward from 100)
    aps.percentage = Math.floor(((range.trRight - range.trLeft) - (range.thX - range.trLeft)) / (range.trRight - range.trLeft) * 100);


Check running node processes & kill process:
lsof -Pi | grep LISTEN

kill -9 3000
