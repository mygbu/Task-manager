'use strict';

var titleInput;
//remove trailing slashes
var currentUrl = (window.location.href + "/").replace(/\/*$/, "/");

$(document).ready(function() {
    titleInput = $(".modal-body > input")[0];
    $(titleInput).popover({
        html: true,
        content: '<i class="fa fa-exclamation-triangle" style="color: rgb(253, 133, 98)"></i>Title should not be empty.',
        placement: 'right',
        trigger: 'manual'
    });
    titleInput.onclick = function() {
        $(titleInput).popover('hide');
    }
});

function createNewProject() {
    var name = titleInput.value;
    $.ajax({
        async: false,
        data: {projectTitle: name},
        dataType: "json",
        method: "post",
        url: "/projects/new",
        success: function(res) {
            if (res.url) {
                window.location.href = currentUrl + res.url;
            } else if (res.error) {
                $(titleInput).popover('show');
            }
        },
        complete: function(jqXHR, status) {
            console.info("Server response with " + status);
        }
    });
}

function openProject(project) {
    window.location.href = currentUrl + project.dataset.ouid;
}