
$(".clickable").click(function(){
  let query = $(this).find(">:first-child").text();
  let url = "/details?ak=" + query;
  window.location.assign(url);
});
