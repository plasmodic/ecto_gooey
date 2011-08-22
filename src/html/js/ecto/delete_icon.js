function DeleteIcon(raphael) {
    var curr_delete_icon = this;
    this.icon = raphael.image('image/trash.png', 100, 100, 32, 32);
    this.icon.attr('opacity',0);
    this.icon.node.setAttribute('class','trash_image');
    this.icon.toFront();

    // type can be cell or io_edge, id the matching Cell or IoEdge id
    this.hovered_object = {'type': undefined, 'id': undefined};

    // Delete the appropriate object when clicking the icon
    $(this.icon.node).click(function(e) {
        // When clicking on the icon, delete the cell and hide the icon
        var hovered_object = curr_delete_icon.hovered_object;
        switch (hovered_object['type']) {
            case 'cell':
                MainTissue.DeleteCell(hovered_object['id']);
                break;
            case 'io_edge':
                MainTissue.DeleteIoEdge(hovered_object['id']);
                break;
        };
        curr_delete_icon.Hide();
    });
}

////////////////////////////////////////////////////////////////////////////////

DeleteIcon.prototype.Hide = function() {
    this.icon.animate({'opacity':0}, AnimationFast);
};

////////////////////////////////////////////////////////////////////////////////

DeleteIcon.prototype.Show = function() {
    this.icon.animate({'opacity':1}, AnimationFast);
};

////////////////////////////////////////////////////////////////////////////////

/** Reposition and display the delete icon, centered at x,y
 */
DeleteIcon.prototype.Update = function(type, id, x, y) {
    this.hovered_object = {'type': type, 'id': id};
    this.icon.attr('x', x-16).attr('y', y-16);
    this.icon.animate({'opacity':1}, AnimationFast);
};
