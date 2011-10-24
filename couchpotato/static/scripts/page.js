var PageBase = new Class({

	Implements: [Options, Events],

	options: {

	},

	has_tab: true,
	name: '',

	initialize: function(options) {
		var self = this;

		self.setOptions(options)

		// Create main page container
		self.el = new Element('div.page.'+self.name);

		// Create tab for page
		if(self.has_tab){
			var nav = App.getBlock('navigation');
			self.tab = nav.addTab({
				'href': '/'+self.name,
				'title': self.title,
				'text': self.name.capitalize()
			});
		}
	},

	open: function(action, params){
		var self = this;
		//p('Opening: ' +self.getName() + ', ' + action + ', ' + Object.toQueryString(params));

		try {
			self.el.empty();
			var elements = self[action+'Action'](params);
			self.el.adopt(elements);

			self.fireEvent('opened');
		}
		catch (e){
			self.errorAction(e);
			self.fireEvent('error');
		}
	},
	
	openUrl: function(url){
		if(History.getPath() != url)
			History.push(url);
	},

	errorAction: function(e){
		p('Error, action not found', e);
	},

	getName: function(){
		return this.name
	},
	
	show: function(){
		this.el.addClass('active');
	},
	
	hide: function(){
		this.el.removeClass('active');
	},
	
	toElement: function(){
		return this.el
	}
});

var Page = {}
