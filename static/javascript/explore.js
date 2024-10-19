// let topics = ['all', 'biology', 'capitalization', 'chemistry', 'civics', 'culture', 'earth-science', 'economics', 'figurative-language', 'geography', 'global-studies', 'grammar', 'literacy-in-science', 'phonological-awareness', 'physics', 'pronouns', 'punctuation', 'reading-comprehension', 'reference-skills', 'science-and-engineering-practices', 'units-and-measurement', 'us-history', 'verbs', 'vocabulary', 'word-study', 'world-history', 'writing-strategies'];
// 中英文处理 根据链接判断
var isEngPage = 0;
const links = document.querySelectorAll('a.language');
const href = links[2].getAttribute('href');
if (href.includes('explore.html')) {
    isEngPage = 0;
} else if (href.includes('explore_zh.html')) {
    isEngPage = 1;
}
;

let topics;
let subjects;
let topic_dd;
let subject_dd;

if (isEngPage == 0) {
    topics = [
        '计算机网络', '操作系统',
        '计算机组成', '大学编程',
        '大学物理', '大学化学',
        '高等数学', '概率统计',
        '离散数学', '注册电气工程师',
        '注册计量师', '高中数学',
        '高中物理', '高中化学',
        '高中生物', '初中数学',
        '初中生物', '初中物理',
        '初中化学', '兽医学',
        '大学经济学', '工商管理',
        '马克思主义基本原理', '毛泽东思想和中国特色社会主义理论体系概论',
        '教育学', '基础医学',
        '教师资格', '高中政治',
        '高中地理', '初中政治',
        '初中地理', '大学中国史',
        '思想道德修养与法律基础', '逻辑学',
        '法学', '中国语言文学',
        '艺术学', '导游资格',
        '法律职业资格', '高中语文',
        '高中历史', '初中历史',
        '公务员', '体育学',
        '植物保护', '临床医学',
        '注册城乡规划师', '注册会计师',
        '注册消防工程师', '环境影响评价工程师',
        '税务师', '医师资格'
    ]
    subjects = ['all', 'STEM', '社会科学', '人文科学', '其他'];
    topic_dd = make_dropdown("选择一个科目:", topics, "topic-dd");
    subject_dd = make_dropdown("选择一个总类别:", subjects, "subject-dd");
} else {
    topics = [
        'Computer Network', 'Operating System',
        'Computer Architecture', 'College Programming',
        'College Physics', 'College Chemistry',
        'Advanced Mathematics', 'Probability and Statistics',
        'Discrete Mathematics', 'Electrical Engineer',
        'Metrology Engineer', 'High School Mathematics',
        'High School Physics', 'High School Chemistry',
        'High School Biology', 'Middle School Mathematics',
        'Middle School Biology', 'Middle School Physics',
        'Middle School Chemistry', 'Veterinary Medicine',
        'College Economics', 'Business Administration',
        'Marxism', 'Mao Zedong Thought', 'Education Science',
        'Teacher Qualification', 'High School Politics',
        'High School Geography', 'Middle School Politics',
        'Middle School Geography', 'Modern Chinese History',
        'Ideological and Moral Cultivation', 'Logic', 'Law',
        'Chinese Language and Literature', 'Art Studies',
        'Professional Tour Guide', 'Legal Professional',
        'High School Chinese', 'High School History',
        'Middle School History', 'Civil Servant',
        'Sports Science', 'Plant Protection',
        'Basic Medicine', 'Clinical Medicine',
        'Urban and Rural Planner', 'Accountant',
        'Fire Engineer', 'Environmental Impact Assessment Engineer',
        'Tax Accountant', 'Physician'
    ]
    subjects = ['all', 'STEM', 'Social Science', 'Humanities', 'Other'];
    topic_dd = make_dropdown("Choose a subject:", topics, "topic-dd");
    subject_dd = make_dropdown("Choose a super category:", subjects, "subject-dd");
}
// let has_img = ['both', 'yes', 'no'];
// let has_hint = ['both', 'yes', 'no'];
// let has_lec = ['both', 'yes', 'no'];
// let has_sol = ['both', 'yes', 'no'];


let optbtn = document.getElementsByClassName("optionsbtn")[0];
let closebtn = document.getElementsByClassName("closebtn")[0];
let optionpanel = document.getElementById("option-panel");
let body = document.getElementById("content-body");
let display = document.getElementById("display");
let optboxes = document.getElementsByClassName("optbox");
let opt_dds = document.getElementsByClassName("opt-dd");
let filter_submit = document.getElementById("filter-submit");

