/* eslint-disable operator-linebreak */
import Utils from '../../Utils';
import { NotImplementedException, TypeErrorException, ValueErrorException } from './BaseExceptions';

class Compare {
	static compare() {}
}

class PatricaTrieNode {
	_Children;
	_IsEnding;
	__Value
	__Key;
	__Parent;
	_IsRoot;
	_MaxKeyLength;

	constructor( Key, Value, Parent ) {
		let IsRoot = false;

		if (
			'undefined' === typeof Key
		&&
			'undefined' === typeof Value
		&&
			'undefined' === typeof Parent
		) {
			IsRoot = true;
			this._MaxKeyLength = 0;
		}

		this._IsRoot = IsRoot;

		if ( false === IsRoot ) {
			if ( true === Utils.isEmpty( Parent ) || false === ( Parent instanceof PatricaTrieNode ) ) {
				throw new TypeErrorException( 'Expected a PatricaTrieNode as Parent.' );
			}

			this._IsEnding = true;
		} else {
			this._IsEnding = false;
		}

		this.__Parent = Parent;
		this._Children = [];
		this.__Key = Key;

		if ( false === IsRoot ) {
			this.__Value = Value;
			this._MaxKeyLength = Key.length;
		}
	}

	_getPrefix() {
		let Prefix;

		if ( false === this.__Parent._IsRoot ) {
			Prefix = this.__Parent.getKey();
		} else {
			Prefix = '';
		}

		return Prefix;
	}

	_setParent( Patrent ) {
		this.__Parent = Patrent;
	}

	isAEnd() {
		return this._IsEnding;
	}

	unsetEnd() {
		this._IsEnding = false;
	}

	hasChildren() {
		return 0 < this._Children.length;
	}

	setValue( Value ) {
		this.__Value = Value;
	}

	getValue() {
		return this.__Value;
	}

	_getValues( Return ) {
		let Child;

		if ( true === this._IsEnding ) {
			Return.push( this.__Value );
		}

		for ( Child in this._Children ) {
			this._Children[ Child ]._getValues( Return );
		}
	}

	_getValuesFilter( Return, Filter ) {
		let Child;

		if ( true === this._IsEnding ) {
			if ( true === Filter( this.__Value ) ) {
				Return.push( this.__Value );
			}
		}

		for ( Child in this._Children ) {
			this._Children[ Child ]._getValuesFilter( Return, Filter );
		}
	}

	getValues( Filter = undefined ) {
		const Output = [];

		if ( 'function' === typeof Filter ) {
			this._getValuesFilter( Output, Filter );
		} else {
			this._getValues( Output );
		}

		return Output;
	}

	_getKey() {
		return this.__Key;
	}

	getKey() {
		let Prefix;

		if ( false === this.__Parent._IsRoot ) {
			Prefix = this.__Parent.getKey();
		} else {
			Prefix = '';
		}

		return Prefix + this.__Key;
	}

	_getKeys( Key, Return ) {
		let Child;

		Key += this.__Key;

		if ( true === this._IsEnding ) {
			Return.push( Key );
		}

		for ( Child in this._Children ) {
			this._Children[ Child ]._getKeys( Key, Return );
		}
	}

	_getKeysFilter( Key, Return, Filter ) {
		let Child;

		Key += this.__Key;

		if ( true === this._IsEnding ) {
			if ( true === Filter( Key ) ) {
				Return.push( Key );
			}
		}

		for ( Child in this._Children ) {
			this._Children[ Child ]._getKeys( Key, Return );
		}
	}

	getKeys( Filter = undefined ) {
		let Prefix;

		if ( false === this.__Parent._IsRoot ) {
			Prefix = this.__Parent.getKey();
		} else {
			Prefix = '';
		}
		const Output = [];
		if ( 'function' === typeof Filter ) {
			this._getKeysFilter( Prefix, Output, Filter );
		} else {
			this._getKeys( Prefix, Output );
		}
		return Output;
	}

	getKeyAndValue() {
		let Key;
		const Return = {};

		if ( false === this.__Parent._IsRoot ) {
			Key = this.__Parent.getKey();
		} else {
			Key = '';
		}

		Key += this.__Key;

		Return[ Key ] = this.__Value;
		return Return;
	}

	_getKeysAndValues( Key, Return ) {
		let Index;
		Key += this.__Key;

		if ( true === this._IsEnding ) {
			Return[ Key ] = this.__Value;
		}

		for ( Index = 0; Index < this._Children.length; Index++ ) {
			this._Children[ Index ]._getKeysAndValues( Key, Return );
		}
	}

