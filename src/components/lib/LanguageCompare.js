export default class LanguageCompare {
	__Languages;

	constructor( Languages ) {
		this.setLanguages( Languages );
	}

	setLanguages( Languages ) {
		if ( false === Array.isArray( Languages ) ) {
			Languages = [ Languages ];
		}

		this.__Languages = Languages;
	}

	compare( Language ) {
		return -1 < this.__Languages.indexOf( Language );
	}
}