optboxes[0].innerHTML += subject_dd;
optboxes[0].innerHTML += topic_dd;
// optboxes[0].innerHTML += grade_dd;
// optboxes[0].innerHTML += img_dd;
// optboxes[0].innerHTML += hint_dd;
// optboxes[0].innerHTML += lec_dd;
// optboxes[0].innerHTML += sol_dd;

// 获取 subject_dd 和 topic_dd 元素
subject_dd = document.getElementById("subject-dd");
topic_dd = document.getElementById("topic-dd");
var topics_by_subject

if (isEngPage == 1) {
// 定义主题选项的对象，其中每个键都是一个大类别，对应的值是该类别下的主题数组
    topics_by_subject = {
        "STEM": ['all', 'Computer Network', 'Operating System',
            'Computer Architecture', 'College Programming',
            'College Physics', 'College Chemistry',
            'Advanced Mathematics', 'Probability and Statistics',
            'Discrete Mathematics', 'Electrical Engineer',
            'Metrology Engineer', 'High School Mathematics',
            'High School Physics', 'High School Chemistry',
            'High School Biology', 'Middle School Mathematics',
            'Middle School Biology', 'Middle School Physics',
            'Middle School Chemistry', 'Veterinary Medicine'],
        "Social Science": ['all', 'College Economics', 'Business Administration',
            'Marxism', 'Mao Zedong Thought', 'Education Science',
            'Teacher Qualification', 'High School Politics',
            'High School Geography', 'Middle School Politics',
            'Middle School Geography'],
        "Humanities": ['all', 'Modern Chinese History',
            'Ideological and Moral Cultivation', 'Logic', 'Law',
            'Chinese Language and Literature', 'Art Studies',
            'Professional Tour Guide', 'Legal Professional',
            'High School Chinese', 'High School History',
            'Middle School History'],
        "Other": ['all', 'Civil Servant',
            'Sports Science', 'Plant Protection',
            'Basic Medicine', 'Clinical Medicine',
            'Urban and Rural Planner', 'Accountant',
            'Fire Engineer', 'Environmental Impact Assessment Engineer',
            'Tax Accountant', 'Physician'],
        "all": [
            'Computer Network', 'Operating System',
            'Computer Architecture', 'College Programming',
            'College Physics', 'College Chemistry',
            'Advanced Mathematics', 'Probability and Statistics',
            'Discrete Mathematics', 'Electrical Engineer',
            'Metrology Engineer', 'High School Mathematics',
            'High School Physics', 'High School Chemistry',
            'High School Biology', 'Middle School Mathematics',
            'Middle School Biology', 'Middle School Physics',
            'Middle School Chemistry', 'Veterinary Medicine',
            'College Economics', 'Business Administration',
            'Marxism', 'Mao Zedong Thought', 'Education Science',
            'Teacher Qualification', 'High School Politics',
            'High School Geography', 'Middle School Politics',
            'Middle School Geography', 'Modern Chinese History',
            'Ideological and Moral Cultivation', 'Logic', 'Law',
            'Chinese Language and Literature', 'Art Studies',
            'Professional Tour Guide', 'Legal Professional',
            'High School Chinese', 'High School History',
            'Middle School History', 'Civil Servant',
            'Sports Science', 'Plant Protection',
            'Basic Medicine', 'Clinical Medicine',
            'Urban and Rural Planner', 'Accountant',
            'Fire Engineer', 'Environmental Impact Assessment Engineer',
            'Tax Accountant', 'Physician'
        ]
    };
} else {
    topics_by_subject = {
        "STEM": ['all', '计算机网络', '操作系统', '计算机组成', '大学编程', '大学物理', '大学化学', '高等数学', '概率统计', '离散数学', '注册电气工程师', '注册计量师', '高中数学', '高中物理', '高中化学', '高中生物', '初中数学', '初中生物', '初中物理', '初中化学', '兽医学'],
        "社会科学": ['all', '大学经济学', '工商管理', '马克思主义基本原理', '毛泽东思想和中国特色社会主义理论体系概论', '教育学', '教师资格', '高中政治', '高中地理', '初中政治', '初中地理'],
        "人文科学": ['all', '近代史纲要', '思想道德修养与法律基础', '逻辑学', '法学', '中国语言文学', '艺术学', '导游资格', '法律职业资格', '高中语文', '高中历史', '初中历史'],
        "其他": ['all', '公务员', '体育学', '植物保护', '基础医学', '临床医学', '注册城乡规划师', '注册会计师', '注册消防工程师', '环境影响评价工程师', '税务师', '医师资格'],
        "all": [
            '计算机网络', '操作系统',
            '计算机组成', '大学编程',
            '大学物理', '大学化学',
            '高等数学', '概率统计',
            '离散数学', '注册电气工程师',
            '注册计量师', '高中数学',
            '高中物理', '高中化学',
            '高中生物', '初中数学',
            '初中生物', '初中物理',
            '初中化学', '兽医学',
            '大学经济学', '工商管理',
            '马克思主义基本原理', '毛泽东思想和中国特色社会主义理论体系概论',
            '教育学', '基础医学',
            '教师资格', '高中政治',
            '高中地理', '初中政治',
            '初中地理', '大学中国史',
            '思想道德修养与法律基础', '逻辑学',
            '法学', '中国语言文学',
            '艺术学', '导游资格',
            '法律职业资格', '高中语文',
            '高中历史', '初中历史',
            '公务员', '体育学',
            '植物保护', '临床医学',
            '注册城乡规划师', '注册会计师',
            '注册消防工程师', '环境影响评价工程师',
            '税务师', '医师资格'
        ]
    };
}


