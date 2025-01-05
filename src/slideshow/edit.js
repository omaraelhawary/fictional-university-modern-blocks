import { InnerBlocks, useBlockProps } from "@wordpress/block-editor"

export default function Edit(props) {
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <div style={{ padding: "2rem", backgroundColor: "#333" }}>
                <p style={{ textAlign: "center", fontSize: "2rem", color: "#fff" }}>Slideshow</p>
                <InnerBlocks allowedBlocks={['ourblocktheme/slide']} />
            </div>
        </div>
    )
}
