import { registerBlockType } from "@wordpress/blocks"
import metadata from "./block.json"

function Edit() {
    return (
        <div>Footer</div>
    )
}

registerBlockType(metadata.name, {
    edit: Edit
})