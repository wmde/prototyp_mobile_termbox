import Axios from 'axios';
import StringHelper from './StringHelper';
import ObjectHelper from './ObjectHelper';

class Utils {
	static async _evaluateRequest( Response, Error, Hook ) {
		while ( true === Utils.isEmpty( Response ) ) {
			await Utils.sleep( 10 );
		}

		Hook( Response, Error );
	}

	static async _getExtern( File, Hook ) {
		let Error = '';
		let Response = '';
		Axios.get( File )
			.then( response => ( Response = response ) )
			.catch( error => ( Error = error ) );
		Utils._evaluateRequest( Response, Error, Hook );
	}

	static async _getIntern( File, Hook ) {
		let Error;
		const Response = await import( `${ File }` ).catch( error => ( Error = error ) );
		Utils._evaluateRequest( Response, Error, Hook );
	}

	static get( File, Hook ) {
		if ( true === File.startsWith( 'http://' ) ) {
			Utils._getExtern( File, Hook );
		} else {
			Utils._getIntern( File, Hook );
		}
	}

	static isEmpty( Str ) {
		if ( 'undefined' === typeof Str || null === Str ) {
			return true;
		} else {
			if ( 'string' === typeof Str ) {
				return StringHelper.isEmpty( Str );
			} else if ( true === Array.isArray( Str ) ) {
				return Array.isEmpty( Str );
			} else if ( 'object' === typeof Str ) {
				return ObjectHelper.isEmpty( Str );
			} else {
				return false;
			}
		}
	}

	static sleep( Milliseconds ) {
		return new Promise( Resolve => setTimeout( Resolve, Milliseconds ) );
	}

	static async waitUntil( Callback ) {

		while ( Callback() ) {
			await Utils.sleep( 10 );
		}
	}

	static debugObjectPrint( Object ) {
		const Body = document.getElementsByTagName( 'body' )[ 0 ];
		const Element = document.createElement( 'div' );
		Element.innerHTML = `<pre>${ JSON.stringify( Object, undefined, 4 ) }</pre>`;
		Body.appendChild( Element );
	}
}

export default Utils;
