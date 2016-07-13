  window.addEventListener("load", function(){

    range      = '';
    intervalID = '';
    var get_textarea_keydown = function (e){
      var selected_obj  = document.activeElement;

      var shift_key = e.shiftKey;
      var alt_key   = e.altKey;
      var key_code  = e.keyCode;
      var key_type  = e.type;

      switch(true){
        // ALT + P pre tag
        case (alt_key) && (key_code == 80) && (key_type == "keydown") :
          mantis_taginserttocomment_insert_textarea('',"pre");
        break;

        // ALT + B blockquote tag
        case (alt_key) && (key_code == 66) && (key_type == "keydown") :
          mantis_taginserttocomment_insert_textarea('',"blockquote");
        break;

        // Backspace
        case (key_code == 8) && (key_type == "keydown") :
                //console.log(e);
                //console.log(e.target.nodeName);
                //console.log(e.target.type);

          if(e.target.nodeName!="TEXTAREA" && e.target.nodeName!="INPUT" || e.target.type=="submit" || e.target.type=="button" || e.target.type=="checkbox" || e.target.type=="file"){
            e.preventDefault();
            e.stopPropagation();
            return false;
          }// if nodename
        break;

        case (!alt_key):
          return;
        break;

      } // switch

    } // f get_textarea_selected

    document.addEventListener("keydown", get_textarea_keydown, false);

    // 表示されているページの種別によって挿入個所の変更
    var page_kind  = document.getElementById("Mantis_TagInsertToComment_flag").value;
    //console.log(page_kind);
  
    switch(page_kind){
      case 'update' :
        var textarea_obj   = document.getElementById("description");
      break;

      case 'bugnote' :
        var textarea_obj = document.getElementsByName("bugnote_text")[0];
      break;
    } //switch page_kind

    // scrollはonclickの追加なので配列に含めない。
    var ElementArray = [
           ["pre","pre(ALT+p)"],
           ["blockquote","blockquote(ALT+B)"],
           ["code","code"],
           ["strong","strong"],
           ["em","em"],
           ["image","image"]
        ];

  
    var newNode = document.createElement('div');
        newNode.className   = "Mantis_TagInsertToComment_menu";

    i_length = ElementArray.length;
    for(i=0;i<i_length;i++){
      
        var inputNode = document.createElement('input');
            inputNode.type      = "button";
            inputNode.className = "Mantis_TagInsertToComment";
            inputNode.id        = "Mantis-TagInsertToComment_" + ElementArray[i][0];
            inputNode.value     = ElementArray[i][1];
            inputNode.addEventListener("click",mantis_taginserttocomment_insert_textarea);
            newNode.appendChild(inputNode);

    } // for i_lenght

    // scroll ボタン
    var inputNode = document.createElement('input');
        inputNode.type      = "button";
        inputNode.className = "Mantis_TagInsertToComment";
        inputNode.id        = "Mantis-TagInsertToComment_scroll";
        inputNode.value     = "scroll TOP↑";
        inputNode.onclick   = function(){window.scrollTo(0,0); };
        newNode.appendChild(inputNode);
  
//    bugnoteadd_tbody.insertBefore(newNode,bugnoteadd_tbody.children[0]);
    textarea_obj.parentNode.insertBefore(newNode,textarea_obj.parentNode.children[0]);
  
    } // window onload
  , false); // window addEventListener

  function mantis_taginserttocomment_insert_textarea(mouseevent,fromkeyboardtag){
    var return_flg = false;

    // 表示されているページの種別によって挿入個所の変更
    var page_kind  = document.getElementById("Mantis_TagInsertToComment_flag").value;
    //console.log(page_kind);
  
    switch(page_kind){
      case 'update' :
        var textarea_obj   = document.getElementById("description");
      break;

      case 'bugnote' :
        var textarea_obj = document.getElementsByName("bugnote_text")[0];
      break;
    } //switch page_kind
    textarea_obj.focus();

    var selected_obj  = document.activeElement;
    if(selected_obj.selectionStart <= selected_obj.selectionEnd ){
      string_start = selected_obj.selectionStart;
      string_end   = selected_obj.selectionEnd;
    } else {
      string_start = selected_obj.selectionEnd;
      string_end   = selected_obj.selectionStart;
    } // if 

    before_range  = selected_obj.value.substring(
                    0, string_start);
    range         = selected_obj.value.substring(
                    string_start , string_end);
    after_range   = selected_obj.value.substring(
                    string_end );

    /* debug
      console.log(e);
      console.log("string_start:" + string_start);
      console.log("string_end:" + string_end);
      console.log("before_range:" + before_range);
      console.log("range:" + range);
      console.log("after_range:" + after_range);
      console.log("text_num:" + (range.match(/\r\n|\n/g)||[]).length);
    */
    // 改行数の確認

    if( mouseevent === ""){
      tags = fromkeyboardtag;
    }else{
      id_str   = mouseevent.srcElement.id;
      tags     = id_str.substring(id_str.indexOf("_")+1,id_str.length);
    } //if mouseevent

    
    if( 1 < (range.match(/\r\n|\n/g)||[]).length ){
      return_flg = true;
    } // if match

    switch(tags){
      case 'pre':
        before_insert_tag = '<pre>';
        after_insert_tag  = '</pre>';
      break;

      case 'blockquote':
        before_insert_tag = '<blockquote>';
        after_insert_tag  = '</blockquote>';
      break;

      case 'code':
        before_insert_tag = '[code=]';
        after_insert_tag  = '[/code]';
      break;

      case 'strong':
        before_insert_tag = '<strong>';
        after_insert_tag  = '</strong>';
      break;

      case 'em':
        before_insert_tag = '<em>';
        after_insert_tag  = '</em>';
      break;

      case 'image':
        before_insert_tag = '\n%[],rate100';
        after_insert_tag  = '';
      break;
  
    } // switch

    if(return_flg){
      textarea_obj.value = before_range + before_insert_tag + '\n' + range + after_insert_tag + '\n' + after_range ; 
      var CaretPosition = string_start + before_insert_tag.length + range.length + after_insert_tag.length + 1;
    }else{
      textarea_obj.value = before_range + before_insert_tag + range + after_insert_tag + after_range ; 
      var CaretPosition = string_start + before_insert_tag.length + range.length + after_insert_tag.length ;
    } // if return_flg something

    if(!range){
      textarea_obj.value = before_range + before_insert_tag + '\n' + after_insert_tag + '\n' + after_range ; 
      var CaretPosition = string_start + before_insert_tag.length + 1;
    } // if range noting

    textarea_obj.setSelectionRange( CaretPosition , CaretPosition);

  } // f insert_textarea