	_getKeysAndValuesFilter( Key, Return, Filter ) {
		let Index;
		Key += this.__Key;

		if ( true === this._IsEnding ) {
			if ( true === Filter( Key, this.__Value ) ) {
				Return[ Key ] = this.__Value;
			}
		}

		for ( Index = 0; Index < this._Children.length; Index++ ) {
			this._Children[ Index ]._getKeysAndValuesFilter( Key, Return, Filter );
		}
	}

	getKeysAndValues( Filter = undefined ) {
		let Key;
		const Return = {};

		if ( false === this.__Parent._IsRoot ) {
			Key = this.__Parent.getKey();
		} else {
			Key = '';
		}

		if ( 'function' === typeof Filter ) {
			this._getKeysAndValuesFilter( Key, Return, Filter );
		} else {
			this._getKeysAndValues( Key, Return );
		}

		return Return;
	}

	__findByKey( Key ) {
		let Start, End, Middle;

		Start = 0;
		End = this._Children.length - 1;

		if ( 0 === this._Children.length || this._Children[ 0 ]._getKey().charCodeAt( 0 ) > Key ) {
			return -1;
		}

		if ( this._Children[ End ]._getKey().charCodeAt( 0 ) < Key ) {
			return -1;
		}

		while ( Start <= End ) {
			Middle = ( ( Start + End ) >> 1 );

			if ( Key > this._Children[ Middle ]._getKey().charCodeAt( 0 ) ) {
				Start = Middle + 1;
			} else if ( Key < this._Children[ Middle ]._getKey().charCodeAt( 0 ) ) {
				End = Middle - 1;
			} else {
				return Middle;
			}
		}

		return -1;
	}

	findByKey( Key, Prefixed = false, Exact = false ) {
		let Index;
		let RootKeyLength;

		if ( 'string' !== typeof Key ) {
			return null;
		}

		if ( true === Prefixed ) {
			if ( false === this.__Parent._IsRoot ) {
				RootKeyLength = this.__Parent.getKey().length;
				Key = Key.substring( RootKeyLength );
			}
		}

		if ( 0 === Key.length ) {
			return null;
		}

		if ( true === this.__Key.startsWith( Key ) ) {
			if ( true === Exact && Key !== this.__Key ) {
				return null;
			} else {
				return this;
			}
		} else if ( Key.startsWith( this.__Key ) ) {
			Key = Key.substring( this.__Key.length );
			Index = this.__findByKey( Key.charCodeAt( 0 ) );

			if ( -1 !== Index ) {
				return this._Children[ Index ].findByKey( Key );
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	containsKey( Key, Prefixed = false, Exact = false ) {
		const Node = this.findByKey( Key, Prefixed, Exact );

		if ( null === Node ) {
			return false;
		} else {
			if ( true === Exact ) {
				return Node.isAEnd();
			} else {
				return true;
			}
		}
	}

	findByValue( Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		let Index, Found;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		if ( 'string' === typeof StartKey ) {
			Start = this.__findByKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__findByKey( EndKey.charCodeAt( 0 ) );
			NewEnd = EndKey.substring( 1 );
		}

		if ( -1 === Start && -1 === End ) {
			return null;
		}

		if ( Start > End ) {
			return null;
		}

		if ( true === this._IsEnding && false === Depth ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				return this;
			}
		}

		if ( 0 < NewStart.length ) {
			if ( Start === End ) {
				Found = this._Children[ Start ].findByValue( Comparer, Depth, NewStart, NewEnd );
			} else {
				Found = this._Children[ Start ].findByValue( Comparer, Depth, NewStart );
			}

			if ( null !== Found ) {
				return Found;
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			Found = this._Children[ Index ].findByValue( Comparer, Depth );
			if ( null !== Found ) {
				return Found;
			}
		}

		if ( 0 < NewEnd.length ) {
			Found = this._Children[ End ].findByValue( Comparer, Depth, undefined, NewEnd );

			if ( null !== Found ) {
				return Found;
			}
		}

		if ( true === this._IsEnding && true === Depth ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				return this;
			}
		}

		return null;
	}

	_findAllByValue( Return, Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		let Index;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'string' === typeof StartKey ) {
			Start = this.__findByKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__findByKey( EndKey.charCodeAt( 0 ) );
			NewEnd = EndKey.substring( 1 );
		}

		if ( -1 === Start && -1 === End ) {
			return;
		}

		if ( Start > End ) {
			return;
		}

		if ( true === this._IsEnding && false === Depth ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				Return.push( this );
			}
		}

		if ( 0 < NewStart.length ) {
			if ( Start === End ) {
				this._Children[ Start ]._findAllByValue( Return, Comparer, Depth, NewStart, NewEnd );
			} else {
				this._Children[ Start ]._findAllByValue( Return, Comparer, Depth, NewStart );
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			this._Children[ Index ]._findAllByValue( Return, Comparer, Depth );
		}

		if ( 0 < NewEnd.length ) {
			this._Children[ End ].findAllByValue( Return, Comparer, Depth, undefined, NewEnd );
		}

		if ( true === this._IsEnding && true === Depth ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				Return.push( this );
			}
		}
	}