// 科目英文对应中文
const subject_EnToZh = {
    'Computer Network': '计算机网络',
    'Operating System': '操作系统',
    'Computer Architecture': '计算机组成',
    'College Programming': '大学编程',
    'College Physics': '大学物理',
    'College Chemistry': '大学化学',
    'Advanced Mathematics': '高等数学',
    'Probability and Statistics': '概率统计',
    'Discrete Mathematics': '离散数学',
    'Electrical Engineer': '注册电气工程师',
    'Metrology Engineer': '注册计量师',
    'High School Mathematics': '高中数学',
    'High School Physics': '高中物理',
    'High School Chemistry': '高中化学',
    'High School Biology': '高中生物',
    'Middle School Mathematics': '初中数学',
    'Middle School Biology': '初中生物',
    'Middle School Physics': '初中物理',
    'Middle School Chemistry': '初中化学',
    'Veterinary Medicine': '兽医学',
    'College Economics': '大学经济学',
    'Business Administration': '工商管理',
    'Marxism': '马克思主义基本原理',
    'Mao Zedong Thought': '毛泽东思想和中国特色社会主义理论体系概论',
    'Education Science': '教育学',
    'Teacher Qualification': '教师资格',
    'High School Politics': '高中政治',
    'High School Geography': '高中地理',
    'Middle School Politics': '初中政治',
    'Middle School Geography': '初中地理',
    'Modern Chinese History': '近代史纲要',
    'Ideological and Moral Cultivation': '思想道德修养与法律基础',
    'Logic': '逻辑学',
    'Law': '法学',
    'Chinese Language and Literature': '中国语言文学',
    'Art Studies': '艺术学',
    'Professional Tour Guide': '导游资格',
    'Legal Professional': '法律职业资格',
    'High School Chinese': '高中语文',
    'High School History': '高中历史',
    'Middle School History': '初中历史',
    'Civil Servant': '公务员',
    'Sports Science': '体育学',
    'Plant Protection': '植物保护',
    'Basic Medicine': '基础医学',
    'Clinical Medicine': '临床医学',
    'Urban and Rural Planner': '注册城乡规划师',
    'Accountant': '注册会计师',
    'Fire Engineer': '注册消防工程师',
    'Environmental Impact Assessment Engineer': '环境影响评价工程师',
    'Tax Accountant': '税务师',
    'Physician': '医师资格',
    'all': 'all',
    'STEM': 'STEM',
    'Social Science': '社会科学',
    'Humanities': '人文科学',
    'Other': '其他'
};

