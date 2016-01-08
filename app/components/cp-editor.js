/**
 * tinymce所有可用配置,参考以下链接
 * http://archive.tinymce.com/wiki.php/Configuration
 */
var eget = Ember.get;
var fileObject = Ember.Object.extend({
    progress: 0,
    progressStyleString: function() {
        return "width:" + this.get("progress") + "%";
    }.property("progress")
});
export default Ember.Component.extend({
    init: function() {
        this.setProperties({
            toolbarId: Ember.generateGuid(),
            textareaId: Ember.generateGuid(),
            uploaderId: Ember.generateGuid(),
            imageModalId: Ember.generateGuid()
        });
        this._super();
    },
    enableImage: true,
    initValueBinding: Ember.Binding.oneWay("value"),
    imageModalIdSelector: function() {
        return "#" + this.get("imageModalId");
    }.property("imageModalId"),
    //onImagesUploaded: function () {
    //  var self = this, completedImages = [];
    //  this.get("imageStore").forEach((item)=> {
    //    if (item.get("progress") === 100) {
    //      self.get("editor").composer.commands.exec("insertImage", {src: item.src});
    //      completedImages.pushObject(item);
    //    }
    //  });
    //  this.get("imageStore").removeObjects(completedImages);
    //}.observes("imageStore.@each.progress"),
    didInsertElement() {
        console.log(this.get("config"));
        var self = this,enableImage=this.get("enableImage");
        var toolbars = this.get('toolbars') || `${enableImage?"upimg | ":""} bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | forecolor backcolor`;
        var editor = tinymce.init(Ember.merge({
            selector: "#" + this.get("textareaId"),
            plugins: self.get('plugins') || [
                `link ${enableImage?"image":''} lists charmap preview hr `,
                "visualchars insertdatetime nonbreaking",
                "table contextmenu textcolor"
            ],
            default_link_target: "_blank",
            //menu : { // this is the complete default configuration
            //  //edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
            //  insert : {title : 'Insert', items : 'link media | template hr'},
            //  //view   : {title : 'View'  , items : 'visualaid'},
            //  format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
            //  table  : {title : 'Table' , items : 'inserttable tableprops deletetable | cell row column'},
            //  tools  : {title : 'Tools' , items : 'spellchecker code'}
            //},
            //remove_trailing_brs: true,
            //forced_root_block: false,
            content_css: "http://cdnjscn.b0.upaiyun.com/libs/twitter-bootstrap/3.2.0/css/bootstrap.css",
            menubar: false,
            image_advtab: true,
            elementpath: false,
            // toolbar: "upimg | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image | forecolor backcolor",
            toolbar: toolbars,
            removed_menuitems: 'newdocument',
            relative_urls: false,
            // language: "zh_CN",
            setup: function(editor) {
                //editor.setContent(self.get("value"));
                self.set("editor", editor);
                editor.on("change", function() {
                    self.set("value", editor.getContent().replace(new RegExp('\r?\n', 'g'), ''));
                });
                editor.addButton('upimg', {
                    text: '上传图片',
                    onclick: function() {
                        self.showImageUploadModal.call(self);
                    }
                });

                self.sendAction("onInit", editor);
            }
        },this.get("config")));
            //var editor = new wysihtml5.Editor(eget(this, "textareaId"), { // id of textarea element
            //  toolbar: eget(this, "toolbarId"), // id of toolbar element
            //  parserRules: wysihtml5ParserRules, // defrser rules set
            //  stylesheets: ["http://udeskpub.qiniudn.com/wysiwyg.css"]
            //});
            //editor.on("change", function () {
            //  self.set("value", editor.getValue());
            //});
    },
    showImageUploadModal() {
        var self = this;
        Ember.$(this.get("imageModalIdSelector")).modal("show").on("shown.bs.modal", function() {
            if (self.get("image-uploader")) return;
            self.initImageUploader();
        }).on("hidden.bs.modal", function() {
            self.get("imageStore").invoke("set", "selected", false);
        });
    },
    initImageUploader() {
        this.set("image-uploader", WebUploader.create({
            pick: {
                id: "#" + this.get("uploaderId")
            },
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            },
            auto: true,
            server: "http://www.cssbus.com:8000/blog_interface/upload_img",
            // formData: {
            //     token: this.get('uploadToken')
            // },
            thumb: {
                width: 110,
                height: 110,
                quality: 70,
                allowMagnify: true,
                crop: true
            },
            compress: false
        }));
        var uploader = this.get("image-uploader");
        uploader.on('fileQueued', this.fileQueued, this);
        uploader.on('uploadProgress', this.uploadProgress, this);
        uploader.on("uploadSuccess", this.uploadSuccess, this);
        uploader.on('uploadError', this.uploadError, this);
        uploader.on("error", this.error, this);
        uploader.on("uploadAccept", this.uploadAccept, this);
    },
    progress: 0,

    progressStyleString: function() {
        return "width:" + this.get("progress") + "%";
    }.property("progress"),

    images: [],
    fileQueued(file) {
        var imageObject = fileObject.create(file);
        this.get("image-uploader").makeThumb(file, function(error, ret) {
            if (!error) {
                imageObject.set("thumb", ret);
            }
        });
        this.get("imageStore").insertAt(0, imageObject);


        //Ember.$(".progress").show();
    },

    uploadProgress(file, percentage) {
        var per = (percentage * 100).toFixed(1);
        this.get("imageStore").findBy("id", file.id).set("progress", per > 99 ? 99 : per);
    },
    uploadSuccess(file, resp) {
        var fileObj = this.get("imageStore").findBy("id", file.id);
        fileObj.set("progress", 100);
        fileObj.set("src", resp.src);
        fileObj.set("selected", true);
    },
    uploadError() {

    },
    error() {

    },
    uploadAccept() {

    },
    willDestroyElement() {
        this.get("image-uploader") && this.get("image-uploader").destroy();
        this.get("editor").destroy();
        var unCompleteImg = this.get("imageStore").filter((item) => item.get("progress") < 100);
        this.get("imageStore").removeObjects(unCompleteImg);
        this.sendAction("onDestroy", this, this.get("editor"));
    },
    actions: {
        insertImages() {
            var selectedImages = this.get("imageStore").filterBy("selected", true);
            this.get("editor").focus();
            var editor = this.get("editor");
            selectedImages.forEach(function(item) {
                editor.insertContent('<img src="' + item.get("src") + '" data-mce-src="' + item.get('src') + '" >');
            });
            Ember.$(this.get("imageModalIdSelector")).modal("hide");
        }
    }
});