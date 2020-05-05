/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import InspectorControls from '../inspector-controls';
import useEditorFeature from '../use-editor-feature';

export default function SpacingPanelControl( { children, ...props } ) {
	const isSpacingEnabled = useEditorFeature(
		'__experimentalEnableCustomSpacing'
	);
	// TODO: Renable the proper guard
	// This is temporarily disabled for testing purposes.
	if ( isSpacingEnabled ) return null;
	// if ( ! isSpacingEnabled ) return null;

	return (
		<InspectorControls { ...props }>
			<PanelBody title={ __( 'Spacing' ) }>{ children }</PanelBody>
		</InspectorControls>
	);
}
