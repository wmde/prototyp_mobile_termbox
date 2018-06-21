import Utils from '../../Utils';
import { BaseException, ValueErrorException, TypeErrorException } from './BaseExceptions';

class NotImplementedException extends BaseException {
	constructor( What ) {
		super( 'NotImplementedException', `${What} is not implemented (yet).` );
	}
}

class InvalidMethodException extends BaseException {
	constructor( What ) {
		super( 'InvalidMethodException', `${What} should do nothing.` );
	}
}
/* eslint-disable operator-linebreak */
class PatricaTrieNodeBase {

	isAEnd() {
		return this._IsEnding;
	}

	unsetEnd() {
		this._IsEnding = false;
	}

	hasChildren() {
		return 0 < this._Children.length;
	}

	_setParent( Parent ) {
		this.__Parent = Parent;
	}

	_getParent() {
		return this.__Parent;
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

	_setKey( Key ) {
		this.__Key = Key;
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

	/* Interface */
	// eslint-disable-next-line
	_findByKey(Key, Exact) {
		throw new NotImplementedException( '_findByKey' );
	}

	findByKey( Key, Prefixed = false, Exact = false ) {
		let RootKeyLength;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return null;
		}

		if ( true === Prefixed ) {
			if ( false === this.__Parent._IsRoot ) {
				RootKeyLength = this.__Parent.getKey().length;
				Key = Key.substring( RootKeyLength );
			}
		}

		return this._findByKey( Key, Exact );
	}

	/* Interface */
	// eslint-disable-next-line
	_findByKeyIgnoreCase(LowerKey, Exact, Return) {
		throw new NotImplementedException( '_findByKeyIgnoreCase' );
	}

	findByKeyIgnoreCase( Key, Prefixed = false, Exact = false ) {
		let RootKeyLength;
		const Nodes = [];

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return null;
		}

		if ( true === Prefixed ) {
			if ( false === this.__Parent._IsRoot ) {
				RootKeyLength = this.__Parent.getKey().length;
				Key = Key.substring( RootKeyLength );
			}
		}

		this._findByKeyIgnoreCase( Key.toLowerCase(), Exact, Nodes );
		return new PatricaTrieCollection( Nodes );
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

	_containsKeyIgnoreCase( LowerKey, Exact = false ) {
		let Return, Found, CurrentKey;

		if ( 0 === LowerKey.length ) {
			return;
		}
		// eslint-disable-next-line
		CurrentKey = this._getKey().toLowerCase();

		if ( true === CurrentKey.startsWith( LowerKey ) ) {
			if ( true === Exact && CurrentKey !== LowerKey ) {
				return false;
			} else {
				return true;
			}
		} else if ( LowerKey.startsWith( CurrentKey ) ) {
			LowerKey = LowerKey.substring( this._getKey().length );
			Found = this.__searchForKey( LowerKey.charCodeAt( 0 ) );

			if ( -1 !== Found ) {
				Return = this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
				if ( false === Return ) {
					Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
					if ( -1 !== Found ) {
						return this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
					}
				}
				return Return;
			} else {
				Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
				if ( -1 !== Found ) {
					return this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
				}
			}
		}
	}

	/* Interface */
	// eslint-disable-next-line
	_containsKeyIgnoreCase(LowerKey, Exact = false) {
		throw new NotImplementedException( '_findByKeyIgnoreCase' );
	}

	containsKeyIgnoreCase( Key, Prefixed = false, Exact = false ) {
		let RootKeyLength;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return null;
		}

		if ( true === Prefixed ) {
			if ( false === this._getParent()._IsRoot ) {
				RootKeyLength = this._getParent().getKey().length;
				Key = Key.substring( RootKeyLength );
			}
		}

		return this._containsKeyIgnoreCase( Key.toLowerCase(), Exact );
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

	_importChildren( Children ) {
		let Child;

		if ( false === Array.isArray( Children ) ) {
			throw new TypeErrorException( 'Expected array for import.' );
		}

		for ( Child in Children ) {
			if ( false === Children[ Child ] instanceof PatricaTrieNodeBase ) {
				throw new ValueErrorException( 'Illegal import of non PatricaTrieNode.' );
			}

			Children[ Child ]._setParent( this );
		}

		this._Children = Children;
		return true;
	}

	/* Interface */
	// eslint-disable-next-line
	insert(Key) {
		throw new NotImplementedException( 'insert' );
	}

	/* Interface */
	// eslint-disable-next-line
	remove(Key, Prefixed = false) {
		throw new NotImplementedException( 'remove' );
	}

	erase() {
		throw new NotImplementedException( 'erase' );
	}

	serialize() {
		throw new NotImplementedException( 'serialize' );
	}
}
/* eslint-disable operator-linebreak */

export class PatricaTrieNode extends PatricaTrieNodeBase {
	constructor( Key, Parent ) {
		let IsRoot = false;
		super();
		if ( 'undefined' === typeof Key && 'undefined' === typeof Parent ) {
			IsRoot = true;
		}

		this._IsRoot = IsRoot;

		if ( false === IsRoot ) {
			if ( true === Utils.isEmpty( Parent ) || false === Parent instanceof PatricaTrieNode ) {
				throw new TypeErrorException( 'Expected a PatricaTrieNode as Parent.' );
			}

			if ( 'string' !== typeof Key || true === Utils.isEmpty( Key ) ) {
				throw new TypeErrorException( 'Expected non empty key.' );
			}

			this._IsEnding = true;
		} else {
			this._IsEnding = false;
		}

		this._setKey( Key );
		this._setParent( Parent );
		this._Children = [];
	}

