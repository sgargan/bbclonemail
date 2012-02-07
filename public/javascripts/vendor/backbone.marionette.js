// Backbone.Marionette v0.4.2
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.marionette
Backbone.Marionette=function(e,d,f){var b={version:"0.4.2",RegionManager:function(a){this.options=a||{};if(!this.el)throw a=Error("An 'el' must be specified"),a.name="NoElError",a;this.$el=f(this.el)}};d.extend(b.RegionManager.prototype,e.Events,{show:function(a){this.close();this.open(a);this.currentView=a},open:function(a){var c=this;f.when(a.render()).then(function(){c.$el.html(a.el);a.onShow&&a.onShow();c.trigger("view:show",a)})},close:function(){var a=this.currentView;a&&(a.close&&a.close(),
this.trigger("view:closed",a),delete this.currentView)}});b.ItemView=e.View.extend({constructor:function(){var a=j.call(arguments);e.View.prototype.constructor.apply(this,a);d.bindAll(this,"render")},serializeData:function(){var a;this.collection&&(a={},a.items=this.collection.toJSON());this.model&&(a=this.model.toJSON());return a},template:function(){return f(this.options.template)},render:function(){var a=this,c=this.serializeData();this.getTemplate(function(b){b=a.renderTemplate(b,c);a.$el.html(b);
if(a.onRender)a.onRender()});return this},renderTemplate:function(a,c){if(!a||0===a.length){var b=Error("A template must be specified");b.name="NoTemplateError";throw b;}return d.template(a.html(),c)},getTemplate:function(a){var c=this.template;d.isFunction(c)?(c=c.call(this),a.call(this,c)):b.TemplateManager.get(c,a)},close:function(){this.unbindAll();this.unbind();this.remove();if(this.onClose)this.onClose()}});b.CollectionView=e.View.extend({modelView:b.ItemView,constructor:function(){e.View.prototype.constructor.apply(this,
arguments);d.bindAll(this,"addChildView","render");this.bindTo(this.collection,"add",this.addChildView,this);this.bindTo(this.collection,"remove",this.removeChildView,this)},render:function(){this.renderModel();this.collection.each(this.addChildView);if(this.onRender)this.onRender();return this},renderModel:function(){if(this.model){var a=new this.modelView({model:this.model,template:this.template});a.render();this.$el.append(a.el)}},addChildView:function(a){this.appendHtml(this.$el,this.renderItem(a))},
removeChildView:function(a){var c=this.children[a.cid];c&&(c.close(),delete this.children[a.cid])},appendHtml:function(a,c){a.append(c)},renderItem:function(a){if(!this.itemView)throw a=Error("An `itemView` must be specified"),a.name="NoItemViewError",a;a=new this.itemView({model:a});a.render();this.storeChild(a);return a.el},storeChild:function(a){this.children||(this.children={});this.children[a.model.cid]=a},close:function(){this.unbind();this.unbindAll();this.remove();this.children&&d.each(this.children,
function(a){a.close()});if(this.onClose)this.onClose()}});b.BindTo={bindTo:function(a,c,b,d){d=d||this;a.on(c,b,d);this.bindings||(this.bindings=[]);this.bindings.push({obj:a,eventName:c,callback:b,context:d})},unbindAll:function(){d.each(this.bindings,function(a){a.obj.off(a.eventName,a.callback)});this.bindings=[]}};b.AppRouter=e.Router.extend({constructor:function(a){e.Router.prototype.constructor.call(this,a);this.appRoutes&&this.processAppRoutes(a.controller,this.appRoutes)},processAppRoutes:function(a,
c){var b,d,e,f,g=[];for(e in c)g.unshift([e,c[e]]);f=g.length;for(var h=0;h<f;h++)e=g[h][0],d=g[h][1],b=a[d],this.route(e,d,b)}});b.Callbacks=function(){this.deferred=f.Deferred();this.promise=this.deferred.promise();this.callbacks=[];this.callbackOptions={}};d.extend(b.Callbacks.prototype,{add:function(a){this.promise.done(function(c,b){a.call(c,b)})},run:function(a,c){this.deferred.resolve(a,c)}});b.Application=function(a){this.initCallbacks=new b.Callbacks;this.vent=d.extend({},e.Events,b.BindTo);
d.extend(this,a)};d.extend(b.Application.prototype,e.Events,{addInitializer:function(a){this.initCallbacks.add(a)},start:function(a){this.trigger("initialize:before",a);this.initCallbacks.run(this,a);this.trigger("initialize:after",a);this.trigger("start",a)},addRegions:function(a){var c,d;for(d in a)a.hasOwnProperty(d)&&(c=a[d],c="string"===typeof c?b.RegionManager.extend({el:c}):c,this[d]=new c)}});b.TemplateManager={templates:{},get:function(a,c){var b=this.templates[a];if(b)c&&c.call(this,b);
else{var d=this;this.loadTemplate(a,function(b){d.templates[a]=b;c&&c.call(d,b)})}},loadTemplate:function(a,b){b.call(this,f(a))},clear:function(){var a=arguments.length;if(0<a)for(var b=0;b<a;b++)delete this.templates[arguments[b]];else this.templates={}}};var j=Array.prototype.slice,i=e.View.extend;b.RegionManager.extend=i;b.Application.extend=i;d.extend(b.ItemView.prototype,b.BindTo);d.extend(b.CollectionView.prototype,b.BindTo);d.extend(b.Application.prototype,b.BindTo);d.extend(b.RegionManager.prototype,
b.BindTo);return b}(Backbone,_,window.jQuery||window.Zepto||window.ender);
