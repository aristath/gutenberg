/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	AlignmentToolbar,
	BlockControls,
	Warning,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';

function PostCommentsDisplay( { postId } ) {
	return useSelect(
		( select ) => {
			const comments = select( 'core' ).getEntityRecords(
				'root',
				'comment',
				{
					post: postId,
				}
			);
			// TODO: "No Comments" placeholder should be editable.
			return comments && comments.length
				? comments.map( ( comment ) => (
						<RawHTML
							className="wp-block-post-comments__comment"
							key={ comment.id }
						>
							{ comment.content.rendered }
						</RawHTML>
				  ) )
				: __( 'No comments.' );
		},
		[ postId ]
	);
}

export default function PostCommentsEdit( {
	attributes,
	setAttributes,
	context,
} ) {
	const { postType, postId } = context;
	const { textAlign } = attributes;

	if ( ! postType || ! postId ) {
		return (
			<Warning>{ __( 'Post comments block: no post found.' ) }</Warning>
		);
	}

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>

			<Block.div
				className={ classnames( {
					[ `has-text-align-${ textAlign }` ]: textAlign,
				} ) }
			>
				<PostCommentsDisplay postId={ postId } />
			</Block.div>
		</>
	);
}