	findAllByValue( Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		const Return = [];

		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		this._findAllByValue( Return, Comparer, Depth, StartKey, EndKey );

		return new PatricaTrieCollection( Return );
	}

	__insertPosition( Key ) {
		let Start, End, Middle;

		Start = 0;
		End = this._Children.length - 1;

		if ( 0 === this._Children.length || this._Children[ 0 ]._getKey().charCodeAt( 0 ) > Key ) {
			return -1;
		}

		if ( this._Children[ End ]._getKey().charCodeAt( 0 ) < Key ) {
			return -( this._Children.length + 1 );
		}

		while ( Start <= End ) {
			Middle = ( ( Start + End ) >> 1 );
			if ( 'undefined' === typeof this._Children[ Middle ]._getKey() ) {
				return -( Start + 1 );
			}

			if ( Key > this._Children[ Middle ]._getKey().charCodeAt( 0 ) ) {
				Start = Middle + 1;
			} else if ( Key < this._Children[ Middle ]._getKey().charCodeAt( 0 ) ) {
				End = Middle - 1;
			} else {
				return Middle;
			}
		}

		return -( Start + 1 );
	}

	_longestPrefix( Key ) {
		let Index;
		const To = Math.min( Key.length, this.__Key.length );

		for ( Index = 1; To > Index; Index++ ) {
			if ( Key.charCodeAt( Index ) !== this.__Key.charCodeAt( Index ) ) {
				return Index;
			}
		}

		return To;
	}

	static sortChildes( Child ) {
		return Child._getKey();
	}

	_importChildren( Children ) {
		let Child;
		const MaxLength = this._MaxKeyLength;

		if ( false === Array.isArray( Children ) ) {
			return false;
		} else {
			for ( Child in Children ) {
				if ( false === ( Children[ Child ] instanceof PatricaTrieNode ) ) {
					throw new ValueErrorException( 'Illegal import of non PatricaTrieNode.' );
				}
				this._MaxKeyLength = Math.max( this._MaxKeyLength, MaxLength + Children[ Child ]._MaxKeyLength );
				Children[ Child ]._setParent( this );
				this._Children.push( Children[ Child ] );
			}

			this._Children = this._Children.sort( PatricaTrieNode.sortChildes );

			return true;
		}
	}

	_insertIntoChildPreventOverwrite( Key, Value ) {
		const Index = this.__insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			return this._Children[ Index ].insertPreventOverwrite( Key, Value );
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNode( Key, Value, this ) );
		this._MaxKeyLength = Math.max( Key.length, this._MaxKeyLength );

