
window.onscroll = function() {
    updateProgressBar();
  };
  
  function updateProgressBar() {
    let scrollTop = document.documentElement.scrollTop
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    
    let scrolled = (scrollTop / scrollHeight) * 100;
    

    document.getElementById("progress-bar").style.width = scrolled + "%";
  }
  