import Utils from '../../Utils'
import { TypeErrorException } from './BaseExceptions'

export default class DomEffects {
	__RootElement;
	__Element;
	__VisibilityRangeElements;
	__ElementWidth;
	__RootWidth;
	__Condition;
	__AdditionalClasses;
	__LastComputedElementWidth;
	__LastComputedElementTop;

	setField( Element, VisibilityRangeElements, Root=null, AddionalClasses = [])
	{
		this.__Element = Element
		this.__VisibilityRangeElements = VisibilityRangeElements
		this.__RootElement = Root
		this.__getCurrentWidth()
		this.__AdditionalClasses = ''
		if( 0 < AddionalClasses.length )
		{
			this.__AdditionalClasses = AddionalClasses.join(' ')
		}
	}

	__getCurrentWidth()
	{
		if( true === Utils.isEmpty( this.__RootElement ) ) {
			this.__RootWidth = window.innerWidth;
		}
		else {
			this.__RootWidth = DomEffects.computeWidth( this.__RootElement );
		}
		this.__ElementWidth = DomEffects.computeWidth( this.__Element );
	}

	resize() {
		this.__Element.removeAttribute( 'class' );
		this.__Element.removeAttribute( 'style' );
		this.__getCurrentWidth()
	}

	static computeWidth( Element ) {
		let PaddingX = parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'padding-left' ).replace( 'px', '' ) );
		PaddingX += parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'padding-right' ).replace( 'px', '' ) );
		PaddingX += parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'border-right-width' ).replace( 'px', '' ) );
		PaddingX += parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'border-left-width' ).replace( 'px', '' ) );
		return Element.offsetWidth - PaddingX;
	}

	__removeStyleAndClass()
	{
		if( 0 < this.__AdditionalClasses.length )
		{
			DomEffects.removeClass( this.__Element, this.__AdditionalClasses )
		}

		DomEffects.removeStyle( this.__Element, `${ this.__LastComputedElementTop } ${ this.__LastComputedElementWidth }` )
	}

	stiky() { // it become a watchdog...I should rename it
		var CurrentRootElementWidth, AdditionalClasses;
		const VisibilityChecker = [
			this.getPositionY( this.__VisibilityRangeElements[ 0 ] ),
			this.getPositionY( this.__VisibilityRangeElements[ 1 ] )
		];

		if( true === Utils.isEmpty( this.__RootElement ))
		{
			CurrentRootElementWidth = window.innerWidth
		}
		else
		{
			CurrentRootElementWidth = DomEffects.computeWidth( this.__RootElement );
		}

		if ( CurrentRootElementWidth !== this.__RootWidth ) {
			this.__RootWidth = CurrentRootElementWidth
			this.__ElementWidth = DomEffects.computeWidth( this.__Element );
		}

		if (
			( window.pageYOffset > VisibilityChecker[ 0 ] && this.getWindowPositionY() < VisibilityChecker[ 1 ] ) ||
			true === this.isElementInVertical( this.__VisibilityRangeElements[ 1 ] )
		) {
			if ( window.pageYOffset > VisibilityChecker[ 0 ] ) {
				if( 0 < this.__AdditionalClasses.length )
				{
					this.__Element.addClass( this.__Element, this.__AdditionalClasses )
				}
				this.__LastComputedElementWidth = `width:${ this.__ElementWidth }px;`
				this.__LastComputedElementTop = `top:${ window.pageYOffset }px;`;
				DomEffects.addStyle(this.__Element, `${ this.__LastComputedElementTop } ${ this.__LastComputedElementWidth } ` );

			} else {
				this.__removeStyleAndClass()
			}
		} else {
			if (
				false === this.isElementInVertical( this.__VisibilityRangeElements[ 1 ] ) &&
				this.getWindowPositionY() > this.getPositionY( this.__VisibilityRangeElements[ 1 ] ) + 100
			) {
				return;
			}
			this.__removeStyleAndClass()
		}
	}

	static getWindowPositionY() {
		return window.pageYOffset + window.innerHeight;
	}

	static getPositionY( Element ) {
		let Top = Element.offsetTop;
		const Height = Element.offsetHeight;

		while ( Element.offsetParent ) {
			Element = Element.offsetParent;
			Top += Element.offsetTop;
		}

		return ( Top + Height );
	}

	static isElementInVertical( Element ) {
		let Top = Element.offsetTop;
		const Height = Element.offsetHeight;
		while ( Element.offsetParent ) {
			Element = Element.offsetParent;
			Top += Element.offsetTop;
		}
		return (
			window.pageYOffset <= Top &&
			( window.pageYOffset + window.innerHeight ) >= ( Top + Height )
		);
	}

	static removeFromAttribute( Element, AttributeLabel, AttributeValue ) {
		const Attribute = Element.getAttribute( AttributeLabel );

		if ( false === Utils.isEmpty( Attribute ) ) {
			AttributeValue = Attribute.replace( AttributeValue, '' ).trim();
			if ( 0 === AttributeValue.length ) {
				Element.removeAttribute( AttributeLabel );
			}
			else {
				Element.setAttribute( AttributeLabel, AttributeValue );
			}

		}
	}

	static addAttribute( Element, AttributeLabel, AttributeValue ) {
		const Attribute = Element.getAttribute( AttributeLabel );

		if ( true !== Utils.isEmpty( Attribute ) ) {
			AttributeValue = `${ Attribute } ${ AttributeValue }`;
		}

		Element.setAttribute( AttributeLabel, AttributeValue );
	}

	static addClass( Element, ElementClass ) {
		DomEffects.addAttribute( Element, 'class', ElementClass)
	}

	static removeClass( Element, ElementClass ) {
		DomEffects.removeFromAttribute(Element, 'class', ElementClass)
	}

	static addStyle( Element, Style ) {
		DomEffects.addAttribute( Element, 'Style', Style)
	}

	static removeStyle( Element, Style ) {
		DomEffects.removeFromAttribute( Element, 'style', Style)
	}

	static scrollToZero( Hook ) {
		let ScrollTo;
		if ( 0 < window.pageYOffset ) {
			if ( 1 < window.pageYOffset ) {
				ScrollTo = window.pageYOffset >> 1;
				window.scrollTo( 0, ScrollTo );
				return false;
			} else {
				Hook()
				window.scrollTo( 0, 0 );
				return true;
			}
		} else {
			return true;
		}
	}

	static shrink( Element, To, Maximum ) {
		var Start, Halfed
		if ( 0 < Element.offsetHeight ) {
			if ( Maximum <= Element.offsetHeight ) {
				if ( 1 & Maximum ) {
					Start = Maximum - 1;
				} else {
					Start = Maximum;
				}
			}
			else
			{
				Start = Element.offsetHeight
			}

			if ( To < Start ) {
				Halfed = Start >> 1
				if( Halfed < To)
				{
					DomEffects.addStyle( Element, `height:${ Start - 1 }px; overflow:hidden;`;
				}
				else
				{
					DomEffects.addStyle( Element, `height:${ Halfed }px; overflow:hidden;`;
				}
				return false;
			}
			else
			{
				return true;
			}
		} else {
			return true;
		}
	}
}
