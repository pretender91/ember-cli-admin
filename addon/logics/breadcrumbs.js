// Generated by CoffeeScript 1.8.0
import Ember from 'ember';
import LetterCaselogic from '../logics/letter-case';
var breadcrumbs;

breadcrumbs = Ember.Object.extend();

breadcrumbs.reopenClass({
  setup: function(action, controller, model, breadcrumbsController, options) {
    var content, name, obj, controllerName;
    content = [];
    content.pushObject(this._dashboard(options));
    if (options.uppercased && !Ember.isEmpty(controller.get('_name'))) {
      controllerName = LetterCaselogic.titlize(controller.get('_name'));
    }
    else {
      controllerName = controller.get('_name');
    }
    obj = this._controllerLink(controllerName);
    content.pushObject(obj);
    if (action && model) {
      obj.set('class', "");
      obj.set('active', false);
      name = model.get('id') || action;
      content.pushObject(this._controllerActionLink(name));
    }
    breadcrumbsController.set('content', content);
    return this._actions(action, controller);
  },
  _url: function(url) {
    return url;
  },
  _actions: function(action, controller) {
    if(!controller.get('itemActions')){
      return;
    }

    var actions;
    actions = [];
    switch (action) {
      case "edit":
        actions.push(this._createAction());
        actions.push(this._showAction());
        actions.push(this._destroyAction());
        break;
      case "show":
        actions.push(this._createAction());
        actions.push(this._editAction());
        actions.push(this._destroyAction());
        break;
      default:
        actions.push(this._createAction());
    }
    var controllerItemActions = controller.get('itemActions').map(function(item){return item.title;});
    actions.concat(actions.filter(function(action){
      return controllerItemActions.indexOf(action) >= 0;
    }));
    return controller.set("__breadcrumbsActionsArray", actions);
  },
  _createAction: function() {
    return "New";
  },
  _editAction: function() {
    return "Edit";
  },
  _destroyAction: function() {
    return "Destroy";
  },
  _showAction: function() {
    return "Show";
  },

  _dashboard: function(options){
    var name = options.uppercased ? "Dashboard" : "dashboard";
    return Ember.Object.create({
      name: name,
      url: this._url("dashboard"),
      "class": "first",
      active: false
    });
  },

  _controllerLink: function(name){
    return Ember.Object.create({
      name: name,
      url: name,
      "class": "active",
      active: true
    });
  },

  _controllerActionLink: function(name){
    return  Ember.Object.create({
      name: name,
      "class": "active",
      active: true
    });
  }

});

export default breadcrumbs;
