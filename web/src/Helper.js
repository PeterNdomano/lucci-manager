import $ from 'jquery';
import toast from 'siiimple-toast';


export const APP_NAME = "Library Manager";

export const MAIN_URL = "http://werenium.com/komu/api/";

export function loader(show){
  if(show){
    $('#mainLoader').fadeIn('slow');
  }
  else{
    $('#mainLoader').fadeOut('slow');
  }
}

export function logOut(){
  $.post(MAIN_URL+'logout.php', {}, (data, status) => {
    if(status === 'success'){
      window.location.href = '/';
    }
  });
}

export function tellUser(msg, ind = 'w'){
  toast.message(msg, {
    container: 'body',
    position: "bottom|right",
    margin: 15,
    style:{
       width: "300px",
       fontSize:"15px",
       position:"relative",
       overflow: "hidden",
     },
    delay: 0,
    duration: 4000,
  });
}
