function changeHeart(elem) {
  for(var i=0;i<elem.length;i++) {
    var title = $(elem[i]).text();
    if (title.indexOf('<3') > -1) {
      $(elem[i]).html(title.replace('<3', '<i class="fa fa-heart" aria-hidden="true"></i>'));
    }
  }
}
$(document).ready( function () {
  changeHeart($('.post-link'));
  changeHeart($('.post-title'));
  $('article a').each(function (ix, a) {
      a.target = '_blank';
  });
});
