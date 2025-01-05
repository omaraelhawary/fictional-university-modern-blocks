import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls, useBlockProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks";

export default function Edit(props) {
    const blockProps = useBlockProps();

    function handleTextChange(x) {
        props.setAttributes({ text: x })
    }

    return (
        <div {...blockProps}>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={() => props.setAttributes({ size: "large" })} isPressed={props.attributes.size === "large"}>Large</ToolbarButton>
                    <ToolbarButton onClick={() => props.setAttributes({ size: "medium" })} isPressed={props.attributes.size === "medium"}>Medium</ToolbarButton>
                    <ToolbarButton onClick={() => props.setAttributes({ size: "small" })} isPressed={props.attributes.size === "small"}>Small</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <RichText allowedFormats={["core/bold", "core/italic"]} tagName="h1" className={`headline headline--${props.attributes.size}`} value={props.attributes.text} onChange={handleTextChange} />
        </div>
    )
}