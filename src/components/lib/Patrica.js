import Utils from '../../Utils';

export default class PatricaTrie {
    __Value = null
    _Children = null
    __Parent = null
    __IsEnding = null

    constructor( Value, Parent = null ) {
    	if ( null !== Parent && Parent instanceof PatricaTrie ) {
    		this.__Parent = Parent;
    	}

    	this._Children = [];

    	if ( false === Utils.isEmpty( Value ) ) {
    		this.__Value = `${Value}`;
    		this.__IsEnding = true;
    	} else {
    		this.__IsEnding = false;
    	}
    }

    getValue() {
    	return this.__Value;
    }

    hasChildes() {
    	if ( null !== this._Children ) {
    		return 0 < this._Children.length;
    	}
    	return false;
    }

    isAEnd() {
    	return this.__IsEnding;
    }

    unsetEnd() {
    	this.__IsEnding = false;
    }

    // ToDo: improve this
    __findLongesPrefix( Str, l1, l2 ) {
    	let Index;
    	const To = Math.min( l1, l2 );

    	for ( Index = 1; Index < To; Index++ ) {
    		if ( Str.charCodeAt( Index ) !== this.__Value.charCodeAt( Index ) ) {
    			return Index;
    		}
    	}

    	return To;
    }

    __contains( Str ) {
    	let Start, Mid, End;
    	const Letter = Str.charCodeAt( 0 );

    	if ( null === this._Children || 0 === this._Children.length || Str !== this.__Value ) {
    		return -1;
    	} else {
    		Start = 0;
    		End = this._Children.length - 1;
    		while ( Start <= End ) {
    			Mid = ( Start + End ) >> 1;
    			if ( Letter > this._Children[ Mid ].getValue()[ 0 ] ) {
    				Start += 1;
    			} else if ( Letter < this._Children[ Mid ].getValue()[ 0 ] ) {
    				End = Mid - 1;
    			} else {
    				return Mid;
    			}
    		}
    		return -1;
    	}
    }

    __insertSearch( Str ) {
    	let Start, Mid, End;
    	const Letter = Str.charCodeAt( 0 );

    	if ( 0 === this._Children.length ) {
    		return -1;
    	} else {
    		Start = 0;
    		End = this._Children.length - 1;
    		while ( Start <= End ) {
    			Mid = ( Start + End ) >> 1;
    			if ( Letter > this._Children[ Mid ].getValue().charCodeAt( 0 ) ) {
    				Start += 1;
    			} else if ( Letter < this._Children[ Mid ].getValue().charCodeAt( 0 ) ) {
    				End = Mid - 1;
    			} else {
    				return Mid;
    			}
    		}
    		return -( Start + 1 );
    	}
    }

    insert( Element ) {
    	let Index, Index2, NewChild, NewChild2, LengthInsert, LengthValue, Common;
    	Element = `${Element}`;

    	if ( true === Utils.isEmpty( this.__Value ) ) {
    		Index = this.__insertSearch( Element );
    		if ( -1 < Index ) {
    			return this._Children[ Index ].insert( Element );
    		}

    		NewChild = new PatricaTrie( Element, this );
    		this._Children.splice( -( Index + 1 ), 0, NewChild );
    		return true;
    	} else {
    		if ( this.__Value[ 0 ] !== Element.charCodeAt( 0 ) ) {
    			return false;
    		} else {
    			LengthInsert = Element.length;
    			LengthValue = this.__Value.length;

    			Index = this.__findLongesPrefix( Element,
    				LengthInsert,
    				LengthValue
    			);

    			if (
    				LengthInsert === LengthValue &&
                    Index === LengthValue
    			) {
    				if ( false === this.__IsEnding ) {
    					this.__IsEnding = true;
    				}

    				return true;
    			} else {

    				if ( Index === LengthValue ) {
    					Element = Element.substring( Index );
    					Index2 = this.__insertSearch( Element );
    					if ( -1 < Index2 ) {
    						return this._Children[ Index2 ].insert( Element );
    					}

    					NewChild = new PatricaTrie( Element, this );
    					this._Children.splice( -( Index + 1 ), 0, NewChild );
    					return true;
    				} else if ( Index === LengthInsert ) {

    					NewChild = new PatricaTrie( this.__Value.substring( Index ), this );
    					this.__Value = Element;

    					if ( false === NewChild._importChildes( this._Children ) ) {
    						return false;
    					}

    					if ( false === this.__IsEnding ) {
    						this.__IsEnding = true;
    						NewChild.unsetEnd();
    					}

    					this._Children = [ NewChild ];
    					return true;
    				} else {
    					Common = this.__Value.substring( 0, Index );
    					NewChild = new PatricaTrie( this.__Value.substring( Index ), this );

    					if ( false === NewChild._importChildes( this._Children ) ) {
    						return false;
    					}

    					if ( false === this.__IsEnding ) {
    						NewChild.unsetEnd();
    					}

    					this.__Value = Common;
    					this.__IsEnding = false;

    					NewChild2 = PatricaTrie( Element.substring( Index, this ) );
    					if ( NewChild.getValue()[ 0 ] < NewChild2.getValue()[ 0 ] ) {
    						this._Children = [ NewChild, NewChild2 ];
    					} else {
    						this._Children = [ NewChild2, NewChild ];
    					}
    					return true;
    				}
    			}
    		}
    	}
    }

