// Generated by CoffeeScript 1.8.0
var ClientSearchView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ClientSearchView = (function(_super) {
  __extends(ClientSearchView, _super);

  function ClientSearchView() {
    this.render = __bind(this.render, this);
    return ClientSearchView.__super__.constructor.apply(this, arguments);
  }

  ClientSearchView.prototype.el = '#content';

  ClientSearchView.prototype.events = {
    "keyup .client": "onChange",
    "click #addClient": "addClient"
  };

  ClientSearchView.prototype.render = function() {
    this.$el.html("<div class='aa-header' data-role='header'> <h1>Find/Create Client</h1> </div> <span id='feedback'></span> <br> <div> <label for='client_1'>Client Last Name</label> <input class='client' id='client_1' type='text' name='clientlastname'> </div> <div id='results'></div>");
    return $("head title").html("Coconut Find/Create Client");
  };

  ClientSearchView.prototype.onChange = function() {
    var burgerbutton, client1, menu;
    menu = $('.main-nav');
    burgerbutton = $('.menuburger');
    menu.removeClass("open");
    menu.css('display', 'none');
    burgerbutton.removeClass("menuisopen", "slow");
    client1 = ($("#client_1").val() || '').toUpperCase();
    console.log(client1);
    if (client1.length === 0) {
      return $("#results").html("");
    } else {
      $("#client_1").val(client1);
      return $.couch.db(Coconut.config.database_name()).view("" + (Coconut.config.design_doc_name()) + "/clientsByLastName", {
        startkey: client1,
        endkey: client1 + "z",
        include_docs: false,
        error: function(error) {
          return console.error("Error finding clients: " + JSON.stringify(error));
        },
        success: function(result) {
          var results;
          results = _(result.rows).map(function(row) {
            return row.value;
          });
          return $("#results").html("<h1>RESULTS</h1> <a href='" + (typeof sortbythis !== "undefined" && sortbythis !== null) + "' class='clientresult' > <div class='resultblocks title'> <p class='resulttext'> Last name </p> </div> <div class='resultblocks title'> <p class='resulttext'> First name </p> </div> <div class='resultblocks title'> <p class='resulttext'> Other names </p> </div> <div class='resultblocks title'> <p class='resulttext'> Phone number </p> </div> </a> " + (_(results).map(function(result) {
            return "<a href='#summary/" + result.id + "' class='clientresult' > <div class='resultblocks'> <p class='resulttext'> " + result.last_name + " </p> </div> <div class='resultblocks'> <p class='resulttext'> " + result.first_name + " </p> </div> <div class='resultblocks'> <p class='resulttext'> " + result.other_names + " </p> </div> <div class='resultblocks'> <p class='resulttext'> " + result.phone + " </p> </div> </a>";
          }).join("")) + " <h3>don't see your client?</h3> <button id='addClient' type='button'>add new client</button>");
        }
      });
    }
  };

  ClientSearchView.prototype.addClient = function() {
    var lastName;
    lastName = ($("#client_1").val() || '').toUpperCase();
    return Coconut.router.navigate("/new/result/Client Registration/" + lastName, true);
  };

  return ClientSearchView;

})(Backbone.View);

//# sourceMappingURL=ClientSearchView.js.map