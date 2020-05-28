'use strict';
(function () {
    window.Alight = window.Alight || {};
    window.Alight.Controls = window.Alight.Functions || {};

    window.Alight.Controls.Script = (function () {

        return function () {

            var Controller = {

                Data: {
                    dateNow: null,

                    Form: {

                        form: null,
                        msg: null,
                        chatpartner: null,
                        messages: []
                    },

                    Chatbox: {
                        template: null,
                        renderData: null
                    }
                },

                Html: {

                    Elements: {

                        clrbtn: null
                    },

                    Buttons: {

                        initclrbtn: function () {

                            // make the clear button clear the localstorage.
                            Controller.Html.clrbtn = document.getElementById('clearStorage');
                            Controller.Html.clrbtn.onclick = function () {
                                localStorage.clear();
                                $("#messages").html("");
                            }
                        }
                    }
                },

                LocalStorage: {

                    Events: {
                    }
                },

                Methods: {

                    start: function () {

                        console.log("Script started");

                        // render messages
                        if (localStorage.messages != null) {
                            Controller.Data.Chatbox.renderData = JSON.parse(localStorage.messages);
                            Controller.Data.Chatbox.template = $.templates("#msgTmpl");
                            Controller.Methods.Form.render();
                        };

                        Controller.Methods.Form.submit();
                        Controller.Html.Buttons.initclrbtn();
                    },

                    Form: {

                        updateLocalStorage: function () {
                            Controller.Data.Form.messages.push({ "message": Controller.Data.Form.msg.value, "time": Controller.Data.dateNow, "cp": Controller.Data.Form.chatpartner.value });
                            localStorage.messages = JSON.stringify(Controller.Data.Form.messages);
                        },

                        registerMessage: function () {
                            // If there is no the localStorage is empty we create one.
                            if (localStorage.messages == null) {
                                Controller.Data.Form.messages = [];
                                Controller.Methods.Form.updateLocalStorage();
                            }

                            // Here we add the message to a existing localStorage. 
                            else {
                                Controller.Data.Form.messages = JSON.parse(localStorage.messages);
                                Controller.Methods.Form.updateLocalStorage();
                            };
                        },

                        submit: function () {

                            Controller.Data.Form.form = document.getElementById('messageForm');

                            Controller.Data.Form.form.onsubmit = function (e) {
                                e.preventDefault();

                                // get data from form
                                Controller.Data.Form.msg = Controller.Data.Form.form.msg;
                                Controller.Data.Form.chatpartner = Controller.Data.Form.form.chatpartner;

                                Controller.Methods.getDateNow();
                                Controller.Methods.Form.registerMessage();

                                // define data for render
                                Controller.Data.Chatbox.renderData = JSON.parse(localStorage.messages);
                                Controller.Data.Chatbox.template = $.templates("#msgTmpl");
                                Controller.Methods.Form.render();

                                //clear txt box
                                document.getElementById('msg').value = "";
                                this.reset;
                            }
                        },

                        render: function () {

                            var template = Controller.Data.Chatbox.template;
                            var htmlOutput = template.render(Controller.Data.Chatbox.renderData);
                            $("#messages").html(htmlOutput);
                        }
                    },

                    getDateNow: function () {

                        // get current date and time
                        var today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                        Controller.Data.dateNow = date + ' ' + time;
                    }
                }
            }
            Controller.Methods.start();
        }
    })();
})();

$(document).ready(function () {
    window.Alight.Controls.Script();
});