// 监听 subject_dd 元素的更改事件，以便在选择不同的类别时更新主题选项
subject_dd.addEventListener("change", function () {
    // 获取选定的主题
    let selected_subject = subject_dd.options[subject_dd.selectedIndex].value;

    // 获取与选定主题相关联的主题数组
    let related_topics = topics_by_subject[selected_subject];

    // 清空 topic_dd 的选项
    while (topic_dd.firstChild) {
        topic_dd.removeChild(topic_dd.firstChild);
    }

    // 为 topic_dd 添加新的选项，这些选项是与选定主题相关的
    for (let i = 0; i < related_topics.length; i++) {
        let option = document.createElement("option");
        option.value = related_topics[i];
        option.text = related_topics[i];
        topic_dd.add(option);
    }
});

// data filters
let filters = {};

optbtn.addEventListener("click", openNav);
closebtn.addEventListener("click", closeNav);


for (each of opt_dds) {
    each.addEventListener("change", change_filters);
}
filter_submit.addEventListener("click", filter_data);

// display the page
filter_data();

function openNav() {
    optionpanel.style.width = "20vw";
    display.style.width = "60vw";
    for (each of optionpanel.children) {
        each.style.display = "block";
    }
}

function closeNav() {
    optionpanel.style.width = "0";
    display.style.width = "80vw";
    for (each of optionpanel.children) {
        each.style.display = "none";
    }
}

function change_filters(e) {
    if (isEngPage == 0) {
        filters.topic = document.getElementById("topic-dd").value;
        filters.subject = document.getElementById("subject-dd").value;
    } else {
        filters.topic = subject_EnToZh[document.getElementById("topic-dd").value];
        filters.subject = subject_EnToZh[document.getElementById("subject-dd").value];
    }
}

// draw the page
function create_page(d) {
    if (d.length === 0) {
        body.innerHTML = "<p>No example satisfies all the filters.</p>";
    } else {
        col1 = create_col(d.slice(0, d.length / 2));
        col2 = create_col(d.slice(d.length / 2));
        body.innerHTML = col1 + col2;
    }
    reflow(body);
    console.log("reflowed");
}

function create_col(data) {
    res = [];
    for (each of data) {
        res.push(create_example(each));
    }
    return `<div class="display-col"> ${res.join("")} </div>`;
}

// data is an object with the following attr.
// hint: textual hint
// path: link/path to the image
// question: question text
// choices: an array of choices
// answer: answer to the question
// lecture: lecture text
// solution: solution text
function create_example(data) {
    let question = make_qt(data.question);

    // let hint = make_hint(data.hint)
    // let image = "";
    // if (data.image !== -1)
    //     image = make_img(data.path);

    let choices = make_choices(data.choices);
    // let answer = make_answer(data.choices[data.answer.charCodeAt(0) - 65]);
    let answer = make_answer(data.answer);
    // lecture = make_lecture(data.lecture);
    // solution = make_solution(data.solution);
    html = make_box([question, choices, answer]) + "<hr/>";
    // html = make_box([question, hint, image, choices, answer, lecture, solution]) + "<hr/>";

    return html;
}

// convert latex format
// function convert_latex(data) {
//   const re = /$(.*?)$/g; // 正则表达式，匹配 $...$ 中的内容
//   let html = '';
//
//   let match;
//   let lastIndex = 0;
//   while ((match = re.exec(data)) !== null) {
//     // 将 LaTeX 内容之前的文本作为普通文本生成 HTML
//     html += `<span>${data.slice(lastIndex, match.index)}</span>`;
//
//     // 将 LaTeX 内容解析为公式并生成 HTML
//     const latex = match[1];
//     const formula = katex.renderToString(latex);
//     html += formula;
//
//     lastIndex = match.index + match[0].length;
//   }
//
//   // 将剩余的文本作为普通文本生成 HTML
//   html += `<span>${data.slice(lastIndex)}</span>`;
//
//   // 将生成的 HTML 代码返回
//   return html;
// }

function convert_latex(data) {
    const re = /(\$+)([^\$]*?[^\\])\1|\\begin\{tabular\}.*?\\end\{tabular\}/gs;
    let html = '';

    let match;
    let lastIndex = 0;
    while ((match = re.exec(data)) !== null) {
        // 将 LaTeX 内容之前的文本作为普通文本生成 HTML
        html += `<span>${data.slice(lastIndex, match.index)}</span>`;

        if (match[0].startsWith('\\begin{tabular}')) {
            // 将表格环境解析为 HTML
            const table = match[0];
            const tableHtml = '...'; // 使用 MathJax 或 KaTeX 将表格转换为 HTML
            html += tableHtml;
        } else {
            // 将 LaTeX 公式解析为 HTML 片段
            const latex = match[2];
            const formula = katex.renderToString(latex, {throwOnError: false});
            html += `<span>${formula}</span>`;
        }

        lastIndex = match.index + match[0].length;
    }

    // 将剩余的文本作为普通文本生成 HTML
    html += `<span>${data.slice(lastIndex)}</span>`;

    return html;
}

