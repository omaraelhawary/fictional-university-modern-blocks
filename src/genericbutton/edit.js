import ourColors from "../../inc/ourcolors"
import { link } from "@wordpress/icons"
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { RichText, InspectorControls, BlockControls, __experimentalLinkControl as LinkControl, getColorObjectByColorValue, useBlockProps } from "@wordpress/block-editor"
import { useState } from "@wordpress/element"

export default function Edit(props) {
    const blockProps = useBlockProps();

    const [isLinkPickerVisiable, setIsLinkPickerVisiable] = useState(false);

    function handleTextChange(x) {
        props.setAttributes({ text: x })
    }

    function buttonHandler() {
        setIsLinkPickerVisiable(prev => !prev)
    }

    function handleLinkChange(newLink) {
        props.setAttributes({ linkObj: newLink })
    }

    const currentColorValue = ourColors.filter(color => {
        return color.name === props.attributes.colorName
    })[0].color

    function handleColorChange(colorCode) {
        //from the hex value that the color palette gives us, we need to convert it to a name
        const { name } = getColorObjectByColorValue(ourColors, colorCode)
        props.setAttributes({ colorName: name })
    }


    return (
        <div {...blockProps}>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={buttonHandler} icon={link} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton onClick={() => props.setAttributes({ size: "large" })} isPressed={props.attributes.size === "large"}>Large</ToolbarButton>
                    <ToolbarButton onClick={() => props.setAttributes({ size: "medium" })} isPressed={props.attributes.size === "medium"}>Medium</ToolbarButton>
                    <ToolbarButton onClick={() => props.setAttributes({ size: "small" })} isPressed={props.attributes.size === "small"}>Small</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title="Colors" initialOpen={true}>
                    <PanelRow>
                        <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            <RichText allowedFormats={[]} tagName="a" className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`} value={props.attributes.text} onChange={handleTextChange} />
            {isLinkPickerVisiable && (
                <Popover position="middle center" onFocusOutside={() => setIsLinkPickerVisible(false)}>
                    <LinkControl settings={[]} value={props.attributes.linkObj} onChange={handleLinkChange} />
                    <Button variant="primary" onClick={() => setIsLinkPickerVisiable(false)} style={{ display: "block", width: "100%" }}>Assign Link</Button>
                </Popover >
            )
            }
        </div>
    )
}