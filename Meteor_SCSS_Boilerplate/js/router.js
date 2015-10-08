Router.configure({
	layoutTemplate: 'main'
});

Router.route('/',{ template : 'task' });
Router.route('/register',{ template : 'register' });