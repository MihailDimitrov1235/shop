import React from "react";
import { Editor, EditorState, getDefaultKeyBinding, RichUtils, convertToRaw, convertFromHTML, ContentState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import "./RichTextEditor.module.css";
import "../../../../node_modules/draft-js/dist/Draft.css";
import { useTranslation } from 'react-i18next';

class RichTextEditor extends React.Component {
    constructor(props) {
      super(props);

      const blocksFromHTML = convertFromHTML(this.props.value);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      this.state = {
        editorState: EditorState.createWithContent(state),
        isFocused: false,
      }

      
      
      this.onFocus = () => {
        this.setState({ isFocused: true });
      }
      
      this.onBlur = () => {
        this.setState({ isFocused: false });
      }
      this.onChange = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const markup = draftToHtml(
          rawContentState, 
        );

        this.props.setFieldValue(this.props.name, markup);
        this.setState({editorState});
      };

      this.handleKeyCommand = this._handleKeyCommand.bind(this);
      this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
      this.toggleBlockType = this._toggleBlockType.bind(this);
      this.toggleInlineStyle = this._toggleInlineStyle.bind(this);

      this.editorRef = React.createRef();
    }

    _handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }

    _mapKeyToEditorCommand(e) {
      if (e.keyCode === 9 /* TAB */) {
        const newEditorState = RichUtils.onTab(
          e,
          this.state.editorState,
          4, /* maxDepth */
        );
        if (newEditorState !== this.state.editorState) {
          this.onChange(newEditorState);
        }
        return;
      }
      return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }

    _toggleInlineStyle(inlineStyle) {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }

    render() {
      const {editorState} = this.state;

      // If the user changes block type before entering any text, we can
      // either style the placeholder or hide it. Let's just hide it now.
      let className = 'RichEditor-editor';
      var contentState = editorState.getCurrentContent();
      if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
          className += ' RichEditor-hidePlaceholder';
        }
      }

      return (
        <div className={this.state.isFocused ? 'RichEditor-root focused' : 'RichEditor-root'}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              placeholder={'text-pholder'}
              ref={this.editorRef}
              spellCheck={true}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </div>
        </div>
      );
    }
  }

  // Custom overrides for "code" style.
  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
  }

  class StyleButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }

    render() {
      let className = 'RichEditor-styleButton';
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }

      return (
        <span className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  const BlockStyleControls = (props) => {
    const { t } = useTranslation();
    const BLOCK_TYPES = [
      {label: t('h1'), style: 'header-one'},
      {label: t('h2'), style: 'header-two'},
      {label: t('h3'), style: 'header-three'},
      {label: t('h4'), style: 'header-four'},
      {label: t('h5'), style: 'header-five'},
      {label: t('h6'), style: 'header-six'},
      {label: t('quote'), style: 'blockquote'},
      {label: t('ul'), style: 'unordered-list-item'},
      {label: t('ol'), style: 'ordered-list-item'},
      {label: t('code-block'), style: 'code-block'},
    ];
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className="RichEditor-controls">
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

  const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    
    const { t } = useTranslation();
    const INLINE_STYLES = [
      {label: t('bold'), style: 'BOLD'},
      {label: t('italic'), style: 'ITALIC'},
      {label: t('underline'), style: 'UNDERLINE'},
      {label: 'Monospace', style: 'CODE'},
    ];

    return (
      <div className="RichEditor-controls">
        {INLINE_STYLES.map((type) =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
  };

export default RichTextEditor;