    static sortChildes( Child ) {
    	return Child.getValue();
    }

    _importChildes( Childes ) {
    	if ( false === Array.isArray( Childes ) ) {
    		return false;
    	} else {
    		this._Children = this._Children.concat( Childes );
    		this._Children.sort( PatricaTrie.sortChildes );

    		return true;
    	}
    }

    delete( Key ) {
    	let ToDel;
    	Key = `${Key}`;
    	ToDel = this.find( Key );

    	if ( null === ToDel ) {
    		return;
    	}

    	if ( true === ToDel.hasChildes() ) {
    		if ( true === ToDel.isAEnd() ) {
    			ToDel.unsetEnd();
    		}
    	} else {
    		ToDel._removeFromTrie();
    	}
    }

    _removeFromTrie() {
    	const FormerValue = this.__Value[ 0 ];
    	this.__Parent._clean( FormerValue );
    	delete this.__Value;
    }

    _clean( FormerValue ) {
    	const Index = this.__contains( FormerValue );
    	if ( -1 === Index ) {
    		return;
    	}

    	this._Children.splice( Index, 1 );
    	if ( 0 === this.__Value.length ) {
    		return;
    	}

    	if ( 0 === this._Children && false === this.__IsEnding ) {
    		FormerValue = this.__Value[ 0 ];
    		delete this.__Value;
    		this.__Parent._clean( FormerValue );
    	} else if (
    		1 === this._Children.length &&
            false === this._Children[ 0 ].hasChildes()
    	) {
    		this.__Value += this._Children[ 0 ].getValue();
    		this._Children.pop();
    		this.__IsEnding = true;
    	}
    }

    find( Key ) {
    	let Index;
    	Key = `${Key}`;
    	if ( 0 < this.__Value.length ) {
    		if ( this.__Value.startswith( Key ) ) {
    			return this;
    		} else if ( Key.startsWith( this.__Value ) ) {
    			if ( 0 < this._Children.length ) {
    				Key = Key.substring( this.__Value.length );
    				Index = this.__contains( Key );
    				if ( -1 !== Index ) {
    					return this._Children[ Index ].find( Key );
    				} else {
    					return null;
    				}
    			} else {
    				return null;
    			}
    		} else {
    			return null;
    		}
    	} else {
    		Index = this.__contains( Key );
    		if ( -1 !== Index ) {
    			return this._Children[ Index ].find( Key );
    		} else {
    			return null;
    		}
    	}
    }

    contains( Key, Exact = false ) {
    	const Node = this.find( Key );
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

    getValues() {
    	let Index, Child;
    	const Output = [];
    	if ( null !== this._Children && 0 < this._Children.length ) {
    		for ( Child in this._Children ) {
    			Output.push( this._Children[ Child ].getValues() );
    		}

    		if ( 0 < Output.length ) {
    			if ( null !== this.__Value && 0 < this.__Value.length ) {

    				for ( Index in Output ) {
    					Output[ Index ] = this.__Value + Output[ Index ];
    				}
    			}
    		}

    		if ( true === this.__IsEnding && 0 < this.__Value.length ) {
    			Output.append( this.__Value );
    		}

    	}

    	return Output.sort();
    }
}
