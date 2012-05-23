/*
 *	Copyright (C) 2012 André jr Steenveld all rights reserved
 *	Licensed under the MIT public license for the full license see the LICENSE file
 *
 */
define( [ "dojo/_base/declare", "dojo/_base/Deferred", "./HyperObject" ], function( declare, Deferred, HyperObject ){

	var HyperResultSet = declare( [ Deferred ], {
	
		total: null,
		
		intializeSet: function( data ){
			
			// Do some pretty parsing magic here....
			
			
			this.total.resolve( /* some count */ );
			this.resolve( /* precessed data */ );
		},
		
		fatalDataError: function( data ){
			
			// We did get data but it is an error anyway
			console.error( "Fatal error intializing result set ::", data );
			this.reject( data );
						
		},
	
		constructor: function( rawData ){
			
			this.total = new Deferred( );
			
			try{
				rawData.then( 
					this.initalizeSet.bind( this ),
					this.fatalDataError.bind( this )
				);
			} catch( exception ){
				
				this.reject( exception );
				
			}
		},
		
		forEach: function( callback, scope ){ 
		
			this.then( function( data ){
				
				data.items.forEach( callback, scope );
				
			});
		
		},
		
		
		filter: function( callback, scope ){ 
			
			var deferred  = new Deferred( ),
				resultSet = new HyperResultSet( deferred );
				
			
			this.then( function( data ){
			
				var result   = { },
					filtered = data.items.filter( callback, scope );
			
				// We get the parsed data from ourselfs here, we are going to do
				// some magic to filter the data and then clone the items.
								
				deferred.resolve( /* magic goes in here */ );
				
			});
						
			return resultSet;
			
		},
		
		
		map: function( callback, scope ){ 
			
			var deferred  = new Deferred( ),
				resultSet = new HyperResultSet( deferred );
				
			this.then( function( data ){
				
				var result = { },
					mapped = data.items.map( callback, scope );
			
				deferred.resolve( /* magic goes in here */ );
				
			});
			
			
			return resultSet;	
			
		},
		
		observe: function( listener, incluseAllUpdates ){ 
				
			
			
		}
	
	});
	
	return HyperResultSet;
	
});