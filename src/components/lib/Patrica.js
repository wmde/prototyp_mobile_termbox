/* eslint-disable operator-linebreak */
import Utils from '../../Utils';
import { TypeErrorException } from './BaseExceptions';

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
		}
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

	getValues() {
		const Output = [];
		this._getValues( Output );
		return Output;
	}

	_getKey() {
		return this.__Key;
	}

	getKey() {
		if ( true === this.__Parent._IsRoot ) {
			return this.__Key;
		} else {
			return this.__Parent.getKey() + this.__Key;
		}
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

	getKeys() {
		const Prefix = this.__Parent.getKey();
		const Output = [];
		this._getKeys( Prefix, Output );
		return Output;
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

	getKeysAndValues() {
		const Return = {};
		const Key = this.__Parent.getKey();
		this._getKeysAndValues( Key, Return );
		return Return;
	}

	__findByKey( Key ) {
		let Start, End, Middle;

		Start = 0;
		End = this._Children.length - 1;

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

	findByKey( Key, Exact = false ) {
		let Index;
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

	containsKey( Key, Exact = false ) {
		const Node = this.findByKey( Key, Exact );
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

	__insertPosition( Key ) {
		let Start, End, Middle;

		Start = 0;
		End = this._Children.length - 1;

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
		if ( false === Array.isArray( Children ) ) {
			return false;
		} else {
			this._Children = this._Children.concat( this._Children, Children );
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
		return null;
	}

	insertPreventOverwrite( Key, Value ) {
		let Common, NewKey, NewChild, NewChild2;

		const NewKeyLength = Key.length;
		const CurrentKeyLength = this.__Key.length;
		const PrefixLength = this._longestPrefix( Key );

		if (
			NewKeyLength === CurrentKeyLength		&&
			PrefixLength === CurrentKeyLength
		) {
			if ( null === this.__Value ) {
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

				this._IsEnding = false;
				this.__Key = Common;
				this.__Value = null;

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
		const Index = this.__insertPosition( Key.charCodeAt( 0 ) );

		if ( -1 < Index ) {
			return this._Children[ Index ].insert( Key, Value );
		}

		this._Children.splice( -( Index + 1 ), 0, new PatricaTrieNode( Key, Value, this ) );
		return true;
	}

	insert( Key, Value ) {
		let Common, NewKey, NewChild, NewChild2;

		const NewKeyLength = Key.length;
		const CurrentKeyLength = this.__Key.length;
		const PrefixLength = this._longestPrefix( Key );

		if (
			NewKeyLength === CurrentKeyLength		&&
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
					return false;
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

				this._IsEnding = false;
				this.__Key = Common;
				this.__Value = null;

				if ( NewChild._getKey().charCodeAt( 0 ) < NewChild2._getKey().charCodeAt( 0 ) ) {
					this._Children = [ NewChild, NewChild2 ];
				} else {
					this._Children = [ NewChild2, NewChild ];
				}

				return true;
			}
		}
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

	delete( Key ) {
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

	findByValue( Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		let Index, Found;
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
		this._findAllByValue( Return, Comparer, Depth, StartKey, EndKey );
		return Return;
	}
}

class PatricaTrie extends PatricaTrieNode {

	constructor() {
		super( undefined, undefined, undefined );
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
		const Found = this.__findByKey( Key.charCodeAt( 0 ) );

		if ( -1 === Found ) {
			return false;
		} else {
			return this._Children[ Found ].containsKey( Key, Exact );
		}
	}

	// @override
	findByKey( Key, Exact = false ) {
		const Found = this.__findByKey( Key.charCodeAt( 0 ) );

		if ( -1 === Found ) {
			return null;
		} else {
			return this._Children[ Found ].findByKey( Key, Exact );
		}
	}

	insert( Key, Value ) {
		return this._insertIntoChild( Key, Value );
	}

	insertPreventOverwrite( Key, Value ) {
		return this._insertIntoChildPreventOverwrite( Key, Value );
	}

	getKey() {
		return undefined;
	}

	getKeys() {
		let Child;
		const Output = [];

		for ( Child in this._Children ) {
			this._Children[ Child ]._getKeys( '', Output );
		}

		return Output;
	}

	getValues() {
		let Child;
		const Output = [];

		for ( Child in this._Children ) {
			this._Children[ Child ]._getValues( Output );
		}

		return Output;
	}

	getKeysAndValues() {
		let Child;
		const Return = {};

		for ( Child in this._Children ) {
			this._Children[ Child ]._getKeysAndValues( '', Return );
		}

		return Return;
	}

	findByValue( Comparer, Depth = false, StartKey = undefined, EndKey = undefined ) {
		let Index, Found;
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
		this._findAllByValue( Return, Comparer, Depth, StartKey, EndKey );
		return Return;
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