		return null;
	}

	insertPreventOverwrite( Key, Value ) {
		let Common, NewKey, NewChild, NewChild2, PrefixLength;
		const NewKeyLength = Key.length;
		const CurrentKeyLength = this.__Key.length;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}
		// eslint-disable-next-line
		PrefixLength = this._longestPrefix( Key );

		if (
			NewKeyLength === CurrentKeyLength
		&&
			PrefixLength === CurrentKeyLength
		) {
			if ( undefined === this.__Value ) {
				this._IsEnding = true;
				this.__Value = Value;
				return null;
			} else {
				return this;
			}
		} else {
			if ( PrefixLength === CurrentKeyLength ) {
				NewKey = Key.substring( PrefixLength );
				return this._insertIntoChildPreventOverwrite( NewKey, Value );
			} else if ( PrefixLength === NewKeyLength ) {
				NewChild = new PatricaTrieNode(
					this.__Key.substring( PrefixLength ),
					this.__Value,
					this,
				);

				this.__Value = Value;

				if ( false === NewChild._importChildren( this._Children ) ) {
					return false;
				}

				if ( false === this._IsEnding ) {
					this._IsEnding = true;
					NewChild.unsetEnd();
				}
				this.__Key = this.__Key.substring( 0, PrefixLength );
				this._Children = [ NewChild ];
				return null;
			} else {
				Common = this.__Key.substring( 0, PrefixLength );
				NewChild = new PatricaTrieNode(
					this.__Key.substring( PrefixLength ),
					this.__Value,
					this
				);

				NewChild2 = new PatricaTrieNode(
					Key.substring( PrefixLength ),
					Value,
					this
				);

				if ( false === NewChild._importChildren( this._Children ) ) {
					return false;
				}

				if ( false === this._IsEnding ) {
					NewChild.unsetEnd();
				}

				// Would be faster, but not so nice
				// NewChild._MaxKeyLength = this._MaxKeyLength-Common.length

				this._IsEnding = false;
				this.__Key = Common;
				this.__Value = undefined;

				if ( NewChild._getKey().charCodeAt( 0 ) < NewChild2._getKey().charCodeAt( 0 ) ) {
					this._Children = [ NewChild, NewChild2 ];
				} else {
					this._Children = [ NewChild2, NewChild ];
				}

				return null;
			}
		}
	}

	_insertIntoChild( Key, Value ) {
		let Return;
		const Index = this.__insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			Return = this._Children[ Index ].insert( Key, Value );
			this._MaxKeyLength = Math.max(
				this.__Key.length + this._Children[ Index ]._MaxKeyLength,
				this._MaxKeyLength
			);
			return Return;
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNode( Key, Value, this ) );
		this._MaxKeyLength = Math.max( this.__Key.length + Key.length, this._MaxKeyLength );
		return true;
	}

	insert( Key, Value ) {
		let Common, NewKey, NewChild, NewChild2;

		const NewKeyLength = Key.length;
		const CurrentKeyLength = this.__Key.length;
		let PrefixLength;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}
		// eslint-disable-next-line
		PrefixLength = this._longestPrefix( Key );

		if (
			NewKeyLength === CurrentKeyLength
		&&
			PrefixLength === CurrentKeyLength
		) {
			this._IsEnding = true;
			this.__Value = Value;
			return true;
		} else {
			if ( PrefixLength === CurrentKeyLength ) {
				NewKey = Key.substring( PrefixLength );
				return this._insertIntoChild( NewKey, Value );
			} else if ( PrefixLength === NewKeyLength ) {
				NewChild = new PatricaTrieNode(
					this.__Key.substring( PrefixLength ),
					this.__Value,
					this,
				);

				this.__Value = Value;

				if ( false === NewChild._importChildren( this._Children ) ) {
					return false;// Should never happen if you done the implementation well
				}

				if ( false === this._IsEnding ) {
					this._IsEnding = true;
					NewChild.unsetEnd();
				}
				this.__Key = this.__Key.substring( 0, PrefixLength );
				this._Children = [ NewChild ];
				return true;
			} else {
				Common = this.__Key.substring( 0, PrefixLength );
				NewChild = new PatricaTrieNode(
					this.__Key.substring( PrefixLength ),
					this.__Value,
					this
				);

				NewChild2 = new PatricaTrieNode(
					Key.substring( PrefixLength ),
					Value,
					this
				);

				if ( false === NewChild._importChildren( this._Children ) ) {
					return false;
				}

				if ( false === this._IsEnding ) {
					NewChild.unsetEnd();
				}

				// Would be faster, but not so nice
				// NewChild._MaxKeyLength = this._MaxKeyLength-Common.length

				this._IsEnding = false;
				this.__Key = Common;
				this.__Value = undefined;

				if ( NewChild._getKey().charCodeAt( 0 ) < NewChild2._getKey().charCodeAt( 0 ) ) {
					this._Children = [ NewChild, NewChild2 ];
				} else {
					this._Children = [ NewChild2, NewChild ];
				}

				return true;
			}
		}
	}

	_resetMaxLengt() {
		this.__Parent._resetMaxLengt();
	}

	_removeFromTrie() {
		this.__Parent._clean( this.__Key.charCodeAt( 0 ) );
	}

	_clean( Key ) {
		const Index = this.__findByKey( Key );
		if ( -1 === Index ) {
			return;
		}

		this._Children.splice( Index, 1 );

		if ( true === this._IsRoot ) {
			return;
		}

		if (
			0 === this._Children.length
		&&
			false === this._IsEnding
		&&
			0 < this.__Key.length
		) {
			this._removeFromTrie();
		} else if (
			1 === this._Children.length
		&&
			false === this._Children[ 0 ].hasChildren()
		&&
			false === this._IsEnding
		) {
			this.__Key += this._Children[ 0 ]._getKey();
			this.__Value = this._Children[ 0 ].getValue();
			this._IsEnding = this._Children[ 0 ].isAEnd();
			this._Children.pop();
		}
	}

	remove( Key, Prefixed = false ) {
		let ToDelete, RootKeyLength;

		if ( 'string' !== typeof Key ) {
			return null;
		}

		if ( true === Prefixed ) {
			if ( false === this.__Parent._IsRoot ) {
				RootKeyLength = this.__Parent.getKey().length;
				Key = Key.substring( RootKeyLength );
			}
		}

		if ( 0 === Key.length ) {
			return null;
		}
		// eslint-disable-next-line
		ToDelete = this.findByKey( Key, true );

		if ( null === ToDelete ) {
			return;
		}

		if ( true === ToDelete.hasChildren() ) {
			if ( true === ToDelete.isAEnd() ) {
				ToDelete.setValue( null );
				ToDelete.unsetEnd();
			}
		} else {
			ToDelete._removeFromTrie();
			this._resetMaxLengt();
		}
	}
}

