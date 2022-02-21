import $ from 'jquery';
import toast from 'siiimple-toast';


export const APP_NAME = "Library Manager";

export const MAIN_URL = "/github_projects/lucci-manager/api/";

export function loader(show){
  if(show){
    $('#mainLoader').fadeIn('slow');
  }
  else{
    $('#mainLoader').fadeOut('slow');
  }
}

export function tellUser(msg, ind = 'w'){
  toast.message(msg);
}
