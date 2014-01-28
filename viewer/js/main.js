var site = {
  // don't worry about this object setup, it's just magic
  load_templates: function(views, callback) {
    var deferreds = [];

    $.each(views, function(index, view) {
      if (site[view]) {
        deferreds.push(
          $.get('templates/' + view + '.html', function(data) {
            site[view].prototype.template = _.template(data);
          }, 'html')
        );
      } else {
        console.error(view + ' not found');
      }
    });

    $.when.apply(null, deferreds).done(callback);
  },
};


site.Router = Backbone.Router.extend({
  // map #hash/urls to view functions
  // functions on this object will be called by the name they are mapped to
  routes: {
    '': 'search',
    'graph/:activity_id': 'graph',
  },

  initialize: function() {
    site.container = $('body')
    site.components = {
      map: $('.map'),
      info: $('.info'),
    };
    site.welcome_view = new site.WelcomeView();
    site.components.info.html(site.welcome_view.render().el);
  },

  search: function() {
    if (!site.search_view) {
      site.search_view = new site.SearchView();
      site.search_view.render();
    }
    site.components.map.html(site.search_view.el);
  },

  graph: function(activity_id) {
    if (!site.graph_view) {
      site.graph_view = new site.GraphView();
    }
    if (!site.info_view) {
      site.info_view = new site.InfoView();
    }
    site.components.map.html(site.graph_view.render().el);
    site.components.info.html(site.info_view.render().el);
    go_nodes();
  },
});


//////////// View objects: handle the details of managing a view.
/// entry points are generally either via the Router object,
/// or events in the view while it is showing

site.SearchView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template());
    return this;
  },
});

site.WelcomeView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template());
    return this;
  },
});

site.GraphView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template());
    return this;
  },
});

site.InfoView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template({project: {name: 'Some great project'}}));
    return this;
  },
});



// boring init stuff

$(document).on('ready', function() {
  site.load_templates(['SearchView', 'WelcomeView', 'GraphView', 'InfoView'], function() {
    site.router = new site.Router();
    Backbone.history.start();
  });
});
