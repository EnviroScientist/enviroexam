// 发送 GET 请求获取用户登录状态
fetch('../app/check_login.php')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // 用户已登录，显示用户名
            document.getElementById('loginMsg').textContent = 'Current user:' + data.username;
            $('#username_display').text(data.username);
            document.getElementById('loginMsg').style.display = 'inline-block'
            document.getElementById('logoutBtn').style.display = 'inline-block';
            document.getElementById('loginBtn').style.display = 'none';
            document.getElementById('registerBtn').style.display = 'none';
        } else {
            // 用户未登录，显示登录注册按钮
            document.getElementById('logoutBtn').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'inline-block';
            document.getElementById('registerBtn').style.display = 'inline-block';
        }
    });

function updateFilename() {
    // const fileInput = $("#fileInput")[0];
    const filename = fileInput.files[0].name;
    const filenameInput = $("#filenameInput");
    filenameInput.val(filename);
}

$(document).ready(function () {
    var uploadedFilePath; // 保存上传文件的路径
    var createdFileTime; // 保存上传文件的路径
    // 初始化可排序表格
    $("#submissionsTable").tablesorter();
    // 上传文件
    $("#uploadForm").on("submit", function (e) {
        const maxFileSize = 2 * 1024 * 1024; // 10MB
        const fileInput = document.getElementById('fileInput');
        const file_cons = fileInput.files[0];
        if (file_cons.size === 0) {
            alert('The file is empty!');
            return;
        } else if (file_cons && file_cons.size > maxFileSize) {
            alert("File size cannot exceed 2MB!");
            return;
        } else {
            e.preventDefault();
            var formData = new FormData(this);
            $.ajax({
                url: "../app/upload_file.php",
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (fileInfo) {
                    try {
                        //  var fileInfo = JSON.parse(data);
                        if (fileInfo.error === "success") {
                            // 达到上传限制
                            alert(fileInfo.message);
                        } else {
                            uploadedFilePath = fileInfo.uploadFile;
                            createdFileTime = fileInfo.createdAt;
                            console.log(uploadedFilePath);
                            console.log(formData);
                            console.log(createdFileTime); // 输出文件创建时间
                            alert("File uploaded successfully!");
                        }
                    } catch (e) {
                        $('#result').html('Error occurred while parsing server response:' + e.message);
                        //      console.log('Invalid JSON: ', data);
                    }
                },
                error: function () {
                    alert("Error uploading file! Please refresh and select file again!");
                }
            });
        }
    });

    // 处理文件
    $("#processBtn").on("click", function () {
        $.ajax({
            url: "../app/process_file.php",
            type: "POST",
            data: {
                uploadFile: uploadedFilePath, // 上传文件的路径
                createdAt: createdFileTime // 文件创建时间
            },
            success: function (response) {
                if (response.error === "success") {
                    // 达到上传总数限制或者直接点击process按钮没有经过upload
                    alert(response.message);
                } else {
                    // console.log(response.status);
                    // console.log(response.message);
                    alert("File processed successfully!");
                    loadSubmissions();
                }
            },
            error: function () {
                alert("Error processing file! Please check your file or contact with us");
            }
        });
    });

    // 加载提交记录
    function loadSubmissions() {
        $.ajax({
            url: "../app/get_submissions.php",
            type: "GET",
            dataType: "json",
            success: function (response) {
                $("#submissionsTable tr:not(:first)").remove();
                $.each(response, function (index, submission) {
                    var row = $("<tr>");
                    row.append($("<td>").text(submission.id));
                    row.append($("<td>").text(submission.stem_accuracy));
                    row.append($("<td>").text(submission.social_sciences_accuracy));
                    row.append($("<td>").text(submission.humanities_accuracy));
                    row.append($("<td>").text(submission.others_accuracy));
                    row.append($("<td>").text(submission.average_accuracy));
                    row.append($("<td>").text(submission.hard_average_accuracy));
                    // 获取下载内容
                    var parts = submission.details_url.split('/');
                    var userId = parts[4];
                    var createTime = parts[5];
                    // var createTime = parts[5].substring(0, parts[5].lastIndexOf('/'));
                    var detailsLink = $("<a>").attr("href", "../app/download.php?userId=" + userId + '&createTime=' + createTime);
                    // var detailsLink = $("<a>").attr("href", submission.details_url).attr("download", "");
                    row.append($("<td>").append(detailsLink.text("Download")));
                    //row.append($("<td>").text(submission.details_url));
                    row.append($("<td>").text(submission.created_at));

                    var deleteBtn = $("<button>").text("Delete");
                    deleteBtn.on("click", function () {
                        $.ajax({
                            url: "../app/delete_submission.php",
                            type: "POST",
                            data: {id: submission.id},
                            success: function (response) {
                                if (response.error === "success") {
                                    // 无法删除当天记录
                                    alert(response.message);
                                } else {
                                    alert("Submission deleted successfully!");
                                    loadSubmissions();
                                }
                            },
                            error: function () {
                                alert("Error deleting submission! Please re-login!");
                            }
                        });
                    });
                    row.append($("<td>").append(deleteBtn));
                    // $("#submissionsTable").append(row);
                    $("#submissionsTable tbody").append(row);
                });
                // 重新应用 tablesorter 插件
                $("#submissionsTable").trigger("update");
            },
            error: function () {
                alert("Error loading submissions! Please re-login!");
                window.location = location.origin + '/index.html';
            }
        });
    }

    loadSubmissions();
});