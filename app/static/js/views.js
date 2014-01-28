//////////// View objects: handle the details of managing a view.
/// entry points are generally either via the Router object,
/// or events in the view while it is showing

site.SearchView = Backbone.View.extend({

  render: function(results) {
    this.$el.html(this.template(results));
    return this;
  },

  events: {
    'click #search-button': 'search',
    'keypress #search-text': 'enter_on_submit',
  },

  search: function() {
    var term = $('#search-text').val();
    site.router.navigate('search/' + term, {trigger: true})
    return false;
  },

  enter_on_submit: function(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  },

});

site.WelcomeView = Backbone.View.extend({
  render: function() {
    this.setElement($('<div>').html(this.template()));
    return this;
  },
});

site.GraphView = Backbone.View.extend({
  render: function() {
    this.setElement($(this.template()));
    return this;
  },
});

site.InfoView = Backbone.View.extend({
  render: function(results) {
    this.setElement($('<div>').html(this.template(results)));
    return this;
  },
});
