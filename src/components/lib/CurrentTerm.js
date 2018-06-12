import { RuntimeErrorException } from './BaseExceptions.js';
import Utils from '../../Utils';

export default class CurrentTerm {
	static Term = '';
	static Wrapper;

	static loadTerm( Term ) {
		CurrentTerm.Term = '';
		Utils.get( Term, CurrentTerm.onLoadTerm, true );
		Utils.waitUntil( CurrentTerm.termIsLoaded );
	}

	static onLoadTerm( Response, ResponseError ) {
		if ( 'object' === typeof ResponseError ) {
			throw new RuntimeErrorException( ResponseError );
		}

		// If this was a web request the response objects data is in the data property
		if ( Response.hasOwnProperty( 'data' ) ) {
			Response = Response.data;
		}

		if ( 'function' !== typeof CurrentTerm.Wrapper ) {
			CurrentTerm.Term = Response;
		} else {
			CurrentTerm.Term = CurrentTerm.Wrapper( Response );
		}
	}

	static termIsLoaded() {
		return Utils.isEmpty( CurrentTerm.Term );
	}
}
