var Login = function () {

    var handleLogin = function() {
        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                Verification_code:{
                    required: true,
                    is_code: true
                },
                usertype:{
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                },
                usertype:{
                    required: "UserType is required"
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                var data = $("#form1").serialize();
                var submitData = decodeURIComponent(data, true);
                $.ajax({
                    type: "POST",
                    url: "/servlet/loginServlet?",
                    async: false,//true异步传输,false同步传输
                    data :submitData,
                    beforeSend: function () {
                        //请求前
                        $("#login_btn").attr({disabled: "disabled"});//防止重复提交
                    },
                    success: function (result) {
                        //请求成功时
                        switch (result) {
                            case "0":
                                alert("Login failed!!!!! (wrong password)");
                                break;
                            case "1":
                                alert("User type wrong! Please check!!!!!!");
                                break;
                            case "2":
                                alert("The user name wrong! Please check!!!!!!");
                                break;
                            default :
                                alert("login successfully！！");
                                //页面跳转
                                window.location.href = "/views/userInfo.jsp?user="+result;
                                break;
                        }
                    },
                    complete: function () {
                        $("#login_btn").removeAttr('disabled');
                    }
                })
            }

        });

        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {

                }
                return false;
            }
        });
        var code;
        function createCode() {  //函数体
            code = "";
            var codeLength = 4; //验证码的长度
            var checkCode = $("#checkCode");
            var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
            for (var i = 0; i < codeLength; i++)
            {
                var charNum = Math.floor(Math.random() * 52);//设置随机产生
                code += codeChars[charNum];
            }
            if (checkCode)
            {
                checkCode.className = "code";
                checkCode.innerHTML = code;
            }
        }
        jQuery.validator.addMethod("is_code", function(value, element) {
            return this.optional(element) || (value.toLowerCase() == code.toLowerCase());
        }, "Verification code has been filled out wrongly");
    };

    var handleForgetPassword = function () {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "Email is required."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit

            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                form.submit();
            }
        });

        $('.forget-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function () {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    };

    var handleRegister = function () {

        function format(state) {
            if (!state.id) return state.text; // optgroup
            return "<img class='flag' src='../lib/assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
        }

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {

                fullname: {
                    required: true
                },
                usertype:{
                    required:true
                },
                email: {
                    required: true,
                    email: true
                },
                phone_number:{
                    required:true,
                    is_phone: true,
                },
                address: {
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },

                tnc: {
                    required: true
                }
            },

            messages: { // custom messages for radio buttons and checkboxes
                tnc: {
                    required: "Please accept TNC first."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit

            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function (form) {
                var data=$("#form2").serialize();
                var submitData = decodeURIComponent(data,true);
                $.ajax({
                    type: "POST",
                    url: "/servlet/loginServlet?",
                    async: false,//true异步传输,false同步传输
                    data :submitData,
                    beforeSend: function () {
                        //请求前
                        $("#login_btn").attr({disabled: "disabled"});//防止重复提交
                    },
                    success: function (result) {
                        //请求成功时
                        alert(result);
                        window.location.href="/views/login0.jsp";
                    },
                    complete: function () {
                        $("#login_btn").removeAttr('disabled');
                    }
                })
            }
        });

        $('.register-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.register-form').validate().form()) {
                    $('.register-form').submit();
                }
                return false;
            }
        });

        jQuery('#register-btn').click(function () {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });

        jQuery.validator.addMethod("is_phone", function(value, element) {
            var length = value.length;
            var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "Please fill in the correct phone number");
    };

    return {
        //main function to initiate the module
        init: function () {

            handleLogin();
            //handleForgetPassword();
            handleRegister();
        }

    };

}();