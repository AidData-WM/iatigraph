var site = {

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
  routes: {
    '': 'search',
    'graph/:activity_id': 'graph',
  },

  initialize: function() {
    site.components = {
      map: $('.map'),
      info: $('.info'),
    };
    site.info_view = new site.InfoView();
    site.components.info.html(site.info_view.render().el);
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
    site.components.map.html(site.graph_view.render().el);
  },
});

site.SearchView = Backbone.View.extend({
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
    this.el = $(this.template({project: {}}));
    return this;
  },
});

$(document).on('ready', function() {
  site.load_templates(['SearchView', 'GraphView', 'InfoView'], function() {
    site.router = new site.Router();
    Backbone.history.start();
  });
});
