import React, { Component } from 'react';
import ReactEditor from './ReactEditor';
import './App.css';
import axios from "axios";
import qs from "qs";
import MaterialIcon from "material-icons-react";
import PropTypes from "prop-types";
import {Menu, Dropdown, Button} from "antd";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/antd/dist/antd.css";

let ImageUploader = function (context) {
    let ui = window.$.summernote.ui;
    // create button
    let button = ui.button({
        contents: '<i class="fa fa-picture-o"/>',
        tooltip: 'Insert Image',
        click: function () {
            // invoke insertText method with 'hello' on editor module.
            window.$(".imageModel").modal('show')
        }
    });
    return button.render();   // return button as jquery object
};

let LanguageDropdown = function (context) {

    let ui = window.$.summernote.ui;
    var list = document.getElementById('ContentDropDown');
    let languages= [
        {
            label: "English",
            value: "english"
        },
        {
            label: "Hindi",
            value: "hindi"
        },
        {
            label: "Gujarati",
            value: "gujarati"
        },
        {
            label: "Tamil",
            value: "tamil"
        },
        {
            label: "Kannada",
            value: "kannada"
        },
        {
            label: "Panjabi",
            value: "panjabi"
        },
        {
            label: "Malayalam",
            value: "malayalam"
        },
        {
            label: "Bengali",
            value: "bengali"
        },
        {
            label: "Marathi",
            value: "marathi"
        },
        {
            label: "Oriya",
            value: "oriya"
        },
        {
            label: "Konkani(E)",
            value: "konkani(e)"
        },
        {
            label: "Konkani(H)",
            value: "konkani(h)"
        }
        ];

    var button = ui.buttonGroup([
        ui.button({
            className: 'dropdown-toggle',
            contents: `<span class="fa fa-language"></span> ${window.lang ? window.lang : "English"} <span class="fa fa-caret-down"></span>`,
            tooltip: "Parámetros disponibles",
            data: {
                toggle: 'dropdown'
            }
        }),
        ui.dropdown({
            className: 'drop-default summernote-list',
            contents: `<ul> ${languages.map(e => `<li>${e.label}</li>`)} </ul>`,
            callback: function (e) {
                console.log(e)
            }
        })
    ]);

    return button.render();   // return button as jquery object
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            editorValue : "" ,
            lang : "english",
            stageEditorValue: ""
        }
        this.handleEditorValueChange = this.handleEditorValueChange.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleImageInsert = this.handleImageInsert.bind(this);
    }

    componentDidMount(){
        const element = document.getElementsByClassName("note-editable")[0];
        const spaces = new Set([0]);
        window.prevString = '';
        window.currentString = '';
        window.languages = this.props.languages;
    }

    componentDidUpdate(prevProps){
        const { insertImage } = this.props;
        if(insertImage !== "" && insertImage && prevProps.insertImage !== insertImage){
            this.handleImageInsert(insertImage);
        }
    }

    handleEditorValueChange(editorValue) {
        window.$(".note-editable a").each(function() {
            this.onclick = function () {
                let win = window.open(this.href, '_blank');
                win.focus();
            }
        });
        const HTML = window.$(window.$("#reactRichEditor").summernote("code"));
        const text = HTML.text();
        if(this.props.onCodeChange){
            this.props.onCodeChange(editorValue);
        }
        if(this.props.onTextChange) {
            this.props.onTextChange(text);
        }

        this.setState({editorValue})
    }

    handleLangChange(lang) {
        window.lang = lang;
        this.setState({lang})
    }

    handleImageInsert(url) {
        window.$("#reactRichEditor").summernote("insertImage", url);
    }


    render() {
        const { lang, editorValue } = this.state;
        const { imageModel, height, languages, showAll } = this.props;

        const menu = <Menu
            className="ContentDropDown"
            id="ContentDropDown"
            onClick={e => this.handleLangChange(e.key)}
        >
            {
                languages ? languages.map(e => (
                    <Menu.Item
                        className={lang === e.value ? "ant-dropdown-menu-item-active" : ""}
                        key={e.value}
                    >
                        {e.label}
                    </Menu.Item>
                )) : ""
            }
        </Menu>

        return (
            <div className="React-editor-container">
                <ReactEditor
                    value={editorValue}
                    options={{
                        height: height,
                        fontNames: [
                            "Arial",
                            "Arial Black",
                            "Comic Sans MS",
                            "Courier New"
                        ],
                        placeholder: "Compose Mail",
                        dialogsFade: true,
                        disableResizeEditor: true,
                        toolbar: [
                            ["style", ["undo", "redo", showAll ? "style" : "", "fontsize"]],
                            ["font", ["bold", "underline", "clear"]],
                            ["fontname", [showAll ? "fontname" : ""]],
                            ["color", [ showAll ? "color" : ""]],
                            ["para", ["ul", "ol", "paragraph"]],
                            ["table", [ showAll ? "table" : ""]],
                            ["float", ["floatLeft", "floatRight", "floatNone"]],
                            ["insert", ["link", imageModel ? 'customImage' : ""]],
                            ["view", [showAll ? "codeview" : ""]]
                        ],
                        buttons: {
                            customImage: ImageUploader,
                            LanguageDropdown: LanguageDropdown
                        },
                        hint: {
                            match: /\b(\w{1,})$/,
                            search: function (inString, callback) {
                                let lang =
                                    window && window.lang
                                        ? window.lang.toLowerCase()
                                        : "english";
                                if (lang && lang !== "english") {
                                    const query = qs.stringify({inString, lang});
                                    let queryUrl = `http://quill.magicauthor.ml/processWordJSON?${query}`;
                                    axios.get(queryUrl).then(res => {
                                        let resData = res.data.twords &&
                                        res.data.twords[0] &&
                                        res.data.twords[0].options
                                            ? res.data.twords[0].options
                                            : [];
                                        let data = [];
                                        data.push(...resData);
                                        callback(
                                            data
                                        );
                                    });
                                } else {
                                    callback([]);
                                }
                            }
                        }
                    }}
                    onChange={this.handleEditorValueChange}
                />
                <Dropdown overlay={menu} placement="topLeft">
                    <div className="React-editor-container__language-btn-box">
                        <MaterialIcon icon="translate"/>
                    </div>
                </Dropdown>
                <div id="uploadModal" className="modal fade imageModel" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {imageModel}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    height: PropTypes.number,
    imageModel: PropTypes.element,
    insertImage: PropTypes.string,
    languages: PropTypes.array,
    onTextChange: PropTypes.func,
    onCodeChange: PropTypes.func,
    showAll: PropTypes.bool,
}

App.defaultProps = {
    height: 500,
    imageModel: null,
    insertImage: "",
    showAll: false,
    languages: [
        {
            label: "English",
            value: "english"
        },
        {
            label: "Hindi",
            value: "hindi"
        },
        {
            label: "Gujarati",
            value: "gujarati"
        },
        {
            label: "Tamil",
            value: "tamil"
        },
        {
            label: "Kannada",
            value: "kannada"
        },
        {
            label: "Panjabi",
            value: "panjabi"
        },
        {
            label: "Malayalam",
            value: "malayalam"
        },
        {
            label: "Bengali",
            value: "bengali"
        },
        {
            label: "Marathi",
            value: "marathi"
        },
        {
            label: "Oriya",
            value: "oriya"
        },
        {
            label: "Konkani(E)",
            value: "konkani(e)"
        },
        {
            label: "Konkani(H)",
            value: "konkani(h)"
        }
    ]
};

export default App;