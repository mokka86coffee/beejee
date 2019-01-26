import jQuery from 'jQuery';
export function crossBrowserFetch(link, params) {
    return new Promise((resolve, reject) => {
        jQuery.ajax({
            url: link,
            method: params.method,
            crossDomain: true,
            mimeType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: params.body,
            dataType: "json",
            success: function (data) {
                if (data.status == 'ok') {
                    resolve(data)
                } else {
                    console.log(data);
                }
            }
        });
    });
}