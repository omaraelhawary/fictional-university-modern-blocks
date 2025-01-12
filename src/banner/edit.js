import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"

export default function Edit(props) {
    const blockProps = useBlockProps();

    useEffect(function () {
        if (!props.attributes.imageURL) {
            props.setAttributes({ imageURL: ourThemeData.themePath + "/images/library-hero.jpg" })
        }
    }, [])

    useEffect(() => {
        async function go() {
            if (props.attributes.imageID) {
                try {
                    const response = await apiFetch({
                        path: `/wp/v2/media/${props.attributes.imageID}`,
                        method: 'GET'
                    });
                    props.setAttributes({ imageURL: response.media_details.sizes.pageBanner.source_url });
                } catch (error) {
                    console.error("Failed to fetch media details:", error);
                }
            }
        }
        go()
    }, [props.attributes.imageID])

    function onFileSelect(x) {
        props.setAttributes({ imageID: x.id })
    }

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Background" initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onFileSelect}
                                value={props.attributes.imageID}
                                render={({ open }) => {
                                    return <Button onClick={open}>Upload Image</Button>
                                }}
                            />
                        </MediaUploadCheck>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div className="page-banner">
                <div className="page-banner__bg-image" style={{ backgroundImage: `url('${props.attributes.imageURL}')` }}></div>
                <div className="page-banner__content container t-center c-white">
                    <InnerBlocks allowedBlocks={["ourblocktheme/genericheading", "ourblocktheme/genericbutton"]} />
                </div>
            </div>
        </div>
    )
}