	__searchForKey( Key ) {
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
			Middle = Start + End >> 1;

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

	_findByKey( Key, Exact ) {
		let Found;
		if ( 0 === Key.length ) {
			return null;
		}

		if ( true === this._getKey().startsWith( Key ) ) {
			if ( true === Exact && Key !== this._getKey() ) {
				return null;
			} else {
				return this;
			}
		} else if ( Key.startsWith( this._getKey() ) ) {
			Key = Key.substring( this._getKey().length );
			Found = this.__searchForKey( Key.charCodeAt( 0 ) );

			if ( -1 !== Found ) {
				return this._Children[ Found ]._findByKey( Key, Exact );
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	_findByKeyIgnoreCase( LowerKey, Exact, Return ) {
		let Found, CurrentKey;

		if ( 0 === LowerKey.length ) {
			return;
		}
		// eslint-disable-next-line
		CurrentKey = this._getKey().toLowerCase();

		if ( true === CurrentKey.startsWith( LowerKey ) ) {
			if ( true === Exact && CurrentKey !== LowerKey ) {
				return;
			} else {
				Return.push( this );
				return;
			}
		} else if ( LowerKey.startsWith( CurrentKey ) ) {
			LowerKey = LowerKey.substring( this._getKey().length );
			Found = this.__searchForKey( LowerKey.charCodeAt( 0 ) );

			if ( -1 !== Found ) {
				this._Children[ Found ]._findByKeyIgnoreCase( LowerKey, Exact, Return );
			}

			Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
			if ( -1 !== Found ) {
				this._Children[ Found ]._findByKeyIgnoreCase( LowerKey, Exact, Return );
			}
		}
	}

	_containsKeyIgnoreCase( LowerKey, Exact = false ) {
		let Return, Found, CurrentKey;

		if ( 0 === LowerKey.length ) {
			return;
		}
		// eslint-disable-next-line
		CurrentKey = this._getKey().toLowerCase();

		if ( true === CurrentKey.startsWith( LowerKey ) ) {
			if ( true === Exact && CurrentKey !== LowerKey ) {
				return false;
			} else {
				return true;
			}
		} else if ( LowerKey.startsWith( CurrentKey ) ) {
			LowerKey = LowerKey.substring( this._getKey().length );
			Found = this.__searchForKey( LowerKey.charCodeAt( 0 ) );

			if ( -1 !== Found ) {
				Return = this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
				if ( false === Return ) {
					Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
					if ( -1 !== Found ) {
						return this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
					}
				}

				return Return;
			} else {
				Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
				if ( -1 !== Found ) {
					return this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
				}
			}
		}

		return false;
	}

	_insertPosition( Key ) {
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
			Middle = Start + End >> 1;
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

	_insertIntoChild( Key ) {
		const Index = this._insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			this._Children[ Index ].insert( Key );
			return;
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNode( Key, this ) );
	}

	insert( Key ) {
		let Common, NewKey, NewChild, NewChild2;

		const NewKeyLength = Key.length;
		const CurrentKeyLength = this._getKey().length;
		let PrefixLength;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return;
		}
		// eslint-disable-next-line
		PrefixLength = this._longestPrefix(Key);

		if ( NewKeyLength === CurrentKeyLength && PrefixLength === CurrentKeyLength ) {
			this._IsEnding = true;
		} else {
			if ( PrefixLength === CurrentKeyLength ) {
				NewKey = Key.substring( PrefixLength );
				this._insertIntoChild( NewKey );
			} else if ( PrefixLength === NewKeyLength ) {
				NewChild = new PatricaTrieNode( this._getKey().substring( PrefixLength ), this );

				NewChild._importChildren( this._Children );

				if ( false === this._IsEnding ) {
					this._IsEnding = true;
					NewChild.unsetEnd();
				}
				this._setKey( this._getKey().substring( 0, PrefixLength ) );
				this._Children = [ NewChild ];
			} else {
				Common = this._getKey().substring( 0, PrefixLength );
				NewChild = new PatricaTrieNode( this._getKey().substring( PrefixLength ), this );

				NewChild2 = new PatricaTrieNode( Key.substring( PrefixLength ), this );

				NewChild._importChildren( this._Children );

				if ( false === this._IsEnding ) {
					NewChild.unsetEnd();
				}

				this._IsEnding = false;
				this._setKey( Common );

				if ( NewChild._getKey().charCodeAt( 0 ) < NewChild2._getKey().charCodeAt( 0 ) ) {
					this._Children = [ NewChild, NewChild2 ];
				} else {
					this._Children = [ NewChild2, NewChild ];
				}
			}
		}
	}

	_removeFromTrie() {
		this._getParent()._clean( this._getKey().charCodeAt( 0 ) );
	}

	_clean( Key ) {
		const Index = this.__searchForKey( Key );
		if ( -1 === Index ) {
			return;
		}

		this._Children.splice( Index, 1 );

		if ( true === this._IsRoot ) {
			return;
		}

		if ( 0 === this._Children.length && false === this._IsEnding && 0 < this._getKey().length ) {
			this._removeFromTrie();
		} else if ( 1 === this._Children.length && false === this._Children[ 0 ].hasChildren() && false === this._IsEnding ) {
			this._setKey( this._getKey() + this._Children[ 0 ]._getKey() );
			this._IsEnding = this._Children[ 0 ].isAEnd();
			this._Children.pop();
		}
	}

	remove( Key, Prefixed = false ) {
		const ToDelete = this.findByKey( Key, Prefixed, true );

		if ( null === ToDelete ) {
			return;
		}

		if ( true === ToDelete.hasChildren() ) {
			if ( true === ToDelete.isAEnd() ) {
				ToDelete.unsetEnd();
			}
		} else {
			ToDelete._removeFromTrie();
		}
	}

	erase() {
		this._Children = [];
	}

	_serialize( Output ) {
		let Child;

		Output.push( `[${this._getKey().length}:${this._getKey()}` );
		if ( true === this._IsEnding ) {
			Output.push( '1' );
		} else {
			Output.push( '0' );
		}

		for ( Child in this._Children ) {
			this._Children[ Child ]._serialize( Output );
		}

		Output.push( ']' );
	}

	_fromString( Nodes, Position ) {
		let ImportNode, InsertPosition;

		while ( Nodes.length > Position ) {
			ImportNode = PatricaTrieNode._loadFromString( Nodes, Position, this );
			Position = ImportNode[ 0 ];
			InsertPosition = this._insertPosition( ImportNode[ 1 ]._getKey().charCodeAt( 0 ) );
			if ( -1 >= InsertPosition ) {
				this._Children.splice( -( InsertPosition + 1 ), 0, ImportNode[ 1 ] );
			}

			if ( ']' === Nodes.charAt( Position ) ) {
				return ++Position;
			}
		}

		throw new ValueErrorException( `Unexpected end of string @position ${Position}.` );
	}

	static _loadFromString( NodeString, Position, Parent ) {
		let LastPosition, KeyLength, Key, Node;

		if ( '[' !== NodeString.charAt( Position ) ) {
			throw new ValueErrorException( `The given string is not valid. - Exspecetd [ got ${NodeString.charAt( Position )} at position ${Position}.` );
		}

		Position++;
		// eslint-disable-next-line
		LastPosition = Position;
		while ( 47 < NodeString.charCodeAt( Position ) && 58 > NodeString.charCodeAt( Position ) ) {
			Position++;
		}
		// eslint-disable-next-line
		KeyLength = parseInt(NodeString.substring(LastPosition, Position));

		if ( true === isNaN( KeyLength ) || 0 === KeyLength ) {
			throw new ValueErrorException( `Illegal key length @position ${LastPosition}.` );
		}

		Position++;
		// eslint-disable-next-line
		Key = NodeString.substring(Position, Position + KeyLength);
		Position += KeyLength;
		// eslint-disable-next-line
		Node = new PatricaTrieNode(Key, Parent);
		if ( '0' === NodeString.charAt( Position ) ) {
			Node.unsetEnd();
		}

		Position++;

		if ( ']' !== NodeString.charAt( Position ) ) {
			return [ Node._fromString( NodeString, Position ), Node ];
		} else {
			return [ ++Position, Node ];
		}
	}
}
/* eslint-disable operator-linebreak */
export class PatricaTrieNodeEx extends PatricaTrieNode {

	constructor( Key, Value, Parent ) {
		let IsRoot = false;
		super( Key, Parent );
		if ( true === this._IsRoot && 'undefined' === typeof Value ) {
			IsRoot = true;
		}

		this._IsRoot = IsRoot;

		if ( false === IsRoot ) {
			this._IsEnding = true;
		} else {
			this._IsEnding = false;
		}

		if ( false === IsRoot ) {
			this.__Value = Value;
		}
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

	getKeyAndValue() {
		let Key;
		const Return = {};

		if ( false === this._getParent()._IsRoot ) {
			Key = this._getParent().getKey();
		} else {
			Key = '';
		}

		Key += this._getKey();

		Return[ Key ] = this.__Value;
		return Return;
	}

	_getKeysAndValues( Key, Return ) {
		let Index;
		Key += this._getKey();

		if ( true === this._IsEnding ) {
			Return[ Key ] = this.__Value;
		}

		for ( Index = 0; Index < this._Children.length; Index++ ) {
			this._Children[ Index ]._getKeysAndValues( Key, Return );
		}
	}

	_getKeysAndValuesFilter( Key, Return, Filter ) {
		let Index;
		Key += this._getKey();

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

		if ( false === this._getParent()._IsRoot ) {
			Key = this._getParent().getKey();
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

	findByKeyIgnoreCase( Key, Prefixed = false, Exact = false ) {
		let RootKeyLength;
		const Nodes = [];

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return null;
		}

		if ( true === Prefixed ) {
			if ( false === this.__Parent._IsRoot ) {
				RootKeyLength = this.__Parent.getKey().length;
				Key = Key.substring( RootKeyLength );
			}
		}

		this._findByKeyIgnoreCase( Key.toLowerCase(), Exact, Nodes );
		return new PatricaTrieCollectionEx( Nodes );
	}

	findByValue( Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		let Index, Found;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		if ( 'string' === typeof StartKey ) {
			Start = this.__searchForKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__searchForKey( EndKey.charCodeAt( 0 ) );
			NewEnd = EndKey.substring( 1 );
		}

		if ( -1 === Start && -1 === End ) {
			return null;
		}

		if ( Start > End ) {
			return null;
		}

		if ( true === this._IsEnding && false === DepthFirst ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				return this;
			}
		}

		if ( 0 < NewStart.length ) {
			if ( Start === End ) {
				Found = this._Children[ Start ].findByValue( Comparer, DepthFirst, NewStart, NewEnd );
			} else {
				Found = this._Children[ Start ].findByValue( Comparer, DepthFirst, NewStart );
			}

			if ( null !== Found ) {
				return Found;
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			Found = this._Children[ Index ].findByValue( Comparer, DepthFirst );
			if ( null !== Found ) {
				return Found;
			}
		}

		if ( 0 < NewEnd.length ) {
			Found = this._Children[ End ].findByValue( Comparer, DepthFirst, undefined, NewEnd );

			if ( null !== Found ) {
				return Found;
			}
		}

		if ( true === this._IsEnding && true === DepthFirst ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				return this;
			}
		}

		return null;
	}

	_findAllByValue( Return, Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		let Index;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'string' === typeof StartKey ) {
			Start = this.__searchForKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__searchForKey( EndKey.charCodeAt( 0 ) );
			NewEnd = EndKey.substring( 1 );
		}

		if ( -1 === Start && -1 === End ) {
			return;
		}

		if ( Start > End ) {
			return;
		}

		if ( true === this._IsEnding && false === DepthFirst ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				Return.push( this );
			}
		}

		if ( 0 < NewStart.length ) {
			if ( Start === End ) {
				this._Children[ Start ]._findAllByValue( Return, Comparer, DepthFirst, NewStart, NewEnd );
			} else {
				this._Children[ Start ]._findAllByValue( Return, Comparer, DepthFirst, NewStart );
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			this._Children[ Index ]._findAllByValue( Return, Comparer, DepthFirst );
		}

		if ( 0 < NewEnd.length ) {
			this._Children[ End ].findAllByValue( Return, Comparer, DepthFirst, undefined, NewEnd );
		}

		if ( true === this._IsEnding && true === DepthFirst ) {
			if ( true === Comparer.compare( this.__Value ) ) {
				Return.push( this );
			}
		}
	}

	findAllByValue( Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		const Return = [];

		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		this._findAllByValue( Return, Comparer, DepthFirst, StartKey, EndKey );

		return new PatricaTrieCollectionEx( Return );
	}

	_insertIntoChild( Key, Value ) {
		const Index = this._insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			this._Children[ Index ].insert( Key, Value );
			return;
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNodeEx( Key, Value, this ) );
	}

	insert( Key, Value ) {
		let Common, NewKey, NewChild, NewChild2;

		const NewKeyLength = Key.length;
		const CurrentKeyLength = this._getKey().length;
		let PrefixLength;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}
		// eslint-disable-next-line
		PrefixLength = this._longestPrefix(Key);

		if ( NewKeyLength === CurrentKeyLength && PrefixLength === CurrentKeyLength ) {
			this._IsEnding = true;
			this.__Value = Value;
		} else {
			if ( PrefixLength === CurrentKeyLength ) {
				NewKey = Key.substring( PrefixLength );
				this._insertIntoChild( NewKey, Value );
			} else if ( PrefixLength === NewKeyLength ) {
				NewChild = new PatricaTrieNodeEx( this._getKey().substring( PrefixLength ), this.__Value, this );

				this.__Value = Value;

				NewChild._importChildren( this._Children );

				if ( false === this._IsEnding ) {
					this._IsEnding = true;
					NewChild.unsetEnd();
				}
				this._setKey( this._getKey().substring( 0, PrefixLength ) );
				this._Children = [ NewChild ];
			} else {
				Common = this._getKey().substring( 0, PrefixLength );
				NewChild = new PatricaTrieNodeEx( this._getKey().substring( PrefixLength ), this.__Value, this );

				NewChild2 = new PatricaTrieNodeEx( Key.substring( PrefixLength ), Value, this );

				NewChild._importChildren( this._Children );

				if ( false === this._IsEnding ) {
					NewChild.unsetEnd();
				}

				this._IsEnding = false;
				this._setKey( Common );
				this.__Value = undefined;

				if ( NewChild._getKey().charCodeAt( 0 ) < NewChild2._getKey().charCodeAt( 0 ) ) {
					this._Children = [ NewChild, NewChild2 ];
				} else {
					this._Children = [ NewChild2, NewChild ];
				}
			}
		}
	}

	_insertIntoChildPreventOverwrite( Key, Value ) {
		const Index = this._insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			return this._Children[ Index ].insertPreventOverwrite( Key, Value );
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNodeEx( Key, Value, this ) );
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
		PrefixLength = this._longestPrefix(Key);

		if ( NewKeyLength === CurrentKeyLength && PrefixLength === CurrentKeyLength ) {
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
				NewChild = new PatricaTrieNodeEx( this._getKey().substring( PrefixLength ), this.__Value, this );

				this.__Value = Value;

				NewChild._importChildren( this._Children );

				if ( false === this._IsEnding ) {
					this._IsEnding = true;
					NewChild.unsetEnd();
				}
				this._setKey( this._getKey().substring( 0, PrefixLength ) );
				this._Children = [ NewChild ];
				return null;
			} else {
				Common = this._getKey().substring( 0, PrefixLength );
				NewChild = new PatricaTrieNodeEx( this._getKey().substring( PrefixLength ), this.__Value, this );

				NewChild2 = new PatricaTrieNodeEx( Key.substring( PrefixLength ), Value, this );

				NewChild._importChildren( this._Children );

				if ( false === this._IsEnding ) {
					NewChild.unsetEnd();
				}

				this._IsEnding = false;
				this._setKey( Common );
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

	_clean( Key ) {
		const Index = this.__searchForKey( Key );
		if ( -1 === Index ) {
			return;
		}

		this._Children.splice( Index, 1 );

		if ( true === this._IsRoot ) {
			return;
		}

		if ( 0 === this._Children.length && false === this._IsEnding && 0 < this._getKey().length ) {
			this._removeFromTrie();
		} else if ( 1 === this._Children.length && false === this._Children[ 0 ].hasChildren() && false === this._IsEnding ) {
			this._setKey( this._getKey() + this._Children[ 0 ]._getKey() );
			this.__Value = this._Children[ 0 ].getValue();
			this._IsEnding = this._Children[ 0 ].isAEnd();
			this._Children.pop();
		}
	}

	remove( Key, Prefixed = false ) {
		const ToDelete = this.findByKey( Key, Prefixed, true );

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

	removeByValue( Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		const ToDelete = this.findByValue( Comparer, DepthFirst, StartKey, EndKey );

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

	_serialize( ValueSerializer, Output ) {
		let Value, Child;

		Output.push( `[${this._getKey().length}:${this._getKey()}` );
		if ( true === this._IsEnding ) {
			Value = ValueSerializer( this.__Value );
			Output.push( `${Value.length}:${Value}` );
		} else {
			Output.push( '0' );
		}

		for ( Child in this._Children ) {
			this._Children[ Child ]._serialize( ValueSerializer, Output );
		}

		Output.push( ']' );
	}

	_fromString( Nodes, Position, ValueDeserializer ) {
		let ImportNode, InsertPosition;

		while ( Nodes.length > Position ) {
			ImportNode = PatricaTrieNodeEx._loadFromString( Nodes, Position, this, ValueDeserializer );

			Position = ImportNode[ 0 ];
			InsertPosition = this._insertPosition( ImportNode[ 1 ]._getKey().charCodeAt( 0 ) );
			if ( -1 >= InsertPosition ) {
				this._Children.splice( -( InsertPosition + 1 ), 0, ImportNode[ 1 ] );
			}

			if ( ']' === Nodes.charAt( Position ) ) {
				return ++Position;
			}
		}

		throw new ValueErrorException( `Unexpected end of string @position ${Position}.` );
	}

	static _loadFromString( NodeString, Position, Parent, ValueDeserializer ) {
		let LastPosition, KeyLength, Key, ValueLength, Value, Node;

		if ( '[' !== NodeString.charAt( Position ) ) {
			throw new ValueErrorException( `The given string is not valid. - Exspecetd [ got ${NodeString.charAt( Position )} at position ${Position}.` );
		}

		Position++;
		LastPosition = Position;
		while ( 47 < NodeString.charCodeAt( Position ) && 58 > NodeString.charCodeAt( Position ) ) {
			Position++;
		}

		// eslint-disable-next-line
		KeyLength = parseInt(NodeString.substring(LastPosition, Position));

		if ( true === isNaN( KeyLength ) || 0 === KeyLength ) {
			throw new ValueErrorException( `Illegal key length @position ${LastPosition}.` );
		}

		Position++;
		// eslint-disable-next-line
		Key = NodeString.substring(Position, Position + KeyLength);
		Position += KeyLength;
		LastPosition = Position;

		while ( 47 < NodeString.charCodeAt( Position ) && 58 > NodeString.charCodeAt( Position ) ) {
			Position++;
		}
		// eslint-disable-next-line
		ValueLength = parseInt(NodeString.substring(LastPosition, Position));

		if ( true === isNaN( ValueLength ) ) {
			throw new ValueErrorException( `Illegal value length @position ${LastPosition}.` );
		}

		if ( 0 === ValueLength ) {
			Node = new PatricaTrieNodeEx( Key, null, Parent );
			Node.unsetEnd();
		} else {
			Position++;
			// eslint-disable-next-line
			Value = ValueDeserializer(NodeString.substring(Position, Position + ValueLength));
			Node = new PatricaTrieNodeEx( Key, Value, Parent );
			Position += ValueLength;
		}

		if ( ']' !== NodeString.charAt( Position ) ) {
			return [ Node._fromString( NodeString, Position, ValueDeserializer ), Node ];
		} else {
			return [ ++Position, Node ];
		}
	}
}
/* eslint-disable operator-linebreak */
export class PatricaTrieCollection extends PatricaTrieNodeBase {
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

	remove( Item ) {
		if ( 0 > Item || this._Children.length <= Item ) {
			return;
		}

		this._Children.splice( Item, 1 );
	}

	toArray() {
		return this._Children;
	}

	isAEnd() {
		throw new InvalidMethodException( 'isAEnd' );
	}

	unsetEnd() {
		throw new InvalidMethodException( 'unsetEnd' );
	}

	hasChildren() {
		return 0 < this._Children.length;
	}

	findByKey() {
		throw new InvalidMethodException( 'findByKey' );
	}

	findByKeyIgnoreCase() {
		throw new InvalidMethodException( 'findByKeyIgnoreCase' );
	}

	containsKey() {
		throw new InvalidMethodException( 'containsKey' );
	}

	containsKeyIgnoreCase() {
		throw new InvalidMethodException( 'containsKeyIgnoreCase' );
	}

	// eslint-disable-next-line
	insert(Key) {
		throw new InvalidMethodException( 'insert' );
	}

	erase() {
		throw new InvalidMethodException( 'erase' );
	}

	serialize() {
		throw new InvalidMethodException( 'serialize' );
	}
}
/* eslint-disable operator-linebreak */
export class PatricaTrieCollectionEx extends PatricaTrieCollection {
	constructor( Items ) {
		super( Items );
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
}
/* eslint-disable operator-linebreak */
export class PatricaTrieEx extends PatricaTrieNodeEx {
	constructor() {
		super( undefined, undefined, undefined );
	}

	setValue() {
		throw new InvalidMethodException( 'setValue' );
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

	__searchForKey( Key ) {
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

			MiddleBinary = Start + End >> 1;
			MiddleInterpolation = WhereEnd - WhereStart;
			if ( 0 !== MiddleInterpolation ) {
				MiddleInterpolation = Math.round( Start + ( Key - WhereStart ) * ( End - Start ) / ( WhereEnd - WhereStart ) );
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
	findByKey( Key, Exact = false ) {
		let Found;

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return null;
		}
		// eslint-disable-next-line
		Found = this.__searchForKey(Key.charCodeAt(0));

		if ( -1 === Found ) {
			return null;
		} else {
			return this._Children[ Found ].findByKey( Key, false, Exact );
		}
	}

	findByKeyIgnoreCase( Key, Exact = false ) {
		let Found, LowerKey;
		const Nodes = [];

		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return null;
		}
		// eslint-disable-next-line
		LowerKey = Key.toLowerCase();
		// eslint-disable-next-line
		Found = this.__searchForKey(LowerKey.charCodeAt(0));
		if ( -1 !== Found ) {
			this._Children[ Found ]._findByKeyIgnoreCase( LowerKey, Exact, Nodes );
		}

		Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
		if ( -1 !== Found ) {
			this._Children[ Found ]._findByKeyIgnoreCase( LowerKey, Exact, Nodes );
		}

		return new PatricaTrieCollectionEx( Nodes );
	}

	// @override
	containsKey( Key, Exact = false ) {
		const Found = this.findByKey( Key, Exact );
		if ( null === Found ) {
			return false;
		} else {
			return true;
		}
	}

	_containsKeyIgnoreCase( LowerKey, Exact = false ) {
		let Return, Found;

		Found = this.__searchForKey( LowerKey.charCodeAt( 0 ) );

		if ( -1 !== Found ) {
			Return = this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
			if ( false === Return ) {
				Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
				if ( -1 !== Found ) {
					return this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
				}
			}
			return Return;
		} else {
			Found = this.__searchForKey( LowerKey.charAt( 0 ).toUpperCase().charCodeAt( 0 ) );
			if ( -1 !== Found ) {
				return this._Children[ Found ]._containsKeyIgnoreCase( LowerKey, Exact );
			}
		}
	}

	containsKeyIgnoreCase( Key, Exact = false ) {
		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}

		return this._containsKeyIgnoreCase( Key.toLowerCase(), Exact );
	}

	findByValue( Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		let Index, Found;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		if ( 'string' === typeof StartKey ) {
			Start = this.__searchForKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__searchForKey( EndKey.charCodeAt( 0 ) );
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
				Found = this._Children[ Start ].findByValue( Comparer, DepthFirst, NewStart, NewEnd );
			} else {
				Found = this._Children[ Start ].findByValue( Comparer, DepthFirst, NewStart );
			}

			if ( null !== Found ) {
				return Found;
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			Found = this._Children[ Index ].findByValue( Comparer, DepthFirst );
			if ( null !== Found ) {
				return Found;
			}
		}

		if ( 0 < NewEnd.length ) {
			Found = this._Children[ End ].findByValue( Comparer, DepthFirst, undefined, NewEnd );

			if ( null !== Found ) {
				return Found;
			}
		}

		return null;
	}

	_findAllByValue( Return, Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		let Index;
		let NewStart = '';
		let NewEnd = '';
		let Start = 0;
		let End = this._Children.length;

		if ( 'string' === typeof StartKey ) {
			Start = this.__searchForKey( StartKey.charCodeAt( 0 ) );
			NewStart = StartKey.substring( 1 );
		}

		if ( 'string' === typeof EndKey ) {
			End = this.__searchForKey( EndKey.charCodeAt( 0 ) );
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
				this._Children[ Start ]._findAllByValue( Return, Comparer, DepthFirst, NewStart, NewEnd );
			} else {
				this._Children[ Start ]._findAllByValue( Return, Comparer, DepthFirst, NewStart );
			}
		}

		for ( Index = Start; Index < End; Index++ ) {
			this._Children[ Index ]._findAllByValue( Return, Comparer, DepthFirst );
		}

		if ( 0 < NewEnd.length ) {
			this._Children[ End ].findAllByValue( Return, Comparer, DepthFirst, undefined, NewEnd );
		}
	}

	findAllByValue( Comparer, DepthFirst = false, StartKey = undefined, EndKey = undefined ) {
		const Return = [];
		if ( 'function' !== typeof Comparer.compare ) {
			throw new TypeErrorException( 'Expected compare function of Compare object.' );
		}

		this._findAllByValue( Return, Comparer, DepthFirst, StartKey, EndKey );
		return new PatricaTrieCollectionEx( Return );
	}

	insert( Key, Value ) {
		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}

		return this._insertIntoChild( Key, Value );
	}

	insertPreventOverwrite( Key, Value ) {
		if ( 'string' !== typeof Key || 0 === Key.length ) {
			return false;
		}

		return this._insertIntoChildPreventOverwrite( Key, Value );
	}

	remove( Key ) {
		const ToDelete = this.findByKey( Key, true );
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

	serialize( ValueSerializer ) {
		let Child;
		const Output = [ '[r' ];

		for ( Child in this._Children ) {
			this._Children[ Child ]._serialize( ValueSerializer, Output );
		}
		Output.push( ']' );

		return Output.join( '' );
	}

	static loadFromString( Trie, ValueDeserializer ) {
		let Length, NewTrie, Position;
		if ( 'string' !== typeof Trie ) {
			throw new TypeErrorException( 'Expected string to parse.' );
		}

		if ( 'function' !== typeof ValueDeserializer ) {
			throw new TypeErrorException( 'Expected function for deserialization.' );
		}
		// eslint-disable-next-line
		Length = Trie.length;

		if ( 3 > Length ) {
			throw new ValueErrorException( 'The given string cannot be valid.' );
		}

		if ( '[' !== Trie.charAt( 0 ) ) {
			throw new ValueErrorException( `The given string is not valid. - Exspecetd [ got ${Trie.charAt( 0 )} at position 0.` );
		}

		if ( 'r' !== Trie.charAt( 1 ) ) {
			throw new ValueErrorException( `The given string is not valid. - Exspecetd r got ${Trie.charAt( 1 )} at position 1.` );
		}

		// eslint-disable-next-line
		NewTrie = new PatricaTrieEx();

		if ( ']' === Trie.charAt( 2 ) ) {
			return NewTrie;
		}

		// eslint-disable-next-line
		Position = NewTrie._fromString(Trie, 2, ValueDeserializer);

		if ( Position !== Length ) {
			throw new ValueErrorException( `The given string is not valid. - Exspecetd end of string @position ${Position}.` );
		}

		return NewTrie;
	}
}
