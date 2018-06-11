import { RuntimeErrorException } from './BaseExceptions.js';
import Utils from '../../Utils';

export default class CurrentLanguageNames {
	static LanguageNames = '';
	static Wrapper;

	static loadLanguageNames( LanguageNames ) {
		CurrentLanguageNames.LanguageNames = '';
		Utils.get( LanguageNames, CurrentLanguageNames.onLoadLanguageNames, true );
		Utils.waitUntil( CurrentLanguageNames.languageNamesAreLoaded );
	}

	static onLoadLanguageNames( Response, ResponseError ) {

		if ( 'object' === typeof ResponseError ) {
			throw new RuntimeErrorException( ResponseError );
		}

		if ( 'function' !== typeof CurrentLanguageNames.Wrapper ) {
			CurrentLanguageNames.LanguageNames = Response;
		} else {
			CurrentLanguageNames.LanguageNames = CurrentLanguageNames.Wrapper( Response );
		}
	}

	static languageNamesAreLoaded() {
		return Utils.isEmpty( CurrentLanguageNames.LanguageNames );
	}
}
