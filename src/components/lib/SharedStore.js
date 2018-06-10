import Utils from '../../Utils';
import { TypeErrorException } from './BaseExceptions';

export default class SharedData {
    __Storage;

    constructor() {
    	this.__Storage = {};
    }

    __raiseExcepionOnNonKey( Key ) {
    	if ( true === Utils.isEmpty( Key ) ) {
    		throw new TypeErrorException( 'Expected non empty string as key.' );
    	}
    }

    set( Key, Value ) {

    	this.__raiseExcepionOnNonKey( Key );

    	if ( true === Utils.isEmpty( this.__Storage ) ) {
    		this.__Storage = {};
    	}

    	this.__Storage[ Key ] = Value;
    }

    multibleSets( Sets ) {
    	let Index;
    	if ( false === Array.isArray( Sets ) ) {
    		throw new TypeErrorException( `Expected array got ${typeof Sets}.` );
    	}

    	for ( Index in Sets ) {
    		this.set( Sets[ Index ][ 0 ], Sets[ Index ][ 1 ] );
    	}
    }

    get( Key ) {
    	this.__raiseExcepionOnNonKey( Key );
    	return this.__Storage[ Key ];
    }
}