class PatricaTrie extends PatricaTrieNode {

	constructor() {
		super( undefined, undefined, undefined );
	}

	_setParent() {
		throw new NotImplementedException( '_setParent' );
	}

	setValue() {
		throw new NotImplementedException( 'setValue' );
	}

	getKeys( Filter = undefined ) {
		let Child;
		const Output = [];

		if ( 'function' === typeof Filter ) {
			for ( Child in this._Children ) {
				this._Children[ Child ]._getKeysFilter( '', Output, Filter );
			}
		} else {
			for ( Child in this._Children ) {
				this._Children[ Child ]._getKeys( '', Output );
			}
		}
		for ( Child in this._Children ) {
			this._Children[ Child ]._getKeys( '', Output );
		}

		return Output;
	}

	getValues( Filter = undefined ) {
		let Child;
		const Output = [];

		if ( 'function' === typeof Filter ) {
			for ( Child in this._Children ) {
				this._Children[ Child ]._getValuesFilter( Output, Filter );
			}
		} else {
			for ( Child in this._Children ) {
				this._Children[ Child ]._getValues( Output );
			}
		}

		return Output;
	}

	getKeyAndValue() {
		return null;
	}

	getKeysAndValues( Filter = undefined ) {
		let Child;
		const Return = {};

		if ( 'function' === typeof Filter ) {
			for ( Child in this._Children ) {
				this._Children[ Child ]._getKeysAndValuesFilter( '', Return, Filter );
			}
		} else {
			for ( Child in this._Children ) {
				this._Children[ Child ]._getKeysAndValues( '', Return );
			}
		}

		return Return;
	}

	__findByKey( Key ) {
		let Start, End, MiddleBinary, MiddleInterpolation, WhereStart, WhereEnd, Swap;
		let Interpolation, Binary, InterpolationIsDefined, BinaryIsDefined;

		if ( 0 === this._Children.length ) {
			return -1;
		} else {
			Start = 0;
			End = this._Children.length - 1;
		}

		if ( 0 === this._Children.length || this._Children[ 0 ]._getKey().charCodeAt( 0 ) > Key ) {
			return -1;
		}

		if ( this._Children[ End ]._getKey().charCodeAt( 0 ) < Key ) {
			return -1;
		}

		while ( Start <= End && this._Children.length > End ) {
			WhereStart = this._Children[ Start ]._getKey().charCodeAt( 0 );
			WhereEnd = this._Children[ End ]._getKey().charCodeAt( 0 );

			MiddleBinary = ( ( Start + End ) >> 1 );
			MiddleInterpolation = WhereEnd - WhereStart;
			if ( 0 !== MiddleInterpolation ) {
				MiddleInterpolation = Math.round( Start + ( ( Key - WhereStart ) * ( End - Start ) / ( WhereEnd - WhereStart ) ) );
			}

			if ( MiddleBinary > MiddleInterpolation ) {
				Swap = MiddleBinary;
				MiddleBinary = MiddleInterpolation;
				MiddleInterpolation = Swap;
			}

			Binary = this._Children[ MiddleBinary ];
			BinaryIsDefined = 'undefined' !== typeof Binary;
			Interpolation = this._Children[ MiddleInterpolation ];
			InterpolationIsDefined = 'undefined' !== typeof Interpolation;

			if ( false === BinaryIsDefined && false === InterpolationIsDefined ) {
				return -1;
			}

			if ( true === BinaryIsDefined && Key === Binary._getKey().charCodeAt( 0 ) ) {
				return MiddleBinary;
			} else if ( true === InterpolationIsDefined && Key === Interpolation._getKey().charCodeAt( 0 ) ) {
				return MiddleInterpolation;
			} else if ( true === BinaryIsDefined && Key < Binary._getKey().charCodeAt( 0 ) ) {
				End = MiddleBinary - 1;
			} else if ( true === InterpolationIsDefined && Key < Interpolation._getKey().charCodeAt( 0 ) ) {
				Start = MiddleBinary + 1;
				End = MiddleInterpolation + 1;
			} else {
				Start = MiddleInterpolation + 1;
			}
		}

		return -1;
	}

