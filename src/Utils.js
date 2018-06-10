import Axios from 'axios';
import Path from 'path';
import StringHelper from './components/lib/StringHelper';
import ObjectHelper from './components/lib/ObjectHelper';

class Utils {
	static async _evaluateRequest( Response, ResponseError, Hook ) {
		if ( 'object' !== typeof ResponseError ) {
			while ( true === Utils.isEmpty( Response ) ) {
				await Utils.sleep( 10 );
			}
		}

		Hook( Response, ResponseError );
	}

	static async _getExtern( File, Hook ) {
		let ResponseError = '';
		let Response = '';
		Axios.get( File )
			.then( response => ( Response = response ) )
			.catch( error => ( ResponseError = error ) );
		Utils._evaluateRequest( Response, ResponseError, Hook );
	}

	static async _getIntern( File, Hook ) {
		let ResponseError;
		File = `.${ Path.resolve( File )}`;
		const Response = await import( `${ File }` ).catch( error => ( ResponseError = error ) );
		Utils._evaluateRequest( Response, ResponseError, Hook );
	}

	static get( File, Hook ) {
		if ( true === File.startsWith( 'http://' ) ) {
			Utils._getExtern( File, Hook );
		} else {
			Utils._getIntern( File, Hook );
		}
	}

	static isEmpty( Anything ) {
		if ( 'undefined' === typeof Anything || null === Anything ) {
			return true;
		} else {
			if ( 'string' === typeof Anything ) {
				return 0 === Anything.length;
			} else if ( true === Array.isArray( Anything ) ) {
				return 0 === Anything.length;
			} else if ( 'object' === typeof Anything ) {
				return ObjectHelper.isEmpty( Anything );
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
