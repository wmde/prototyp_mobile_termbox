export default class SharedStoreStatic {
		static __Storage = {}
		static __LastKey = ''

		static initStorage( Key ) {
			SharedStoreStatic.__Storage[ Key ] = {};
			SharedStoreStatic.__LastKey = Key;
		}

		static switchToKey( Key ) {
			if ( Key in SharedStoreStatic.__Storage ) {
				SharedStoreStatic.__LastKey = Key;
				return true;
			} else {
				return false;
			}
		}

		static hasKey( Key ) {
			return Key in SharedStoreStatic.__Storage;
		}

		static set( Value ) {
			if ( SharedStoreStatic.__LastKey in SharedStoreStatic.__Storage ) {
				SharedStoreStatic.__Storage[ SharedStoreStatic.__LastKey ] = Value;
				return true;
			} else {
				return false;
			}
		}

		static get() {
			if ( SharedStoreStatic.__LastKey in SharedStoreStatic.__Storage ) {
				return SharedStoreStatic.__Storage[ SharedStoreStatic.__LastKey ];
			} else {
				return;
			}
		}
}
