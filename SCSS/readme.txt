
*******************************************************************
** Setting up Grunt/Sass in a WordPress Project **
*******************************************************************
1. Drag the gruntfile.js & package.json into your wp-config folder.
2. Drag the /css & /scss folder to your theme folder
3. Add this snippet to the TOP of your child theme's style.css file:
	/*Import Sass compile*/
	@import url("css/main.min.css");

	NOTE: If you have a lot of styles already in your child theme's style.css file, it may be wise to copy them into their own partials file to keep the project clean.
		Create file: /scss/partials/_theme.scss     
		ADD @import "partials/theme"; to /scss/main.scss

4. Open terminal to your wp-content folder.
5. Run: sudo npm install (this adds a node_moduels folder. Already Excluded from the repo by the .gitignore file)

Gotchas: If you get a libsass error when trying to run sudo npm install, run sudo npm install grunt-sass. THis manually installs grunt-sass/libsass compiler


*******************************************************************
** Configuring and running the Grunt sass compiler w/ LiveReload **
*******************************************************************
1. Open the /wp-content/Gruntfile.js file.
2. Edit line 21 to reflect your child theme's path.
3. Save the Gruntfile
4. From terminal, at /wp-content RUN: grunt watchyoursass
	NOTE: This starts the node server, watches all your scss files, and live reloads your browser when the main.min.css files changes.
		To use LiveReload, you must install the Chrome Extension "LiveReload". When the extension has been added to your browser toolbar, click it to run it for the webpage you want to LiveReload.