	// @override
	containsKey( Key, Exact = false ) {
		let Found;

		if (
			'string' !== typeof Key
		||
			0 === Key.length
		||
			this._MaxKeyLength < Key.length
		) {
			return false;
		}
		// eslint-disable-next-line
		Found = this.__findByKey( Key.charCodeAt( 0 ) );

		if ( -1 === Found ) {
			return false;
		} else {
			return this._Children[ Found ].containsKey( Key, false, Exact );
		}
	}

	// @override
	findByKey( Key, Exact = false ) {
		let Found;

		if (
			'string' !== typeof Key
		||
			0 === Key.length
		||
			this._MaxKeyLength < Key.length
		) {
			return null;
		}
		// eslint-disable-next-line
		Found = this.__findByKey( Key.charCodeAt( 0 ) );

		if ( -1 === Found ) {
			return null;
		} else {
			return this._Children[ Found ].findByKey( Key, false, Exact );
		}
	}

	findByValue( Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		let Index, Found;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		if ( 'string' === typeof StartKey ) {
			Start = this.__findByKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__findByKey( EndKey.charCodeAt( 0 ) );
			NewEnd = EndKey.substring( 1 );
		}

		if ( -1 === Start && -1 === End ) {
			return null;
		}

		if ( Start > End ) {
			return null;
		}

		if ( 0 < NewStart.length ) {
			if ( Start === End ) {
				Found = this._Children[ Start ].findByValue( Comparer, Depth, NewStart, NewEnd );
			} else {
				Found = this._Children[ Start ].findByValue( Comparer, Depth, NewStart );
			}

			if ( null !== Found ) {
				return Found;
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			Found = this._Children[ Index ].findByValue( Comparer, Depth );
			if ( null !== Found ) {
				return Found;
			}
		}

		if ( 0 < NewEnd.length ) {
			Found = this._Children[ End ].findByValue( Comparer, Depth, undefined, NewEnd );

			if ( null !== Found ) {
				return Found;
			}
		}

		return null;
	}

	_findAllByValue( Return, Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		let Index;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'string' === typeof StartKey ) {
			Start = this.__findByKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__findByKey( EndKey.charCodeAt( 0 ) );
			NewEnd = EndKey.substring( 1 );
		}

		if ( -1 === Start && -1 === End ) {
			return;
		}

		if ( Start > End ) {
			return;
		}

		if ( 0 < NewStart.length ) {
			if ( Start === End ) {
				this._Children[ Start ]._findAllByValue( Return, Comparer, Depth, NewStart, NewEnd );
			} else {
				this._Children[ Start ]._findAllByValue( Return, Comparer, Depth, NewStart );
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			this._Children[ Index ]._findAllByValue( Return, Comparer, Depth );
		}

		if ( 0 < NewEnd.length ) {
			this._Children[ End ].findAllByValue( Return, Comparer, Depth, undefined, NewEnd );
		}
	}

	findAllByValue( Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		const Return = [];
		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		this._findAllByValue( Return, Comparer, Depth, StartKey, EndKey );
		return new PatricaTrieCollection( Return );
	}

	_insertIntoChild( Key, Value ) {
		let Return;
		const Index = this.__insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			Return = this._Children[ Index ].insert( Key, Value );
			this._MaxKeyLength = Math.max(
				this._Children[ Index ]._MaxKeyLength,
				this._MaxKeyLength
			);
			return Return;
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNode( Key, Value, this ) );
		this._MaxKeyLength = Math.max( Key.length, this._MaxKeyLength );
		return true;
	}

