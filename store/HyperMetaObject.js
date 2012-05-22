/*
 *	Copyright (C) 2012 André jr Steenveld all rights reserved
 *	Licensed under the MIT public license for the full license see the LICENSE file
 *
 */
define( [ "dojo/_base/declare" ], function( declare ){

	var HyperMetaObject = declare( [ ], {
	
		data:   null,
		parent: null,
		dirty:  false,
	
		constructor: function( parent, data ){
			this.parent = parent;
			this.data = data;
		},
		
		getHref: function( ){ return this.data.collection.href || ""; },
		getData: function( ){ return this.data.collection.data || [ ]; },
		getLinks: function( ){ return this.data.collection.links || [ ]; }
	
	});
	
	return HyperMetaObject;

});