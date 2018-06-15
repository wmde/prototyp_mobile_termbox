import { RuntimeErrorException } from './BaseExceptions.js';
import Utils from '../../Utils';

export default class CurrentTerm {
	static Term = '';
	static Wrapper;
	static __Dept = 0;

	static loadTerm( Term ) {
		CurrentTerm.Term = '';
		Utils.get( Term, CurrentTerm.onLoadTerm, true );
		Utils.waitUntil( CurrentTerm.termIsLoaded );
	}

	static onLoadTerm( Response, ResponseError ) {
		console.log(Response)
		if ( 'object' === typeof ResponseError ) {
			if( 2 === CurrentTerm.__Dept) {
				throw new RuntimeErrorException(ResponseError);
			}
			CurrentTerm.__Dept++
			Utils.get( './components/data/Q1332193_data.json', CurrentTerm.onLoadTerm, true );
			Utils.waitUntil( CurrentTerm.termIsLoaded );
			return
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
