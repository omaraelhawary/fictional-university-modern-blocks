wp.blocks.registerBlockType("ourblocktheme/singleprogram", {
    title: "Single Program",
    edit: function () {
        return wp.element.createElement("div", { className: "our-placeholder-block" }, "Single Program Placeholder")
    },
    save: function () {
        return null
    }
})