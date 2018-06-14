import Utils from '../../Utils'
import { TypeErrorException } from './BaseExceptions'

class DomHelper {

	static computeWidth( Element ) {
		let PaddingX = parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'padding-left' ).replace( 'px', '' ) );
		PaddingX += parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'padding-right' ).replace( 'px', '' ) );
		PaddingX += parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'border-right-width' ).replace( 'px', '' ) );
		PaddingX += parseInt( window.getComputedStyle( Element, null ).getPropertyValue( 'border-left-width' ).replace( 'px', '' ) );
		return Element.offsetWidth - PaddingX;
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
		DomHelper.addAttribute( Element, 'class', ElementClass)
	}

	static removeClass( Element, ElementClass ) {
		DomHelper.removeFromAttribute(Element, 'class', ElementClass)
	}

	static addStyle( Element, Style ) {
		DomHelper.addAttribute( Element, 'Style', Style)
	}

	static removeStyle( Element, Style ) {
		DomHelper.removeFromAttribute( Element, 'style', Style)
	}
}

class DomEffectsStatics {

	static scrollToY( To, Hook ) {
		let ScrollTo;
		if ( To < window.pageYOffset ) {
			if ( To-1 < window.pageYOffset ) {
				ScrollTo = window.pageYOffset >> 1
				if( To > ScrollTo ) {
					window.scrollTo( 0, ScrollTo - 1 );
				}
				else {
					window.scrollTo( 0, ScrollTo )
				}
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
					DomHelper.addStyle( Element, `height:${ Start - 1 }px; overflow:hidden;` );
				}
				else
				{
					DomHelper.addStyle( Element, `height:${ Halfed }px; overflow:hidden;` );
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

class DomEffects extends DomEffectsStatics {
	__RootElement;
	__Element;
	__VisibilityRangeElements;
	__ElementWidth;
	__RootWidth;
	__AuxilaryClasses;
	__ResetClasses;
	__ResetStyle;
	__LastComputedElementWidth;
	__LastComputedElementTop;

	constructor( Element, VisibilityRangeElements, Root=null, AuxilaryClasses = [] )
	{
		super()
		this.setField( Element, VisibilityRangeElements, Root, AuxilaryClasses )
		this.__ResetClasses = '';
		this.__ResetStyle = ''
	}

	setResetStyle( Style )
	{
		this.__ResetStyle = Style.join('; ')
	}

	setResetClasses( Classes )
	{
		this.__ResetClasses = Classes.join(' ')
	}

	setField( Element, VisibilityRangeElements, Root=null, AuxilaryClasses = [] )
	{
		this.__Element = Element
		this.__VisibilityRangeElements = VisibilityRangeElements
		this.__RootElement = Root
		this.__getCurrentWidth()
		this.__AuxilaryClasses = ''
		if( 0 < AuxilaryClasses.length )
		{
			this.__AuxilaryClasses = AuxilaryClasses.join(' ')
		}
	}

	__getCurrentWidth()
	{
		if( true === Utils.isEmpty( this.__RootElement ) ) {
			this.__RootWidth = window.innerWidth;
		}
		else {
			this.__RootWidth = DomHelper.computeWidth( this.__RootElement );
		}
		this.__ElementWidth = DomHelper.computeWidth( this.__Element );
	}

	__removeStyleAndClass()
	{
		if( 0 < this.__ResetStyle )
		{
			this.__Element.setAttribute( 'style', this.__ResetStyle )
		}
		else
		{
			this.__Element.removeAttribute('style')
		}

		if( 0 < this.__ResetClasses.length ) {
			this.__Element.setAttribute( 'class', this.__ResetClasses )
		}
		else
		{
			this.__Element.removeAttribute('class')
		}
	}

	sticky() {
		var CurrentRootElementWidth;
		const VisibilityChecker = [
			DomHelper.getPositionY( this.__VisibilityRangeElements[ 0 ] ),
			DomHelper.getPositionY( this.__VisibilityRangeElements[ 1 ] )
		];

		if( true === Utils.isEmpty( this.__RootElement ))
		{
			CurrentRootElementWidth = window.innerWidth
		}
		else
		{
			CurrentRootElementWidth = DomHelper.computeWidth( this.__RootElement );
		}

		if ( CurrentRootElementWidth !== this.__RootWidth ) {
			this.__removeStyleAndClass()
			this.__getCurrentWidth()
		}

		if (
			( window.pageYOffset > VisibilityChecker[ 0 ] && DomHelper.getWindowPositionY() < VisibilityChecker[ 1 ] ) ||
			true === DomHelper.isElementInVertical( this.__VisibilityRangeElements[ 1 ] )
		) {
			if ( window.pageYOffset > VisibilityChecker[ 0 ] ) {
				if( 0 < this.__AuxilaryClasses.length )
				{
					this.__Element.setAttribute( 'class', this.__AuxilaryClasses )
				}
				this.__LastComputedElementWidth = `width:${ this.__ElementWidth }px;`
				this.__LastComputedElementTop = `top:${ window.pageYOffset }px;`;
				this.__Element.setAttribute(
					'style',
					`${ this.__LastComputedElementTop } ${ this.__LastComputedElementWidth } `
				);

			} else {
				this.__removeStyleAndClass()
			}
		} else {
			if (
				false === DomHelper.isElementInVertical( this.__VisibilityRangeElements[ 1 ] ) &&
				DomHelper.getWindowPositionY() > DomHelper.getPositionY( this.__VisibilityRangeElements[ 1 ] ) + 100
			) {
				return;
			}
			this.__removeStyleAndClass()
		}
	}
}

export { DomHelper, DomEffects }
