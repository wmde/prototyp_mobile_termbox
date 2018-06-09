import { RuntimeErrorException } from './BaseExceptions.js';
import Utils from './Utils';

export default class CurrentTerm {
    static Term = '';
    static Wrapper;

    static loadTerm( Term ) {
    	CurrentTerm.Term = '';
    	Utils.get( Term, CurrentTerm.onLoadTerm );
    	Utils.waitUntil( CurrentTerm.termIsLoaded );
    }

    static onLoadTerm( Response, Error ) {
    	if ( false === Utils.isEmpty( Error ) ) {
    		throw new RuntimeErrorException( Error );
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
