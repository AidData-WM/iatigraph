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
    '(search/:term)': 'search',
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

  search: function(term) {
    site.search_view = new site.SearchView();
    if (!term) {
      site.components.map.html(site.search_view.render({status: 'success', activities: false}).el)
    } else {
      site.components.map.html(site.search_view.render({status:'loading'}).el);
      $.getJSON('/search/' + term).then(function(data) {
        site.components.map.html(site.search_view.render({status:'results', activities:data.results.activities}).el);
      });
    }
  },

  graph: function(activity_id) {
    site.graph_view = new site.GraphView();
    site.info_view = new site.InfoView();
    site.components.map.html(site.graph_view.render({status:'loading'}).el);
    site.components.info.html(site.info_view.render({status:'loading'}).el);
    $.getJSON('/activity/' + activity_id).then(function(data) {
      site.components.info.html(site.info_view.render({status:'success', project:data.results}).el);
    }, function(err) {
      site.components.info.html(site.info_view.render({status:'error', code:err.status}).el);
    });
    go_nodes();  // this make the (sketchy) d3 stuff go... should be backbonified
  },
});



// boring init stuff

$(document).on('ready', function() {
  site.load_templates(['SearchView', 'WelcomeView', 'GraphView', 'InfoView'], function() {
    site.router = new site.Router();
    Backbone.history.start();
  });
});
