/*
 *	Copyright (C) 2012 André jr Steenveld all rights reserved
 *	Licensed under the MIT public license for the full license see the LICENSE file
 *
 */
define( [ "dojo/_base/decalre", "dojo/_base/lang", "dojo/Stateful", "dojo/_base/Deferred", "./HyperResultSet" ], function( declare, lang, Stateful, Deferred, HyperResultSet ){

	var HyperObject = declare( [ Stateful ], {
	
		data: null,
		meta: null,
	
		constructor: function( data ){
			this.data = data;
			this.meta = new HyperMetaObject( this, data );
			
			this.watch( "*", (function( ){ this.meta.dirty = true; }).bind( this ) );
		},
		
		get: function( key ){ 
			
			var deferred = null,
				links    = this.meta.getLinks( ).filter( function( link ){ return  link.name === key; } );
				
			if( key in this && !this.hasOwnProperty( key ) && links.length === 0 ){
				
				// First check if this is a simple propertie, if so we will wrap it in a deferred and return it.
				
				deferred = new Deferred( );
				deferred.resolve( this[ key ] );
				return deferred;			
			
			} else if( !( key in this ) || this.hasOwnProperty( key ) && links.length === 1 ){
				
				// It is a link so we will get it and return a HyperResultset wrapped in a deferred.
				deferred = xhr.get({
					url: links[ 0 ].href,					
					aceppts: "applicateion/mx.Collection+JSON"					
				});
				
				deferred.then(
					// Success, build the result set here
					function( data ){ return HyperResultSet( data ); },
					
					// Failure, the server said blurp so we will have to create some error Resultset
					function( data ){ return HyperResultSet( data ); }
				);
				
				return deferred;
				
			} else if( links.length === 0 ){
				
				// We found nothing... so we will return a wrapped windbag.
				deferred = new Deferred( );
				deferred.reject( undefined );
				return deferred;
					
			} else {
				
				// We found duplicates =(
				throw "Multiple items with the same name were found [ " + key + " ]";
				
			}			
		},
		
		set: function( key, value ){ 
		
			// We are not going to check if we have any duplicates here.
			if( key in this && !this.hasOwnProperty( key ) ){
				
				this[ key ] = value;
				
			} else if( 
				   value !== null 
				&& typeof value !== "undefined" 
				&& typeof value.isInstanceOf === "function" 
				&& value.isInstanceOf( HyperResultSet ) 
			){
				
				// We just changed a whole lot of object what are we going to here?
				
				
			} else if( 
				   value !== null 
				&& typeof value !== "undefined" 
				&& typeof value.isInstanceOf === "function" 
				&& value.isInstanceOf( HyperObject ) 
			){
				
				// Although we changed just one object we will have to communicate this to the server?
				
			} else {
				
				// Ok I am confused, its not a property, not a relation or a relation set. So what is it?
				
			}
			
		},			
	
	});
	
	HyperObject.create = function( data ){
		var hObject    = new HyperObject( data ),
			values     = hObject.meta.getData( ),
			properties = { };
			
		values.forEach( function( value ){
			
			if( properties.hasOwnProperty( value.name ) ){
				
				throw "Duplicate value property [ " + value.name + " ]";
			
			} else {
				
				properties[ value.name ] = value.value;
					
			}
			
		});
		
		return lang.delegate( hObject, properties );
	};
	
	return HyperObject;

});