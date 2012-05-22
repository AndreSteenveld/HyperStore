/*
 *	Copyright (C) 2012 André jr Steenveld all rights reserved
 *	Licensed under the MIT public license for the full license see the LICENSE file
 *
 */
define( [ "dojo/_base/declare", "dojo/_base/Deferred", "./HyperObject" ], function( declare, Deferred, HyperObject ){

	var HyperResultSet = declare( [ Deferred ], {
	
		total: null,		
		data: null,
	
		
	
		constructor: function( data ){
			
			this.total = new Deferred( );
			
			data.then(
				( function( data ){ this.data = data; this.total.resolve( this.data.collection.items.length ); } ).bind( this ),
				( function( data ){ this.data = data; this.total.reject( -1 ); } ).bind( this )
			);
		},
	
		_forEach: function( data ){ },
	
		forEach: function( callback, scope ){ 
		
			total.then( this._forEach.bind( this ) ); 
		
		},
		
		
		filter: function( callback, scope ){ 
			
			total.then
			
		},
		
		
		map: function( callback, scope ){ },
		
		observe: function( listener, incluseAllUpdates ){ }
	
	});
	
	return HyperResultSet;
	
});