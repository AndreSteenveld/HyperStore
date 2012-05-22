/*
 *	Copyright (C) 2012 André jr Steenveld all rights reserved
 *	Licensed under the MIT public license for the full license see the LICENSE file
 *
 */
define( [ "dojo/_base/declare", "dojo/_base/Deferred", "./HyperObject", "./HyperResultSet" ], function( declare, Deferred, HyperObject, HyperResultSet ){

	var HyperStore = declare( [ ], {
		
		schema: null,
		
		constructor: function( _hyperStore_ ){
			
			if( "schemaUrl" in _hyperStore_ ){
				
			} else if( "schema" in _hyperStore_ ){
				
				
			} else {
				
				console.warn( "No schema or schema url was provided, store is not usable" );
				
			}
			
		},
		
		isHyperObject: function( object ){
			
			return object 
				&& typeof object.isInstanceOf === "function"
				&& object.isInstanceOf( HyperObject );
			
		}
		
		get: function( identifier ){ },
		
		put: function( object, directives ){ },
		
		add: function( object, directives ){ },
		
		remove: function( object, directives ){ },
		
		query: function( query, directives ){ },
		
		getIdentity: function( object ){
			
			if( this.isHyperObject( object ) ){
				
				// It appears we got an HyperObject so we are going to get the meta data which will contain
				// information about the values in the object. We will look for the items which have a "identifier"
				// relation. There can be more then one like in a database. These will be aggregated in to an hash
				// and that will be returned as the identifier.
				//
				// TODO: Potentional problem, what if the identifiers are compared using === or ==?
				var identifier            = { },
					identifierComponentns = this.getMetaData( ).getData( )
						.filter( function( item ){ return item.relation === "identifier"; } );
				
				if( identifierComponents.length ){
					
					identifierComponentns.forEach( function( component ){
						
						identifier[ component.name ] = component.value;
						
					});
					
					return identifier;
					
				} else {
				
					// We got no identifier components so we will return an intentional "nothing"	
					return null;
					
				}				
			} else {
				
				console.warn( "Supplied object was not a HyperObject" );
				return;
				
			}
			
		},
		
		getChildren: function( parent, directives ){ 
			
			// The directives will tell us which relation we are going to get.
			
			
		},
		
		getMetaData: function( object ){
			
			if( this.isHyperObject( object ) ){
			
				return object.meta;
				
			} else {
			
				console.warn( "An invalid object was passed to HyperStore#getMetaData." );
				return null;
				
			}
			
		}
		
		//
		// We are going to skip transaction because we are building a Collection+JSON store which is meant to be stateless.
		//
	});
	
	return HyperStore;

});