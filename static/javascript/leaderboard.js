
var tbody = document.querySelectorAll("#table-body,#table-body-other");
const links = document.querySelectorAll('a.language');

// 中英文link不同
var isEngPage = 0;
const href = links[2].getAttribute('href');
if (href.includes('leaderboard.html')) {
    isEngPage = 0;
} else if (href.includes('leaderboard_zh.html')) {
    isEngPage = 1;
}
;

// 循环遍历数据并将数据填入到表格中
for (var x = 0; x <tbody.length;x++) {
    for (var i = 0; i < model_data.length; i++) {
        var rowData = model_data[i];
        var row = document.createElement("tr");

        // 循环遍历属性并将数据填入到表格单元格中
        for (var j = 0; j < Object.keys(rowData).length; j++) {
            var cell = document.createElement("td");
            // 如果是第二个元素，创建包含链接的单元格
                if (j === 1) {
                    var method = rowData[Object.keys(rowData)[j]];
                    method_encode = encodeURIComponent(method)
                    var link = document.createElement("a");
                    if (isEngPage == 1) {
                        link.href = `model.html?method=${method_encode}`; // 设置链接到 model#content
                    } else {
                        link.href = `model_zh.html?method=${method_encode}`;
                    }
                    ;
                    link.textContent = method;
                    link.className = "inner-link";
                    link.style.fontSize="12px";
                    cell.appendChild(link);
                    // } else if (j === 3) {
                    //     var paperName = rowData[Object.keys(rowData)[j]];
                    //     var paperLink = rowData[Object.keys(rowData)[j + 1]];
                    //     var link = document.createElement("a");
                    //     link.href = paperLink;
                    //     link.textContent = paperName;
                    //     link.className = "ext-link";
                    //     link.target = "_blank"
                    //     cell.appendChild(link);
                    //     // 跳过下一个元素
                    //     j++;
                } else {
                    cell.textContent = rowData[Object.keys(rowData)[j]];
                }
                row.appendChild(cell);
            }
        var flag =  (rowData[Object.keys(rowData)[3]].includes("API"))||(rowData[Object.keys(rowData)[3]].includes("Weight"))
        //  if ( x==0 && (rowData[Object.keys(rowData)[3]].includes("API"))||(rowData[Object.keys(rowData)[3]].includes("Weight")) )
        //      ||
        // (x==1 &&rowData[Object.keys(rowData)[3]].includes("Private") || rowData[Object.keys(rowData)[3]].includes("Web"))
        // {
        //      tbody[x].appendChild(row);
        // }
        if ( (x == 0 && flag) || (x==1 && !flag)){
            tbody[x].appendChild(row);
        }



    }
}