	insert( Key, Value ) {
		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}

		return this._insertIntoChild( Key, Value );
	}

	_insertIntoChildPreventOverwrite( Key, Value ) {
		let Return;
		const Index = this.__insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			Return = this._Children[ Index ].insertPreventOverwrite( Key, Value );
			this._MaxKeyLength = Math.max(
				this._Children[ Index ]._MaxKeyLength,
				this._MaxKeyLength
			);
			return Return;
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNode( Key, Value, this ) );
		this._MaxKeyLength = Math.max( Key.length, this._MaxKeyLength );
		return null;
	}

	insertPreventOverwrite( Key, Value ) {
		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}

		return this._insertIntoChildPreventOverwrite( Key, Value );
	}

	_resetMaxLengt() {
		let Index;
		let MaxLength = 0;

		for ( Index = 0; Index < this._Children.length; Index++ ) {
			MaxLength = Math.max( MaxLength, this._Children[ Index ] );
		}

		MaxLength += this.__Key.length;
		this._MaxKeyLength = MaxLength;
		if ( false === this._IsRoot ) {
			this.__Parent._resetMaxLengt();
		}
	}

	remove( Key ) {
		let ToDelete;

		if ( 'string' !== typeof Key ) {
			return null;
		}
		// eslint-disable-next-line
		ToDelete = this.findByKey( Key );
		if ( null === ToDelete ) {
			return;
		}

		if ( true === ToDelete.hasChildren() ) {
			if ( true === ToDelete.isAEnd() ) {
				ToDelete.setValue( null );
				ToDelete.unsetEnd();
			}
		} else {
			ToDelete._removeFromTrie();
		}
	}

	/* toString( ValueSerilizer ) {

	}

	__parser( ValueDeserilizer ) {

	}

	loadFromString( Trie ) {

	}*/
}

class PatricaTrieCollection extends PatricaTrie {

	constructor( Items ) {
		super();
		if ( false === Array.isArray( Items ) ) {
			throw new TypeErrorException( 'Expected array of patrica nodes.' );
		}

		this._Children = Items;
	}

	size() {
		return this._Children.length;
	}

	item( Index ) {
		if ( 0 > Index || this._Children.length <= Index ) {
			return null;
		} else {
			return this._Children[ Index ];
		}
	}

