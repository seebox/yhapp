(function($) {

    $.fn.html5Uploader = function(options) {

        var crlf = '\r\n';
        var boundary = "html5upload";
        var dashes = "--";

        var settings = {
            "name": "uploadedFile",
            "postUrl": "upload",
            "maxSize": 100,
            "minSize": 0,
            "multiple": true,
            "fileTypes": "",
            "params": {},
            "onClientAbort": $.noop,
            "onClientError": $.noop,
            "onClientLoad": $.noop,
            "onClientLoadEnd": $.noop,
            "onClientLoadStart": $.noop,
            "onClientProgress": $.noop,
            "onServerAbort": $.noop,
            "onServerError": $.noop,
            "onServerLoad": $.noop,
            "onServerLoadStart": $.noop,
            "onServerProgress": $.noop,
            "onServerReadyStateChange": $.noop,
            "onFileError": $.noop,
            "onSuccess": $.noop
        };

        return this.each(function() {

            var $this = $(this);

            if ($.data(this, "settings")) {
                settings = $.extend($.data(this, "settings"), options);
                $.data(this, "settings", settings);
                return;
            }
            if (options) {
                $.extend(settings, options);
            }
            $.data(this, "settings", settings);

            if ($this.is("[type=\"file\"]")) {
                $this.bind("change", function() {
                    var files = this.files;
                    for (var i = 0; i < files.length; i++) {
                        fileHandler(files[i]);
                    }
                });
            } else {
                var $input = $('<input type="file" ' + (settings.multiple ? 'multiple' : '') + ' style="width:0px;height: 0px; visibility: hidden; position: absolute;opacity:0;">').appendTo($this);
                $input.bind("change", function() {

                    if ($(this).val() != "") {
                        var files = this.files;
                        for (var i = 0; i < files.length; i++) {
                            fileHandler($this[0], files[i]);
                        }
                    }
                    $(this).val('');

                });

                $this.bind("click", function() {
                    console.log($this.size());
                    $input[0].click();
                });
                $this.bind("dragenter dragover", function() {
                    return false;
                }).bind("drop", function(e) {
                    var files = e.originalEvent.dataTransfer.files;
                    for (var i = 0; i < files.length; i++) {
                        fileHandler($this[0], files[i]);
                    }
                    return false;
                });
            }
        });

        function fileHandler(target, file) {

            var fileReader = new FileReader();
            var opts = $.data(target, "settings");
            var fileExt = /[^.]+$/.exec(file.name.toLowerCase())[0];

            if (file.size > settings.maxSize * 1024 * 1024) {
                settings.onFileError.apply(target, [file, 101]);
                return false;
            }
            if (file.size < settings.minSize * 1024) {
                settings.onFileError.apply(target, [file, 1012]);
                return false;
            }
            if (settings.fileTypes != "" && settings.fileTypes.indexOf(fileExt) == -1) {
                settings.onFileError.apply(target, [file, 102]);
                return false;
            }
            file.id = "file-" + (new Date()).getTime();

            fileReader.onabort = function(e) {
                settings.onClientAbort.apply(target, [e, file]);
            };
            fileReader.onerror = function(e) {
                settings.onClientError.apply(target, [e, file]);
            };
            fileReader.onload = function(e) {
                settings.onClientLoad.apply(target, [e, file]);
            };
            fileReader.onloadend = function(e) {
                settings.onClientLoadEnd.apply(target, [e, file]);
            };
            fileReader.onloadstart = function(e) {
                settings.onClientLoadStart.apply(target, [e, file]);
            };
            fileReader.onprogress = function(e) {
                settings.onClientProgress.apply(target, [e, file]);
            };

            fileReader.readAsDataURL(file);

            var xmlHttpRequest = new XMLHttpRequest();

            xmlHttpRequest.upload.onabort = function(e) {
                settings.onServerAbort.apply(target, [e, file]);
            };
            xmlHttpRequest.upload.onerror = function(e) {
                settings.onServerError.apply(target, [e, file]);
            };
            xmlHttpRequest.upload.onload = function(e) {
                settings.onServerLoad.apply(target, [e, file]);
            };
            xmlHttpRequest.upload.onloadstart = function(e) {
                settings.onServerLoadStart.apply(target, [e, file]);
            };
            xmlHttpRequest.upload.onprogress = function(e) {
                settings.onServerProgress.apply(target, [e, file]);
            };
            xmlHttpRequest.onreadystatechange = function(e) {
                if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                    settings.onSuccess.apply(target, [xmlHttpRequest.responseText, file]);
                } else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 500) {
                    settings.onServerError.apply(target, [e, file]);
                }
            };

            xmlHttpRequest.open("POST", opts.postUrl, true);

            if (file.getAsBinary) { // Firefox

                var data = dashes + boundary + crlf + "Content-Disposition: form-data;" + "name=\"" + settings.name + "\";" + "filename=\"" + unescape(encodeURIComponent(file.name)) + "\"" + crlf + "Content-Type: application/octet-stream" + crlf + crlf + file.getAsBinary() + crlf + dashes + boundary + dashes;
                xmlHttpRequest.setRequestHeader("Content-Type", "multipart/form-data;boundary=" + boundary);
                xmlHttpRequest.sendAsBinary(data);

            } else if (window.FormData) { // Chrome

                var formData = new FormData();
                formData.append(opts.name, file);
                for (var key in opts.params) {
                    formData.append(key, opts.params[key]);
                }

                xmlHttpRequest.send(formData);

            }
        }

    };

})(jQuery);