// creates a div with question text in it
function make_qt(text) {
    let html = `
            <p><b>Question </b></p>
            <p class="question-txt">${convert_latex(text).replace(/\\n|\n/g, "<br>")}</p>
    `;
    return html;
}

// function make_hint(hint) {
//     if (hint === null) return "";
//     let html = `<p><b>Context </b></p><p class="hint-txt">${hint}</p>`;
//     return html;
// }

// function make_img(path) {
//     if (path === null) return "";
//     let html = `<img src="${path}" alt="example image" class="question-img" />`;
//     return html;
// }

function make_box(contents, cls = "") {
    if (contents.join("").length === 0) return "";
    let html = `
        <div class="box ${cls}"> 
            ${contents.join(" ").replace(/\\n|\n/g, "<br>")}
        </div>
    `;
    return html;
}

function make_choices(choices) {
    let temp = "";
    let len = 0;
    for (each of choices) {
        let html = make_choice(each);
        temp += html;
        len += each.length;
    }
    let html = "";
    if (len < 60)
        html = `<p><b>Choices </b></p><div class="choices">${convert_latex(temp).replace(/\\n|\n/g, "<br>")}</div>`;
    else
        html = `<p><b>Choices </b></p><div class="choices-vertical">${convert_latex(temp).replace(/\\n|\n/g, "<br>")}</div>`;
    return html;
}

function make_choice(choice) {
    let html = `<div class="choice-txt">${convert_latex(choice).replace(/\\n|\n/g, "<br>")}</div>`;
    return html;
}

function make_answer(answer) {
    let html = `<p><b>Answer </b></p><p class="answer-txt">${convert_latex(answer)}</p>`;
    return html;
}

// function make_lecture(lecture) {
//     if (lecture === null) return "";
//     let html = `<p><b>Lecture </b></p><p class="lecture"> ${lecture}</p>`;
//     return html;
// }

// function make_solution(solution) {
//     if (solution === null) return "";
//     let html = `<p><b>Solution </b></p><p class="solution"> ${solution}</p>`;
//     return html;
// }

function make_dropdown(label, options, id, default_ind = 0) {
    let html = "";
    for (let i = 0; i < options.length; i++) {
        if (i === default_ind)
            html += `<option value="${options[i]}" selected> ${options[i]} </option>`;
        else
            html += `<option value="${options[i]}"> ${options[i]} </option>`;
    }
    html = `<label class="dd-label">${label} <select id="${id}" class="opt-dd"> ${html} </select> </label><br/>`;
    return html;
}

function filter_data() {
    change_filters();
    res = problem_data;
    if (filters.subject !== "all")
        res = res.filter(e => e.subject === filters.subject);
    // if (filters.grade !== "all")
    //     res = res.filter(e => e.grade === filters.grade);
    if (filters.topic !== "all")
        res = res.filter(e => e.topic === filters.topic);
    // if (filters.has_img !== "both") {
    //     res = res.filter((e) => {
    //         if (filters.has_img === "yes")
    //             return e.image !== null;
    //         else
    //             return e.image === null;
    //     });
    // }
    // if (filters.has_hint !== "both") {
    //     res = res.filter((e) => {
    //         if (filters.has_hint === "yes")
    //             return e.hint !== null;
    //         else
    //             return e.hint === null;
    //     });
    // }
    // if (filters.has_lec !== "both") {
    //     res = res.filter((e) => {
    //         if (filters.has_lec === "yes")
    //             return e.lecture !== null;
    //         else
    //             return e.lecture === null;
    //     });
    // }
    // if (filters.has_sol !== "both") {
    //     res = res.gofilter((e) => {
    //         if (filters.has_sol === "yes")
    //             return e.solution !== "";
    //         else
    //             return e.solution === "";
    //     });
    // }
    d = _.sample(res, Math.min(6, res.length));
    // for (each of d) {
    //     console.log(d);
    // }
    create_page(d);
}

// force the browser to reflow
function reflow(elt) {
    elt.offsetHeight;
}