	getKeys( Filter = undefined ) {
		let Index, Key;
		const Keys = [];

		if ( 'function' === typeof Filter ) {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Key = this._Children[ Index ].getKey();
				if ( true === Filter( Key ) ) {
					Keys.push( Key );
				}
			}
		} else {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Keys.push( this._Children[ Index ].getKey() );
			}
		}

		return Keys;
	}

	getAllKeys( Filter = undefined ) {
		let Index, Prefix;
		const Keys = [];

		if ( 'function' === typeof Filter ) {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Prefix = this._Children[ Index ]._getPrefix();
				this._Children[ Index ]._getKeysFilter( Prefix, Keys, Filter );
			}
		} else {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Prefix = this._Children[ Index ]._getPrefix();
				this._Children[ Index ]._getKeys( Prefix, Keys );
			}
		}

		return Keys;
	}

	getValues( Filter = undefined ) {
		let Index, Value;
		const Values = [];

		if ( 'function' === typeof Filter ) {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Value = this._Children[ Index ].getValue();
				if ( true === Filter( Value ) ) {
					Values.push( Value );
				}
			}
		} else {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Values.push( this._Children[ Index ].getValue() );
			}
		}

		return Values;
	}

	getAllValues( Filter = undefined ) {
		let Index;
		const Values = [];

		if ( 'function' === typeof Filter ) {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				this._Children[ Index ]._getValuesFilter( Values, Filter );
			}
		} else {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				this._Children[ Index ]._getValuesFilter( Values );
			}
		}

		return Values;
	}

	getKeysAndValues( Filter = undefined ) {
		let Index, KeyAndValue, Key;
		const KeysAndValues = {};

		if ( 'function' === typeof Filter ) {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				KeyAndValue = this._Children[ Index ].getKeyAndValue();
				Key = Object.getOwnPropertyNames( KeyAndValue )[ 0 ];
				if ( true === Filter( Key, KeyAndValue[ Key ] ) ) {
					KeysAndValues[ Key ] = KeyAndValue[ Key ];
				}
			}
		} else {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				KeyAndValue = this._Children[ Index ].getKeyAndValue();
				Key = Object.getOwnPropertyNames( KeyAndValue )[ 0 ];
				KeysAndValues[ Key ] = KeyAndValue[ Key ];
			}
		}

		return KeysAndValues;
	}

	getAllKeysAndValues( Filter = undefined ) {
		let Index, Prefix;
		const KeysAndValues = {};

		if ( 'function' === typeof Filter ) {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Prefix = this._Children[ Index ]._getPrefix();
				this._Children[ Index ]._getKeysAndValuesFilter( Prefix, KeysAndValues, Filter );
			}
		} else {
			for ( Index = 0; Index < this._Children.length; Index++ ) {
				Prefix = this._Children[ Index ]._getPrefix();
				this._Children[ Index ]._getKeysAndValues( Prefix, KeysAndValues );
			}
		}

		return KeysAndValues;
	}

	getKey() {
		throw new NotImplementedException( 'getKey' );
	}

	setValue() {
		throw new NotImplementedException( 'setValue' );
	}

	getKeyAndValue() {
		throw new NotImplementedException( 'getKeyAndValue' );
	}

	containsKey() {
		throw new NotImplementedException( 'containsKey' );
	}

	findByKey() {
		throw new NotImplementedException( 'findByKey' );
	}

	findByValue() {
		throw new NotImplementedException( 'findByValue' );
	}

	findAllByValue() {
		throw new NotImplementedException( 'findAllByValue' );
	}

	insert() {
		throw new NotImplementedException( 'insert' );
	}

	insertPreventOverwrite() {
		throw new NotImplementedException( 'insertPreventOverwrite' );
	}

	remove() {
		throw new NotImplementedException( 'insertPreventOverwrite' );
	}

	toString() {
		throw new NotImplementedException( 'toString' );
	}

	loadFromString() {
		throw new NotImplementedException( 'toString' );
	}
}

export { Compare, PatricaTrieNode, PatricaTrie };
/*

class StringCompare extends Compare
{
	static Tests = [ 'a', 'b', 'e', 'f', 'g', 'm' ]
	static compare( Comp )
	{
		return  -1 !== StringCompare.Tests.indexOf(Comp)
	}
}

const Trie = new PatricaTrie();
Trie.insert( '121', 'a' );
Trie.insert( '11', 'b' );
Trie.insert( '12', 'c' );
Trie.insert( '13', 'd' );
Trie.insert( '14', 'e' );
Trie.insert( '15', 'f' );
Trie.insert( '123123', 'g' );
Trie.insert( '23', 'h' );
Trie.insert( '42', 'i' );
Trie.insert( '1112341', 'j' );
Trie.insert( '124532', 'k' );
Trie.insert( '2333', 'l' );
Trie.insert( '422222', 'm' );
Trie.insert( '1', 'n' );
console.log( Trie.containsKey( '5432' ) );
console.log( Trie.containsKey( '12' ) );
console.log( Trie.containsKey( '4', true ) );
Utils.debugObjectPrint( Trie.getKeys() );
Utils.debugObjectPrint( Trie.getValues() );
console.log( Trie.findByKey( '4', true ) );
Trie.delete( '12' );
Trie.delete( '11' );
Trie.delete( '13' );
Trie.delete( '14' );
Trie.delete( '15' );
Trie.delete( '23' );
Trie.delete( '2333' );
Trie.insert( '2', 'q' );
Utils.debugObjectPrint( Trie.getKeys() );
Utils.debugObjectPrint( Trie.getValues() );
Utils.debugObjectPrint( Trie.findByKey( '1' ).getValues() );
Utils.debugObjectPrint( Trie.findByKey( '124532' ).getKey() );
console.log( '\n\n' );
console.log( Trie.insertPreventOverwrite( '123', 'o' ) );
console.log( Trie.insertPreventOverwrite( '123', 'p' ) );
Utils.debugObjectPrint( Trie.findByValue( StringCompare ).getKey() );
console.log( Trie.findAllByValue( StringCompare ) );
Utils.debugObjectPrint( Trie.getKeysAndValues() );*/
