<?php

# Copyright (C) 2016 - 2016 Ryuji Ebine

#require_once( config_get( 'class_path' ) . 'MantisFormattingPlugin.class.php' );

class Mantis_TagInsertToCommentPlugin extends MantisPlugin{
  function register() {
    $this->name = 'Mantis TagInsertToComment';
    $this->description = 'TextareaにHTMLタグを挿入するPlugin';
    $this->page = '';         

    $this->version = '0.1.0';
    $this->requires = array(
      'MantisCore' => '1.3.0',
    );

    $this->author = 'Ryuji Ebine';
    $this->contact = 'rebine@redalarm.jp';
    $this->url = 'https://github.com/rebine/Mantis_TagInsertToComment';
  }

  function hooks() {
    return array(
      'EVENT_LAYOUT_RESOURCES'  => 'resources',              # CSS JS include
      'EVENT_BUGNOTE_EDIT_FORM' => 'display_button_comment', # Display Insert Tags
      'EVENT_BUGNOTE_ADD_FORM'  => 'display_button_comment', # Display Insert Tags
      'EVENT_UPDATE_BUG_FORM'   => 'display_button_report',  # Display Insert Tags
      'EVENT_REPORT_BUG_FORM'   => 'display_button_report',  # Display Insert Tags
                );
  } // f hooks

  public function install() {
    return true;
  } // f install

  /**
   * Include css ,js
   * @param int $p_event
   * @return string
   */
  function resources( $p_event){
    $resource  = '<link href="' . plugin_file( 'Mantis_TagInsertToComment.css' ) . '" media="all" rel="stylesheet" type="text/css"/>';
    $resource .= '<script type="text/javascript" src="' . plugin_file( 'Mantis_TagInsertToComment.js' ) . '"></script>';
    return $resource;
  } // f resources

  /**
   * Display click for insert field
   * @param strings $p_event
   * @param array   $p_attachment An attachment array 
   * @return void
   */
  function display_button_comment( $p_event ,$p_bug) {

    $display_button =<<< _HTML_
      <input type="hidden" id="Mantis_TagInsertToComment_flag" value="bugnote">

_HTML_;
   
    echo $display_button;

  } // f display_button_comment 

  function display_button_report( $p_event ,$p_bug) {
    $display_button_flag =<<< _HTML_
      <input type="hidden" id="Mantis_TagInsertToComment_flag" value="update">
_HTML_;
   
    echo $display_button_flag;


  } // f display_button_report

}
